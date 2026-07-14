import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage, isSold } from "@/lib/productDisplay";

export default function ProductMiniCard({ product, prefetch = false }) {
  const img = getPrimaryImage(product);
  const sold = isSold(product);
  const demo = Boolean(product.demo);
  const href = demo ? "/ara" : `/urun/${product.id}`;

  return (
    <Link
      href={href}
      prefetch={prefetch && !demo}
      className="group flex w-[min(42vw,200px)] shrink-0 items-center gap-2.5 rounded-xl border border-bw-200/90 bg-white/95 px-2.5 py-2 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition hover:border-bw-300"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bw-100">
        <ProductImage
          src={img}
          alt={product.title}
          fill
          className={`object-cover ${sold ? "grayscale" : ""}`}
          sizes="44px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-semibold leading-tight text-bw-900 group-hover:text-bw-700">
          {product.title}
        </p>
        <p className="mt-0.5 text-[10px] font-bold text-bw-800">
          {formatPrice(product.price)}
          {product.is_featured ? (
            <span className="ml-1.5 rounded bg-bw-950 px-1 py-px text-[8px] font-bold tracking-wide text-white uppercase">
              Fırsat
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
