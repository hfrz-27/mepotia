import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BackHomeLink from "@/components/BackHomeLink";
import CatalogHero from "@/components/CatalogHero";
import ProductImage from "@/components/ProductImage";
import { getCategoriesWithSubs } from "@/lib/categories";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

export const revalidate = 60;

export const metadata = {
  title: "Kategoriler — Mepotia",
  description:
    "Telefon, bilgisayar, tablet, kulaklık, kılıf, şarj ve teknoloji aksesuarları.",
};

export default async function KategorilerPage() {
  const categories = await getCategoriesWithSubs();
  const bySlug = new Map(categories.map((c) => [c.slug, c]));

  const tiles = TECH_CATEGORY_CATALOG.map((catalog) => {
    const row = bySlug.get(catalog.slug);
    return {
      ...catalog,
      id: row?.id || catalog.slug,
      catalogOnly: !row || row.catalogOnly,
      subcategories: row?.subcategories?.length
        ? row.subcategories
        : catalog.subcategories,
    };
  });

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-12 lg:px-8">
        <BackHomeLink label="Vitrine dön" className="mb-4" />

        <CatalogHero
          eyebrow="Kategoriler"
          title="Aradığın teknolojiye daha kısa yol."
          description="İhtiyacın olan ürün grubunu seç; düzenli, filtrelenebilir ve anlaşılır vitrine geç."
          imageSrc="/brand/categories/mepotia-accessories-v2.webp"
        />

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {tiles.map((cat) => {
            const Icon = cat.icon;
            const href = `/kategori/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={href}
                className="group overflow-hidden rounded-[18px] bg-white ring-1 ring-black/[0.055] shadow-[0_18px_45px_-38px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_65px_-38px_rgba(0,0,0,0.45)] active:scale-[0.99] sm:rounded-[24px]"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-[#ececf0]">
                  <ProductImage
                    src={cat.photo}
                    alt={cat.name}
                    fill
                    className="object-cover transition duration-[900ms] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-sm backdrop-blur-md sm:bottom-3 sm:left-3 sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                </span>
                <span className="block p-3.5 sm:p-5">
                  <span className="block text-[14px] font-semibold tracking-[-0.025em] text-[#1d1d1f] sm:text-[17px]">
                    {cat.name}
                  </span>
                  <span className="mt-1 block line-clamp-2 text-[11px] leading-relaxed text-[#6e6e73] sm:text-[12px]">
                    {cat.description}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1d1d1f] sm:text-[12px]">
                    Ürünleri gör
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/urunler"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white sm:text-[14px]"
          >
            Tüm ürünler
          </Link>
        </div>
      </div>
    </main>
  );
}
