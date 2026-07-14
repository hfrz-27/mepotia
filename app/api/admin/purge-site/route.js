export const runtime = "nodejs";

import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { purgeSiteListingContent } from "@/lib/sitePurge";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) {
    return { error: NextResponse.json({ error: "Oturum gerekli." }, { status: 401 }) };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: NextResponse.json({ error: "Yetkisiz." }, { status: 403 }) };
  }

  return { error: null };
}

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/teknoloji");
  revalidatePath("/teknoloji", "layout");
  revalidatePath("/ara");
  revalidatePath("/en-cok-bakilanlar");
  revalidatePath("/kategoriler");
  revalidatePath("/paylas");
  revalidatePath("/urun", "layout");
}

/** Admin — tüm ürün ve haberleri sil */
export async function POST() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  try {
    const supabase = createAdminClient();
    const result = await purgeSiteListingContent(supabase);
    revalidateSite();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Silme işlemi başarısız." },
      { status: 500 },
    );
  }
}
