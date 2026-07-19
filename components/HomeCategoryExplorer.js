"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";
import { appleTextLinkClassSm } from "@/lib/appleUi";

/**
 * Kompakt 3×3 — mobilde de kısa, alt alta uzun liste yok.
 */
export default function HomeCategoryExplorer({ categories = [] }) {
  const items = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c]));
    return TECH_CATEGORY_CATALOG.map((cat) => ({
      ...cat,
      catalogOnly: !bySlug.get(cat.slug) || bySlug.get(cat.slug).catalogOnly,
    }));
  }, [categories]);

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Kategoriler">
      <div className="pv-wrap">
        <div className="mb-3 flex items-end justify-between gap-2 sm:mb-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#86868b] uppercase sm:text-[11px]">
              Keşfet
            </p>
            <h2 className="mt-0.5 text-[1.25rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[1.75rem]">
              Kategoriler
            </h2>
          </div>
          <Link href="/kategoriler" className={appleTextLinkClassSm}>
            Tümü
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {items.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="group relative min-h-[150px] overflow-hidden rounded-[16px] bg-white p-4 ring-1 ring-black/[0.05] transition hover:-translate-y-0.5 active:scale-[0.98] sm:min-h-[190px] sm:rounded-[22px] sm:p-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.photo} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1d1d1f] backdrop-blur-sm sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.6} />
                </span>
                <span className="absolute inset-x-4 bottom-4 line-clamp-2 text-left text-[14px] font-semibold leading-tight tracking-[-0.02em] text-white sm:inset-x-5 sm:bottom-5 sm:text-[17px]">
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
