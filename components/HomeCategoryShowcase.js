import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";

/**
 * Samsung.com "öne çıkanlar" tarzı yatay kategori vitrini.
 * Her kart: gri zemin, üstte kalın isim, ortada görsel, hover'da "Daha fazla bilgi".
 */
export default function HomeCategoryShowcase({ categories = [] }) {
  const tiles = (categories || []).filter(Boolean);
  if (!tiles.length) return null;

  return (
    <section className="bg-white py-8 sm:py-12" aria-label="Kategoriler">
      <div className="pv-wrap">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">
              Kategoriler
            </p>
            <h2 className="mt-1 text-[1.5rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2.1rem]">
              Kategoriye göre keşfet.
            </h2>
          </div>
          <Link
            href="/kategoriler"
            className="hidden shrink-0 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-semibold text-[#1d1d1f] transition hover:border-black/20 sm:inline-flex"
          >
            Tümü
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:gap-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-1200px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tiles.map((cat, index) => (
          <Link
            key={cat.slug}
            href={cat.href}
            className="group relative flex w-[230px] shrink-0 snap-start flex-col items-center rounded-[22px] bg-[#f5f5f7] px-5 pb-6 pt-6 text-center transition hover:bg-[#eef0f2] sm:w-[280px]"
          >
            <p className="text-[16px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[18px]">
              {cat.name}
            </p>
            {cat.count > 0 ? (
              <p className="mt-0.5 text-[12px] text-[#86868b]">{cat.count} ürün</p>
            ) : (
              <p className="mt-0.5 text-[12px] text-[#86868b]">Keşfet</p>
            )}

            <div className="relative my-5 aspect-square w-full overflow-hidden rounded-2xl bg-white/60">
              <ProductImage
                src={cat.cover}
                alt={cat.name}
                fill
                priority={index < 4}
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
              />
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] px-5 py-2 text-[13px] font-semibold text-white transition duration-200 group-hover:scale-[1.03] group-hover:bg-black">
              Daha fazla bilgi
            </span>
          </Link>
        ))}
      </div>

      <div className="pv-wrap">
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/kategoriler"
            className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f]"
          >
            Tüm kategoriler
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
