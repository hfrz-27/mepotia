const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const CATEGORY_ROOTS = [
  { keywords: ["iphone", "galaxy", "telefon", "samsung", "xiaomi", "huawei", "poco", "redmi", "oppo", "realme", "pixel"], root: "akilli-telefonlar" },
  { keywords: ["macbook", "laptop", "notebook", "dizustu", "asus", "lenovo", "hp ", "dell"], root: "laptop" },
  { keywords: ["ipad", "tablet"], root: "tablet" },
  { keywords: ["airpods", "kulaklik", "headphone", "buds"], root: "kulaklik" },
  { keywords: ["watch", "saat", "galaxy watch", "apple watch"], root: "akilli-saat" },
  { keywords: ["tv", "televizyon"], root: "televizyon" },
  { keywords: ["monitor", "monit"], root: "monitor" },
  { keywords: ["ps5", "xbox", "konsol", "nintendo"], root: "oyun-konsolu" },
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
  if (t === q) score += 140;
  if (t.includes(q)) score += 100;
  if (q.includes(t) && t.length >= 6) score += 40;

  const tokens = q.split(" ").filter((part) => part.length >= 2);
  let hit = 0;
  for (const token of tokens) {
    if (t.includes(token)) {
      score += 14;
      hit += 1;
    }
  }
  if (tokens.length && hit === tokens.length) score += 30;

  // Penalize unrelated length spam
  if (t.length > q.length * 3) score -= 8;
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
  if (label.toLowerCase() === "trendyol") return "Trendyol";
  if (label.toLowerCase() === "n11") return "n11";
  if (label.toLowerCase() === "amazon") return "Amazon";
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
    variants.add(`samsung-${norm.replace(/\s+/g, "-")}`);
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
    roots.add("kulaklik");
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

  return [...new Set(urls)].slice(0, 24);
}

async function fetchViaJina(url) {
  try {
    const res = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/plain",
      },
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout?.(22000),
    });
    if (!res.ok) return null;
    return res.text();
  } catch (err) {
    console.warn("fetchViaJina:", url, err?.message || err);
    return null;
  }
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

  // Primary: store logo + price blocks
  for (const match of priceSection.matchAll(
    /resim\.epey\.com\/site\/([^."'\s)]+)[\s\S]{0,900}?([\d.]+,\d{2})\s*TL/gi,
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
      isOutlet: /Outlet\/2\.El|outlet\/2\.el|2\.\s*el/i.test(block),
      freeShipping: /Ücretsiz Kargo|Ucretsiz Kargo/i.test(block),
    });
  }

  // Fallback: any TL prices with nearby store-ish text
  if (!offers.length) {
    for (const match of priceSection.matchAll(/([\d.]+,\d{2})\s*TL/gi)) {
      const price = parseTryPrice(match[1]);
      if (!price || price < 100) continue;
      offers.push({
        store: "Mağaza",
        price,
        url: null,
        isOutlet: false,
        freeShipping: false,
      });
    }
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
    source: "Mepotia Piyasa",
    productTitle,
    productUrl,
    lowest: Math.min(...prices),
    average: Math.round(prices.reduce((sum, value) => sum + value, 0) / prices.length),
    highest: Math.max(...prices),
    count: pool.length,
    offers: deduped.slice(0, 14),
    retailCount: retail.length,
    outletCount: deduped.length - retail.length,
  };
}

