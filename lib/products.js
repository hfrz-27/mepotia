import { createClient } from "@/lib/supabase-server";

const PRODUCT_SELECT = `
  *,
  categories ( id, name, slug ),
  subcategories ( id, name, slug ),
  product_images ( id, url, sort_order ),
  profiles:seller_id ( id, full_name, city, phone, whatsapp )
`;

export async function getPublishedProducts({
  limit = 24,
  orderBy = "created_at",
  ascending = false,
  categoryId = null,
  featured = null,
  search = null,
  city = null,
  minPrice = null,
  maxPrice = null,
  condition = null,
  page = 1,
} = {}) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT, { count: "exact" })
    .eq("status", "published");

  if (categoryId) query = query.eq("category_id", categoryId);
  if (featured === true) query = query.eq("is_featured", true);
  if (city) query = query.ilike("city", `%${city}%`);
  if (condition) query = query.eq("condition", condition);
  if (minPrice != null && minPrice !== "") query = query.gte("price", minPrice);
  if (maxPrice != null && maxPrice !== "") query = query.lte("price", maxPrice);
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`,
    );
  }

  query = query.order(orderBy, { ascending }).range(from, to);

  const { data, error, count } = await query;
  if (error) {
    console.error("getPublishedProducts:", error);
    return { data: [], count: 0, error };
  }
  return { data: data ?? [], count: count ?? 0, error: null };
}

export async function getProductById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .single();

  if (error) {
    console.error("getProductById:", error);
    return { data: null, error };
  }
  return { data, error: null };
}

export async function incrementViews(id) {
  const supabase = await createClient();
  const { data: current } = await supabase
    .from("products")
    .select("views")
    .eq("id", id)
    .single();
  if (!current) return;
  await supabase
    .from("products")
    .update({ views: (current.views || 0) + 1 })
    .eq("id", id);
}

export async function getSimilarProducts(product, limit = 4) {
  if (!product) return [];
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "published")
    .neq("id", product.id)
    .limit(limit);

  if (product.category_id) {
    query = query.eq("category_id", product.category_id);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getSimilarProducts:", error);
    return [];
  }
  return data ?? [];
}

export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value ?? "");
  return `${num.toLocaleString("tr-TR")} ₺`;
}

export function getPrimaryImage(product) {
  const images = product?.product_images;
  if (Array.isArray(images) && images.length) {
    const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted[0].url;
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";
}

export function whatsappLink(phone, productTitle, productUrl) {
  if (!phone) return null;
  const cleaned = String(phone).replace(/\D/g, "");
  const text = encodeURIComponent(
    `Merhaba, sitenizdeki "${productTitle}" ürünü hakkında bilgi almak istiyorum. ${productUrl || ""}`.trim(),
  );
  return `https://wa.me/${cleaned}?text=${text}`;
}
