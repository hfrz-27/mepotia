import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage, isSold } from "@/lib/productDisplay";

/**
 * 20 ürün — her breakpoint’te satır tam dolu:
 * mobil 4×5, sm 4×5, lg 5×4
 */
export default function HomeAllProductsGrid({ products = [], href = "/ara" }) {
  // 20 = 4×5 ve 5×4 — her iki grid de tam biter
  const items = (products || []).filter(Boolean).slice(0, 20);
  if (!items.length) return null;

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-10" aria-label="Tüm ürünler">
      <div className="pv-wrap">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#86868b] uppercase sm:text-[11px]">
              Vitrin
            </p>
            <h2 className="mt-0.5 text-[1.35rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[1.75rem]">
              Tüm ürünler
            </h2>
          </div>
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center gap-1 text-[13px] font-semibold text-[#1d1d1f] sm:text-[14px]"
          >
            Daha fazla
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        {/* 4 kolon her zaman → 5 tam satır (20 ürün). lg: 5 kolon → 4 tam satır */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 lg:grid-cols-5">
          {items.map((product, index) => {
            const sold = isSold(product);
            const demo = Boolean(product.demo);
            const productHref = demo ? "/ara" : `/urun/${product.id}`;

            return (
              <Link
                key={product.id}
                href={productHref}
                prefetch={index < 4 && !demo}
                className={[
                  "group overflow-hidden rounded-[10px] bg-white ring-1 ring-black/[0.05] transition active:scale-[0.98] sm:rounded-[12px]",
                  sold ? "opacity-80" : "",
                ].join(" ")}
              >
                <div className="relative aspect-square overflow-hidden bg-[#e8e8ed]">
                  <ProductImage
                    src={getPrimaryImage(product)}
                    alt={product.title || ""}
                    fill
                    className={[
                      "object-cover transition duration-500 group-hover:scale-[1.03]",
                      sold ? "grayscale" : "",
                    ].join(" ")}
                  />
                  {sold ? (
                    <span className="absolute top-1 left-1 rounded-full bg-black/80 px-1 py-0.5 text-[7px] font-semibold text-white sm:text-[8px]">
                      Satıldı
                    </span>
                  ) : null}
                </div>
                <div className="px-1 py-1.5 sm:px-2 sm:py-2">
                  <p className="line-clamp-1 text-[9px] font-medium leading-snug text-[#1d1d1f] sm:text-[11px]">
                    {product.title}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold tabular-nums text-[#1d1d1f] sm:text-[12px]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center sm:mt-8">
          <Link
            href={href}
            className="inline-flex min-h-[48px] w-full max-w-xs items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-[14px] font-semibold text-white transition active:scale-[0.98] sm:w-auto"
          >
            Daha fazla
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
