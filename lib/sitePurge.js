import { deleteAllTechPosts } from "@/lib/techNewsSync";

async function deleteAllRows(supabase, table, idColumn = "id") {
  let total = 0;

  for (;;) {
    const { data, error: selectErr } = await supabase.from(table).select(idColumn).limit(200);
    if (selectErr) throw new Error(`${table}: ${selectErr.message}`);

    const rows = data || [];
    if (!rows.length) break;

    const ids = rows.map((row) => row[idColumn]);
    const { error: deleteErr } = await supabase.from(table).delete().in(idColumn, ids);
    if (deleteErr) throw new Error(`${table}: ${deleteErr.message}`);

    total += ids.length;
    if (rows.length < 200) break;
  }

  return total;
}

export async function deleteAllProducts(supabase) {
  return deleteAllRows(supabase, "products");
}

export async function purgeSiteListingContent(supabase) {
  const deletedProducts = await deleteAllRows(supabase, "products");
  const newsResult = await deleteAllTechPosts(supabase);
  const deletedOffers = await deleteAllRows(supabase, "sell_offers");
  const deletedRequests = await deleteAllRows(supabase, "product_requests");
  const deletedReviews = await deleteAllRows(supabase, "customer_reviews");

  return {
    deletedProducts,
    deletedNews: newsResult.deleted,
    deletedOffers,
    deletedRequests,
    deletedReviews,
  };
}
