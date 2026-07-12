import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin } from "lucide-react";

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return `${num.toLocaleString("tr-TR")} ₺`;
}

function getImage(product) {
  const images = product?.product_images;
  if (Array.isArray(images) && images.length) {
    const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted[0].url;
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";
}

export default function ProductCard({ product, large = false }) {
  const img = getImage(product);

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-bw-200 bg-white shadow-[0_2px_20px_-12px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1.5 hover:border-bw-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.28)] ${
        large ? "sm:col-span-2" : ""
      }`}
    >
      <Link href={`/urun/${product.id}`} className="block">
        <div
          className={`relative overflow-hidden bg-bw-100 ${
            large ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={img}
            alt={product.title}
            fill
            sizes={large ? "66vw" : "(max-width:768px) 100vw, 25vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bw-950/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          {product.is_premium ? (
            <span className="absolute top-4 left-4 rounded-lg bg-bw-950 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase">
              Premium
            </span>
          ) : null}
        </div>
      </Link>
      <div className={`p-5 ${large ? "sm:p-7" : ""}`}>
        <Link href={`/urun/${product.id}`}>
          <p className={`font-semibold tracking-tight text-bw-950 ${large ? "text-2xl" : "text-xl"}`}>
            {formatPrice(product.price)}
          </p>
          <h3
            className={`mt-2 font-medium text-bw-800 transition group-hover:text-bw-950 ${
              large ? "line-clamp-2 text-lg" : "line-clamp-2 text-sm"
            }`}
          >
            {product.title}
          </h3>
        </Link>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-bw-100 pt-4 text-xs text-bw-500">
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
    </article>
  );
}
