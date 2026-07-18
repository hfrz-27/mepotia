import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BackHomeLink from "@/components/BackHomeLink";
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
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-12 lg:px-8">
        <BackHomeLink label="Vitrine dön" className="mb-4" />

        <header className="mb-6 max-w-2xl sm:mb-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">
            Vitrin
          </p>
          <h1 className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2.25rem]">
            Kategoriler
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73] sm:text-[15px]">
            İhtiyacın olan ürün grubunu seç — filtreli vitrine geç.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {tiles.map((cat) => {
            const Icon = cat.icon;
            const href = `/kategori/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={href}
                className="group flex flex-col rounded-[18px] bg-white p-3.5 ring-1 ring-black/[0.05] transition active:scale-[0.99] sm:rounded-[20px] sm:p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d1d1f] text-white sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.7} />
                </span>
                <p className="mt-3 text-[14px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[16px]">
                  {cat.name}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#6e6e73] sm:text-[12px]">
                  {cat.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-0.5 text-[12px] font-semibold text-[#1d1d1f] opacity-70 transition group-hover:opacity-100">
                  Gör
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/ara"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-6 py-2.5 text-[13px] font-semibold text-white sm:text-[14px]"
          >
            Tüm ürünleri ara
          </Link>
        </div>
      </div>
    </main>
  );
}
