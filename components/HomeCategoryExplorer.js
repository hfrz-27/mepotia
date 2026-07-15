"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";
import { getCategoryHref } from "@/lib/categoryDemoProducts";
import HomeProductScroll from "@/components/HomeProductScroll";

export default function HomeCategoryExplorer({ categories = [], productsByCategory = {} }) {
  const items = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c]));
    return TECH_CATEGORY_CATALOG.map((cat) => ({
      ...cat,
      href: getCategoryHref(cat.slug, categories),
      catalogOnly: !bySlug.get(cat.slug) || bySlug.get(cat.slug).catalogOnly,
    }));
  }, [categories]);

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug || "telefon");

  const active = items.find((c) => c.slug === activeSlug) || items[0];
  const activeProducts = productsByCategory[activeSlug] || productsByCategory[items[0]?.slug] || [];

  return (
    <div className="border-t border-bw-200/70 bg-white">
      <div className="border-b border-bw-200/70 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-8">
          <Link
            href="/kategoriler"
            prefetch
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-2.5 text-sm font-medium text-bw-800 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition hover:bg-[#ebebed]"
          >
            <LayoutGrid className="h-4 w-4 text-bw-700" strokeWidth={1.75} />
            <span>Tüm Kategoriler</span>
            <ChevronDown className="h-4 w-4 text-bw-500" strokeWidth={1.75} />
          </Link>

          <span className="hidden h-7 w-px shrink-0 bg-bw-200/80 sm:block" aria-hidden />

          <nav
            aria-label="Kategoriler"
            className="hide-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1"
          >
            {items.map((cat) => {
              const selected = cat.slug === activeSlug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveSlug(cat.slug)}
                  aria-pressed={selected}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium tracking-tight transition sm:px-4 ${
                    selected
                      ? "bg-bw-950 text-white shadow-sm"
                      : "text-bw-600 hover:bg-bw-50 hover:text-bw-950"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="bg-bw-50/50 py-5 sm:py-6">
        <div className="mx-auto mb-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-wide text-bw-500 uppercase">
            {active?.name} vitrini
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-bw-950 sm:text-xl">
            {active?.description}
          </h3>
        </div>

        <HomeProductScroll
          key={activeSlug}
          products={activeProducts}
          href={active?.href}
          linkLabel={`Tüm ${active?.name?.toLowerCase()} ilanları`}
          prefetchCount={2}
          ariaLabel={`${active?.name} ürünleri`}
          fadeFrom="from-bw-50/50"
        />
      </div>
    </div>
  );
}
