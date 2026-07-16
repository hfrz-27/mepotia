"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import TrustStrip from "@/components/TrustStrip";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

const HERO_LINKS = [
  { href: "/fiyat-karsilastir", label: "Fiyat Karşılaştır", primary: true },
  { href: "#vitrin", label: "Vitrin" },
  { href: "/blog", label: "Haberler" },
];

export default function HeroSection({ heroImages = [], heroVideo = "" }) {
  const hasVideo = Boolean(heroVideo);
  const hasPhotos = !hasVideo && heroImages.filter(Boolean).length > 0;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-black flex items-center">
      {/* Background */}
      {hasVideo ? (
        <HeroBackgroundVideo src={heroVideo} />
      ) : hasPhotos ? (
        <HeroBackgroundCarousel images={heroImages} />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <div className="mx-auto max-w-4xl pt-20 lg:pt-32">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur border border-white/20 mb-6">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="uppercase tracking-widest text-white/90 text-xs font-medium">Premium İkinci El Teknoloji</span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-[6rem] font-display font-bold tracking-tighter text-white leading-none mb-6">
            MEPOTIA
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto leading-tight">
            Özenle seçilmiş ikinci el ürünler.<br className="hidden md:block" />
            Güvenilir • Şeffaf • Kaliteli
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <HeroSearch variant="dark" />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {HERO_LINKS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`group px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95 ${
                item.primary 
                  ? "bg-white text-black hover:bg-amber-300" 
                  : "border-2 border-white/60 text-white hover:bg-white hover:text-black"
              }`}
            >
              {item.label}
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl px-6">
        <TrustStrip />
      </div>
    </section>
  );
}
