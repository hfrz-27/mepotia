import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import BackHomeLink from "@/components/BackHomeLink";
import SearchFiltersPanel from "@/components/SearchFiltersPanel";
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
  const brand = sp?.brand || "";
  const model = sp?.model || "";
  const sort = sp?.sort || "newest";
  const orderBy = sort === "price_asc" || sort === "price_desc" ? "price" : sort === "views" ? "views" : "created_at";
  const ascending = sort === "price_asc" || sort === "oldest";

  const categories = await getCategoriesWithSubs();
  // Client filtre bileşenine yalnızca serileştirilebilir alanları gönder.
  // Kategori kataloğundaki icon bileşenleri React Server Component sınırını geçemez.
  const filterCategories = categories.map(({ id, name }) => ({ id, name }));
  const { data, count } = await getPublishedProducts({
    search: q || null,
    city: city || null,
    condition: condition || null,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
    categoryId: categoryId || null,
    brand: brand || null,
    model: model || null,
    orderBy,
    ascending,
    limit: 24,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <BackHomeLink label="Vitrine dön" className="mb-6" />
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Teknoloji vitrin</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
        Teknoloji ürünleri
      </h1>
      <p className="mt-2 text-sm text-bw-500">
        Telefon, bilgisayar, kulaklık, kılıf, şarj ve aksesuar — {count || 0} sonuç
      </p>

      <SearchFiltersPanel
        categories={filterCategories}
        defaults={{ q, city, condition, minPrice, maxPrice, categoryId, brand, model }}
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {!data.length ? (
        <p className="mt-12 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-12 text-center text-bw-500">
          Sonuç yok.
        </p>
      ) : null}
    </main>
  );
}
