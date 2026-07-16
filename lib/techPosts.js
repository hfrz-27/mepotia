import { createClient } from "@/lib/supabase-server";

const POST_SELECT = "id, title, excerpt, body, cover_url, source_url, is_featured, published, created_at, updated_at";
const POST_SELECT_LEGACY = "id, title, excerpt, body, cover_url, source_url, published, created_at, updated_at";

export const TECH_POST_TTL_DAYS = 7;
// İlk kart geniş yer kaplar; 20 haber, 3 kolonlu masaüstü ızgarasında dengeli biter.
export const TECH_POSTS_PAGE_SIZE = 20;
export const TECH_POSTS_PAGE_SIZE_MOBILE = 10;


export function resolveTechPostsPageSize(userAgent = "", mobileHint = "", view = "") {
  if (view === "mobile") return TECH_POSTS_PAGE_SIZE_MOBILE;
  if (view === "desktop") return TECH_POSTS_PAGE_SIZE;
  if (mobileHint === "?1") return TECH_POSTS_PAGE_SIZE_MOBILE;
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(userAgent)) {
    return TECH_POSTS_PAGE_SIZE_MOBILE;
  }
  return TECH_POSTS_PAGE_SIZE;
}

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

export async function getTechPosts({ limit = 6, page = null } = {}) {
  const supabase = await createClient();
  await purgeExpiredTechPosts(supabase);

  let query = supabase
    .from("tech_posts")
    .select(POST_SELECT, page != null ? { count: "exact" } : undefined)
    .eq("published", true)
    .gte("created_at", techPostsCutoffIso())
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (page != null) {
    const safePage = Math.max(1, Math.floor(page));
    const from = (safePage - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
  } else {
    query = query.limit(limit);
  }

  const { data, error, count } = await query;

  if (error?.message?.includes("is_featured")) {
    let legacyQuery = supabase
      .from("tech_posts")
      .select(POST_SELECT_LEGACY, page != null ? { count: "exact" } : undefined)
      .eq("published", true)
      .gte("created_at", techPostsCutoffIso())
      .order("created_at", { ascending: false });
    if (page != null) {
      const from = (Math.max(1, Math.floor(page)) - 1) * limit;
      legacyQuery = legacyQuery.range(from, from + limit - 1);
    } else {
      legacyQuery = legacyQuery.limit(limit);
    }
    const legacy = await legacyQuery;
    if (!legacy.error) return { data: (legacy.data || []).map((post) => ({ ...post, is_featured: false })), count: legacy.count ?? legacy.data?.length ?? 0, error: null };
  }

  if (error) {
    console.error("getTechPosts:", error);
    return { data: [], count: 0, error };
  }
  return { data: data ?? [], count: count ?? data?.length ?? 0, error: null };
}

export async function getTechPostById(id) {
  const supabase = await createClient();

  let { data, error } = await supabase
    .from("tech_posts")
    .select(POST_SELECT)
    .eq("id", id)
    .eq("published", true)
    .gte("created_at", techPostsCutoffIso())
    .single();

  if (error?.message?.includes("is_featured")) {
    const legacy = await supabase
      .from("tech_posts")
      .select(POST_SELECT_LEGACY)
      .eq("id", id)
      .eq("published", true)
      .gte("created_at", techPostsCutoffIso())
      .single();
    data = legacy.data ? { ...legacy.data, is_featured: false } : null;
    error = legacy.error;
  }


  if (error) {
    console.error("getTechPostById:", error);
    return { data: null, error };
  }
  return { data, error: null };
}

export { formatTechDate } from "@/lib/techPostUtils";
