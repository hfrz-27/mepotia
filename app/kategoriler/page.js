import Link from "next/link";
import { getCategoriesWithSubs } from "@/lib/categories";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kategoriler — Mepotia",
  description: "Mepotia ürün kategorileri",
};

export default async function KategorilerPage() {
  const categories = await getCategoriesWithSubs();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Keşfet</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">
        Kategoriler
      </h1>
      <p className="mt-3 max-w-xl text-sm text-bw-500">
        İlgilendiğin kategoriyi seç, vitrindeki ürünlere bak.
      </p>

      {!categories.length ? (
        <p className="mt-12 text-sm text-bw-500">Henüz kategori yok.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/kategori/${cat.slug}`}
              className="rounded-3xl border border-bw-200 bg-white px-6 py-7 transition hover:border-bw-950"
            >
              <p className="font-display text-xl font-semibold text-bw-950">
                {cat.name}
              </p>
              <p className="mt-2 text-xs text-bw-400">
                {(cat.subcategories || []).length} alt kategori
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
