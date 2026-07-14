function publicUrl(supabaseUrl, uid, productId, fileName) {
  const encoded = fileName.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl}/storage/v1/object/public/product-images/${uid}/${productId}/${encoded}`;
}

function fileFromUrl(url) {
  try {
    return decodeURIComponent(url.split("/").pop() || "");
  } catch {
    return url.split("/").pop() || "";
  }
}

/** Storage'daki tüm fotoğrafları ilanlara geri bağlar (admin oturumu gerekir). */
export async function recoverPhotosFromStorage(supabase) {
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) {
    throw new Error("Oturum gerekli. Yönetim paneline admin olarak gir.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) throw new Error("Supabase URL tanımlı değil.");

  const uid = user.id;

  const { data: folders, error: listErr } = await supabase.storage
    .from("product-images")
    .list(uid, { limit: 200 });

  if (listErr) throw new Error(listErr.message);

  let linked = 0;

  for (const folder of folders || []) {
    if (folder.id) continue;

    const productId = folder.name;
    const prefix = `${uid}/${productId}`;

    const { data: files, error: filesErr } = await supabase.storage
      .from("product-images")
      .list(prefix, { limit: 50 });

    if (filesErr || !files?.length) continue;

    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .maybeSingle();

    if (!product) {
      // Silinen ilanları otomatik geri oluşturma — sadece mevcut ilanlara fotoğraf bağla.
      continue;
    }

    const { data: existingImgs } = await supabase
      .from("product_images")
      .select("url, sort_order")
      .eq("product_id", productId)
      .order("sort_order");

    const existingFiles = new Set((existingImgs || []).map((i) => fileFromUrl(i.url)));
    let sortOrder =
      existingImgs?.length > 0
        ? Math.max(...existingImgs.map((i) => i.sort_order ?? 0)) + 1
        : 0;

    for (const file of files) {
      if (!file.name || file.name === ".emptyFolderPlaceholder") continue;

      if (existingFiles.has(file.name)) continue;

      const url = publicUrl(supabaseUrl, uid, productId, file.name);
      const { error: imgErr } = await supabase.from("product_images").insert({
        product_id: productId,
        url,
        sort_order: sortOrder,
      });

      if (imgErr) {
        console.error("image link", productId, file.name, imgErr);
        continue;
      }

      existingFiles.add(file.name);
      sortOrder += 1;
      linked += 1;
    }
  }

  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    /* ignore */
  }

  return { linked, uid };
}
