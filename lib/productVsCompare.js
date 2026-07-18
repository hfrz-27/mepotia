import { lookupEpeyProductProfile, pickCompareSpecKeys } from "@/lib/epeyPriceLookup";

function sanitizeQuery(query) {
  return String(query || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

/**
 * Side-by-side feature comparison (Mepotia specs table).
 */
export async function compareProductsSideBySide(rawQueries = []) {
  const queries = [...new Set(rawQueries.map(sanitizeQuery).filter((q) => q.length >= 2))].slice(
    0,
    3,
  );

  if (queries.length < 2) {
    return { error: "En az 2 model yaz (ör. iPhone 15 ve S24)." };
  }

  const profiles = await Promise.all(queries.map((q) => lookupEpeyProductProfile(q)));

  const items = profiles.map((profile, index) => {
    const ok = !profile.error && (profile.specCount > 0 || Number.isFinite(profile.lowest));
    return {
      query: queries[index],
      ok,
      title: profile.title || queries[index],
      productUrl: profile.productUrl || null,
      searchUrl: profile.searchUrl || null,
      lowest: profile.lowest ?? null,
      average: profile.average ?? null,
      count: profile.count ?? 0,
      specs: profile.specs || {},
      specCount: profile.specCount || 0,
      error: profile.error || null,
    };
  });

  const specKeys = pickCompareSpecKeys(
    items.map((item) => item.specs),
    20,
  );

  // Build matrix rows: { key, values: [v1,v2,...], same: boolean }
  const rows = specKeys.map((key) => {
    const values = items.map((item) => item.specs?.[key] || "—");
    const solid = values.filter((v) => v && v !== "—");
    const same = solid.length >= 2 && solid.every((v) => v === solid[0]);
    return { key, values, same };
  });

  // Cheapest by market (optional badge)
  const priced = items
    .map((item, index) => ({ index, price: item.lowest }))
    .filter((row) => Number.isFinite(row.price));
  let winnerIndex = null;
  if (priced.length >= 2) {
    winnerIndex = priced.reduce((best, row) => (row.price < best.price ? row : best)).index;
  }

  return {
    queries,
    items,
    rows,
    winnerIndex,
    hasData: items.some((item) => item.ok),
    hasSpecs: rows.length > 0,
  };
}
