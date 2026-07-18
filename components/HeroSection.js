"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Search } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

export default function HeroSection({ heroImages = [], heroVideo = "" }) {
  const hasVideo = Boolean(heroVideo);
  const hasPhotos = !hasVideo && heroImages.filter(Boolean).length > 0;

  return (
    <section className="relative overflow-hidden border-b border-[#2a2a30] bg-[#070708]">
      {hasVideo ? (
        <div className="absolute inset-0 opacity-40">
          <HeroBackgroundVideo src={heroVideo} lightOverlay />
        </div>
      ) : hasPhotos ? (
        <div className="absolute inset-0 opacity-35">
          <HeroBackgroundCarousel images={heroImages} />
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[#070708]/75" aria-hidden />
      <div className="hero-grid absolute inset-0 opacity-80" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-7">
          <p className="sx-kicker">İkinci el teknoloji · 2026</p>
          <h1 className="sx-title mt-4 text-5xl sm:text-6xl lg:text-7xl">
            MEPOTIA
            <span className="block text-[#ff4d1a]">SIGNAL</span>
          </h1>
          <p className="sx-sub mt-5 max-w-md text-base">
            Özenle seçilmiş cihazlar. Net fiyat. Dürüst vitrin. Kaydırma yok — karar net.
          </p>

          <div className="mt-8 max-w-xl">
            <HeroSearch variant="dark" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/fiyat-karsilastir" className="sx-btn">
              <BadgeDollarSign className="h-4 w-4" />
              Fiyat karşılaştır
            </Link>
            <Link href="#vitrin" className="sx-btn-ghost">
              Vitrine bak
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/urun-iste" className="sx-btn-ghost">
              <Search className="h-4 w-4" />
              Ürün iste
            </Link>
          </div>
        </div>

        <div className="grid gap-px bg-[#2a2a30] lg:col-span-5">
          {[
            { k: "01", t: "Karşılaştır", d: "Fiyat + spek", href: "/fiyat-karsilastir" },
            { k: "02", t: "Sat", d: "Hızlı teklif al", href: "/bana-sat" },
            { k: "03", t: "İste", d: "Modelini yaz", href: "/urun-iste" },
            { k: "04", t: "Haber", d: "Güncel sinyal", href: "/teknoloji" },
          ].map((item) => (
            <Link
              key={item.k}
              href={item.href}
              className="group flex items-center justify-between gap-4 bg-[#111114] px-5 py-5 transition hover:bg-[#ff4d1a]"
            >
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase group-hover:text-white/70">
                  {item.k}
                </p>
                <p className="mt-1 font-[family-name:var(--font-syne)] text-xl font-bold text-white">
                  {item.t}
                </p>
                <p className="text-sm text-zinc-400 group-hover:text-white/80">{item.d}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
