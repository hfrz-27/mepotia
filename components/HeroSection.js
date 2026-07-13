"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, Heart, Sparkles } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";

const TRUST = [
  {
    icon: ShieldCheck,
    t: "Güvenle Al, Güvenle Sat",
    d: "Güvenle alışveriş edebileceğiniz bir vitrin.",
  },
  {
    icon: Eye,
    t: "Şeffaf sunum",
    d: "Net fiyat, net açıklama",
  },
  {
    icon: Heart,
    t: "Dürüstlüğün Değeri",
    d: "Zorlu yollardan gelen tecrübe",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Arka plan katmanları */}
      <div className="absolute inset-0 bg-bw-950">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="hero-kenburns object-cover object-center opacity-40 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bw-950/90 via-bw-900/75 to-bw-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(255,255,255,0.14)_0%,transparent_65%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.35]" aria-hidden />
        <div className="hero-orb hero-orb-a" aria-hidden />
        <div className="hero-orb hero-orb-b" aria-hidden />
        <div className="hero-orb hero-orb-c" aria-hidden />
        <div className="hero-scanline absolute inset-0 opacity-[0.04]" aria-hidden />
      </div>

      {/* İçerik */}
      <div className="relative mx-auto flex min-h-[82vh] max-w-4xl flex-col items-center justify-center px-4 pb-32 pt-20 text-center sm:px-6 lg:px-8">
        <div className="hero-content-glass animate-fade-up w-full max-w-3xl rounded-[2rem] border border-white/10 px-6 py-10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] backdrop-blur-md sm:px-10 sm:py-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.24em] text-bw-300 uppercase">
            <Sparkles className="h-3 w-3 text-amber-300/90" />
            Teknoloji · İkinci El · Güven
          </p>

          <h1 className="hero-title-shine mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-[0.16em] text-white uppercase sm:text-6xl lg:text-7xl">
            MEPOTIA
          </h1>

          <p className="animate-fade-up-delay mx-auto mt-5 max-w-xl text-base leading-relaxed text-bw-300 sm:text-lg">
            Sadece ürün değil, güven sunuyoruz. Özenle seçilmiş ikinci el ürünlerle
            dürüst ve şeffaf bir alışveriş deneyimi.
          </p>

          <HeroSearch variant="dark" />

          <div className="animate-fade-up-delay mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#vitrin"
              className="hero-btn-primary group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-bw-950 transition hover:bg-bw-100"
            >
              Vitrine bak
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#al-sat"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
            >
              Sat · İste
            </a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="animate-soft-in grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/95 px-5 py-5 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-6">
          {TRUST.map((item) => (
            <div key={item.t} className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-bw-200 bg-bw-50 text-bw-900">
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-bw-950">{item.t}</p>
                <p className="text-xs text-bw-500">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
