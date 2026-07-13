import { createClient } from "@/lib/supabase-server";

const POST_SELECT = "id, title, excerpt, body, cover_url, source_url, published, created_at, updated_at";

export const TECH_POST_TTL_DAYS = 7;

export function techPostsCutoffIso() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - TECH_POST_TTL_DAYS);
  return cutoff.toISOString();
}

async function purgeExpiredTechPosts(supabase) {
  const { error } = await supabase.rpc("cleanup_expired_tech_posts");
  if (error && !error.message?.includes("cleanup_expired_tech_posts")) {
    console.error("purgeExpiredTechPosts:", error);
  }
}

export async function getTechPosts({ limit = 6 } = {}) {
  const supabase = await createClient();
  await purgeExpiredTechPosts(supabase);

  const { data, error } = await supabase
    .from("tech_posts")
    .select(POST_SELECT)
    .eq("published", true)
    .gte("created_at", techPostsCutoffIso())
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
  await purgeExpiredTechPosts(supabase);

  const { data, error } = await supabase
    .from("tech_posts")
    .select(POST_SELECT)
    .eq("id", id)
    .eq("published", true)
    .gte("created_at", techPostsCutoffIso())
    .single();

  if (error) {
    console.error("getTechPostById:", error);
    return { data: null, error };
  }
  return { data, error: null };
}

export { formatTechDate } from "@/lib/techPostUtils";
