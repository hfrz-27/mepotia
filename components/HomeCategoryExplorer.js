"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, LayoutGrid } from "lucide-react";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";
import HomeProductScroll from "@/components/HomeProductScroll";

export default function HomeCategoryExplorer({ categories = [], productsByCategory = {} }) {
  const items = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c]));
    return TECH_CATEGORY_CATALOG.map((cat) => ({
      ...cat,
      catalogOnly: !bySlug.get(cat.slug) || bySlug.get(cat.slug).catalogOnly,
    }));
  }, [categories]);

  const activeSlug = items[0]?.slug || "telefon";
  const [directoryOpen, setDirectoryOpen] = useState(false);

  const active = items.find((c) => c.slug === activeSlug) || items[0];
  const activeProducts = productsByCategory[activeSlug] || productsByCategory[items[0]?.slug] || [];
  const inactiveItems = items.filter((cat) => cat.slug !== activeSlug);
  const ActiveIcon = active?.icon;

  const categoryButtonClass = (selected) =>
    `shrink-0 whitespace-nowrap rounded-xl font-semibold tracking-tight transition ${
      selected
        ? "bg-bw-950 text-white shadow-[0_4px_14px_-6px_rgba(0,0,0,0.45)]"
        : "border border-bw-300 text-bw-700 hover:border-bw-950 hover:bg-[#f5f5f7] hover:text-bw-950"
    }`;

  const categorySearchHref = (category) => `/kategori/${category.slug}`;

  return (
    <div className="bg-white">
      <div className="relative border-b border-bw-200/80 bg-white shadow-[0_8px_24px_-20px_rgba(0,0,0,0.18)] sm:bg-gradient-to-b sm:from-[#f5f5f7] sm:via-[#f8f8fa] sm:to-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setDirectoryOpen((open) => !open)}
              aria-label="Tüm kategoriler"
              aria-expanded={directoryOpen}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-bw-950 bg-white text-bw-950"
            >
              <LayoutGrid className="h-4 w-4" strokeWidth={1.75} />
            </button>

            {active ? (
              <Link href={categorySearchHref(active)} className={`inline-flex shrink-0 items-center gap-2 border-2 border-bw-950 px-3 py-2 text-sm ${categoryButtonClass(true)}`}>
                {ActiveIcon ? (
                  <ActiveIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                ) : null}
                <span>{active.name}</span>
              </Link>
            ) : null}

            <nav
              aria-label="Diğer kategoriler"
              className="hide-scrollbar news-touch-scroll flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto rounded-2xl border-2 border-bw-950 bg-white p-1.5"
            >
              {inactiveItems.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link key={cat.slug} href={categorySearchHref(cat)} className={`inline-flex shrink-0 items-center gap-2 px-3 py-2 text-sm ${categoryButtonClass(false)}`}>
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden flex-col items-center gap-3 sm:flex sm:flex-row sm:justify-center sm:gap-4">
            <button
              type="button"
              onClick={() => setDirectoryOpen((open) => !open)}
              aria-expanded={directoryOpen}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-2xl border border-white/80 bg-white px-5 py-3 text-sm font-semibold text-bw-900 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] transition hover:border-bw-200 hover:shadow-[0_8px_28px_-10px_rgba(0,0,0,0.18)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f5f5f7]">
                <LayoutGrid className="h-4 w-4 text-bw-800" strokeWidth={1.75} />
              </span>
              <span>Tüm Kategoriler</span>
              <ChevronDown className={`h-4 w-4 text-bw-500 transition-transform ${directoryOpen ? "rotate-180" : ""}`} strokeWidth={1.75} />
            </button>

            <nav
              aria-label="Kategoriler"
              className="hide-scrollbar inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-bw-200/70 bg-white/70 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_16px_-10px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:gap-1.5 sm:p-2"
            >
              {items.map((cat) => {
                const selected = cat.slug === activeSlug;
                return (
                  <Link key={cat.slug} href={categorySearchHref(cat)} aria-current={selected ? "page" : undefined} className={`px-4 py-2.5 text-[15px] sm:px-5 ${categoryButtonClass(selected)}`}>
                    {cat.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {directoryOpen ? (
            <div className="relative z-20 mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.35rem] border border-bw-200 bg-white p-2.5 shadow-[0_20px_48px_-34px_rgba(0,0,0,.3)] sm:mt-4 sm:p-3">
              <div className="mb-2 flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-bw-500">Kategori rehberi</p>
                  <p className="hidden mt-1 text-sm text-bw-600">Bir kategori seçerek ilanları doğrudan aç.</p>
                </div>
                <Link href="/kategoriler" className="inline-flex items-center gap-1.5 rounded-xl border border-bw-200 px-3 py-1.5 text-[10px] font-semibold text-bw-700 transition hover:bg-bw-50">Tümünü gör <ExternalLink className="h-3 w-3" /></Link>
              </div>
              <div className="hide-scrollbar news-touch-scroll flex gap-2 overflow-x-auto pb-0.5">
                {items.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.slug} className="relative w-[8.75rem] shrink-0 rounded-xl border border-bw-100 bg-bw-50 p-2.5 transition hover:border-bw-300 hover:bg-white">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-bw-800 shadow-sm"><Icon className="h-4 w-4" /></span>
                        <Link href={categorySearchHref(category)} className="text-sm font-semibold text-bw-950 hover:underline after:absolute after:inset-0">{category.name}</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="bg-white py-6 sm:bg-gradient-to-b sm:from-white sm:to-bw-50/60 sm:py-7">
        <div className="mx-auto mb-5 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold tracking-[0.2em] text-bw-500 uppercase">
            {active?.name} vitrini
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-bw-950 sm:text-2xl">
            {active?.description}
          </h3>
        </div>

        <HomeProductScroll
          key={activeSlug}
          products={activeProducts}
          href={active ? `/kategori/${active.slug}` : undefined}
          linkLabel={`Tüm ${active?.name?.toLowerCase()} ilanları`}
          prefetchCount={2}
          ariaLabel={`${active?.name} ürünleri`}
        />
      </div>
    </div>
  );
}
