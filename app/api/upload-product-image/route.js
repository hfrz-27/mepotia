import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) {
    return NextResponse.json({ error: "Oturum gerekli." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const productId = form.get("productId");

  if (!file || typeof file === "string" || !productId || typeof productId !== "string") {
    return NextResponse.json({ error: "Dosya ve productId gerekli." }, { status: 400 });
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Yalnızca JPEG, PNG veya WebP görsel yüklenebilir." }, { status: 400 });
  }

  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Görsel 8 MB'dan küçük olmalı." }, { status: 400 });
  }

  const { data: product } = await supabase
    .from("products")
    .select("id")
    .eq("id", productId)
    .maybeSingle();

  if (!product) {
    return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  const safeName = file.name.replace(/[^\w.\-()+ ]+/g, "_");
  const path = `${user.id}/${productId}/${Date.now()}-${safeName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabase.storage.from("product-images").upload(path, buffer, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || "image/jpeg",
  });

  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const { data: existing } = await supabase
    .from("product_images")
    .select("sort_order")
    .eq("product_id", productId)
    .order("sort_order", { ascending: false })
    .limit(1);

  const sortOrder = (existing?.[0]?.sort_order ?? -1) + 1;
  const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);

  const { data: row, error: dbErr } = await supabase
    .from("product_images")
    .insert({ product_id: productId, url: pub.publicUrl, sort_order: sortOrder })
    .select("id, url, sort_order")
    .single();

  if (dbErr) {
    return NextResponse.json({ error: dbErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, image: row, url: pub.publicUrl });
}
