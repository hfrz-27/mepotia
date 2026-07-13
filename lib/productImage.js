export function isSupabaseImage(url) {
  return typeof url === "string" && url.includes("supabase.co");
}

/** Tarayıcıda güvenilir gösterim — same-origin proxy */
export function displayImageUrl(url) {
  if (!url) return url;
  if (isSupabaseImage(url)) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export function productImageProps(url, { priority = false } = {}) {
  return { unoptimized: true, priority };
}
