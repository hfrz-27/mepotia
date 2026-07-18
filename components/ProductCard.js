import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { BadgeDollarSign, Eye, MapPin } from "lucide-react";
import { formatPrice, getPrimaryImage, hasDiscount, isSold } from "@/lib/productDisplay";

function Badge({ children, dark = false }) {
  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.1em] uppercase backdrop-blur-md sm:text-[10px]",
        dark
          ? "bg-[#0b0b0b]/90 text-white"
          : "border border-white/50 bg-white/95 text-[#0b0b0b] shadow-sm",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default function ProductCard({
  product,
  large = false,
  prefetch = false,
  showCompareLink = true,
}) {
  const img = getPrimaryImage(product);
  const sold = isSold(product);
  const discount = hasDiscount(product);
  const demo = Boolean(product.demo);
  const href = demo ? "/ara" : `/urun/${product.id}`;
  const compareHref = demo
    ? "/fiyat-karsilastir"
    : `/urun/${product.id}#piyasa-karsilastirmasi`;

  return (
    <article
      className={[
        "pv-card group flex h-full flex-col overflow-hidden",
        large ? "sm:col-span-2" : "",
        sold ? "opacity-90" : "",
      ].join(" ")}
    >
      <Link href={href} prefetch={prefetch && !demo} className="flex min-h-0 flex-1 flex-col">
        <div
          className={`relative overflow-hidden bg-[#f5f5f7] ${
            large ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <ProductImage
            src={img}
            alt={product.title}
            fill
            className={`object-cover transition duration-700 ease-out group-hover:scale-[1.03] ${
              sold ? "grayscale" : ""
            }`}
            sizes={large ? "66vw" : "(max-width: 640px) 50vw, 25vw"}
            priority={prefetch}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {demo ? <Badge>Örnek</Badge> : null}
            {product.is_premium ? <Badge dark>Premium</Badge> : null}
            {product.is_featured && !product.is_premium ? <Badge>Öne çıkan</Badge> : null}
            {discount ? <Badge>İndirim</Badge> : null}
          </div>
          {sold ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold tracking-wide text-[#1d1d1f]">
                Satıldı
              </span>
            </div>
          ) : null}
        </div>

        <div className={`flex flex-1 flex-col p-4 sm:p-5 ${large ? "sm:p-6" : ""}`}>
          <h3
            className={`line-clamp-2 font-semibold tracking-[-0.02em] leading-snug text-[#1d1d1f] ${
              large ? "text-[17px] sm:text-[19px]" : "text-[14px] sm:text-[15px]"
            }`}
          >
            {product.title}
          </h3>

          <div className="mt-2">
            {discount ? (
              <p className="text-[12px] text-[#86868b] line-through">
                {formatPrice(product.original_price)}
              </p>
            ) : null}
            <p
              className={`font-semibold tracking-[-0.02em] text-[#1d1d1f] tabular-nums ${
                large ? "text-[22px] sm:text-[26px]" : "text-[17px] sm:text-[19px]"
              }`}
            >
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[12px] text-[#6e6e73] sm:mt-3">
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.6} />
              <span className="truncate">{product.city || "—"}</span>
            </span>
            <span className="flex items-center gap-1 tabular-nums">
              <Eye className="h-3 w-3" strokeWidth={1.6} />
              {product.views ?? 0}
            </span>
          </div>
        </div>
      </Link>

      {showCompareLink ? (
        <Link
          href={compareHref}
          className="flex items-center justify-center gap-1.5 border-t border-black/[0.04] px-3 py-3 text-[13px] font-normal text-[#1d1d1f] transition hover:bg-black hover:text-white"
        >
          <BadgeDollarSign className="h-3.5 w-3.5" strokeWidth={1.6} />
          Fiyat karşılaştır
        </Link>
      ) : null}
    </article>
  );
}
