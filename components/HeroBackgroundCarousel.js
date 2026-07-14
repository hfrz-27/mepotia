"use client";

import { useEffect, useState } from "react";
import { displayImageUrl } from "@/lib/productImage";

export default function HeroBackgroundCarousel({ images = [] }) {
  const slides = images.filter(Boolean).slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % slides.length);
    }, 11000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {slides.map((src, index) => {
        const isActive = index === active;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${src}-${index}`}
            src={displayImageUrl(src)}
            alt=""
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            className={`hero-bg-slide absolute inset-0 h-full w-full object-cover transition-opacity duration-[4500ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-br from-bw-950/78 via-bw-950/58 to-bw-950/82" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_55%)]" />
    </div>
  );
}
