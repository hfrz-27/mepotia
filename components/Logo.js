"use client";

import Image from "next/image";

export default function Logo({
  className = "h-8",
  priority = false,
  badge = true,
}) {
  const img = (
    <Image
      src="/mepotia-logo.png"
      alt="Mepotia"
      width={200}
      height={52}
      priority={priority}
      className={`w-auto object-contain ${className}`}
    />
  );

  if (!badge) {
    return <span className="logo-on-dark inline-flex">{img}</span>;
  }

  return <span className="logo-badge">{img}</span>;
}
