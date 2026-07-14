import { coverStorageKey, generateTechNewsVisualCover, isUsablePhotoUrl } from "@/lib/techNewsCover";
import { normalizeInputUrl } from "@/lib/techNewsFeedInput";
import {
  cleanText,
  cleanTitle,
  decodeHtml,
  isJunkParagraph,
  looksLikeCode,
  stripHtml,
} from "@/lib/techNewsText";

export { cleanTitle } from "@/lib/techNewsText";

export const SYNC_LIMIT = 100;

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const HOST_FEED_GUESSES = {
  "www.webtekno.com": "https://www.webtekno.com/rss.xml",
  "webtekno.com": "https://www.webtekno.com/rss.xml",
  "www.donanimhaber.com": "https://www.donanimhaber.com/rss/tum/",
  "donanimhaber.com": "https://www.donanimhaber.com/rss/tum/",
};

function looksLikeFeedUrl(url) {
  return /\/rss|\.xml|\.atom|\/feed/i.test(url);
}

function getDefaultFeedUrls() {
  const env = process.env.TECH_NEWS_FEEDS;
  if (!env) return [];
  return env
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function normalizeFeedUrls(feedUrls) {
  if (!feedUrls) return [];
  const list = Array.isArray(feedUrls) ? feedUrls : [feedUrls];
  return list.map((part) => normalizeInputUrl(String(part))).filter(Boolean);
}

async function isValidFeed(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const text = await res.text();
    return text.includes("<rss") || text.includes("<feed") || text.includes("<item>");
  } catch {
    return false;
  }
}

