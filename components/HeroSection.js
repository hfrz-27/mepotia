"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Sparkles } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import TrustStrip from "@/components/TrustStrip";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import { ReviewThinStrip } from "@/components/HomeReviews";

const HERO_LINKS = [
  { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır", icon: BadgeDollarSign, primary: true },
  { href: "#vitrin", label: "Vitrine bak", icon: ArrowRight, primary: false },
  { href: "/teknoloji", label: "Haberlere git", icon: ArrowRight, primary: false },
];

export default function HeroSection({ heroImages = [], heroVideo = "" }) {
  const hasVideo = Boolean(heroVideo);
  const hasPhotos = !hasVideo && heroImages.filter(Boolean).length > 0;

  return (
    <section className="relative overflow-hidden bg-[#1c1f26]">
      {hasVideo ? (
        <HeroBackgroundVideo src={heroVideo} lightOverlay />
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

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-2 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="text-center lg:mx-auto lg:max-w-3xl">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-0.5 text-[9px] font-semibold tracking-[0.22em] text-white/70 uppercase">
            <Sparkles className="h-2.5 w-2.5 text-white/50" />
            Teknoloji · İkinci El · Güven
          </p>

          <h1 className="mt-4 font-display text-[2.1rem] leading-none font-semibold tracking-[0.2em] text-white uppercase sm:text-5xl lg:text-6xl">
            MEPOTIA
          </h1>

          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-white/65 sm:text-sm">
            Özenle seçilmiş ikinci el teknoloji ürünleri — dürüst ve şeffaf vitrin.
          </p>
        </div>

        <div className="mx-auto mt-5 max-w-xl space-y-2.5 sm:mt-6 lg:max-w-2xl">
          <HeroSearch variant="dark" />

          <div className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:flex-nowrap sm:justify-center sm:gap-2.5">
            {HERO_LINKS.map((item) => {
              const Icon = item.icon;
              const className = item.primary
                ? "inline-flex items-center justify-center gap-1 rounded-full border border-white/30 bg-white px-2 py-2 text-[9px] font-semibold leading-tight text-bw-950 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.55)] transition hover:bg-bw-50 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-xs"
                : "inline-flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-2 text-[9px] font-semibold leading-tight text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/18 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-xs";
              const inner = (
                <>
                  <Icon className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                  <span className="text-center">{item.label}</span>
                </>
              );

              return item.href.startsWith("#") ? (
                <a key={item.href} href={item.href} className={className}>
                  {inner}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl rounded-t-[1.5rem] border border-white/70 bg-gradient-to-b from-white via-[#fafafa] to-[#f3f3f5] px-4 pt-3 pb-3 shadow-[0_-18px_44px_-22px_rgba(0,0,0,0.32)] ring-1 ring-bw-200/40 sm:mt-4 sm:rounded-t-[1.75rem] sm:px-6 sm:pt-3.5 sm:pb-3.5 lg:px-8">
        <TrustStrip />

        <div className="mt-2.5 hidden border-t border-bw-200/50 pt-2.5 sm:mt-3 sm:block sm:pt-3">
          <ReviewThinStrip
            variant="light"
            showLabel
            duration={32}
            mobileStatic={false}
            compact
            className="border-0 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
          />
        </div>
      </div>
    </section>
  );
}
