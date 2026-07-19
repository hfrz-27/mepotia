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

/** Ana sayfa koleksiyon slotları — admin seçimi (sadece işaretlenen ürünler) */
export const HOME_COLLECTIONS = {
  featured: {
    key: "featured",
    slug: "yeni-sahibi",
    href: "/koleksiyon/yeni-sahibi",
    label: "Yeni sahibi",
    eyebrow: "Öne çıkan",
    title: "Yeni sahibini bekleyenler.",
    description: "Fiyatı, kondisyonu ve kullanım değeriyle öne çıkan teknoloji ürünleri.",
  },
  curated: {
    key: "curated",
    slug: "ozenle-secilmis",
    href: "/koleksiyon/ozenle-secilmis",
    label: "Özenle seçilmiş",
    eyebrow: "Vitrin",
    title: "Özenle seçilmiş ürünler.",
    description: "Tek tek seçilen, durumu açıkça anlatılan temiz ikinci el seçenekleri.",
  },
  popular: {
    key: "popular",
    slug: "en-cok-bakilanlar",
    href: "/koleksiyon/en-cok-bakilanlar",
    label: "En çok bakılanlar",
    eyebrow: "Popüler",
    title: "En çok bakılanlar.",
    description: "Ziyaretçilerin en çok ilgilendiği telefon, bilgisayar ve teknoloji ürünleri.",
  },
};

/** URL slug → collection key */
export function resolveHomeCollectionSlug(slug) {
  if (!slug) return null;
  const s = String(slug).toLowerCase();
  if (s === "featured" || s === "yeni-sahibi" || s === "one-cikan") return "featured";
  if (s === "curated" || s === "ozenle" || s === "ozenle-secilmis" || s === "vitrin") return "curated";
  if (s === "popular" || s === "en-cok-bakilanlar" || s === "populer") return "popular";
  return null;
}

export async function getPublishedProducts({
  limit = 24,
  orderBy = "created_at",
  ascending = false,
  categoryId = null,
  subcategoryId = null,
  featured = null,
  /** 'featured' | 'curated' | 'popular' — ana sayfa koleksiyonu */
  homeCollection = null,
  search = null,
  city = null,
  minPrice = null,
  maxPrice = null,
  condition = null,
  brand = null,
  model = null,
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
    if (subcategoryId) query = query.eq("subcategory_id", subcategoryId);
    if (homeCollection) {
      query = query.eq("home_collection", homeCollection);
    } else if (featured === true) {
      query = query.eq("is_featured", true);
    }
    if (city) query = query.ilike("city", `%${city}%`);
    if (condition) query = query.eq("condition", condition);
    if (brand) query = query.eq("brand", brand);
    if (model) query = query.eq("model", model);
    if (minPrice != null && minPrice !== "") query = query.gte("price", minPrice);
    if (maxPrice != null && maxPrice !== "") query = query.lte("price", maxPrice);
    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`,
      );
    }

    if (homeCollection) {
      return query
        .order("home_collection_order", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false })
        .range(from, to);
    }

    return query.order(orderBy, { ascending }).range(from, to);
  };

  const { data, error, count } = await runProductQuery(supabase, build);
  if (error) {
    // Kolon yoksa (SQL henüz çalıştırılmadı) — featured için eski bayrak
    if (homeCollection && /home_collection/i.test(error.message || "")) {
      if (homeCollection === "featured") {
        return getPublishedProducts({
          limit,
          orderBy,
          ascending,
          featured: true,
          page,
        });
      }
      return { data: [], count: 0, error: null };
    }
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

export async function incrementViews(id, client = null) {
  const supabase = client || (await createClient());
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

export { formatPrice, getPrimaryImage, isSold, hasDiscount } from "@/lib/productDisplay";

export function isPublicProduct(product) {
  return product && VISIBLE_PRODUCT_STATUSES.includes(product.status);
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
