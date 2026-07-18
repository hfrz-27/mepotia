"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage } from "@/lib/productDisplay";

/* ═══════════════════════════════════════════════════════════
   A — FEATURED LOOKBOOK  ·  Yeni sahibini bekleyenler
   Full-bleed ürün (cinema kalitesi) + sol yazı + alt film şeridi
   (Cinema’dan fark: yazı solda, altta geniş kart şeridi)
   ═══════════════════════════════════════════════════════════ */
function CoverMosaic({ items, priority, label, title, description, linkLabel }) {
  const hero = items[0];
  const strip = items.slice(0, 4);

  return (
    <div className="relative overflow-hidden rounded-[20px] bg-black shadow-xl sm:rounded-[28px] lg:rounded-[32px]">
      {hero ? (
        <div className="absolute inset-0">
          <ProductImage
            src={getPrimaryImage(hero)}
            alt=""
            fill
            priority={priority}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#141414]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

      <div className="relative flex min-h-[300px] flex-col justify-between p-4 sm:min-h-[400px] sm:p-8 lg:min-h-[460px] lg:p-10">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 sm:px-3.5 sm:py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="text-[10px] font-semibold tracking-[0.1em] text-white uppercase sm:text-[11px]">
              {label}
            </span>
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black sm:px-3.5 sm:py-1.5 sm:text-[11px]">
            {items.length} fırsat
          </span>
        </div>

        <div className="max-w-xl py-3 sm:py-0">
          <h2 className="text-[1.55rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[2.5rem] md:text-[3.1rem]">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 line-clamp-2 max-w-md text-[13px] leading-relaxed text-white/65 sm:mt-3 sm:line-clamp-none sm:text-[16px]">
              {description}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-black sm:px-6 sm:py-3 sm:text-[14px]">
              {linkLabel}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
            </span>
            {hero?.price != null ? (
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[12px] font-semibold text-white sm:px-4 sm:text-[13px]">
                {formatPrice(hero.price)}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 news-touch-scroll hide-scrollbar sm:grid sm:grid-cols-4 sm:gap-2.5 sm:overflow-visible sm:pb-0">
          {strip.map((p) => (
            <div
              key={p.id}
              className="flex min-w-[9.5rem] shrink-0 items-center gap-2 rounded-2xl border border-white/15 bg-black/40 p-1.5 sm:min-w-0 sm:p-2"
            >
              {/* Beyaz çerçeve: padding kutusu — ring+overflow kesilmez */}
              <div className="shrink-0 rounded-[10px] bg-white p-[2px] sm:rounded-[12px]">
                <div className="relative h-10 w-10 overflow-hidden rounded-[8px] bg-[#e8e8ed] sm:h-12 sm:w-12 sm:rounded-[10px]">
                  <ProductImage src={getPrimaryImage(p)} alt="" fill className="object-cover" />
                </div>
              </div>
              <div className="min-w-0 flex-1 pr-0.5">
                <p className="line-clamp-1 text-[11px] font-semibold text-white sm:text-[12px]">
                  {p.title}
                </p>
                {p.price != null ? (
                  <p className="mt-0.5 text-[11px] font-semibold text-white/90 tabular-nums sm:text-[12px]">
                    {formatPrice(p.price)}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   B — SPLIT  ·  Özenle seçilmiş ürünler
   Açık flagship: soft header + 4 premium tile
   ═══════════════════════════════════════════════════════════ */
function CoverSplit({ items, priority, label, title, description, linkLabel }) {
  const tiles = items.slice(0, 4);

  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-lg ring-1 ring-black/[0.06] sm:rounded-[28px] lg:rounded-[32px]">
      <div className="relative overflow-hidden border-b border-black/[0.04] bg-gradient-to-b from-[#fafafa] to-white px-4 py-6 sm:px-10 sm:py-11">
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">
                {label}
              </span>
              <span className="text-[11px] font-medium text-[#86868b] sm:text-[12px]">
                {items.length} ürün
              </span>
            </div>
            <h2 className="mt-2 text-[1.55rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#111] sm:mt-3 sm:text-[2.5rem] md:text-[3rem]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#6e6e73] sm:line-clamp-none sm:text-[15px]">
                {description}
              </p>
            ) : null}
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-black px-4 py-2.5 text-[13px] font-semibold text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-[14px]">
            {linkLabel}
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </span>
        </div>
      </div>

      <div className="bg-[#f5f5f7] p-2 sm:p-4">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const p = tiles[i];
            return (
              <div
                key={p?.id || i}
                className="relative overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.04] sm:rounded-[22px]"
              >
                <div className="relative aspect-square sm:aspect-[4/5]">
                  {p ? (
                    <ProductImage
                      src={getPrimaryImage(p)}
                      alt=""
                      fill
                      priority={priority && i === 0}
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#e8e8ed]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {p ? (
                    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3.5">
                      <p className="line-clamp-1 text-[11px] font-semibold text-white sm:text-[13px]">
                        {p.title}
                      </p>
                      {p.price != null ? (
                        <p className="mt-0.5 text-[12px] font-semibold text-white tabular-nums sm:text-[15px]">
                          {formatPrice(p.price)}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   C — CINEMA  ·  En çok bakılanlar
   Full-bleed hero, ortada yazı, alt yuvarlak thumbs
   ═══════════════════════════════════════════════════════════ */
function CoverCinema({ items, priority, label, title, description, linkLabel }) {
  const hero = items[0];
  const strip = items.slice(0, 5);

  return (
    <div className="relative overflow-hidden rounded-[20px] bg-black shadow-xl sm:rounded-[28px] lg:rounded-[32px]">
      {hero ? (
        <div className="absolute inset-0">
          <ProductImage
            src={getPrimaryImage(hero)}
            alt=""
            fill
            priority={priority}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#141414]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      <div className="relative flex min-h-[300px] flex-col justify-between p-4 sm:min-h-[400px] sm:p-9 lg:min-h-[440px] lg:p-11">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white sm:px-3.5 sm:py-1.5 sm:text-[11px]">
            {label}
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black sm:px-3.5 sm:py-1.5 sm:text-[11px]">
            {items.length} ürün
          </span>
        </div>

        <div className="mx-auto max-w-2xl px-1 py-4 text-center sm:py-0">
          <h2 className="text-[1.55rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[2.5rem] md:text-[3.1rem]">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white/60 line-clamp-2 sm:mt-3 sm:text-[16px]">
              {description}
            </p>
          ) : null}
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-black sm:mt-6 sm:gap-2 sm:px-6 sm:py-3 sm:text-[14px]">
            {linkLabel}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </span>
        </div>

        {/* Tam beyaz çerçeve: padding; ring+overflow kesilmez */}
        <div className="flex justify-center gap-2.5 pb-0.5 sm:gap-3">
          {strip.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="shrink-0 rounded-[12px] bg-white p-[3px] shadow-md sm:rounded-[16px] sm:p-1"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-[9px] bg-[#e8e8ed] sm:h-16 sm:w-16 sm:rounded-[12px]">
                <ProductImage src={getPrimaryImage(p)} alt="" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const COVERS = {
  mosaic: CoverMosaic,
  split: CoverSplit,
  cinema: CoverCinema,
};

export default function HomeFeaturedCollection({
  id,
  products = [],
  href = "/ara",
  linkLabel = "Koleksiyonu keşfet",
  eyebrow,
  title = "Koleksiyon.",
  description = "",
  tone = "light",
  variant = "mosaic",
  ariaLabel,
  priority = false,
}) {
  const items = (products || []).filter(Boolean);
  if (!items.length) return null;

  const label = eyebrow || "Koleksiyon";
  const Cover = COVERS[variant] || CoverMosaic;

  return (
    <section
      id={id}
      className="scroll-mt-16 bg-[#f5f5f7] py-6 sm:py-10 lg:py-11"
      aria-label={ariaLabel || title}
    >
      <div className="pv-wrap">
        <Link
          href={href}
          className="group block outline-none"
        >
          <Cover
            items={items}
            priority={priority}
            label={label}
            title={title}
            description={description}
            linkLabel={linkLabel}
          />
        </Link>
      </div>
    </section>
  );
}
