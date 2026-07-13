import { createClient } from "@/lib/supabase-server";

export const VISIBLE_PRODUCT_STATUSES = ["published", "sold"];

const PRODUCT_SELECT = `
  *,
  categories ( id, name, slug ),
  subcategories ( id, name, slug ),
  product_images ( id, url, sort_order ),
  profiles:seller_id ( id, full_name, city, phone, whatsapp )
`;

const PRODUCT_SELECT_MIN = `
  *,
  product_images ( id, url, sort_order )
`;

async function runProductQuery(supabase, build) {
  let query = build(PRODUCT_SELECT);
  let result = await query;
  if (!result.error) return result;

  console.error("getPublishedProducts (full):", result.error);
  query = build(PRODUCT_SELECT_MIN);
  result = await query;
  if (result.error) {
    console.error("getPublishedProducts (min):", result.error);
  }
  return result;
}

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

  const build = (select) => {
    let query = supabase
      .from("products")
      .select(select, { count: "exact" })
      .in("status", VISIBLE_PRODUCT_STATUSES);

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

    return query.order(orderBy, { ascending }).range(from, to);
  };

  const { data, error, count } = await runProductQuery(supabase, build);
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
  const { error } = await supabase.rpc("increment_product_views", {
    product_id: id,
  });
  if (!error) return;
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
    .in("status", VISIBLE_PRODUCT_STATUSES)
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

export function hasDiscount(product) {
  return (
    product?.is_discount &&
    product?.original_price != null &&
    Number(product.original_price) > Number(product.price)
  );
}

export function isSold(product) {
  return product?.status === "sold";
}

export function isPublicProduct(product) {
  return product && VISIBLE_PRODUCT_STATUSES.includes(product.status);
}

export function getPrimaryImage(product) {
  const images = product?.product_images;
  if (Array.isArray(images) && images.length) {
    const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted[0].url;
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";
}

export { isSupabaseImage, productImageProps } from "@/lib/productImage";

export function cleanPhone(phone) {
  if (!phone) return "";
  return String(phone).replace(/\D/g, "");
}

export function phoneLink(phone) {
  const cleaned = cleanPhone(phone);
  if (!cleaned) return null;
  return `tel:+${cleaned.startsWith("90") ? cleaned : `90${cleaned.replace(/^0/, "")}`}`;
}

export function whatsappLink(phone, productTitle, productUrl) {
  const cleaned = cleanPhone(phone);
  if (!cleaned) return null;
  const text = encodeURIComponent(
    `Merhaba, sitenizdeki "${productTitle}" ürünü hakkında bilgi almak istiyorum. ${productUrl || ""}`.trim(),
  );
  return `https://wa.me/${cleaned}?text=${text}`;
}
