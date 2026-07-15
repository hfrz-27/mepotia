import Link from "next/link";
import { getCategoriesWithSubs } from "@/lib/categories";
import BackHomeLink from "@/components/BackHomeLink";
import { TECH_CATEGORY_CATALOG } from "@/lib/techCategories";

export const revalidate = 60;

export const metadata = {
  title: "Teknoloji Ürünleri — Mepotia",
  description: "Telefon, bilgisayar, kulaklık, kılıf, şarj aleti ve teknoloji aksesuarları.",
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
      subcategories: row?.subcategories?.length ? row.subcategories : catalog.subcategories,
    };
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BackHomeLink label="Vitrine dön" className="mb-8" />
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Teknoloji vitrin</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">
        Teknoloji ürünleri
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bw-500">
        Telefon, bilgisayar, tablet, kulaklık, kılıf, şarj aleti, akıllı saat ve oyun ekipmanları —
        ikinci el teknoloji ve aksesuar kategorileri.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((cat) => {
          const Icon = cat.icon;
          const href = cat.catalogOnly
            ? `/ara?q=${encodeURIComponent(cat.name)}`
            : `/kategori/${cat.slug}`;

          return (
            <Link
              key={cat.slug}
              href={href}
              className="group rounded-3xl border border-bw-200 bg-white px-6 py-7 transition hover:border-bw-950 hover:shadow-[0_24px_56px_-32px_rgba(0,0,0,0.12)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bw-950 text-white">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-display text-xl font-semibold text-bw-950">{cat.name}</p>
              <p className="mt-2 text-sm text-bw-500">{cat.description}</p>
              <p className="mt-3 text-xs text-bw-400">
                {(cat.subcategories || []).map((s) => s.name).join(" · ")}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
