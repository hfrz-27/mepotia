"use client";

import Image from "next/image";

/** Siyah logo yazısı — yüksek çözünürlük, arkasında kutu yok */
export default function Logo({ className = "h-8", priority = false }) {
  return (
    <Image
      src="/mepotia-logo.png"
      alt="Mepotia"
      width={960}
      height={240}
      quality={100}
      priority={priority}
      className={`w-auto object-contain ${className}`}
    />
  );
}
