"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import TrustStrip from "@/components/TrustStrip";
import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

const HERO_LINKS = [
  { href: "/fiyat-karsilastir", label: "Fiyat Karşılaştır", icon: Play, primary: true },
  { href: "#vitrin", label: "Vitrin", icon: ArrowRight },
  { href: "/blog", label: "Teknoloji Haberleri", icon: ArrowRight },
];

export default function HeroSection({ heroImages = [], heroVideo = "" }) {
  const hasVideo = Boolean(heroVideo);
  const hasPhotos = !hasVideo && heroImages.filter(Boolean).length > 0;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a] flex items-center">
      {/* Background */}
      {hasVideo ? (
        <HeroBackgroundVideo src={heroVideo} />
      ) : hasPhotos ? (
        <HeroBackgroundCarousel images={heroImages} />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-12 text-center lg:pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md border border-white/20">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="font-medium text-white/90">Türkiye’nin En Seçkin İkinci El Teknoloji Vitrin</span>
          </div>

          <h1 className="mt-8 text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tighter text-white leading-none">
            MEPOTIA
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-tight">
            Özenle seçilmiş, güvenilir ikinci el teknoloji ürünleri.<br />
            <span className="text-white/60">Her parça tek tek incelenir.</span>
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <HeroSearch variant="dark" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {HERO_LINKS.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                item.primary 
                  ? "bg-white text-black hover:bg-amber-400" 
                  : "border border-white/40 text-white hover:bg-white/10"
              }`}
            >
              {item.label}
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <TrustStrip />
      </div>
    </section>
  );
}
