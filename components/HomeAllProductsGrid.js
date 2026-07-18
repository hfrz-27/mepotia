"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage, isSold } from "@/lib/productDisplay";
import { appleTextLinkClassSm } from "@/lib/appleUi";

/**
 * Ana sayfa alt “Ürünler” — Apple tarzı hero + ürün şeridi.
 */
export default function HomeAllProductsGrid({ products = [], href = "/urunler" }) {
  const items = (products || []).filter(Boolean);
  if (!items.length) return null;

  const hero = items[0];
  const strip = items.slice(0, 8);
  const soldHero = isSold(hero);
  const heroHref = hero.demo ? href : `/urun/${hero.id}`;

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Ürünler">
      <div className="pv-wrap">
        {/* Manşet */}
        <header className="mb-4 text-center sm:mb-6">
          <p className="text-[11px] font-semibold tracking-[-0.01em] text-[#6e6e73] sm:text-[12px]">
            Vitrin
          </p>
          <h2 className="mt-1 text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.035em] text-[#1d1d1f] sm:text-[2.35rem] md:text-[2.75rem]">
            Ürünler.
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-snug text-[#6e6e73] sm:mt-2 sm:text-[16px]">
            Özenle seçilmiş ikinci el teknoloji — keşfet, karşılaştır, güvenle al.
          </p>
          <div className="mt-3 flex justify-center sm:mt-4">
            <Link href={href} className={appleTextLinkClassSm}>
              Tüm ürünleri gör
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </header>

        {/* Hero kart */}
        <Link
          href={heroHref}
          className="group relative block overflow-hidden rounded-[22px] bg-black shadow-xl sm:rounded-[28px]"
        >
          <div className="relative min-h-[240px] sm:min-h-[340px] lg:min-h-[400px]">
            <div className="absolute inset-0">
              <ProductImage
                src={getPrimaryImage(hero)}
                alt={hero.title || ""}
                fill
                priority
                className={[
                  "object-cover transition duration-700 ease-out group-hover:scale-[1.03]",
                  soldHero ? "grayscale" : "",
                ].join(" ")}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

            <div className="relative flex h-full min-h-[240px] flex-col justify-end p-5 sm:min-h-[340px] sm:p-8 lg:min-h-[400px] lg:p-10">
              <span className="w-fit rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase sm:text-[11px]">
                Vitrin
              </span>
              <h3 className="mt-3 max-w-xl text-[1.4rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2rem] md:text-[2.35rem]">
                {hero.title || "Öne çıkan ürün"}
              </h3>
              {hero.price != null ? (
                <p className="mt-2 text-[15px] font-semibold tabular-nums text-white/90 sm:text-[17px]">
                  {formatPrice(hero.price)}
                </p>
              ) : null}
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-black sm:mt-5 sm:px-5 sm:text-[14px]">
                İncele
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </div>
          </div>
        </Link>

        {/* Alt ürün şeridi */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:gap-3 hide-scrollbar news-touch-scroll">
          {strip.map((product, index) => {
            const sold = isSold(product);
            const demo = Boolean(product.demo);
            const productHref = demo ? href : `/urun/${product.id}`;
            return (
              <Link
                key={product.id}
                href={productHref}
                prefetch={index < 4 && !demo}
                className={[
                  "group w-[42%] max-w-[160px] shrink-0 overflow-hidden rounded-[16px] bg-white ring-1 ring-black/[0.05] transition active:scale-[0.99] sm:w-[18%] sm:max-w-none sm:rounded-[18px]",
                  sold ? "opacity-70" : "",
                ].join(" ")}
              >
                <div className="relative aspect-square overflow-hidden bg-[#ececef]">
                  <ProductImage
                    src={getPrimaryImage(product)}
                    alt={product.title || ""}
                    fill
                    className={[
                      "object-cover transition duration-500 group-hover:scale-[1.04]",
                      sold ? "grayscale" : "",
                    ].join(" ")}
                  />
                </div>
                <div className="px-2 py-2 sm:px-2.5 sm:py-2.5">
                  <p className="line-clamp-1 text-[11px] font-medium leading-snug text-[#1d1d1f] sm:text-[12px]">
                    {product.title}
                  </p>
                  <p className="mt-0.5 text-[12px] font-semibold tabular-nums text-[#1d1d1f] sm:text-[13px]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col items-center gap-2.5 sm:mt-6 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href={href}
            className="inline-flex min-h-[44px] w-full max-w-xs items-center justify-center gap-1.5 rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] sm:w-auto sm:text-[14px]"
          >
            Tüm ürünler
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
          <Link href={href} className={appleTextLinkClassSm}>
            Vitrini keşfet
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
