"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, ShieldCheck, Eye, Heart } from "lucide-react";
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
      <div className="absolute inset-0 bg-bw-950">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=65"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-bw-950/92 via-bw-900/88 to-bw-950/96" />
        <div className="hero-grid absolute inset-0 opacity-20" aria-hidden />
      </div>

      <div className="relative mx-auto flex min-h-[82vh] max-w-4xl flex-col items-center justify-center px-4 pb-32 pt-20 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-up w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] px-6 py-10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] sm:px-10 sm:py-12">
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.24em] text-bw-300 uppercase">
            Teknoloji · İkinci El · Güven
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-[0.16em] text-white uppercase sm:text-6xl lg:text-7xl">
            MEPOTIA
          </h1>

          <p className="animate-fade-up-delay mx-auto mt-5 max-w-xl text-base leading-relaxed text-bw-300 sm:text-lg">
            Sadece ürün değil, güven sunuyoruz. Özenle seçilmiş ikinci el ürünlerle
            dürüst ve şeffaf bir alışveriş deneyimi.
          </p>

          <HeroSearch variant="dark" />

          <div className="animate-fade-up-delay mt-8 grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <Link
              href="/fiyat-karsilastir"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-3 py-3.5 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:px-7 sm:text-sm"
            >
              <BadgeDollarSign className="h-4 w-4" />
              Fiyat karşılaştır
            </Link>
            <a
              href="#vitrin"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-3.5 text-xs font-semibold text-bw-950 transition hover:bg-bw-100 sm:px-7 sm:text-sm"
            >
              Vitrine bak
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-bw-200 bg-white px-5 py-5 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-6">
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
