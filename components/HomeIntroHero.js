"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  HandCoins,
  LayoutGrid,
  MessageCircleMore,
} from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import ProductImage from "@/components/ProductImage";

const CHIP_SLUGS = ["telefon", "bilgisayar", "tablet", "aksesuar"];

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "Durumu açıkça belirtilir" },
  { icon: MessageCircleMore, label: "Doğrudan iletişim" },
];

/**
 * Ana sayfanın iki temel yolunu aynı anda anlatır:
 * ürün keşfetmek ve cihazını Mepotia'ya satmak.
 */
export default function HomeIntroHero({ categories = [] }) {
  const bySlug = new Map((categories || []).filter(Boolean).map((c) => [c.slug, c]));
  const chips = CHIP_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);

  return (
    <section className="bg-white" aria-label="Mepotia giriş">
        <div className="relative overflow-hidden bg-[#07070a] text-white">
          <div className="absolute inset-0" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/mepotia-hero-tech.webp"
              alt=""
              className="h-full w-full object-cover object-center"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <span className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-violet-600/30 blur-[90px]" />
            <span className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-blue-500/25 blur-[110px]" />
            <span className="absolute bottom-[-10rem] left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[100px]" />
            <span className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
          </div>

          <div className="relative min-h-[640px] lg:min-h-[720px]">
            <div className="mx-auto flex min-h-[640px] w-full max-w-[1440px] flex-col justify-center px-6 py-16 sm:px-12 lg:min-h-[720px] lg:px-20 xl:px-28">
              <div className="max-w-[620px]">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.13em] text-white/75 uppercase backdrop-blur-md sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                Kişisel ikinci el teknoloji vitrini
              </p>

              <h1 className="mt-6 max-w-2xl text-[2.8rem] font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-[4.5rem] lg:text-[5.4rem]">
                Yeni nesil
                <span className="block bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                  teknoloji vitrini.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/64 sm:mt-5 sm:text-[18px]">
                Telefon, bilgisayar, oyun ve aksesuar dünyasını tek bir premium vitrinde keşfet.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <Link
                  href="/urunler"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
                >
                  Ürünleri incele
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
                <Link
                  href="/bana-sat"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-6 text-[14px] font-semibold text-white backdrop-blur-md transition hover:bg-white/[0.13] active:scale-[0.98]"
                >
                  <HandCoins className="h-4 w-4" strokeWidth={1.8} />
                  Cihazını sat
                </Link>
              </div>

              <div className="mt-6 max-w-xl rounded-[18px] border border-white/12 bg-black/25 p-2 backdrop-blur-xl sm:mt-7">
                <HeroSearch variant="dark" />
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {TRUST_POINTS.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-white/55 sm:text-[12px]">
                    <Icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={1.8} />
                    {label}
                  </span>
                ))}
              </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mx-auto grid max-w-[1180px] grid-cols-5 gap-1.5 bg-white px-3 py-4 sm:gap-3 sm:px-6 sm:py-6">
          {chips.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex min-w-0 flex-col items-center gap-2 px-1 py-2 text-center transition active:scale-[0.98]"
            >
              <span className="relative h-10 w-10 overflow-hidden rounded-full bg-[#f5f5f7] ring-1 ring-black/[0.05] sm:h-12 sm:w-12">
                <ProductImage
                  src={cat.cover}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="line-clamp-2 px-0.5 text-[9px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[11px]">
                {cat.name}
              </span>
            </Link>
          ))}

          <Link
            href="/kategoriler"
              className="group flex min-w-0 flex-col items-center gap-2 px-1 py-2 text-center transition active:scale-[0.98]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-black group-hover:text-white sm:h-12 sm:w-12">
              <LayoutGrid className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.65} />
            </span>
            <span className="line-clamp-2 px-0.5 text-[9px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[11px]">
              Tüm kategoriler
            </span>
          </Link>
        </div>
    </section>
  );
}