async function tryDiscoverRss(pageUrl) {
  if (looksLikeFeedUrl(pageUrl) && (await isValidFeed(pageUrl))) return pageUrl;

  let parsed;
  try {
    parsed = new URL(pageUrl);
  } catch {
    return null;
  }

  const hostGuess = HOST_FEED_GUESSES[parsed.hostname];
  if (hostGuess && (await isValidFeed(hostGuess))) return hostGuess;

  try {
    const res = await fetch(pageUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (res.ok) {
      const html = await res.text();
      const rssHref =
        html.match(/<link[^>]+type=["']application\/rss\+xml["'][^>]+href=["']([^"']+)["']/i)?.[1] ||
        html.match(/href=["']([^"']+)["'][^>]+type=["']application\/rss\+xml["']/i)?.[1] ||
        html.match(/<link[^>]+type=["']application\/atom\+xml["'][^>]+href=["']([^"']+)["']/i)?.[1];

      if (rssHref) {
        const absolute = new URL(rssHref, pageUrl).href;
        if (await isValidFeed(absolute)) return absolute;
      }
    }
  } catch {
    // RSS bulunamadı — normal site modu
  }

  const candidates = [
    `${parsed.origin}/rss/tum/`,
    `${parsed.origin}/rss.xml`,
    `${parsed.origin}/rss`,
    `${parsed.origin}/feed`,
    `${parsed.origin}/feed/`,
  ];

  for (const candidate of candidates) {
    if (await isValidFeed(candidate)) return candidate;
  }

  return null;
}

async function resolveSource(inputUrl) {
  const pageUrl = normalizeInputUrl(inputUrl);
  if (!pageUrl) return null;

  try {
    new URL(pageUrl);
  } catch {
    throw new Error(`Geçersiz link: ${inputUrl}`);
  }

  const rssUrl = await tryDiscoverRss(pageUrl);
  if (rssUrl) {
    return { type: "rss", url: rssUrl, label: pageUrl };
  }

  return { type: "web", url: pageUrl, label: pageUrl };
}

async function resolveSourceList(feedUrls) {
  const sources = [];
  const errors = [];

  for (const raw of feedUrls) {
    try {
      const source = await resolveSource(raw);
      if (!source) continue;
      const key = `${source.type}:${source.url}`;
      if (sources.some((s) => `${s.type}:${s.url}` === key)) continue;
      sources.push(source);
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }

  if (!sources.length) {
    throw new Error(errors[0] || "Geçerli bir site linki girin.");
  }

  return sources;
}

function stripBoilerplateHtml(html) {
  return (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<pre[\s\S]*?<\/pre>/gi, "")
    .replace(/<code[\s\S]*?<\/code>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

function htmlToParagraphs(html) {
  if (!html) return [];

  const cleaned = stripBoilerplateHtml(html);
  return cleaned
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .split(/\n{2,}/)
    .map((p) => cleanText(stripHtml(p)))
    .filter((p) => p.length > 50 && !looksLikeCode(p));
}

function readTag(block, tag) {
  const cdata = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return decodeHtml(cdata[1].trim());

  const plain = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return plain ? decodeHtml(plain[1].trim()) : "";
}

function readContentEncoded(block) {
  const match = block.match(
    /<content:encoded>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?)<\/content:encoded>)/i,
  );
  if (!match) return "";
  return decodeHtml((match[1] || match[2] || "").trim());
}

function extractImageFromBlock(block) {
  const enclosure = block.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1];
  const img = block.match(/<img[^>]+src="([^"]+)"/i)?.[1];

  let bestMedia = null;
  let bestWidth = 0;
  const mediaMatches = block.matchAll(/<media:content[^>]+url="([^"]+)"[^>]*(?:\swidth="(\d+)")?/gi);
  for (const match of mediaMatches) {
    const width = Number(match[2] || 0);
    if (width >= bestWidth) {
      bestWidth = width;
      bestMedia = match[1];
    }
  }

  const thumbnail = block.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1];
  const candidate = bestMedia || enclosure || thumbnail || img;
  return candidate ? candidate.replace(/&amp;/g, "&") : null;
}

export function parseRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = readTag(block, "title");
    const link = readTag(block, "link") || readTag(block, "guid");
    const descriptionRaw = readTag(block, "description");
    const description = stripHtml(descriptionRaw);
    const contentHtml = readContentEncoded(block);
    const imageUrl = extractImageFromBlock(block);
    const pubDateRaw = readTag(block, "pubDate");
    const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

    if (!title) continue;

    items.push({
      title: title.trim(),
      link: link?.trim() || title,
      description: cleanText(description),
      contentHtml,
      imageUrl,
      pubDate: pubDate && !Number.isNaN(pubDate.getTime()) ? pubDate.toISOString() : null,
    });
  }

  return items;
}

async function fetchFeed(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`RSS alınamadı (${url} · ${res.status})`);
  }

  return res.text();
}

export async function fetchTechNews(feedUrls) {
  const sources = await resolveSourceList(feedUrls);
  if (!sources.length) return { items: [], feeds: [] };

  const batches = await Promise.all(
    sources.map(async (source) => {
      try {
        if (source.type === "rss") {
          const xml = await fetchFeed(source.url);
          return parseRssItems(xml).map((item) => ({ ...item, feed: source.label }));
        }

        const scraped = await scrapeArticlesFromPage(source.url, SYNC_LIMIT);
        return scraped.map((item) => ({ ...item, feed: source.label }));
      } catch (error) {
        console.error(`source ${source.url}:`, error?.message || error);
        return [];
      }
    }),
  );

  const merged = batches.flat();
  if (!merged.length) {
    throw new Error("Bu linkten haber bulunamadı. Ana sayfa veya haber kategorisi linki dene.");
  }
  merged.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));

  const seen = new Set();
  const items = merged.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { items, feeds: sources.map((source) => source.label) };
}

/** @deprecated use fetchTechNews */
export async function fetchAllTechNews() {
  const { items } = await fetchTechNews(getDefaultFeedUrls());
  return items;
}