/** Extract product page links from Epey search results (Jina markdown). */
function extractSearchProductLinks(content, query) {
  if (!content) return [];

  const links = [];
  const seen = new Set();

  // Markdown links: [title](https://www.epey.com/...)
  for (const match of content.matchAll(
    /\[([^\]]{3,120})\]\((https?:\/\/(?:www\.)?epey\.com\/[a-z0-9-]+\/[a-z0-9-]+\.html)\)/gi,
  )) {
    const title = match[1].replace(/\s+/g, " ").trim();
    const url = match[2].split("?")[0];
    if (seen.has(url)) continue;
    if (/arama|kategori|magaza/i.test(url)) continue;
    seen.add(url);
    links.push({ title, url, score: titleScore(title, query) });
  }

  // Bare URLs
  for (const match of content.matchAll(
    /https?:\/\/(?:www\.)?epey\.com\/([a-z0-9-]+)\/([a-z0-9-]+)\.html/gi,
  )) {
    const url = match[0].split("?")[0];
    if (seen.has(url)) continue;
    if (/arama/i.test(url)) continue;
    const slugTitle = match[2].replace(/-/g, " ");
    seen.add(url);
    links.push({ title: slugTitle, url, score: titleScore(slugTitle, query) });
  }

  return links
    .filter((item) => item.score >= 12)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function cleanSpecValue(raw) {
  return String(raw || "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

/** Parse technical specs from Epey product page (Jina markdown). */
export function parseEpeySpecs(content) {
  if (!content) return {};

  const start = content.search(/Özellikleri/);
  const sec = start >= 0 ? content.slice(start, start + 28000) : content.slice(0, 20000);
  const specs = {};

  const add = (name, value) => {
    const key = String(name || "")
      .replace(/\s+/g, " ")
      .trim();
    const val = cleanSpecValue(value);
    if (key.length < 2 || key.length > 70) return;
    if (!val || val.length < 1) return;
    if (/^(EKRAN|BATARYA|KAMERA|DONANIM|GÖRÜNTÜ|GENEL|BAĞLANTI|DİĞER)$/i.test(key)) return;
    if (/epey\.com|http|resim\./i.test(val)) return;
    // Prefer first solid value
    if (!specs[key] || (specs[key].length < 2 && val.length > specs[key].length)) {
      specs[key] = val;
    }
  };

  // **Name**[value](url)  or  **Name** plain value
  for (const match of sec.matchAll(
    /\*\*\s*([^*\n]{2,70})\s*\*\*\s*(?:\[([^\]]+)\](?:\([^)]*\))?|([^\n*]+))/g,
  )) {
    add(match[1], match[2] || match[3]);
  }

  // Name:\n\n[value](url)  or  Name:\n\nvalue
  for (const match of sec.matchAll(
    /^([A-Za-zÇĞİÖŞÜçğıöşü0-9 /().+%-]{2,60}):\s*\n+(?:\[([^\]]+)\]\([^)]+\)|([^\n[]{1,120}))/gm,
  )) {
    add(match[1], match[2] || match[3]);
  }

  return specs;
}

const PRIORITY_SPEC_KEYS = [
  "Ekran Boyutu",
  "Ekran Teknolojisi",
  "Ekran Yenileme Hızı",
  "Ekran Çözünürlüğü",
  "Bellek (RAM)",
  "Dahili Depolama",
  "Batarya Kapasitesi (Tipik)",
  "Hızlı Şarj Gücü (Maks.)",
  "Kamera Çözünürlüğü",
  "Ön Kamera Çözünürlüğü",
  "Video Kayıt Çözünürlüğü",
  "CPU Frekansı",
  "CPU Çekirdeği",
  "İşlemci",
  "5G",
  "Kablosuz Şarj",
  "Suya Dayanıklılık",
  "Suya Dayanıklılık Seviyesi",
  "Ağırlık",
  "Kalınlık",
  "İşletim Sistemi",
  "Çıkış Yılı",
  "Şarj",
  "Hat Sayısı",
];

export function pickCompareSpecKeys(specMaps = [], limit = 18) {
  const keys = [];
  const seen = new Set();

  for (const key of PRIORITY_SPEC_KEYS) {
    if (specMaps.some((map) => map?.[key])) {
      keys.push(key);
      seen.add(key);
    }
  }

  // Add other shared keys
  const counts = new Map();
  for (const map of specMaps) {
    for (const key of Object.keys(map || {})) {
      if (seen.has(key)) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }

  [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key]) => {
      if (keys.length < limit && !seen.has(key)) {
        keys.push(key);
        seen.add(key);
      }
    });

  // Fill remaining with any specs from first product
  for (const map of specMaps) {
    for (const key of Object.keys(map || {})) {
      if (keys.length >= limit) break;
      if (!seen.has(key)) {
        keys.push(key);
        seen.add(key);
      }
    }
  }

  return keys.slice(0, limit);
}

