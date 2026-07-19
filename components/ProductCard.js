import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { ArrowUpRight, BadgeDollarSign, Eye, MapPin } from "lucide-react";
import { formatPrice, getPrimaryImage, hasDiscount, isSold } from "@/lib/productDisplay";

function Badge({ children, dark = false }) {
  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.09em] uppercase backdrop-blur-md sm:text-[10px]",
        dark
          ? "bg-black/85 text-white ring-1 ring-white/10"
          : "bg-white/92 text-[#1d1d1f] ring-1 ring-black/[0.06] shadow-sm",
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
        "group flex h-full flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-black/[0.055] shadow-[0_14px_36px_-32px_rgba(0,0,0,0.55)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(0,0,0,0.45)] sm:rounded-[24px]",
        large ? "sm:col-span-2" : "",
        sold ? "opacity-90" : "",
      ].join(" ")}
    >
      <Link href={href} prefetch={prefetch && !demo} className="flex min-h-0 flex-1 flex-col">
        <div
          className={`relative overflow-hidden bg-gradient-to-br from-[#f8f8fa] to-[#ececf0] ${
            large ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <ProductImage
            src={img}
            alt={product.title}
            fill
            className={`object-cover transition duration-[900ms] ease-out group-hover:scale-[1.045] ${
              sold ? "grayscale" : ""
            }`}
            priority={prefetch}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1 sm:left-3 sm:top-3">
            {demo ? <Badge>Örnek</Badge> : null}
            {product.is_premium ? <Badge dark>Premium</Badge> : null}
            {product.is_featured && !product.is_premium ? <Badge>Öne çıkan</Badge> : null}
            {discount ? <Badge>İndirim</Badge> : null}
          </div>
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/65 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-white backdrop-blur-md sm:bottom-3 sm:left-3 sm:text-[10px]">
            {product.condition === "new" ? "Sıfır" : "İkinci el"}
          </span>
          {sold ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <span className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#1d1d1f]">
                Satıldı
              </span>
            </div>
          ) : null}
        </div>

        <div className={`flex flex-1 flex-col p-3.5 sm:p-5 ${large ? "sm:p-6" : ""}`}>
          <h3
            className={`line-clamp-2 font-semibold leading-snug tracking-[-0.025em] text-[#1d1d1f] ${
              large ? "text-[17px] sm:text-[20px]" : "text-[13px] sm:text-[15px]"
            }`}
          >
            {product.title}
          </h3>

          <div className="mt-2">
            {discount ? (
              <p className="text-[11px] text-[#86868b] line-through sm:text-[12px]">
                {formatPrice(product.original_price)}
              </p>
            ) : null}
            <p
              className={`font-semibold tracking-[-0.03em] text-[#1d1d1f] tabular-nums ${
                large ? "text-[22px] sm:text-[27px]" : "text-[17px] sm:text-[20px]"
              }`}
            >
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[10px] text-[#86868b] sm:text-[12px]">
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.6} />
              <span className="truncate">{product.city || "Konum belirtilmedi"}</span>
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
          className="flex min-h-[42px] items-center justify-between gap-1.5 border-t border-black/[0.05] px-3.5 text-[11px] font-semibold text-[#515154] transition hover:bg-black hover:text-white sm:min-h-[46px] sm:px-5 sm:text-[12px]"
        >
          <span className="inline-flex items-center gap-1.5">
            <BadgeDollarSign className="h-3.5 w-3.5" strokeWidth={1.7} />
            Fiyatı karşılaştır
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </article>
  );
}
