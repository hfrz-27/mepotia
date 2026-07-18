"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { getPrimaryImage } from "@/lib/productDisplay";

/**
 * Ana sayfa alt “Ürünler” — sadece premium kapak (ürün grid/şerit yok).
 */
export default function HomeAllProductsGrid({ products = [], href = "/urunler" }) {
  const items = (products || []).filter(Boolean);
  // Kapak görseli: ilk gerçek ürün, yoksa null (soft gradient)
  const cover = items.find((p) => getPrimaryImage(p)) || items[0] || null;
  const coverSrc = cover ? getPrimaryImage(cover) : null;

  return (
    <section className="bg-[#f5f5f7] py-5 sm:py-8" aria-label="Ürünler">
      <div className="pv-wrap">
        <Link
          href={href}
          className="group relative block overflow-hidden rounded-[24px] bg-[#0a0a0a] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] sm:rounded-[32px]"
        >
          {/* Arka plan */}
          <div className="absolute inset-0">
            {coverSrc ? (
              <ProductImage
                src={coverSrc}
                alt=""
                fill
                priority
                className="object-cover scale-105 opacity-80 transition duration-[1.1s] ease-out group-hover:scale-110 group-hover:opacity-90"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#1c1c1e] via-[#2c2c2e] to-[#0a0a0a]" />
            )}
          </div>

          {/* Soft light / vignette — Apple kapak hissi */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl" />

          {/* İçerik */}
          <div className="relative flex min-h-[280px] flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[360px] sm:px-10 sm:py-20 lg:min-h-[420px]">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-white/55 uppercase sm:text-[12px]">
              Mepotia
            </p>
            <h2 className="mt-3 max-w-xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.75rem] md:text-[3.25rem]">
              Ürünler.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-white/65 sm:mt-4 sm:max-w-md sm:text-[17px]">
              Özenle seçilmiş ikinci el teknoloji vitrini.
            </p>

            <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition group-hover:bg-white/95 sm:mt-8 sm:px-7 sm:py-3.5 sm:text-[15px]">
              Vitrine gir
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
