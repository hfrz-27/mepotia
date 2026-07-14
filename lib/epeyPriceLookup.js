const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const CATEGORY_ROOTS = [
  { keywords: ["iphone", "galaxy", "telefon", "samsung", "xiaomi", "huawei", "poco", "redmi"], root: "akilli-telefonlar" },
  { keywords: ["macbook", "laptop", "notebook", "dizustu"], root: "laptop" },
  { keywords: ["ipad", "tablet"], root: "tablet" },
  { keywords: ["airpods", "kulaklik", "headphone"], root: "kulaklik" },
  { keywords: ["watch", "saat"], root: "akilli-saat" },
  { keywords: ["tv", "televizyon"], root: "televizyon" },
  { keywords: ["monitor", "monit"], root: "monitor" },
  { keywords: ["ps5", "xbox", "konsol"], root: "oyun-konsolu" },
];

function parseTryPrice(raw) {
  if (!raw) return null;
  const cleaned = String(raw)
    .replace(/\s*TL.*/i, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();
  const value = Number(cleaned);
  return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleScore(title, query) {
  const t = normalizeText(title);
  const q = normalizeText(query);
  if (!t || !q) return 0;

  let score = 0;
  if (t.includes(q)) score += 100;
  for (const token of q.split(" ").filter((part) => part.length >= 2)) {
    if (t.includes(token)) score += 12;
  }
  return score;
}

function storeFromLogo(src) {
  const match = String(src || "").match(/\/site\/([^."']+)/i);
  if (!match) return null;
  const slug = match[1].replace(/-com-tr$|-com$|-tr$/, "");
  const label = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  if (label.toLowerCase() === "mediamarkt") return "Media Markt";
  if (label.toLowerCase() === "vatanbilgisayar") return "Vatan Bilgisayar";
  if (label.toLowerCase() === "hepsiburada") return "Hepsiburada";
  return label;
}

function buildSlugVariants(query) {
  const norm = normalizeText(query);
  const slug = norm.replace(/\s+/g, "-");
  const variants = new Set([slug]);

  if (norm.includes("iphone")) {
    const tail = norm.replace(/\biphone\b/g, " ").replace(/\s+/g, " ").trim().replace(/\s+/g, "-");
    variants.add(`apple-iphone${tail ? `-${tail}` : ""}`.replace(/--+/g, "-"));
    variants.add(`apple-${norm.replace(/\s+/g, "-")}`);
  }

  if (norm.includes("ipad")) {
    variants.add(`apple-${norm.replace(/\s+/g, "-")}`);
  }

  if (norm.includes("macbook")) {
    variants.add(`apple-${norm.replace(/\s+/g, "-")}`);
  }

  if (norm.includes("galaxy")) {
    variants.add(norm.replace(/\s+/g, "-"));
  }

  if (norm.includes("airpods")) {
    variants.add(`apple-${norm.replace(/\s+/g, "-")}`);
  }

  return [...variants].filter(Boolean);
}

function pickCategoryRoots(query) {
  const norm = normalizeText(query);
  const roots = new Set(["urun"]);

  for (const entry of CATEGORY_ROOTS) {
    if (entry.keywords.some((keyword) => norm.includes(keyword))) {
      roots.add(entry.root);
    }
  }

  if (roots.size === 1) {
    roots.add("akilli-telefonlar");
    roots.add("laptop");
    roots.add("tablet");
  }

  return [...roots];
}

function buildCandidateUrls(query) {
  const slugs = buildSlugVariants(query);
  const roots = pickCategoryRoots(query);
  const urls = [];

  for (const root of roots) {
    for (const slug of slugs) {
      urls.push(`https://www.epey.com/${root}/${slug}.html`);
    }
  }

  return [...new Set(urls)].slice(0, 18);
}

async function fetchViaJina(url) {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/plain",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.text();
}

function extractPriceSection(content) {
  const start = content.search(/##\s+.+\s+Fiyatlar[ıi]\s*/i);
  if (start < 0) return content;

  const afterTitle = content.slice(start).replace(/^##\s+.+\s+Fiyatlar[ıi]\s*/i, "");
  const nextHeading = afterTitle.search(/\n##\s+/);
  return nextHeading >= 0 ? afterTitle.slice(0, nextHeading) : afterTitle;
}

function isValidStoreName(name) {
  const value = String(name || "").trim();
  if (!value || value.length < 2) return false;
  if (/kar[sş]ıla[sş]tır|fiyat|apple iphone|samsung galaxy|popüler|benzer/i.test(value)) return false;
  return true;
}

function parseJinaOffers(content, productUrl) {
  if (!content) return null;

  const titleMatch = content.match(/^##\s+(.+?)\s+Fiyatlar/im) || content.match(/^Title:\s*(.+)$/im);
  const productTitle = titleMatch?.[1]?.replace(/\s+/g, " ").trim() || null;
  const priceSection = extractPriceSection(content);

  const offers = [];
  for (const match of priceSection.matchAll(
    /resim\.epey\.com\/site\/([^."'\s)]+)[\s\S]{0,700}?([\d.]+,\d{2})\s*TL/gi,
  )) {
    const block = match[0];
    const price = parseTryPrice(match[2]);
    if (!price) continue;

    const store = storeFromLogo(`resim.epey.com/site/${match[1]}`);
    if (!isValidStoreName(store)) continue;

    offers.push({
      store,
      price,
      url: null,
      isOutlet: /Outlet\/2\.El|outlet\/2\.el/i.test(block),
      freeShipping: /Ücretsiz Kargo|Ucretsiz Kargo/i.test(block),
    });
  }

  const deduped = [];
  const seen = new Set();
  for (const offer of offers.sort((a, b) => a.price - b.price)) {
    const key = `${offer.store}:${offer.price}:${offer.isOutlet ? "o" : "n"}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(offer);
  }

  const retail = deduped.filter((offer) => !offer.isOutlet);
  const pool = retail.length ? retail : deduped;
  if (!pool.length) return null;

  const prices = pool.map((offer) => offer.price);

  return {
    source: "Epey",
    productTitle,
    productUrl,
    lowest: Math.min(...prices),
    average: Math.round(prices.reduce((sum, value) => sum + value, 0) / prices.length),
    count: pool.length,
    offers: deduped.slice(0, 12),
    retailCount: retail.length,
    outletCount: deduped.length - retail.length,
  };
}

async function resolveEpeyProduct(query) {
  const candidates = buildCandidateUrls(query);
  let best = null;

  for (let index = 0; index < candidates.length; index += 3) {
    const batch = candidates.slice(index, index + 3);
    const pages = await Promise.all(
      batch.map(async (url) => {
        const content = await fetchViaJina(url);
        if (!content || !/Fiyatlar/i.test(content)) return null;
        const parsed = parseJinaOffers(content, url);
        if (!parsed) return null;
        const score = titleScore(parsed.productTitle || url, query);
        return { url, parsed, score };
      }),
    );

    for (const match of pages.filter(Boolean).sort((a, b) => b.score - a.score)) {
      if (!best || match.score > best.score) best = match;
      if (match.score >= 24) return match;
    }
  }

  return best;
}

export async function findEpeyProductUrl(query) {
  const resolved = await resolveEpeyProduct(query);
  if (!resolved) return null;
  return {
    url: resolved.url,
    title: resolved.parsed.productTitle || query,
    score: resolved.score,
  };
}

export function parseEpeyProductPage(content, productUrl) {
  return parseJinaOffers(content, productUrl);
}

export async function lookupEpeyMarket(query) {
  const resolved = await resolveEpeyProduct(query);
  if (!resolved?.parsed) {
    return {
      error: "Epey'de eşleşen ürün bulunamadı.",
      searchUrl: `https://www.epey.com/arama/?kelime=${encodeURIComponent(query)}`,
    };
  }

  return {
    ...resolved.parsed,
    matchedTitle: resolved.parsed.productTitle,
    searchUrl: `https://www.epey.com/arama/?kelime=${encodeURIComponent(query)}`,
  };
}
