import { createClient } from "@/lib/supabase-server";

export async function getCategoriesWithSubs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, subcategories ( id, name, slug, sort_order )")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getCategoriesWithSubs:", error);
    return [];
  }

  return (data ?? []).map((cat) => ({
    ...cat,
    subcategories: (cat.subcategories || []).sort(
      (a, b) => a.sort_order - b.sort_order,
    ),
  }));
}

export async function getCategoryBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, subcategories ( id, name, slug, sort_order )")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getCategoryBySlug:", error);
    return null;
  }
  return data;
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
