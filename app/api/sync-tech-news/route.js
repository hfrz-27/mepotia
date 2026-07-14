export const runtime = "nodejs";
export const maxDuration = 300;

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncTechNews, normalizeFeedUrls, deleteAllTechPosts } from "@/lib/techNewsSync";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) {
    return { supabase: null, error: NextResponse.json({ error: "Oturum gerekli." }, { status: 401 }) };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { supabase: null, error: NextResponse.json({ error: "Yetkisiz." }, { status: 403 }) };
  }

  return { supabase, error: null };
}

function isCronAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

async function runSync(supabase, feedUrls) {
  const result = await syncTechNews(supabase, { feedUrls });

  if (result.imported > 0 || result.updated > 0 || result.deleted > 0) {
    revalidatePath("/");
    revalidatePath("/teknoloji");
    revalidatePath("/teknoloji", "layout");
  }

  return result;
}

/** Vercel Cron — otomatik haber çekme */
export async function GET(request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const result = await runSync(supabase);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Haberler çekilemedi." },
      { status: 500 },
    );
  }
}

/** Admin panel — manuel haber çekme */
export async function POST(request) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const feedUrls = normalizeFeedUrls(body.feedUrls ?? body.feedUrl);
  const deleteAll = body.deleteAll === true;
  const resetAndSync = body.resetAndSync === true;

  try {
    let client = supabase;
    try {
      client = createAdminClient();
    } catch {
      // admin oturumu ile devam
    }

    if (deleteAll || resetAndSync) {
      const { deleted } = await deleteAllTechPosts(client);
      if (!resetAndSync && !feedUrls.length) {
        revalidatePath("/");
        revalidatePath("/teknoloji");
        revalidatePath("/teknoloji", "layout");
        return NextResponse.json({ ok: true, deleted });
      }
      if (resetAndSync && !feedUrls.length) {
        throw new Error("Yeniden çekmek için site linki gir.");
      }
      if (!resetAndSync) {
        revalidatePath("/");
        revalidatePath("/teknoloji");
        revalidatePath("/teknoloji", "layout");
        return NextResponse.json({ ok: true, deleted });
      }
      const result = await runSync(client, feedUrls);
      return NextResponse.json({ ok: true, deleted, ...result });
    }

    const result = await runSync(client, feedUrls);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Haberler çekilemedi." },
      { status: 500 },
    );
  }
}
