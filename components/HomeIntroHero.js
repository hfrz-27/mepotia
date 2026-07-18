"use client";

import Link from "next/link";
import { LayoutGrid, Laptop, Package, Smartphone, Tablet } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";

const CATS = [
  { href: "/kategori/telefon", name: "Telefon", icon: Smartphone },
  { href: "/kategori/bilgisayar", name: "Bilgisayar", icon: Laptop },
  { href: "/kategori/tablet", name: "Tablet", icon: Tablet },
  { href: "/kategori/aksesuar", name: "Aksesuar", icon: Package },
  { href: "/kategoriler", name: "Tüm kategoriler", icon: LayoutGrid },
];

/**
 * Intro — arama + 5 kategori (yan yana, hizalı).
 */
export default function HomeIntroHero() {
  return (
    <section className="bg-[#f5f5f7] pt-5 pb-3 sm:pt-8 sm:pb-4" aria-label="Giriş">
      <div className="pv-wrap">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#86868b] uppercase">
            Mepotia
          </p>
          <h1 className="mt-1.5 text-[1.45rem] font-semibold leading-[1.1] tracking-[-0.035em] text-[#1d1d1f] sm:text-[1.85rem]">
            Özenle seçilmiş teknoloji.
          </h1>
          <p className="mt-1.5 text-[12px] text-[#6e6e73] sm:text-[13px]">
            Dürüst vitrin · şeffaf fiyat
          </p>

          <div className="mx-auto mt-4 max-w-md sm:mt-5">
            <HeroSearch variant="light" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-1.5 sm:mt-5 sm:gap-2.5">
          {CATS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col items-center gap-1.5 rounded-[14px] bg-white px-1 py-2.5 text-center ring-1 ring-black/[0.05] transition active:scale-[0.98] sm:rounded-[16px] sm:py-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-black group-hover:text-white sm:h-9 sm:w-9">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.65} />
                </span>
                <span className="line-clamp-2 px-0.5 text-[10px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[11px]">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
