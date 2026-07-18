"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

export default function HeroSection({ heroImages = [], heroVideo = "" }) {
  const hasVideo = Boolean(heroVideo);
  const hasPhotos = !hasVideo && heroImages.filter(Boolean).length > 0;

  return (
    <section className="relative flex min-h-[68svh] items-center justify-center overflow-hidden bg-black sm:min-h-[72svh]">
      {hasVideo ? (
        <div className="absolute inset-0">
          <HeroBackgroundVideo src={heroVideo} lightOverlay />
        </div>
      ) : hasPhotos ? (
        <div className="absolute inset-0">
          <HeroBackgroundCarousel images={heroImages} />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 35%, #2a2a2e 0%, #000 72%)",
          }}
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/80" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
        <p className="text-[11px] font-semibold tracking-wide text-white/55 sm:text-[12px]">
          Mepotia
        </p>
        <h1 className="mt-2 max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-[3.25rem]">
          Özenle seçilmiş
          <br className="hidden sm:block" /> teknoloji.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-snug font-normal text-white/65 sm:text-[17px]">
          Dürüst vitrin. Şeffaf fiyat. Güvenilir ikinci el.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-6">
          <Link
            href="/fiyat-karsilastir"
            className="inline-flex items-center gap-0.5 text-[15px] font-normal text-white/85 transition hover:text-white hover:underline hover:underline-offset-4"
          >
            Fiyat karşılaştır
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a
            href="#vitrin"
            className="inline-flex items-center gap-0.5 text-[15px] font-normal text-white/85 transition hover:text-white hover:underline hover:underline-offset-4"
          >
            Vitrine bak
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>

        <div className="mt-7 w-full max-w-lg sm:mt-8">
          <HeroSearch variant="dark" />
        </div>
      </div>
    </section>
  );
}
