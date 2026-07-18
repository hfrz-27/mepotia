import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage, isSold } from "@/lib/productDisplay";

/**
 * Mobil: 5 kolon × 3 sıra = 15
 * Desktop: 7 kolon × 3 sıra = 21
 */
export default function HomeAllProductsGrid({ products = [], href = "/ara" }) {
  const items = (products || []).filter(Boolean).slice(0, 21);
  if (!items.length) return null;

  return (
    <section className="bg-[#f5f5f7] py-5 sm:py-7" aria-label="Ürünler">
      <div className="pv-wrap">
        <div className="mb-2.5 flex items-end justify-between gap-2 sm:mb-3">
          <h2 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[1.2rem]">
            Ürünler
          </h2>
          <Link
            href={href}
            className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1d1d1f] sm:text-[12px]"
          >
            Daha fazla
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>

        {/* Mobil 5'li, sm+ 7'li — 3 sıra */}
        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-7 sm:gap-1.5">
          {items.map((product, index) => {
            const sold = isSold(product);
            const demo = Boolean(product.demo);
            const productHref = demo ? "/ara" : `/urun/${product.id}`;
            // Mobilde 5×3=15; fazlasını sm'den itibaren göster
            const mobileHide = index >= 15 ? "hidden sm:block" : "block";

            return (
              <Link
                key={product.id}
                href={productHref}
                prefetch={index < 5 && !demo}
                className={[
                  mobileHide,
                  "overflow-hidden rounded-[8px] bg-white ring-1 ring-black/[0.04] sm:rounded-[10px]",
                  sold ? "opacity-70" : "",
                ].join(" ")}
              >
                <div className="relative aspect-square overflow-hidden bg-[#eee]">
                  <ProductImage
                    src={getPrimaryImage(product)}
                    alt={product.title || ""}
                    fill
                    className={["object-cover", sold ? "grayscale" : ""].join(" ")}
                  />
                </div>
                <div className="px-1 py-1 sm:px-1 sm:py-1.5">
                  <p className="line-clamp-1 text-[9px] font-medium text-[#1d1d1f] sm:text-[9px]">
                    {product.title}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold tabular-nums text-[#1d1d1f] sm:text-[10px]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center sm:mt-5">
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white transition active:scale-[0.98] sm:px-6 sm:text-[14px]"
          >
            Daha fazla
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
