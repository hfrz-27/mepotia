"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

const PITCH = {
  telefon: "Seçilmiş iPhone ve Android. Net fiyat, temiz vitrin.",
  bilgisayar: "Laptop ve masaüstü. Performans, özenle seçilmiş.",
  tablet: "Hafif, güçlü tabletler. Her an yanında.",
  kulaklik: "Sessizlik ve detay. Kablosuz ve stüdyo sesi.",
  "kilif-koruma": "Koruma, zarafetle. Kılıf ve cam.",
  "sarj-kablo": "Hızlı şarj, doğru güç. Powerbank ve kablo.",
  aksesuar: "Günlük konfor. Stand, tutucu ve daha fazlası.",
  "akilli-saat": "Bilektekini yükselt. Saat ve bileklik.",
  "oyun-konsol": "Konsol ve ekipman. Oyun odaklı seçim.",
};

const COVER_IMG = {
  telefon:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=88",
  bilgisayar:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=88",
  tablet:
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=88",
  kulaklik:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=88",
  "kilif-koruma":
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1200&q=88",
  "sarj-kablo":
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=88",
  aksesuar:
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=88",
  "akilli-saat":
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=88",
  "oyun-konsol":
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=88",
};

const THEME = {
  telefon: { a: "#d4af37", g: "rgba(212,175,55,0.45)" },
  bilgisayar: { a: "#a8b5c7", g: "rgba(168,181,199,0.4)" },
  tablet: { a: "#7ec8d8", g: "rgba(126,200,216,0.4)" },
  kulaklik: { a: "#b794f6", g: "rgba(183,148,246,0.4)" },
  "kilif-koruma": { a: "#94a3b8", g: "rgba(148,163,184,0.4)" },
  "sarj-kablo": { a: "#e0b84e", g: "rgba(224,184,78,0.45)" },
  aksesuar: { a: "#6b9b7a", g: "rgba(107,155,122,0.4)" },
  "akilli-saat": { a: "#e8b4b8", g: "rgba(232,180,184,0.4)" },
  "oyun-konsol": { a: "#6b8cae", g: "rgba(107,140,174,0.4)" },
};

function CategoryCoverCard({ category, index }) {
  const Icon = category.icon;
  const pitch = PITCH[category.slug] || category.description;
  const cover = COVER_IMG[category.slug];
  const theme = THEME[category.slug] || THEME.aksesuar;
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 30 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
    setShine({ x: px * 100, y: py * 100 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine({ x: 50, y: 30 });
  };

  return (
    <Link
      ref={cardRef}
      href={`/kategori/${category.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        "group relative flex h-[540px] w-[min(88vw,400px)] shrink-0 flex-col overflow-hidden rounded-[2rem] text-left outline-none will-change-transform sm:h-[580px] sm:w-[420px]",
        "focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      ].join(" ")}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease",
        boxShadow:
          "0 16px 40px -24px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <div className="absolute inset-0">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover object-center transition duration-[900ms] ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full bg-[#1a1a1c]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay transition duration-500"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.28), transparent 42%)`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
      </div>

      <div
        className="absolute inset-x-0 top-0 z-20 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${theme.a} 50%, transparent 95%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex items-start justify-between px-7 pt-7 sm:px-8 sm:pt-8">
        {index < 3 ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#1d1d1f] uppercase backdrop-blur-md"
            style={{
              background: `linear-gradient(135deg, #f5e6b8, ${theme.a})`,
              boxShadow: `0 8px 24px -8px ${theme.g}`,
            }}
          >
            <Sparkles className="h-3 w-3" strokeWidth={2.2} />
            Premium
          </span>
        ) : (
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase backdrop-blur-md">
            Koleksiyon
          </span>
        )}
        <span className="font-display text-[12px] font-semibold tracking-[0.22em] text-white/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 mt-8 flex justify-center sm:mt-10">
        <div
          className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-[1.75rem] backdrop-blur-xl transition duration-500 group-hover:scale-110 sm:h-24 sm:w-24"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 20px 40px -16px ${theme.g}, 0 0 0 1px rgba(255,255,255,0.12)`,
          }}
        >
          <div
            className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-50 blur-xl transition group-hover:opacity-80"
            style={{ background: theme.g }}
            aria-hidden
          />
          <Icon className="relative h-10 w-10 text-white sm:h-11 sm:w-11" strokeWidth={1.2} />
        </div>
      </div>

      <div className="relative z-10 mt-auto p-4 sm:p-5">
        <div
          className="rounded-[1.35rem] border border-white/12 p-5 backdrop-blur-2xl sm:p-6"
          style={{
            background:
              "linear-gradient(165deg, rgba(20,20,22,0.72) 0%, rgba(12,12,14,0.88) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 40px -20px rgba(0,0,0,0.5)",
          }}
        >
          <h3 className="font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.85rem]">
            {category.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/55 sm:text-[14px]">
            {pitch}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-bold tracking-[0.06em] text-[#1d1d1f] uppercase transition group-hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, #f5e6b8 0%, ${theme.a} 100%)`,
                boxShadow: `0 10px 28px -10px ${theme.g}`,
              }}
            >
              Kategoriyi aç
              <span className="text-[14px] leading-none">→</span>
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: theme.a,
                boxShadow: `0 0 12px ${theme.g}`,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function PremiumRail({ children, ariaLabel }) {
  const ref = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(460, el.clientWidth * 0.88), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#1d1d1f] shadow-[0_8px_28px_-8px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:border-[#d4af37]/35 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)] disabled:pointer-events-none disabled:opacity-0 sm:flex";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Önceki"
        disabled={!canPrev}
        onClick={() => scrollBy(-1)}
        className={`${arrow} left-3 lg:left-5`}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Sonraki"
        disabled={!canNext}
        onClick={() => scrollBy(1)}
        className={`${arrow} right-3 lg:right-5`}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className="hide-scrollbar news-touch-scroll flex gap-5 overflow-x-auto scroll-smooth px-5 pb-6 pt-3 sm:gap-6 sm:px-10 lg:px-12"
        style={{ perspective: "1200px" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function HomeCategoryExplorer({ categories = [] }) {
  const items = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c]));
    return TECH_CATEGORY_CATALOG.map((cat) => ({
      ...cat,
      catalogOnly: !bySlug.get(cat.slug) || bySlug.get(cat.slug).catalogOnly,
    }));
  }, [categories]);

  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-10 sm:pt-10 sm:pb-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% 0%, rgba(212,175,55,0.06), transparent 55%),
            radial-gradient(ellipse 40% 35% at 100% 70%, rgba(0,0,0,0.02), transparent 50%)
          `,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[640px] px-5 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-[#8a6a20] uppercase">
          <Sparkles className="h-2.5 w-2.5 text-[#d4af37]" strokeWidth={2} />
          Luxury edit
        </p>
        <h2 className="mt-2.5 font-display text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1d1d1f] sm:text-[1.65rem]">
          Kategoriler.{" "}
          <span className="bg-gradient-to-r from-[#b8942e] via-[#d4af37] to-[#a67c00] bg-clip-text text-transparent">
            Saf premium.
          </span>
        </h2>
        <p className="mx-auto mt-1.5 max-w-sm text-[12px] leading-snug text-[#8e8e93] sm:text-[13px]">
          Karta bas — kategori sayfası açılsın.
        </p>
      </div>

      <div className="relative mt-6 sm:mt-8">
        <PremiumRail ariaLabel="Kategoriler">
          {items.map((cat, index) => (
            <CategoryCoverCard key={cat.slug} category={cat} index={index} />
          ))}
        </PremiumRail>
      </div>
    </section>
  );
}