function normalizeForCompare(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isNearDuplicate(a, b) {
  if (!a || !b) return false;
  const na = normalizeForCompare(a);
  const nb = normalizeForCompare(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length > 40 && nb.length > 40 && (na.includes(nb) || nb.includes(na))) return true;
  return false;
}

function isLikelyArticleUrl(href, origin) {
  try {
    const u = new URL(href);
    if (u.origin !== origin) return false;

    const path = u.pathname.toLowerCase();
    if (path === "/" || path.length < 8) return false;
    if (/\.(jpg|jpeg|png|gif|webp|pdf|css|js|xml|zip)$/i.test(path)) return false;
    if (
      /\/(tag|etiket|kategori|category|author|yazar|page|sayfa|arama|search|login|uye|rss|feed|xml|video-galeri|galeri|forum|hakkimizda|iletisim|kunye)\b/i.test(
        path,
      )
    ) {
      return false;
    }

    const slug = path.split("/").filter(Boolean).pop() || "";
    if (slug.length < 8) return false;
    if (!/[\d-]/.test(slug) && slug.split("-").length < 3) return false;

    return true;
  } catch {
    return false;
  }
}

function addScrapedItem(rawUrl, rawTitle, pageUrl, origin, items, seenUrls, limit) {
  if (items.length >= limit || !rawUrl) return;

  let href = rawUrl;
  try {
    href = new URL(href, pageUrl).href;
  } catch {
    return;
  }

  if (!isLikelyArticleUrl(href, origin)) return;
  if (seenUrls.has(href)) return;

  const title = cleanTitle(rawTitle || "");
  if (title.length < 12 || title.length > 220 || title === "Teknoloji Haberi") return;
  if (isJunkParagraph(title)) return;

  seenUrls.add(href);
  items.push({
    title,
    link: href,
    description: "",
    contentHtml: "",
    imageUrl: null,
    pubDate: null,
  });
}

function extractFromJsonLd(data, pageUrl, origin, items, seenUrls, limit) {
  const nodes = Array.isArray(data) ? data : [data];

  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;

    if (node["@type"] === "ItemList" && Array.isArray(node.itemListElement)) {
      for (const el of node.itemListElement) {
        const item = el.item || el;
        addScrapedItem(
          item.url || item["@id"],
          item.name || item.headline,
          pageUrl,
          origin,
          items,
          seenUrls,
          limit,
        );
      }
    }

    if (node["@type"] === "NewsArticle" || node["@type"] === "Article") {
      addScrapedItem(
        node.url || node.mainEntityOfPage?.["@id"] || node.mainEntityOfPage,
        node.headline || node.name,
        pageUrl,
        origin,
        items,
        seenUrls,
        limit,
      );
    }

    if (Array.isArray(node["@graph"])) {
      extractFromJsonLd(node["@graph"], pageUrl, origin, items, seenUrls, limit);
    }
  }
}

function extractLinksFromHtml(html, pageUrl, origin, items, seenUrls, limit) {
  const anchorRe = /<a[^>]+href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = anchorRe.exec(html)) !== null && items.length < limit) {
    const titleAttr = match[0].match(/title=["']([^"']+)["']/i)?.[1];
    const text = titleAttr || stripHtml(match[2]);
    addScrapedItem(match[1], text, pageUrl, origin, items, seenUrls, limit);
  }
}

