import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import { getCategoryBySlug } from "@/lib/categories";
import { getPublishedProducts } from "@/lib/products";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const sort = sp?.sort || "newest";
  const page = Number(sp?.page || 1);
  const orderBy =
    sort === "views" ? "views" : sort === "price_asc" || sort === "price_desc" ? "price" : "created_at";
  const ascending = sort === "price_asc";

  const { data, count } = await getPublishedProducts({
    categoryId: category.id,
    orderBy,
    ascending,
    page,
    limit: 12,
  });

  const totalPages = Math.max(1, Math.ceil((count || 0) / 12));

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PremiumBreadcrumb
        items={[{ href: `/kategori/${slug}`, label: category.name, current: true }]}
        className="mb-4"
      />
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-wide text-bw-950">
        {category.name}
      </h1>
      {category.description ? (
        <p className="mt-2 max-w-2xl text-sm text-bw-500">{category.description}</p>
      ) : null}
      <p className="mt-2 text-sm text-bw-500">{count || 0} ürün</p>

      {(category.subcategories || []).length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {category.subcategories.map((sub) => (
            <span
              key={sub.id || sub.slug}
              className="rounded-full border border-bw-200 bg-bw-50 px-3 py-1 text-xs font-medium text-bw-600"
            >
              {sub.name}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
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
