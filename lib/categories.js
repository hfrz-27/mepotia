import { createClient } from "@/lib/supabase-server";
import { getTechCatalogItem, mergeTechCategories, TECH_CATEGORY_SLUGS } from "@/lib/techCategories";

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

  const [merged] = mergeTechCategories([data]);
  return merged || data;
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