async function scrapeArticlesFromPage(pageUrl, limit = SYNC_LIMIT) {
  const res = await fetch(pageUrl, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Sayfa açılamadı (${res.status}): ${pageUrl}`);
  }

  const html = await res.text();
  const origin = new URL(pageUrl).origin;
  const items = [];
  const seenUrls = new Set();

  const jsonLdBlocks = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  for (const block of jsonLdBlocks) {
    try {
      extractFromJsonLd(JSON.parse(block[1]), pageUrl, origin, items, seenUrls, limit);
    } catch {
      // ignore invalid json-ld
    }
  }

  const articleBlocks = html.match(/<article[\s\S]*?<\/article>/gi) || [];
  for (const block of articleBlocks) {
    extractLinksFromHtml(block, pageUrl, origin, items, seenUrls, limit);
  }

  if (items.length < 8) {
    extractLinksFromHtml(html, pageUrl, origin, items, seenUrls, limit);
  }

  if (!items.length) {
    throw new Error(`Bu sayfada haber bulunamadı: ${pageUrl}`);
  }

  return items.slice(0, limit);
}

function sanitizeParagraphs(paragraphs) {
  return paragraphs.map((p) => cleanText(p)).filter((p) => !isJunkParagraph(p));
}

function dedupeParagraphs(paragraphs) {
  const result = [];
  for (const paragraph of paragraphs) {
    if (result.some((existing) => isNearDuplicate(existing, paragraph))) continue;
    result.push(paragraph);
  }
  return result;
}

async function fetchArticleImage(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!res.ok) return null;

    const html = await res.text();
    const article = html.match(/<article[\s\S]*?<\/article>/i)?.[0] || html;
    const candidates = [
      html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1],
      html.match(/content="([^"]+)"\s+property="og:image"/i)?.[1],
      html.match(/property="og:image:secure_url"\s+content="([^"]+)"/i)?.[1],
      html.match(/property="twitter:image"\s+content="([^"]+)"/i)?.[1],
      html.match(/content="([^"]+)"\s+property="twitter:image"/i)?.[1],
    ];

    for (const match of article.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
      candidates.push(match[1]);
    }

    for (const raw of candidates) {
      if (!raw) continue;
      const imageUrl = raw.replace(/&amp;/g, "&");
      const absolute = imageUrl.startsWith("http") ? imageUrl : new URL(imageUrl, url).href;
      if (isUsablePhotoUrl(absolute)) return absolute;
    }

    return null;
  } catch {
    return null;
  }
}

async function resolveArticleImage(item) {
  if (item.imageUrl && isUsablePhotoUrl(item.imageUrl)) return item.imageUrl;
  return fetchArticleImage(item.link);
}

async function fetchArticleParagraphs(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!res.ok) return [];

    const html = await res.text();
    const articleMatch = html.match(/<article[\s\S]*?<\/article>/i)?.[0];
    if (!articleMatch) return [];

    return sanitizeParagraphs(htmlToParagraphs(articleMatch)).slice(0, 6);
  } catch {
    return [];
  }
}

async function resolveArticleBody(item) {
  const description = cleanText(item.description);
  const fromRss = sanitizeParagraphs(htmlToParagraphs(item.contentHtml));
  let paragraphs = dedupeParagraphs(fromRss).filter((p) => !isNearDuplicate(p, description));

  if (!paragraphs.length && description.length > 50 && !isJunkParagraph(description)) {
    paragraphs = [description];
  }

  if (paragraphs.join(" ").length < 280) {
    const fromPage = await fetchArticleParagraphs(item.link);
    paragraphs = dedupeParagraphs([
      ...paragraphs,
      ...fromPage.filter((p) => !isNearDuplicate(p, description)),
    ]);
  }

  return paragraphs.slice(0, 6);
}

function buildExcerpt(paragraphs, description, title) {
  const first = paragraphs[0] || cleanText(description) || cleanTitle(title);
  const clean = isJunkParagraph(first) ? cleanTitle(title) : first;
  return clean.length > 260 ? `${clean.slice(0, 257)}…` : clean;
}

function buildBody(paragraphs, description, title) {
  const parts = paragraphs.length
    ? dedupeParagraphs(paragraphs)
    : [cleanText(description) || cleanTitle(title)].filter((p) => !isJunkParagraph(p));

  if (!parts.length) {
    return cleanTitle(title);
  }

  return parts.join("\n\n");
}

async function uploadCover(supabase, title, photoUrl) {
  const key = coverStorageKey(title);
  const path = `tech/covers/${key}.jpg`;
  const jpg = await generateTechNewsVisualCover(photoUrl);

  const { error } = await supabase.storage.from("product-images").upload(path, jpg, {
    cacheControl: "31536000",
    upsert: true,
    contentType: "image/jpeg",
  });

  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

async function fetchExistingPostsMap(supabase) {
  const { data, error } = await supabase
    .from("tech_posts")
    .select("id, title, source_url")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw new Error(error.message);

  const byTitle = new Map();
  const bySource = new Map();

  for (const row of data || []) {
    byTitle.set(normalizeTitleKey(row.title), row);
    if (row.source_url) bySource.set(normalizeSourceUrl(row.source_url), row);
  }

  return { byTitle, bySource };
}

function normalizeTitleKey(title) {
  return cleanTitle(title).toLowerCase();
}

function normalizeSourceUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname.replace(/\/$/, "")}`.toLowerCase();
  } catch {
    return (url || "").trim().toLowerCase();
  }
}

