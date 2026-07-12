"use client";

import Image from "next/image";

/** Siyah logo yazısı — arkasında kutu/badge yok */
export default function Logo({ className = "h-8", priority = false }) {
  return (
    <Image
      src="/mepotia-logo.png"
      alt="Mepotia"
      width={220}
      height={56}
      priority={priority}
      className={`w-auto object-contain ${className}`}
    />
  );
}
