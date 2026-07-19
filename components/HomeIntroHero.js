"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import ProductImage from "@/components/ProductImage";

const CHIP_SLUGS = ["telefon", "bilgisayar", "tablet", "aksesuar"];

/**
 * Apple tarzı manşet + arama + fotoğraflı kategori chip’leri.
 */
export default function HomeIntroHero({ categories = [] }) {
  const bySlug = new Map((categories || []).filter(Boolean).map((c) => [c.slug, c]));
  const chips = CHIP_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);

  return (
    <section className="bg-[#f5f5f7] pt-8 pb-6 sm:pt-12 sm:pb-8" aria-label="Giriş">
      <div className="pv-wrap">
        {/* En üst — Apple manşet dilinde Mepotia */}
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#1d1d1f] sm:text-[2.75rem] md:text-[3.25rem]">
            Mepotia deneyimi.
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-[15px] font-normal leading-snug tracking-[-0.015em] text-[#6e6e73] sm:mt-3 sm:text-[19px] md:text-[21px]">
            Güvenilir ikinci el teknolojiyle daha da fazlasını yapın.
          </p>
        </header>

        <div className="mx-auto mt-6 max-w-md sm:mt-8">
          <HeroSearch variant="light" />
        </div>

        <div className="mt-5 grid grid-cols-5 gap-1.5 sm:mt-6 sm:gap-2.5">
          {chips.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group flex flex-col items-center gap-1.5 rounded-[14px] bg-white px-1 py-2.5 text-center ring-1 ring-black/[0.05] transition active:scale-[0.98] sm:rounded-[16px] sm:py-3"
            >
              <span className="relative h-11 w-11 overflow-hidden rounded-full bg-[#f5f5f7] ring-1 ring-black/[0.05] transition group-hover:ring-black/15 sm:h-12 sm:w-12">
                <ProductImage
                  src={cat.cover}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="line-clamp-2 px-0.5 text-[10px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[11px]">
                {cat.name}
              </span>
            </Link>
          ))}

          <Link
            href="/kategoriler"
            className="group flex flex-col items-center gap-1.5 rounded-[14px] bg-white px-1 py-2.5 text-center ring-1 ring-black/[0.05] transition active:scale-[0.98] sm:rounded-[16px] sm:py-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-black group-hover:text-white sm:h-12 sm:w-12">
              <LayoutGrid className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.65} />
            </span>
            <span className="line-clamp-2 px-0.5 text-[10px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[11px]">
              Tüm kategoriler
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