function findExistingPost(maps, item, title) {
  const byLink = maps.bySource.get(normalizeSourceUrl(item.link));
  if (byLink) return byLink;
  return maps.byTitle.get(normalizeTitleKey(title)) || null;
}

export async function syncTechNews(supabase, { limit = SYNC_LIMIT, feedUrls } = {}) {
  const urls = normalizeFeedUrls(feedUrls).length ? normalizeFeedUrls(feedUrls) : getDefaultFeedUrls();
  if (!urls.length) {
    throw new Error("Site linki girin. Örn: https://www.webtekno.com");
  }

  const { items: feedItemsRaw, feeds } = await fetchTechNews(urls);
  let feedItems = feedItemsRaw;
  if (typeof limit === "number" && limit > 0) {
    feedItems = feedItems.slice(0, limit);
  }

  if (!feedItems.length) {
    return { imported: 0, updated: 0, skipped: 0, scanned: 0, errors: [], feeds };
  }

  const existingMaps = await fetchExistingPostsMap(supabase);

  let imported = 0;
  let updated = 0;
  let skipped = 0;
  const errors = [];

  for (const item of feedItems) {
    try {
      const title = cleanTitle(item.title);
      const existing = findExistingPost(existingMaps, item, title);
      const [photoUrl, paragraphs] = await Promise.all([
        resolveArticleImage(item),
        resolveArticleBody(item),
      ]);
      const cover_url = await uploadCover(supabase, title, photoUrl);

      const payload = {
        title,
        excerpt: buildExcerpt(paragraphs, item.description, title),
        body: buildBody(paragraphs, item.description, title),
        cover_url,
        source_url: item.link || null,
        published: true,
        updated_at: new Date().toISOString(),
      };

      if (existing?.id) {
        const { error } = await supabase.from("tech_posts").update(payload).eq("id", existing.id);
        if (error) throw error;
        updated += 1;
      } else {
        const { error } = await supabase.from("tech_posts").insert([
          {
            ...payload,
            ...(item.pubDate ? { created_at: item.pubDate } : {}),
          },
        ]);
        if (error) throw error;
        imported += 1;
      }
    } catch (error) {
      skipped += 1;
      errors.push(`${item.title}: ${error?.message || "kaydedilemedi"}`);
    }
  }

  return { imported, updated, skipped, scanned: feedItems.length, errors, feeds };
}

export async function deleteAllTechPosts(supabase) {
  let deleted = 0;

  for (;;) {
    const { data, error: selectErr } = await supabase.from("tech_posts").select("id").limit(200);
    if (selectErr) throw new Error(selectErr.message);

    const rows = data || [];
    if (!rows.length) break;

    const ids = rows.map((row) => row.id);
    const { error: deleteErr } = await supabase.from("tech_posts").delete().in("id", ids);
    if (deleteErr) throw new Error(deleteErr.message);

    deleted += ids.length;
    if (rows.length < 200) break;
  }

  return { deleted };
}

/** @deprecated use syncTechNews */
export const syncShiftDeleteNews = syncTechNews;