async function resolveFromDirectCandidates(query) {
  const candidates = buildCandidateUrls(query);
  let best = null;

  for (let index = 0; index < candidates.length; index += 4) {
    const batch = candidates.slice(index, index + 4);
    const pages = await Promise.all(
      batch.map(async (url) => {
        const content = await fetchViaJina(url);
        if (!content || !/Fiyatlar|TL|Özellik/i.test(content)) return null;
        const parsed = parseJinaOffers(content, url);
        // Allow specs-only pages if prices fail
        const score = titleScore(parsed?.productTitle || url, query);
        if (!parsed && !/Özellikleri/i.test(content)) return null;
        return {
          url,
          parsed: parsed || { productTitle: null, productUrl: url, lowest: null, average: null, count: 0, offers: [] },
          score: parsed ? score : Math.max(score - 10, titleScore(url, query)),
          content,
        };
      }),
    );

    for (const match of pages.filter(Boolean).sort((a, b) => b.score - a.score)) {
      if (!best || match.score > best.score) best = match;
      if (match.score >= 22 && match.parsed?.lowest) return match;
      if (match.score >= 28) return match;
    }
  }

  return best;
}

async function resolveFromSearch(query) {
  const searchUrl = `https://www.epey.com/arama/?kelime=${encodeURIComponent(query)}`;
  const content = await fetchViaJina(searchUrl);
  if (!content) return null;

  const links = extractSearchProductLinks(content, query);
  if (!links.length) return null;

  // Try top matches
  for (const link of links.slice(0, 4)) {
    const page = await fetchViaJina(link.url);
    if (!page || !/Fiyatlar|TL|Özellik/i.test(page)) continue;
    const parsed = parseJinaOffers(page, link.url);
    const score = Math.max(link.score, titleScore(parsed?.productTitle || link.title, query));
    if (score >= 12) {
      return {
        url: link.url,
        parsed: parsed || {
          productTitle: link.title,
          productUrl: link.url,
          lowest: null,
          average: null,
          count: 0,
          offers: [],
        },
        score,
        content: page,
      };
    }
  }

  return null;
}

async function resolveEpeyProduct(query) {
  const direct = await resolveFromDirectCandidates(query);
  if (direct && direct.score >= 22) return direct;

  const fromSearch = await resolveFromSearch(query);
  if (!direct) return fromSearch;
  if (!fromSearch) return direct;
  return fromSearch.score > direct.score ? fromSearch : direct;
}

/** Full product card: prices + specs for feature comparison. */
export async function lookupEpeyProductProfile(query) {
  const q = String(query || "").trim();
  const searchUrl = `https://www.epey.com/arama/?kelime=${encodeURIComponent(q)}`;
  if (q.length < 2) {
    return { error: "En az 2 karakter gir.", searchUrl, specs: {} };
  }

  try {
    const resolved = await resolveEpeyProduct(q);
    if (!resolved) {
      return {
        error: "Eşleşen ürün bulunamadı.",
        searchUrl,
        specs: {},
      };
    }

    let content = resolved.content;
    if (!content) {
      content = await fetchViaJina(resolved.url);
    }

    const specs = parseEpeySpecs(content || "");

    // Title from markdown header if missing
    let productTitle = resolved.parsed?.productTitle || null;
    if (!productTitle && content) {
      const m = content.match(/^Title:\s*(.+)$/im) || content.match(/##\s+(.+?)\s+Özellikleri/i);
      productTitle = m?.[1]?.trim() || null;
    }

    return {
      query: q,
      title: productTitle || q,
      productUrl: resolved.url,
      searchUrl,
      matchScore: resolved.score,
      lowest: resolved.parsed?.lowest ?? null,
      average: resolved.parsed?.average ?? null,
      highest: resolved.parsed?.highest ?? null,
      count: resolved.parsed?.count ?? 0,
      offers: (resolved.parsed?.offers || []).slice(0, 5),
      specs,
      specCount: Object.keys(specs).length,
    };
  } catch (err) {
    console.error("lookupEpeyProductProfile:", err);
    return {
      error: "Ürün özellikleri alınamadı.",
      searchUrl,
      specs: {},
    };
  }
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
  const q = String(query || "").trim();
  const searchUrl = `https://www.epey.com/arama/?kelime=${encodeURIComponent(q)}`;

  if (q.length < 2) {
    return { error: "En az 2 karakter gir.", searchUrl };
  }

  try {
    const resolved = await resolveEpeyProduct(q);
    if (!resolved?.parsed) {
      return {
        error: "Eşleşen ürün bulunamadı. Farklı model adı dene.",
        searchUrl,
      };
    }

    return {
      ...resolved.parsed,
      matchedTitle: resolved.parsed.productTitle,
      matchScore: resolved.score,
      searchUrl,
    };
  } catch (err) {
    console.error("lookupEpeyMarket:", err);
    return {
      error: "Piyasa fiyatları şu an alınamadı. Biraz sonra tekrar dene.",
      searchUrl,
    };
  }
}
