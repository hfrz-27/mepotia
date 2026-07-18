"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage, isSold } from "@/lib/productDisplay";

/** Asymmetric market board — not the old product carousel. */
export default function HomeMarketBoard({
  title,
  kicker,
  products = [],
  href,
  linkLabel = "Tümü",
  id,
}) {
  if (!products.length) return null;
  const [hero, ...rest] = products;
  const side = rest.slice(0, 4);
  const row = rest.slice(4, 10);

  return (
    <section id={id} className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] text-lime-400 uppercase">{kicker}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">{title}</h2>
          </div>
          {href ? (
            <Link
              href={href}
              className="border border-lime-400 bg-lime-400 px-5 py-3 text-xs font-black tracking-wider text-black uppercase"
            >
              {linkLabel}
            </Link>
          ) : null}
        </div>

        <div className="grid gap-3 lg:grid-cols-12">
          {/* Big hero product */}
          <Link
            href={hero.demo ? "/ara" : `/urun/${hero.id}`}
            className="group relative min-h-[360px] overflow-hidden border border-white/10 bg-zinc-950 lg:col-span-7 lg:min-h-[480px]"
          >
            <ProductImage
              src={getPrimaryImage(hero)}
              alt={hero.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              {isSold(hero) ? (
                <span className="mb-3 inline-block bg-white px-3 py-1 text-[10px] font-black tracking-widest text-black uppercase">
                  Satıldı
                </span>
              ) : null}
              <p className="text-3xl font-black text-lime-400 sm:text-4xl">{formatPrice(hero.price)}</p>
              <h3 className="mt-2 max-w-lg text-xl font-bold sm:text-2xl">{hero.title}</h3>
              <p className="mt-1 text-sm text-white/50">{hero.city || "—"}</p>
            </div>
          </Link>

          {/* Side stack */}
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {side.map((p) => (
              <Link
                key={p.id}
                href={p.demo ? "/ara" : `/urun/${p.id}`}
                className="group flex gap-3 border border-white/10 bg-zinc-950 p-3 transition hover:border-lime-400/60"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-zinc-900 sm:h-28 sm:w-28">
                  <ProductImage
                    src={getPrimaryImage(p)}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 flex-1 py-1">
                  <p className="text-lg font-black text-lime-400">{formatPrice(p.price)}</p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-white/90">{p.title}</h3>
                  <p className="mt-2 text-[11px] text-white/40">{p.city || "—"} · {p.views ?? 0} bakış</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {row.length ? (
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {row.map((p) => (
              <Link
                key={p.id}
                href={p.demo ? "/ara" : `/urun/${p.id}`}
                className="border border-white/10 bg-zinc-950 transition hover:border-lime-400/50"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-900">
                  <ProductImage
                    src={getPrimaryImage(p)}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-black text-lime-400">{formatPrice(p.price)}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-white/70">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
