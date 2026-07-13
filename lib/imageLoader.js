/** Supabase URL'leri doğrudan yükle; diğerleri Next optimizer. */
export default function imageLoader({ src, width, quality }) {
  if (typeof src === "string" && src.includes("supabase.co")) {
    return src;
  }
  const q = quality || 75;
  if (src.startsWith("/")) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
}
