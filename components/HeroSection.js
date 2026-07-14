"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Sparkles } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import TrustStrip from "@/components/TrustStrip";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import { ReviewThinStrip } from "@/components/HomeReviews";

export default function HeroSection({ heroImages = [], heroVideo = "" }) {
  const hasVideo = Boolean(heroVideo);
  const hasPhotos = !hasVideo && heroImages.filter(Boolean).length > 0;

  return (
    <section className="relative overflow-hidden bg-[#1c1f26]">
      {hasVideo ? (
        <HeroBackgroundVideo src={heroVideo} />
      ) : hasPhotos ? (
        <HeroBackgroundCarousel images={heroImages} />
      ) : (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#3a3f4b] via-[#252830] to-[#14161c]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.14)_0%,transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(255,255,255,0.06)_0%,transparent_50%)]"
            aria-hidden
          />
        </>
      )}
      <div className="hero-grid absolute inset-0 opacity-[0.07]" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-4 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[9px] font-semibold tracking-[0.26em] text-white/70 uppercase sm:text-[10px]">
            <Sparkles className="h-3 w-3 text-white/50" />
            Teknoloji · İkinci El · Güven
          </p>

          <h1 className="mt-5 font-display text-[2.65rem] leading-none font-semibold tracking-[0.22em] text-white uppercase sm:mt-6 sm:text-6xl lg:text-7xl">
            MEPOTIA
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:mt-5 sm:max-w-xl sm:text-base lg:text-lg">
            Özenle seçilmiş ikinci el ürünlerle dürüst ve şeffaf bir alışveriş deneyimi.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-2xl space-y-3 sm:mt-10 lg:max-w-3xl">
          <HeroSearch variant="dark" />

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link
              href="/fiyat-karsilastir"
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 px-3 py-3 text-[11px] font-semibold text-white transition hover:bg-white/15 sm:gap-2 sm:px-5 sm:py-3.5 sm:text-sm"
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
        <ReviewThinStrip variant="dark" showLabel mobileStatic duration={22} />
      </div>

      <div className="relative z-10 mx-auto -mt-1 max-w-6xl rounded-t-[2rem] bg-white px-4 pt-5 pb-6 shadow-[0_-24px_48px_-20px_rgba(0,0,0,0.35)] sm:-mt-16 sm:rounded-t-[2.5rem] sm:px-6 sm:pt-8 sm:pb-10 lg:px-10">
        <TrustStrip />
      </div>
    </section>
  );
}
