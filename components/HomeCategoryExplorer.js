"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

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
          <Link
            href="/kategoriler"
            className="inline-flex min-h-[40px] items-center gap-0.5 text-[13px] font-semibold text-[#1d1d1f] sm:text-[14px]"
          >
            Tümü
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        {/* Her zaman 3 kolon → 9 kutu, tam dolu, kısa yükseklik */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
          {items.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="group flex flex-col items-center gap-1.5 rounded-[14px] bg-white px-1.5 py-3 text-center ring-1 ring-black/[0.05] transition active:scale-[0.98] sm:gap-2 sm:rounded-[18px] sm:px-3 sm:py-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-black group-hover:text-white sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.6} />
                </span>
                <span className="line-clamp-2 px-0.5 text-[11px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[13px]">
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
