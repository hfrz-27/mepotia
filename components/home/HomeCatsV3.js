"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";
import HomeMarketBoard from "@/components/home/HomeMarketBoard";

export default function HomeCatsV3({ categories = [], productsByCategory = {} }) {
  const items = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c]));
    return TECH_CATEGORY_CATALOG.map((cat) => ({
      ...cat,
      catalogOnly: !bySlug.get(cat.slug) || bySlug.get(cat.slug).catalogOnly,
    }));
  }, [categories]);

  const [active, setActive] = useState(items[0]?.slug || "telefon");
  const current = items.find((c) => c.slug === active) || items[0];
  const products = productsByCategory[active] || productsByCategory[items[0]?.slug] || [];

  return (
    <section className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] text-lime-400 uppercase">Radar</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Kategori seç</h2>
          </div>
          <Link href="/kategoriler" className="text-xs font-bold tracking-widest text-white/50 uppercase hover:text-lime-400">
            Tüm katalog →
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((cat) => {
            const on = cat.slug === active;
            const Icon = cat.icon;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActive(cat.slug)}
                className={[
                  "inline-flex shrink-0 items-center gap-2 border px-4 py-3 text-sm font-bold tracking-wide uppercase transition",
                  on
                    ? "border-lime-400 bg-lime-400 text-black"
                    : "border-white/15 bg-transparent text-white/70 hover:border-white/40",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {products.length ? (
        <HomeMarketBoard
          kicker={`${current?.name || ""} board`}
          title={current?.description || "Vitrin"}
          products={products}
          href={current ? `/kategori/${current.slug}` : undefined}
          linkLabel="Kategoriye gir"
        />
      ) : (
        <div className="border-t border-white/10 px-5 py-16 text-center text-sm text-white/40">
          Bu kategoride henüz ürün yok.
        </div>
      )}
    </section>
  );
}
