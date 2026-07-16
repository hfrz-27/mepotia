export const runtime = "nodejs";
export const maxDuration = 300;

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncTechNews, normalizeFeedUrls } from "@/lib/techNewsSync";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/ara");
  revalidatePath("/en-cok-bakilanlar");
  revalidatePath("/kategoriler");
  revalidatePath("/teknoloji");
  revalidatePath("/urun", "layout");
  revalidatePath("/teknoloji", "layout");
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) return { ok: false, status: 401, error: "Oturum gerekli." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { ok: false, status: 403, error: "Yetkisiz." };

  return { ok: true, supabase };
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const shouldSyncTechNews =
    body?.syncTechNews === true ||
    new URL(request.url).searchParams.get("syncTechNews") === "1";

  if (shouldSyncTechNews) {
    try {
      let supabase = auth.supabase;
      try {
        supabase = createAdminClient();
      } catch {
        // admin oturumu ile devam
      }
      const feedUrls = normalizeFeedUrls(body.feedUrls ?? body.feedUrl);
      const result = await syncTechNews(supabase, { feedUrls });
      revalidateSite();
      return NextResponse.json({ ok: true, ...result });
    } catch (error) {
      return NextResponse.json(
        { error: error?.message || "Haberler çekilemedi." },
        { status: 500 },
      );
    }
  }

  revalidateSite();
  return Response.json({ ok: true });
}

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization") || "";
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const result = await syncTechNews(supabase);
    revalidateSite();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Haberler çekilemedi." },
      { status: 500 },
    );
  }
}
