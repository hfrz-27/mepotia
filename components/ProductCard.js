import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { BadgeDollarSign, Eye, MapPin } from "lucide-react";
import { formatPrice, getPrimaryImage, hasDiscount, isSold } from "@/lib/products";

export default function ProductCard({ product, large = false, prefetch = false }) {
  const img = getPrimaryImage(product);
  const sold = isSold(product);
  const discount = hasDiscount(product);

  return (
    <article
      className={`group block overflow-hidden rounded-3xl border border-bw-200 bg-white shadow-[0_2px_20px_-12px_rgba(0,0,0,0.15)] transition duration-200 hover:-translate-y-1 hover:border-bw-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.28)] active:scale-[0.99] ${
        large ? "sm:col-span-2" : ""
      } ${sold ? "opacity-90" : ""}`}
    >
      <Link href={`/urun/${product.id}`} prefetch={prefetch} className="block">
        <div
          className={`relative overflow-hidden bg-bw-100 ${
            large ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
        <ProductImage
          src={img}
          alt={product.title}
          fill
          className={`object-cover ${sold ? "grayscale" : ""}`}
          sizes={large ? "66vw" : "(max-width:768px) 100vw, 25vw"}
          priority={prefetch}
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 sm:top-4 sm:left-4 sm:gap-2">
          {product.is_premium ? (
            <span className="rounded-lg bg-bw-950 px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-white uppercase sm:px-2.5 sm:py-1 sm:text-[10px]">
              Premium
            </span>
          ) : null}
          {discount ? (
            <span className="rounded-lg bg-white px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-bw-950 uppercase sm:px-2.5 sm:py-1 sm:text-[10px]">
              İndirim
            </span>
          ) : null}
        </div>
        {sold ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bw-950/45">
            <span className="rounded-xl bg-white px-4 py-2 text-xs font-bold tracking-[0.2em] text-bw-950">
              SATILDI
            </span>
          </div>
        ) : null}
        </div>
        <div className={`p-3.5 sm:p-5 ${large ? "sm:p-7" : ""}`}>
          {discount ? (
            <p className="text-xs text-bw-400 line-through sm:text-sm">{formatPrice(product.original_price)}</p>
          ) : null}
          <p className={`font-semibold tracking-tight text-bw-950 ${large ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
            {formatPrice(product.price)}
          </p>
          <h3
            className={`mt-1.5 font-medium text-bw-800 group-hover:text-bw-950 ${
              large ? "line-clamp-2 text-base sm:text-lg" : "line-clamp-2 text-xs sm:text-sm"
            }`}
          >
            {product.title}
          </h3>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-bw-100 pt-3 text-[10px] text-bw-500 sm:mt-4 sm:pt-4 sm:text-xs">
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{product.city || "—"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {product.views ?? 0}
            </span>
          </div>
        </div>
      </Link>
      <Link
        href={`/urun/${product.id}#piyasa-karsilastirmasi`}
        className="flex items-center justify-center gap-1 border-t border-bw-100 px-3 py-2 text-[10px] font-semibold text-bw-600 transition hover:bg-bw-50 hover:text-bw-950 sm:gap-1.5 sm:px-4 sm:py-3 sm:text-xs"
      >
        <BadgeDollarSign className="h-3.5 w-3.5" />
        Fiyat karşılaştır
      </Link>
    </article>
  );
}
