"use client";

import { useState } from "react";
import { displayImageUrl } from "@/lib/productImage";

const FALLBACK =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

/**
 * Ürün fotoğrafları — proxy + hata durumunda fallback (kırık görsel yok).
 */
export default function ProductImage({
  src,
  alt = "",
  fill = false,
  className = "",
  priority = false,
}) {
  const [failed, setFailed] = useState(false);
  const resolved = failed || !src ? FALLBACK : displayImageUrl(src);
  const loading = priority ? "eager" : "lazy";

  const onError = () => {
    if (!failed) setFailed(true);
  };

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={onError}
        className={[
          "absolute inset-0 h-full w-full object-cover",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={onError}
      className={className}
    />
  );
}
