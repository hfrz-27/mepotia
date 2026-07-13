export function isSupabaseImage(url) {
  return typeof url === "string" && url.includes("supabase.co");
}

/** Hızlı yükleme için Next.js görsel optimizasyonu */
export function productImageProps(url, { priority = false } = {}) {
  return {
    quality: isSupabaseImage(url) ? 80 : 90,
    priority,
  };
}
