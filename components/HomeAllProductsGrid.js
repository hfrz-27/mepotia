import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage, isSold } from "@/lib/productDisplay";
import { appleTextLinkClassSm } from "@/lib/appleUi";

/**
 * Okunur küçük vitrin:
 * mobil 5×3 = 15 · desktop 7×3 = 21
 */
export default function HomeAllProductsGrid({ products = [], href = "/urunler" }) {
  const items = (products || []).filter(Boolean).slice(0, 21);
  if (!items.length) return null;

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-8" aria-label="Ürünler">
      <div className="pv-wrap">
        <div className="mb-3 flex items-end justify-between gap-2 sm:mb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-[#86868b] uppercase">
              Vitrin
            </p>
            <h2 className="mt-0.5 text-[1.2rem] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[1.35rem]">
              Ürünler
            </h2>
          </div>
          <Link href={href} className={appleTextLinkClassSm}>
            Daha fazla
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-7 sm:gap-2">
          {items.map((product, index) => {
            const sold = isSold(product);
            const demo = Boolean(product.demo);
            const productHref = demo ? "/urunler" : `/urun/${product.id}`;
            const mobileHide = index >= 15 ? "hidden sm:block" : "block";

            return (
              <Link
                key={product.id}
                href={productHref}
                prefetch={index < 5 && !demo}
                className={[
                  mobileHide,
                  "overflow-hidden rounded-[10px] bg-white ring-1 ring-black/[0.05] transition active:scale-[0.99]",
                  sold ? "opacity-70" : "",
                ].join(" ")}
              >
                <div className="relative aspect-square overflow-hidden bg-[#ececef]">
                  <ProductImage
                    src={getPrimaryImage(product)}
                    alt={product.title || ""}
                    fill
                    className={["object-cover", sold ? "grayscale" : ""].join(" ")}
                  />
                </div>
                <div className="px-1 py-1.5 sm:px-1.5 sm:py-1.5">
                  <p className="line-clamp-1 text-[10px] font-medium leading-snug text-[#1d1d1f] sm:text-[10px]">
                    {product.title}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold tabular-nums text-[#1d1d1f] sm:text-[11px]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center">
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white active:scale-[0.98] sm:px-6 sm:text-[14px]"
          >
            Daha fazla
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
