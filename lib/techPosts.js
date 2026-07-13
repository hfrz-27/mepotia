import { createClient } from "@/lib/supabase-server";

const POST_SELECT = "id, title, excerpt, body, cover_url, source_url, published, created_at, updated_at";

export async function getTechPosts({ limit = 6 } = {}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tech_posts")
    .select(POST_SELECT)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getTechPosts:", error);
    return { data: [], error };
  }
  return { data: data ?? [], error: null };
}

export async function getTechPostById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tech_posts")
    .select(POST_SELECT)
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error) {
    console.error("getTechPostById:", error);
    return { data: null, error };
  }
  return { data, error: null };
}

export function formatTechDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
