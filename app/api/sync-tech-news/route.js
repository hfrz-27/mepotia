export const runtime = "nodejs";

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { syncTechNews } from "@/lib/techNewsSync";
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

async function runSync(supabase) {
  const result = await syncTechNews(supabase, { limit: 10 });

  if (result.imported > 0) {
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
export async function POST() {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  try {
    let client = supabase;
    try {
      client = createAdminClient();
    } catch {
      // admin oturumu ile devam
    }
    const result = await runSync(client);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Haberler çekilemedi." },
      { status: 500 },
    );
  }
}
