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
    <section className="bg-[#f5f5f7] pt-3 pb-5 sm:pt-5 sm:pb-8" aria-label="Mepotia giriş">
      <div className="pv-wrap">
        <div className="relative overflow-hidden rounded-[26px] bg-[#07070a] text-white shadow-[0_32px_90px_-42px_rgba(0,0,0,0.9)] sm:rounded-[34px]">
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

          <div className="relative min-h-[560px] lg:min-h-[610px]">
            <div className="flex min-h-[560px] max-w-3xl flex-col justify-center px-5 py-9 sm:px-9 sm:py-12 lg:min-h-[610px] lg:max-w-[62%] lg:px-14 lg:py-16">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.13em] text-white/75 uppercase backdrop-blur-md sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                Kişisel ikinci el teknoloji vitrini
              </p>

              <h1 className="mt-5 max-w-2xl text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[3.7rem] lg:text-[4.25rem]">
                Teknolojiyi
                <span className="block bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                  güvenle keşfet.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/64 sm:mt-5 sm:text-[18px]">
                Telefon, bilgisayar ve aksesuarlar tek elden seçilir; ürünün durumu net
                anlatılır, iletişim doğrudan kurulur.
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

        <div className="mt-3 grid grid-cols-5 gap-1.5 sm:mt-4 sm:gap-2.5">
          {chips.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex min-w-0 flex-col items-center gap-1.5 rounded-[14px] bg-white px-1 py-2.5 text-center ring-1 ring-black/[0.05] transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] sm:rounded-[18px] sm:py-3.5"
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
            className="group flex min-w-0 flex-col items-center gap-1.5 rounded-[14px] bg-white px-1 py-2.5 text-center ring-1 ring-black/[0.05] transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] sm:rounded-[18px] sm:py-3.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-black group-hover:text-white sm:h-12 sm:w-12">
              <LayoutGrid className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.65} />
            </span>
            <span className="line-clamp-2 px-0.5 text-[9px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[11px]">
              Tüm kategoriler
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
