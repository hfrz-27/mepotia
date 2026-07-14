/**
 * Tüm ürün + haber silme (yerel)
 * SUPABASE_SERVICE_ROLE_KEY gerekli
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Eksik env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function deleteAllProducts() {
  const { error, count } = await supabase
    .from("products")
    .delete({ count: "exact" })
    .gte("created_at", "1970-01-01");
  if (error) throw error;
  return count ?? 0;
}

async function deleteAllTechPosts() {
  const { error, count } = await supabase
    .from("tech_posts")
    .delete({ count: "exact" })
    .gte("created_at", "1970-01-01");
  if (error) throw error;
  return count ?? 0;
}

const deletedProducts = await deleteAllProducts();
const deletedNews = await deleteAllTechPosts();
console.log(JSON.stringify({ deletedProducts, deletedNews }, null, 2));
