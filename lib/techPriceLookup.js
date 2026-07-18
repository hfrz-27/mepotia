import { createClient } from "@/lib/supabase-server";
import { VISIBLE_PRODUCT_STATUSES } from "@/lib/products";
import { lookupEpeyMarket } from "@/lib/epeyPriceLookup";

function sanitizeQuery(query) {
  return String(query || "")
    .trim()
    .replace(/[%_,]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

function tokenizeQuery(query) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((part) => part.length >= 2)
    .slice(0, 8);
}

function scoreProduct(product, tokens, fullQuery) {
  let score = 0;
  const q = fullQuery.toLowerCase();
  const title = (product.title || "").toLowerCase();
  const brand = (product.brand || "").toLowerCase();
  const model = (product.model || "").toLowerCase();
  const blob = `${title} ${brand} ${model}`;

  if (model && model.includes(q)) score += 80;
  if (title.includes(q)) score += 60;
  if (brand && q.includes(brand)) score += 40;

  for (const token of tokens) {
    if (model.includes(token)) score += 25;
    if (brand.includes(token)) score += 18;
    if (title.includes(token)) score += 12;
    if (blob.includes(token)) score += 4;
  }

  if (product.status === "published") score += 10;
  return score;
}

function buildSearchFilter(tokens, fullQuery) {
  const parts = new Set([fullQuery]);
  for (const token of tokens) parts.add(token);

  const clauses = [];
  for (const part of parts) {
    const safe = part.replace(/[%_,]/g, " ").trim();
    if (safe.length < 2) continue;
    clauses.push(`title.ilike.%${safe}%`);
    clauses.push(`brand.ilike.%${safe}%`);
    clauses.push(`model.ilike.%${safe}%`);
  }

  return clauses.length ? clauses.join(",") : `title.ilike.%${fullQuery}%`;
}

function buildMepotiaSummary(listings) {
  const active = listings.filter((item) => item.status === "published");
  const pricePool = (active.length ? active : listings)
    .map((item) => item.price)
    .filter((value) => Number.isFinite(value) && value > 0);

  if (!pricePool.length) return null;

  return {
    label: "Mepotia vitrin ortalaması",
    average: Math.round(pricePool.reduce((sum, value) => sum + value, 0) / pricePool.length),
    min: Math.min(...pricePool),
    max: Math.max(...pricePool),
    count: pricePool.length,
    source: "Gerçek vitrin ilanları",
  };
}

function buildComparison(referencePrice, market) {
  if (!Number.isFinite(referencePrice) || !market?.lowest) return null;

  const diff = referencePrice - market.lowest;
  const percent = Math.round((diff / market.lowest) * 100);
  let verdict = "similar";
  if (diff <= -500 || percent <= -3) verdict = "cheaper";
  if (diff >= 500 || percent >= 3) verdict = "expensive";

  return {
    referencePrice,
    marketLowest: market.lowest,
    marketAverage: market.average,
    diff,
    percent,
    verdict,
  };
}

async function searchMepotiaListings(query) {
  try {
    const tokens = tokenizeQuery(query);
    const supabase = await createClient();

    const { data: productRows, error } = await supabase
      .from("products")
      .select(
        "id, title, price, status, condition, brand, model, city, created_at, product_images(url, sort_order)",
      )
      .in("status", VISIBLE_PRODUCT_STATUSES)
      .or(buildSearchFilter(tokens, query))
      .order("created_at", { ascending: false })
      .limit(40);

    if (error) {
      console.error("searchMepotiaListings:", error);
      // Don't hard-fail the whole compare flow
      return { summary: null, listings: [], warning: "Vitrin araması şu an yapılamadı." };
    }

    const listings = (productRows || [])
      .map((product) => ({ product, score: scoreProduct(product, tokens, query) }))
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((row) => {
        const images = row.product.product_images || [];
        const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
        return {
          id: row.product.id,
          title: row.product.title,
          price: Number(row.product.price),
          status: row.product.status,
          condition: row.product.condition,
          brand: row.product.brand,
          model: row.product.model,
          city: row.product.city,
          image: sorted[0]?.url || null,
          url: `/urun/${row.product.id}`,
        };
      });

    return {
      summary: buildMepotiaSummary(listings),
      listings,
    };
  } catch (err) {
    console.error("searchMepotiaListings exception:", err);
    return { summary: null, listings: [], warning: "Vitrin araması şu an yapılamadı." };
  }
}

export async function lookupTechModelPrice(rawQuery, options = {}) {
  const query = sanitizeQuery(rawQuery);
  if (query.length < 2) {
    return { error: "En az 2 karakter gir." };
  }

  const referencePrice = Number(options.referencePrice);
  const hasReferencePrice = Number.isFinite(referencePrice) && referencePrice > 0;

  // Always fetch market even when site has no listing
  const [mepotiaResult, marketResult] = await Promise.all([
    searchMepotiaListings(query),
    lookupEpeyMarket(query),
  ]);

  const hasMarket =
    marketResult &&
    !marketResult.error &&
    Number.isFinite(marketResult.lowest) &&
    marketResult.lowest > 0;

  const market = hasMarket
    ? {
        source: marketResult.source,
        productTitle: marketResult.productTitle,
        productUrl: marketResult.productUrl,
        searchUrl: marketResult.searchUrl,
        lowest: marketResult.lowest,
        average: marketResult.average,
        highest: marketResult.highest ?? null,
        count: marketResult.count,
        offers: marketResult.offers,
        retailCount: marketResult.retailCount,
        outletCount: marketResult.outletCount,
        matchedTitle: marketResult.matchedTitle,
        matchScore: marketResult.matchScore,
      }
    : null;

  const mepotiaReference = hasReferencePrice
    ? referencePrice
    : mepotiaResult.summary?.min ?? mepotiaResult.summary?.average ?? null;

  const mepotia = {
    summary: mepotiaResult.summary,
    listings: mepotiaResult.listings || [],
    referencePrice: mepotiaReference,
    available: Boolean(mepotiaResult.summary || (mepotiaResult.listings || []).length),
    warning: mepotiaResult.warning || null,
  };

  const comparison = buildComparison(mepotiaReference, market);

  // Success if either side has data
  const hasData = Boolean(mepotia.available || market);

  return {
    query,
    mepotia,
    market,
    comparison,
    marketError: marketResult?.error || null,
    marketFallbackUrl: marketResult?.searchUrl || null,
    searchUrl: `/ara?q=${encodeURIComponent(query)}`,
    hasData,
    mode: market && mepotia.available ? "both" : market ? "market-only" : mepotia.available ? "mepotia-only" : "empty",
  };
}
