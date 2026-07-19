import { createClient } from "@/lib/supabase-server";
import {
  getTechCatalogItem,
  mergeTechCategories,
  TECH_CATEGORY_CATALOG,
  TECH_CATEGORY_SLUGS,
} from "@/lib/techCategories";
import { VISIBLE_PRODUCT_STATUSES } from "@/lib/products";

export async function getCategoriesWithSubs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, subcategories ( id, name, slug, sort_order )")
    .in("slug", TECH_CATEGORY_SLUGS)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getCategoriesWithSubs:", error);
    return mergeTechCategories([]);
  }

  const normalized = (data ?? []).map((cat) => ({
    ...cat,
    subcategories: (cat.subcategories || []).sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  }));

  return mergeTechCategories(normalized);
}

export async function getCategoryBySlug(slug) {
  const catalogFallback = () => {
    if (!getTechCatalogItem(slug)) return null;
    return mergeTechCategories([]).find((category) => category.slug === slug) || null;
  };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, subcategories ( id, name, slug, sort_order )")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getCategoryBySlug:", error);
    return catalogFallback();
  }

  if (!data) return catalogFallback();

  return mergeTechCategories([data]).find((category) => category.slug === slug) || data;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("getSiteSettings:", error);
    return {
      site_name: "Mepotia",
      phone: "05300000000",
      whatsapp: "905059574122",
      email: "info@mepotia.com",
    };
  }
  return data;
}

/**
 * Ana sayfa kategori vitrini — her kategori için gerçek bir ürün fotoğrafı
 * (varsa) ve ürün sayısı üretir. Ürün yoksa katalog fotoğrafına düşer.
 */
export async function getCategoryShowcase(poolSize = 200) {
  const bySlug = new Map();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, categories ( slug ), product_images ( url, sort_order )")
    .in("status", VISIBLE_PRODUCT_STATUSES)
    .order("created_at", { ascending: false })
    .limit(poolSize);

  if (error) {
    console.error("getCategoryShowcase:", error);
  } else {
    for (const product of data || []) {
      const slug = product.categories?.slug;
      if (!slug) continue;
      const current = bySlug.get(slug) || { count: 0, cover: null };
      current.count += 1;
      if (!current.cover) {
        const images = product.product_images;
        if (Array.isArray(images) && images.length) {
          const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
          current.cover = sorted[0].url;
        }
      }
      bySlug.set(slug, current);
    }
  }

  return TECH_CATEGORY_CATALOG.map((catalog) => {
    const stats = bySlug.get(catalog.slug) || { count: 0, cover: null };
    return {
      slug: catalog.slug,
      name: catalog.name,
      description: catalog.description,
      icon: catalog.icon,
      tileGradient: catalog.tileGradient,
      cover: stats.cover || catalog.photo || null,
      count: stats.count,
      href: `/kategori/${catalog.slug}`,
    };
  });
}
