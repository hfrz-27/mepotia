import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import BackHomeLink from "@/components/BackHomeLink";
import { getCategoriesWithSubs } from "@/lib/categories";
import { getPublishedProducts } from "@/lib/products";

export const revalidate = 60;

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = sp?.q || "";
  const city = sp?.city || "";
  const condition = sp?.condition || "";
  const minPrice = sp?.min || "";
  const maxPrice = sp?.max || "";
  const categoryId = sp?.category || "";

  const categories = await getCategoriesWithSubs();
  const { data, count } = await getPublishedProducts({
    search: q || null,
    city: city || null,
    condition: condition || null,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
    categoryId: categoryId || null,
    limit: 24,
  });

  const field =
    "rounded-2xl border border-bw-200 bg-white px-3.5 py-3 text-sm text-bw-900 outline-none focus:border-bw-500";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <BackHomeLink label="Vitrine dön" className="mb-8" />
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Keşfet</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-bw-950">
        Gelişmiş arama
      </h1>
      <p className="mt-2 text-sm text-bw-500">{count || 0} sonuç</p>

      <form className="mt-8 grid grid-cols-1 gap-3 rounded-[2rem] border border-bw-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        <input name="q" defaultValue={q} placeholder="Kelime" className={field} />
        <select name="category" defaultValue={categoryId} className={field}>
          <option value="">Tüm kategoriler</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input name="city" defaultValue={city} placeholder="Şehir" className={field} />
        <select name="condition" defaultValue={condition} className={field}>
          <option value="">Durum</option>
          <option value="new">Sıfır</option>
          <option value="used">İkinci El</option>
        </select>
        <input name="min" type="number" defaultValue={minPrice} placeholder="Min fiyat" className={field} />
        <input name="max" type="number" defaultValue={maxPrice} placeholder="Max fiyat" className={field} />
        <button type="submit" className="rounded-2xl bg-bw-950 py-3 text-sm font-semibold text-white sm:col-span-2 lg:col-span-3">
          Filtrele
        </button>
      </form>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {!data.length ? <p className="mt-12 text-center text-bw-500">Sonuç yok.</p> : null}
    </main>
  );
}
