export function isSupabaseImage(url) {
  return typeof url === "string" && url.includes("supabase.co");
}

/** Supabase görselleri doğrudan yükle — optimizer bazen kırıyor */
export function productImageProps(url, { priority = false } = {}) {
  if (isSupabaseImage(url)) {
    return { unoptimized: true, priority };
  }
  return { quality: 90, priority };
}
