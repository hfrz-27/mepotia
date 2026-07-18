import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { Eye, MapPin } from "lucide-react";
import { formatPrice, getPrimaryImage, hasDiscount, isSold } from "@/lib/productDisplay";

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
  const compareHref = demo ? "/fiyat-karsilastir" : `/urun/${product.id}#piyasa-karsilastirmasi`;

  return (
    <article className={`sx-card group flex h-full flex-col ${sold ? "opacity-75" : ""}`}>
      <Link href={href} prefetch={prefetch && !demo} className="flex min-h-0 flex-1 flex-col">
        <div
          className={`relative overflow-hidden bg-[#0a0a0c] ${
            large ? "aspect-[16/10]" : "aspect-[5/4]"
          }`}
        >
          <ProductImage
            src={img}
            alt={product.title}
            fill
            className={`mepo-img-zoom object-cover ${sold ? "grayscale" : ""}`}
            sizes={large ? "66vw" : "(max-width: 640px) 50vw, 25vw"}
            priority={prefetch}
          />
          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-2.5">
            {demo ? (
              <span className="bg-zinc-800 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-300 uppercase">
                Örnek
              </span>
            ) : null}
            {product.is_premium ? (
              <span className="bg-[#ff4d1a] px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                Premium
              </span>
            ) : null}
            {product.is_featured && !product.is_premium ? (
              <span className="bg-white px-2 py-1 text-[10px] font-bold tracking-wider text-black uppercase">
                Öne çıkan
              </span>
            ) : null}
            {discount ? (
              <span className="bg-zinc-100 px-2 py-1 text-[10px] font-bold tracking-wider text-black uppercase">
                İndirim
              </span>
            ) : null}
          </div>
          {sold ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/55">
              <span className="bg-white px-4 py-2 text-xs font-black tracking-[0.2em] text-black uppercase">
                Satıldı
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col border-t border-[#2a2a30] p-3.5">
          <h3 className="line-clamp-2 font-[family-name:var(--font-syne)] text-sm font-bold leading-snug tracking-tight text-zinc-50 sm:text-[15px]">
            {product.title}
          </h3>
          {discount ? (
            <p className="mt-2 text-xs text-zinc-500 line-through">{formatPrice(product.original_price)}</p>
          ) : null}
          <p className="mt-1 text-xl font-bold tracking-tight text-[#ff4d1a] tabular-nums sm:text-2xl">
            {formatPrice(product.price)}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#2a2a30] pt-2.5 text-[11px] text-zinc-500">
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{product.city || "—"}</span>
            </span>
            <span className="flex items-center gap-1 tabular-nums">
              <Eye className="h-3 w-3" />
              {product.views ?? 0}
            </span>
          </div>
        </div>
      </Link>

      {showCompareLink ? (
        <Link
          href={compareHref}
          className="border-t border-[#2a2a30] bg-[#0c0c0f] px-3 py-2.5 text-center text-[10px] font-bold tracking-[0.14em] text-zinc-400 uppercase transition hover:bg-[#ff4d1a] hover:text-white"
        >
          Fiyat karşılaştır
        </Link>
      ) : null}
    </article>
  );
}
