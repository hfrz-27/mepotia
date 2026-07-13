export function isSupabaseImage(url) {
  return typeof url === "string" && url.includes("supabase.co");
}

/** Ürün fotoğrafları — Supabase'de sıkıştırma yok, tam kalite */
export function productImageProps(url, { priority = false } = {}) {
  const supabase = isSupabaseImage(url);
  return {
    unoptimized: supabase,
    quality: supabase ? undefined : 90,
    priority,
  };
}
