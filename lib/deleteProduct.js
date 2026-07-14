async function listStorageFiles(supabase, prefix) {
  const { data: files, error } = await supabase.storage
    .from("product-images")
    .list(prefix, { limit: 100 });

  if (error) throw new Error(error.message);
  return (files || []).filter((file) => file.name && file.name !== ".emptyFolderPlaceholder");
}

/** Ürün klasöründeki tüm fotoğrafları storage'dan siler. */
export async function deleteProductStorage(supabase, userId, productId) {
  const prefix = `${userId}/${productId}`;
  const files = await listStorageFiles(supabase, prefix);
  if (!files.length) return 0;

  const paths = files.map((file) => `${prefix}/${file.name}`);
  const { error: deleteErr } = await supabase.storage.from("product-images").remove(paths);
  if (deleteErr) throw new Error(deleteErr.message);

  return paths.length;
}

/** Ürünü veritabanından ve storage'dan kalıcı olarak siler. */
export async function deleteProductFully(supabase, productId) {
  const { data: product, error: fetchErr } = await supabase
    .from("products")
    .select("id, seller_id")
    .eq("id", productId)
    .maybeSingle();

  if (fetchErr) throw new Error(fetchErr.message);
  if (!product) return { ok: true, missing: true };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const storageUserId = product.seller_id || user?.id;
  if (storageUserId) {
    try {
      await deleteProductStorage(supabase, storageUserId, productId);
    } catch (err) {
      console.error("product storage delete", productId, err);
    }
  }

  const { error: deleteErr } = await supabase.from("products").delete().eq("id", productId);
  if (deleteErr) throw new Error(deleteErr.message);

  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    /* ignore */
  }

  return { ok: true };
}

/** Admin hesabındaki tüm ürün fotoğraf klasörlerini temizler. */
export async function deleteAllProductStorage(supabase) {
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();

  if (authErr || !user) throw new Error("Oturum gerekli.");

  const { data: folders, error: listErr } = await supabase.storage
    .from("product-images")
    .list(user.id, { limit: 500 });

  if (listErr) throw new Error(listErr.message);

  let removed = 0;
  for (const folder of folders || []) {
    if (folder.id) continue;
    removed += await deleteProductStorage(supabase, user.id, folder.name);
  }

  return removed;
}
