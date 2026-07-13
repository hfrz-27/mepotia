import Image from "next/image";
import { isSupabaseImage } from "@/lib/productImage";

/**
 * Supabase görselleri Next.js optimizer'dan geçmez (400 hatası veriyor).
 * Bu bileşen storage URL'lerini doğrudan yükler.
 */
export default function ProductImage({
  src,
  alt = "",
  fill = false,
  className = "",
  sizes,
  priority = false,
}) {
  if (!src) return null;

  if (isSupabaseImage(src)) {
    const loading = priority ? "eager" : "lazy";
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${className}`}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} loading={loading} decoding="async" className={className} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={90}
    />
  );
}
