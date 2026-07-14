import { coverStorageKey, generateTechNewsCoverWithPhoto } from "@/lib/techNewsCover";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FEEDS = [
  { id: "donanimhaber", url: "https://www.donanimhaber.com/rss/tum/" },
  { id: "webtekno", url: "https://www.webtekno.com/rss.xml" },
];

function decodeHtml(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function stripHtml(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function htmlToParagraphs(html) {
  if (!html) return [];
  const parts = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<[^>]+>/g, " ")
    .split(/\n{2,}/)
    .map((p) => stripHtml(p))
    .filter((p) => p.length > 35);

  return parts;
}

function readTag(block, tag) {
  const cdata = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return decodeHtml(cdata[1].trim());

  const plain = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return plain ? decodeHtml(plain[1].trim()) : "";
}

function readContentEncoded(block) {
  const match = block.match(/<content:encoded>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([\s\S]*?)<\/content:encoded>)/i);
  if (!match) return "";
  return decodeHtml((match[1] || match[2] || "").trim());
}

function extractImageFromBlock(block) {
  const enclosure = block.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1];
  const media = block.match(/<media:(?:content|thumbnail)[^>]+url="([^"]+)"/i)?.[1];
  const img = block.match(/<img[^>]+src="([^"]+)"/i)?.[1];
  const candidate = enclosure || media || img;
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
      description,
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

export async function fetchAllTechNews() {
  const batches = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const xml = await fetchFeed(feed.url);
        return parseRssItems(xml).map((item) => ({ ...item, feed: feed.id }));
      } catch (error) {
        console.error(`feed ${feed.id}:`, error?.message || error);
        return [];
      }
    }),
  );

  const merged = batches.flat();
  merged.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));

  const seen = new Set();
  return merged.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sanitizeText(text) {
  return (text || "")
    .replace(/DonanımHaber|Donanimhaber|Webtekno|ShiftDelete\.?Net?|DH'de|Webtekno'da/gi, "Mepotia")
    .replace(/detaylar haberimizde\.?/gi, "")
    .replace(/işte detaylar:?/gi, "")
    .replace(/Son Güncelleme:\s*[\d.]+\s*\w+\s*\d+/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeParagraphs(paragraphs) {
  return paragraphs
    .map((p) => sanitizeText(p))
    .filter((p) => p.length > 40)
    .filter((p) => !/^(Kaynak|Fotoğraf|Editör|Yazar|Reklam)/i.test(p));
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
    const og =
      html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] ||
      html.match(/content="([^"]+)"\s+property="og:image"/i)?.[1];

    return og ? og.replace(/&amp;/g, "&") : null;
  } catch {
    return null;
  }
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
    const articleMatch =
      html.match(/<article[\s\S]*?<\/article>/i)?.[0] ||
      html.match(/class="[^"]*article[^"]*"[\s\S]*?<\/div>/i)?.[0] ||
      html;

    return sanitizeParagraphs(htmlToParagraphs(articleMatch)).slice(0, 10);
  } catch {
    return [];
  }
}

async function resolveArticleImage(item) {
  if (item.imageUrl) return item.imageUrl;
  return fetchArticleImage(item.link);
}

async function resolveArticleBody(item) {
  const fromRss = sanitizeParagraphs(htmlToParagraphs(item.contentHtml));
  if (fromRss.length >= 3) return fromRss;

  const fromPage = await fetchArticleParagraphs(item.link);
  if (fromPage.length >= 2) return fromPage;

  if (fromRss.length) return fromRss;
  return [];
}

function buildExcerpt(paragraphs, description, title) {
  const first = paragraphs[0] || sanitizeText(description) || title;
  return first.length > 260 ? `${first.slice(0, 257)}…` : first;
}

function buildBody(paragraphs, description, title) {
  const intro = sanitizeText(description) || title;
  const mainParts = paragraphs.length ? paragraphs : [intro];

  const sections = [...mainParts];

  if (sections.join(" ").length < 900) {
    sections.push(
      "Mepotia Teknoloji editörleri, gelişmeyi sade bir dille özetledi. Detaylar sektörde merakla takip ediliyor; kullanıcılar için fiyat, performans ve kullanım deneyimi tarafında yeni bir dönemin sinyalleri güçleniyor.",
    );
  }

  if (sections.join(" ").length < 1200) {
    sections.push(
      "Özellikle akıllı telefon, bilgisayar, oyun ve yapay zeka alanlarında hızlı değişim sürüyor. Mepotia olarak güncel haberleri, vitrindeki ürünlerle birlikte değerlendiriyor; bilinçli tercihler için net ve anlaşılır bilgi sunmayı hedefliyoruz.",
    );
  }

  sections.push(
    "Mepotia Teknoloji — günün öne çıkan gelişmelerini sizin için derliyor. Daha fazla haber, inceleme ve teknoloji notu için mepotia.com/teknoloji sayfasını takip edebilirsiniz.",
  );

  return sections.join("\n\n");
}

async function uploadCover(supabase, title, photoUrl) {
  const key = coverStorageKey(title);
  const path = `tech/covers/${key}.jpg`;
  const jpg = await generateTechNewsCoverWithPhoto(title, photoUrl);

  const { error } = await supabase.storage.from("product-images").upload(path, jpg, {
    cacheControl: "31536000",
    upsert: true,
    contentType: "image/jpeg",
  });

  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function syncTechNews(supabase, { limit = 10 } = {}) {
  const feedItems = (await fetchAllTechNews()).slice(0, limit);
  if (!feedItems.length) {
    return { imported: 0, skipped: 0, scanned: 0, errors: [] };
  }

  const titles = feedItems.map((item) => item.title);
  const { data: existingRows, error: existingErr } = await supabase
    .from("tech_posts")
    .select("title")
    .in("title", titles);

  if (existingErr) {
    throw new Error(existingErr.message);
  }

  const existing = new Set((existingRows || []).map((row) => row.title));
  const candidates = feedItems.filter((item) => !existing.has(item.title));

  let imported = 0;
  let skipped = feedItems.length - candidates.length;
  const errors = [];

  for (const item of candidates) {
    try {
      const [photoUrl, paragraphs] = await Promise.all([
        resolveArticleImage(item),
        resolveArticleBody(item),
      ]);

      const cover_url = await uploadCover(supabase, item.title, photoUrl);
      const payload = {
        title: item.title,
        excerpt: buildExcerpt(paragraphs, item.description, item.title),
        body: buildBody(paragraphs, item.description, item.title),
        cover_url,
        source_url: null,
        published: true,
        updated_at: new Date().toISOString(),
        ...(item.pubDate ? { created_at: item.pubDate } : {}),
      };

      const { error } = await supabase.from("tech_posts").insert([payload]);
      if (error) throw error;
      imported += 1;
    } catch (error) {
      errors.push(`${item.title}: ${error?.message || "kaydedilemedi"}`);
    }
  }

  return { imported, skipped, scanned: feedItems.length, errors };
}

/** @deprecated use syncTechNews */
export const syncShiftDeleteNews = syncTechNews;
