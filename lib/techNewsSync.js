import { coverStorageKey, generateTechNewsCoverPng } from "@/lib/techNewsCover";

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

function readTag(block, tag) {
  const cdata = block.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return decodeHtml(cdata[1].trim());

  const plain = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return plain ? decodeHtml(plain[1].trim()) : "";
}

export function parseRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = readTag(block, "title");
    const link = readTag(block, "link") || readTag(block, "guid");
    const description = stripHtml(readTag(block, "description"));
    const pubDateRaw = readTag(block, "pubDate");
    const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

    if (!title) continue;

    items.push({
      title: title.trim(),
      link: link?.trim() || title,
      description,
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
    .replace(/\s+/g, " ")
    .trim();
}

function buildExcerpt(description, title) {
  const text = sanitizeText(description) || title;
  return text.length > 220 ? `${text.slice(0, 217)}…` : text;
}

function buildBody(description, title) {
  const main = sanitizeText(description) || title;
  return `${main}

Mepotia Teknoloji — günün öne çıkan gelişmelerini sizin için derliyor. Güncel haberler, incelemeler ve teknoloji dünyasından notlar için mepotia.com/teknoloji sayfasını takip edin.`;
}

async function uploadCover(supabase, title) {
  const key = coverStorageKey(title);
  const path = `tech/covers/${key}.png`;
  const png = await generateTechNewsCoverPng(title);

  const { error } = await supabase.storage.from("product-images").upload(path, png, {
    cacheControl: "31536000",
    upsert: true,
    contentType: "image/png",
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
      const cover_url = await uploadCover(supabase, item.title);
      const payload = {
        title: item.title,
        excerpt: buildExcerpt(item.description, item.title),
        body: buildBody(item.description, item.title),
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
