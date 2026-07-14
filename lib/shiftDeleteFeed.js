const FEED_URL = "https://shiftdelete.net/teknoloji-haberleri/feed/";
const USER_AGENT = "MepotiaBot/1.0 (+https://mepotia.com)";

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

export function parseShiftDeleteFeed(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = readTag(block, "title");
    const link = readTag(block, "link");
    const description = stripHtml(readTag(block, "description"));
    const pubDateRaw = readTag(block, "pubDate");
    const pubDate = pubDateRaw ? new Date(pubDateRaw) : null;

    if (!title || !link) continue;

    items.push({
      title,
      link,
      description,
      pubDate: pubDate && !Number.isNaN(pubDate.getTime()) ? pubDate.toISOString() : null,
    });
  }

  return items;
}

export async function fetchShiftDeleteFeed() {
  const res = await fetch(FEED_URL, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`ShiftDelete RSS alınamadı (${res.status})`);
  }

  const xml = await res.text();
  return parseShiftDeleteFeed(xml);
}

export async function fetchArticleCoverUrl(articleUrl) {
  try {
    const res = await fetch(articleUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;

    const html = await res.text();
    const og =
      html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] ||
      html.match(/content="([^"]+)"\s+property="og:image"/i)?.[1];

    if (og) return og.replace(/&amp;/g, "&");

    const jsonBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const block of jsonBlocks) {
      try {
        const data = JSON.parse(block[1]);
        const nodes = data["@graph"] || [data];
        for (const node of nodes) {
          if (node.thumbnailUrl) return node.thumbnailUrl;
          if (node.image?.url) return node.image.url;
          if (typeof node.image === "string") return node.image;
        }
      } catch {
        // ignore invalid JSON-LD
      }
    }
  } catch (error) {
    console.error("fetchArticleCoverUrl:", articleUrl, error?.message || error);
  }

  return null;
}

function buildBody(description, sourceUrl) {
  const intro = description?.trim() || "Güncel teknoloji haberi.";
  return `${intro}

—
Bu haber ShiftDelete.Net kaynağından alınmıştır.
Detaylar için kaynak bağlantısına tıklayın: ${sourceUrl}`;
}

export async function syncShiftDeleteNews(supabase, { limit = 10 } = {}) {
  const feedItems = (await fetchShiftDeleteFeed()).slice(0, limit);
  if (!feedItems.length) {
    return { imported: 0, skipped: 0, scanned: 0, errors: [] };
  }

  const links = feedItems.map((item) => item.link);
  const { data: existingRows, error: existingErr } = await supabase
    .from("tech_posts")
    .select("source_url")
    .in("source_url", links);

  if (existingErr) {
    throw new Error(existingErr.message);
  }

  const existing = new Set((existingRows || []).map((row) => row.source_url));
  const candidates = feedItems.filter((item) => !existing.has(item.link));

  let imported = 0;
  let skipped = feedItems.length - candidates.length;
  const errors = [];

  for (const item of candidates) {
    const cover_url = await fetchArticleCoverUrl(item.link);
    if (!cover_url) {
      errors.push(`${item.title}: kapak görseli alınamadı`);
      continue;
    }

    const payload = {
      title: item.title,
      excerpt: item.description || item.title,
      body: buildBody(item.description, item.link),
      cover_url,
      source_url: item.link,
      published: true,
      updated_at: new Date().toISOString(),
      ...(item.pubDate ? { created_at: item.pubDate } : {}),
    };

    const { error } = await supabase.from("tech_posts").insert([payload]);
    if (error) {
      errors.push(`${item.title}: ${error.message}`);
      continue;
    }

    imported += 1;
  }

  return {
    imported,
    skipped,
    scanned: feedItems.length,
    errors,
  };
}
