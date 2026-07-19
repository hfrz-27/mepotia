import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";

/**
 * Samsung.com tarzı fotoğraflı kategori vitrini.
 * Her kart gerçek bir ürün fotoğrafını (yoksa katalog görselini) kapak yapar.
 */
export default function HomeCategoryShowcase({ categories = [] }) {
  const tiles = (categories || []).filter(Boolean);
  if (!tiles.length) return null;

  return (
    <section className="bg-[#f5f5f7] py-6 sm:py-9" aria-label="Kategoriler">
      <div className="pv-wrap">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
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

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5">
          {tiles.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group relative flex flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-black/[0.06] transition active:scale-[0.99] hover:ring-black/12 sm:rounded-[22px]"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-[#eef0f2] sm:aspect-[4/3]">
                  <ProductImage
                    src={cat.cover}
                    alt={cat.name}
                    fill
                    priority={index < 3}
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  {Icon ? (
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#1d1d1f] shadow-sm backdrop-blur sm:h-9 sm:w-9">
                      <Icon className="h-4 w-4" strokeWidth={1.7} />
                    </span>
                  ) : null}
                  {cat.count > 0 ? (
                    <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur sm:text-[11px]">
                      {cat.count} ürün
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between gap-2 px-3.5 py-3 sm:px-4 sm:py-3.5">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[15px]">
                      {cat.name}
                    </p>
                    <p className="mt-0.5 hidden truncate text-[12px] text-[#6e6e73] sm:block">
                      {cat.description}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center sm:hidden">
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
