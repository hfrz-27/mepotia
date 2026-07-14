"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "Güvenle al · Güvenle sat",
  "Şeffaf fiyat · Net sunum",
  "Özenle seçilmiş ikinci el teknoloji",
  "Mepotia — güvenin buluşma noktası",
  "Dürüst iletişim · Hızlı dönüş",
];

export default function TopTicker() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("marquee-paused", !entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const loop = [...ITEMS, ...ITEMS];

  return (
    <div ref={ref} className="overflow-hidden border-b border-white/10 bg-bw-950 py-2">
      <p className="truncate px-4 text-center text-[10px] font-medium tracking-[0.16em] text-white/55 uppercase sm:hidden">
        {ITEMS[0]}
      </p>
      <div
        className="review-marquee-track review-marquee-continuous hidden gap-8 px-4 sm:flex"
        style={{ "--marquee-duration": "40s" }}
      >
        {loop.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="shrink-0 text-[10px] font-medium tracking-[0.18em] text-white/55 uppercase"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
