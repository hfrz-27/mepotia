import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { BadgeDollarSign, Eye, MapPin, Sparkles } from "lucide-react";
import { formatPrice, getPrimaryImage, hasDiscount, isSold } from "@/lib/productDisplay";

function Pill({ children, tone = "glass" }) {
  const tones = {
    glass:
      "border border-white/40 bg-white/90 text-[#1d1d1f] shadow-[0_4px_16px_-6px_rgba(0,0,0,0.2)] backdrop-blur-md",
    gold:
      "border border-[#d4af37]/35 bg-gradient-to-r from-[#f5e6b8] to-[#d4af37] text-[#1d1d1f] shadow-[0_6px_18px_-8px_rgba(212,175,55,0.55)]",
    ink: "border border-white/10 bg-[#1d1d1f]/90 text-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.45)] backdrop-blur-md",
    soft:
      "border border-black/[0.06] bg-white/95 text-[#6e6e73] shadow-sm backdrop-blur-md",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] uppercase sm:text-[10px] ${tones[tone] || tones.glass}`}
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
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white",
        "ring-1 ring-black/[0.04]",
        "shadow-[0_8px_28px_-18px_rgba(0,0,0,0.14)]",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.22)] hover:ring-black/[0.07]",
        large ? "sm:col-span-2" : "",
        sold ? "opacity-90" : "",
      ].join(" ")}
    >
      {/* Gold hairline on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
        }}
        aria-hidden
      />

      <Link href={href} prefetch={prefetch && !demo} className="flex min-h-0 flex-1 flex-col">
        <div
          className={`relative overflow-hidden bg-gradient-to-br from-[#f4f4f5] via-[#f0eeea] to-[#e8e6e1] ${
            large ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <ProductImage
            src={img}
            alt={product.title}
            fill
            className={`object-cover transition duration-700 ease-out group-hover:scale-[1.06] ${
              sold ? "grayscale" : ""
            }`}
            sizes={large ? "66vw" : "(max-width: 640px) 50vw, 25vw"}
            priority={prefetch}
          />

          {/* Soft vignette */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 opacity-80"
            aria-hidden
          />
          {/* Shine sweep on hover */}
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
            aria-hidden
          />

          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 sm:top-3.5 sm:left-3.5">
            {demo ? <Pill tone="soft">Örnek</Pill> : null}
            {product.is_premium ? (
              <Pill tone="gold">
                <Sparkles className="h-2.5 w-2.5" strokeWidth={2.2} />
                Premium
              </Pill>
            ) : null}
            {product.is_featured && !product.is_premium ? (
              <Pill tone="ink">Öne çıkan</Pill>
            ) : null}
            {discount ? <Pill tone="glass">İndirim</Pill> : null}
          </div>

          {sold ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1d1d1f]/50 backdrop-blur-[2px]">
              <span className="rounded-full bg-white px-5 py-2 text-[11px] font-bold tracking-[0.18em] text-[#1d1d1f] shadow-lg">
                SATILDI
              </span>
            </div>
          ) : null}
        </div>

        <div className={`flex flex-1 flex-col px-3.5 pt-3.5 pb-3 sm:px-4 sm:pt-4 sm:pb-3.5 ${large ? "sm:px-6 sm:pt-5" : ""}`}>
          {discount ? (
            <p className="text-[11px] text-[#a1a1aa] line-through sm:text-xs">
              {formatPrice(product.original_price)}
            </p>
          ) : null}

          <p
            className={`font-semibold tracking-tight text-[#1d1d1f] tabular-nums ${
              large ? "text-xl sm:text-2xl" : "text-[15px] sm:text-lg"
            }`}
          >
            {formatPrice(product.price)}
          </p>

          <h3
            className={`mt-1 font-medium leading-snug text-[#3f3f46] transition group-hover:text-[#1d1d1f] ${
              large
                ? "line-clamp-2 text-[15px] sm:text-lg"
                : "line-clamp-2 text-[12px] sm:text-[13px]"
            }`}
          >
            {product.title}
          </h3>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-black/[0.05] pt-2.5 text-[10px] text-[#8e8e93] sm:mt-3 sm:pt-3 sm:text-[11px]">
            <span className="flex min-w-0 items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0 opacity-70" strokeWidth={1.75} />
              <span className="truncate">{product.city || "—"}</span>
            </span>
            <span className="flex items-center gap-1 tabular-nums">
              <Eye className="h-3 w-3 opacity-70" strokeWidth={1.75} />
              {product.views ?? 0}
            </span>
          </div>
        </div>
      </Link>

      {showCompareLink ? (
        <Link
          href={compareHref}
          className="flex items-center justify-center gap-1.5 border-t border-black/[0.05] bg-gradient-to-b from-white to-[#faf9f7] px-3 py-2.5 text-[10px] font-semibold tracking-wide text-[#6e6e73] transition duration-300 hover:from-[#1d1d1f] hover:to-[#1d1d1f] hover:text-white sm:py-3 sm:text-[11px]"
        >
          <BadgeDollarSign className="h-3.5 w-3.5" strokeWidth={1.75} />
          Fiyat karşılaştır
        </Link>
      ) : null}
    </article>
  );
}
