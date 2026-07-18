"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug || "telefon");
  const active = items.find((c) => c.slug === activeSlug) || items[0];
  const activeProducts =
    productsByCategory[activeSlug] || productsByCategory[items[0]?.slug] || [];

  return (
    <div className="border-b border-[#2a2a30]">
      <div className="sx-wrap !pb-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="sx-kicker">Katalog</p>
            <h2 className="sx-title mt-2 text-3xl sm:text-4xl">Kategoriler</h2>
            <p className="sx-sub mt-2">Birini seç — vitrin anında değişir.</p>
          </div>
          <Link href="/kategoriler" className="sx-btn-ghost">
            Tüm katalog
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-px bg-[#2a2a30] sm:grid-cols-3 md:grid-cols-5">
          {items.map((cat) => {
            const Icon = cat.icon;
            const on = cat.slug === activeSlug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveSlug(cat.slug)}
                aria-pressed={on}
                className={[
                  "flex min-h-[96px] flex-col items-start justify-between gap-3 p-4 text-left transition sm:min-h-[110px]",
                  on ? "bg-[#ff4d1a] text-white" : "bg-[#111114] text-zinc-300 hover:bg-[#18181c]",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-tight sm:text-base">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#0c0c0f] py-10 sm:py-12">
        <div className="sx-wrap !py-0 mb-8">
          <p className="sx-kicker">{active?.name}</p>
          <h3 className="sx-title mt-2 text-2xl sm:text-3xl">{active?.description}</h3>
        </div>
        <HomeProductScroll
          key={activeSlug}
          products={activeProducts}
          href={active ? `/kategori/${active.slug}` : undefined}
          linkLabel="Kategoriyi aç"
          prefetchCount={4}
          ariaLabel={`${active?.name} ürünleri`}
        />
      </div>
    </div>
  );
}
