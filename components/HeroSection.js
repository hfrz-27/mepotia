"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Sparkles } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import TrustStrip from "@/components/TrustStrip";
import { ReviewThinStrip } from "@/components/HomeReviews";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bw-950">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=65"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bw-950 via-bw-950/95 to-bw-900" />
        <div className="hero-grid absolute inset-0 opacity-[0.14]" aria-hidden />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bw-950 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 pt-14 pb-4 sm:px-6 sm:pt-20 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[9px] font-semibold tracking-[0.26em] text-white/55 uppercase sm:text-[10px]">
            <Sparkles className="h-3 w-3 text-white/40" />
            Teknoloji · İkinci El · Güven
          </p>

          <h1 className="mt-5 font-display text-[2.65rem] leading-none font-semibold tracking-[0.2em] text-white uppercase sm:mt-6 sm:text-6xl lg:text-7xl">
            Mepotia
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:mt-5 sm:max-w-xl sm:text-base">
            Özenle seçilmiş ikinci el ürünlerle dürüst ve şeffaf bir alışveriş deneyimi.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-xl space-y-3 sm:mt-8">
          <HeroSearch variant="dark" />

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link
              href="/fiyat-karsilastir"
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/12 bg-white/[0.04] px-3 py-3 text-[11px] font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/[0.08] sm:gap-2 sm:px-5 sm:py-3.5 sm:text-sm"
            >
              <BadgeDollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Fiyat karşılaştır
            </Link>
            <a
              href="#vitrin"
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white px-3 py-3 text-[11px] font-semibold text-bw-950 shadow-[0_12px_32px_-16px_rgba(255,255,255,0.35)] transition hover:bg-bw-100 sm:gap-2 sm:px-5 sm:py-3.5 sm:text-sm"
            >
              Vitrine bak
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-5 md:hidden">
        <ReviewThinStrip variant="dark" showLabel pauseOnHover={false} duration={22} />
      </div>

      <div className="relative z-10 mx-auto -mt-1 max-w-5xl rounded-t-[2rem] bg-white px-4 pt-5 pb-6 shadow-[0_-24px_48px_-20px_rgba(0,0,0,0.35)] sm:-mt-16 sm:rounded-t-[2.5rem] sm:px-6 sm:pt-6 sm:pb-8 lg:px-8">
        <TrustStrip />
      </div>
    </section>
  );
}
