import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { getCategoriesWithSubs } from "@/lib/categories";

export const revalidate = 60;

export const metadata = {
  title: "Kategoriler | Mepotia",
  description: "Mepotia'da yer alan tüm ürün kategorilerini keşfet.",
};

export default async function KategorilerPage() {
  const categories = await getCategoriesWithSubs();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-bw-400 uppercase">
          Vitrin
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-bw-950 sm:text-3xl">
          Kategoriler
        </h1>
        <p className="mt-2 max-w-xl text-sm text-bw-600">
          İhtiyacın olan ürünü bulmak için bir kategori seç.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-2xl border border-bw-200 bg-bw-50 px-6 py-14 text-center">
          <LayoutGrid className="mx-auto h-8 w-8 text-bw-300" />
          <p className="mt-3 text-sm text-bw-500">
            Şu anda listelenecek kategori yok.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group rounded-2xl border border-bw-200 bg-white p-5 transition hover:border-bw-300 hover:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <Link
                href={`/ara?kategori=${cat.slug}`}
                className="flex items-center justify-between"
              >
                <h2 className="font-display text-base font-semibold text-bw-950">
                  {cat.name}
                </h2>
                <ArrowRight className="h-4 w-4 text-bw-400 transition group-hover:translate-x-0.5 group-hover:text-bw-950" />
              </Link>

              {cat.subcategories?.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/ara?kategori=${cat.slug}&alt=${sub.slug}`}
                      className="rounded-full border border-bw-200 px-2.5 py-1 text-[11px] font-medium text-bw-600 transition hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
