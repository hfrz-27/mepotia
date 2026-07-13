import { displayImageUrl } from "@/lib/productImage";

/**
 * Ürün fotoğrafları — Supabase URL'leri /api/proxy-image üzerinden yüklenir.
 * Next.js image optimizer Supabase'de 400 verdiği için native img kullanılır.
 */
export default function ProductImage({
  src,
  alt = "",
  fill = false,
  className = "",
  priority = false,
}) {
  if (!src) return null;

  const resolved = displayImageUrl(src);
  const loading = priority ? "eager" : "lazy";

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolved} alt={alt} loading={loading} decoding="async" className={className} />
  );
}
