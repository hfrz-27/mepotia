import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import BackHomeLink from "@/components/BackHomeLink";
import { getCategoryBySlug } from "@/lib/categories";
import { getPublishedProducts } from "@/lib/products";
import { mergeCategoryProducts } from "@/lib/categoryDemoProducts";
import { notFound } from "next/navigation";
import { getProductTaxonomy } from "@/lib/productTaxonomy";

export const revalidate = 60;

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const sort = sp?.sort || "newest";
  const city = sp?.city || "";
  const condition = sp?.condition || "";
  const minPrice = sp?.min || "";
  const maxPrice = sp?.max || "";
  const brand = sp?.brand || "";
  const model = sp?.model || "";
  const page = Number(sp?.page || 1);
  const orderBy =
    sort === "views" ? "views" : sort === "price_asc" || sort === "price_desc" ? "price" : "created_at";
  const ascending = sort === "price_asc" || sort === "oldest";

  const result = category.catalogOnly
    ? { data: [], count: 0 }
    : await getPublishedProducts({
        categoryId: category.id,
        city: city || null,
        condition: condition || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        brand: brand || null,
        model: model || null,
        orderBy,
        ascending,
        page,
        limit: 12,
      });
  const data = mergeCategoryProducts(result.data || [], slug, 12);
  const count = Math.max(result.count || 0, data.length);

  const totalPages = Math.max(1, Math.ceil((count || 0) / 12));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6 sm:mb-7">
      <BackHomeLink href="/" label="Vitrine dön" className="mb-6" />
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-bw-500">
        Kategori vitrini
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-bw-950 sm:text-4xl">
        {category.name}
      </h1>
      {category.description ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bw-500 sm:text-base">
          {category.description} <span className="whitespace-nowrap">— {count || 0} sonuç</span>
        </p>
      ) : null}
      </header>

      <CategoryFilters
        slug={slug}
        taxonomy={getProductTaxonomy(slug)}
        defaults={{ sort, city, condition, minPrice, maxPrice, brand, model, categoryName: category.name }}
      />

      <div className="hidden mt-6 flex-wrap gap-2">
        {[
          ["newest", "En yeni"],
          ["views", "Popüler"],
          ["price_asc", "Ucuz"],
          ["price_desc", "Pahalı"],
        ].map(([value, label]) => (
          <Link
            key={value}
            href={`/kategori/${slug}?sort=${value}`}
            className={`rounded-2xl px-4 py-2 text-sm font-medium ${
              sort === value
                ? "bg-bw-950 text-white"
                : "border border-bw-200 bg-white text-bw-700 hover:border-bw-400"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            return (
              <Link
                key={n}
                href={`/kategori/${slug}?sort=${sort}&page=${n}`}
                className={`rounded-xl px-3 py-1.5 text-sm ${
                  n === page ? "bg-bw-950 text-white" : "border border-bw-200 bg-white"
                }`}
              >
                {n}
              </Link>
            );
          })}
        </div>
      ) : null}
    </main>
  );
}
