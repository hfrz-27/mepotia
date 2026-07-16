import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
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

  const orderBy = sort === "views" ? "views" : sort === "price_asc" || sort === "price_desc" ? "price" : "created_at";
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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"> {/* max-w-7xl → max-w-6xl */}
      <PremiumBreadcrumb
        items={[{ href: `/kategori/${slug}`, label: category.name, current: true }]}
        className="mb-6"
      />

      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-bw-950">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 max-w-xl text-lg text-bw-600">{category.description}</p>
        )}
        <p className="mt-1 text-sm text-bw-500">{count} ürün</p>
      </div>

      <CategoryFilters
        slug={slug}
        taxonomy={getProductTaxonomy(slug)}
        defaults={{ sort, city, condition, minPrice, maxPrice, brand, model, categoryName: category.name }}
      />

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          {/* Pagination */}
        </div>
      )}
    </main>
  );
}
