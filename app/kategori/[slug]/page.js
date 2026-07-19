import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import CategoryGuideFab from "@/components/CategoryGuideFab";
import CatalogHero from "@/components/CatalogHero";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import { getCategoryBySlug } from "@/lib/categories";
import { getPublishedProducts } from "@/lib/products";
import { mergeCategoryProducts } from "@/lib/categoryDemoProducts";
import { notFound } from "next/navigation";
import { getProductTaxonomy } from "@/lib/productTaxonomy";

export const revalidate = 60;

function buildPageHref(slug, sp, page) {
  const q = new URLSearchParams();
  if (sp?.sort && sp.sort !== "newest") q.set("sort", sp.sort);
  if (sp?.city) q.set("city", sp.city);
  if (sp?.condition) q.set("condition", sp.condition);
  if (sp?.min) q.set("min", sp.min);
  if (sp?.max) q.set("max", sp.max);
  if (sp?.brand) q.set("brand", sp.brand);
  if (sp?.model) q.set("model", sp.model);
  if (page > 1) q.set("page", String(page));
  const s = q.toString();
  return s ? `/kategori/${slug}?${s}` : `/kategori/${slug}`;
}

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
    <main className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 sm:pt-5 sm:pb-10 lg:px-8">
        <PremiumBreadcrumb
          className="mb-3"
          items={[
            { href: "/kategoriler", label: "Kategoriler" },
            { href: `/kategori/${slug}`, label: category.name, current: true },
          ]}
        />

        <CatalogHero
          eyebrow="Kategori vitrini"
          title={`${category.name}. Sana uygun olanı bul.`}
          description={category.description || "Seçilmiş ürünleri filtrele, fiyatlarını karşılaştır ve doğru seçeneğe ulaş."}
          count={count}
          imageSrc={category.photo}
        />

        <CategoryFilters
          slug={slug}
          taxonomy={getProductTaxonomy(slug)}
          defaults={{
            sort,
            city,
            condition,
            minPrice,
            maxPrice,
            brand,
            model,
            categoryName: category.name,
          }}
        />

        {data.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {data.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-bw-200 bg-white px-5 py-10 text-center">
            <p className="text-sm font-semibold text-bw-900">Bu filtrelerle ilan yok</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-bw-500">
              Filtreleri gevşeterek veya başka bir sıralama seçerek vitrini yeniden dene.
            </p>
            <Link
              href={`/kategori/${slug}`}
              className="mt-4 inline-flex rounded-full bg-bw-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-bw-800"
            >
              Filtreleri temizle
            </Link>
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            aria-label="Sayfalar"
            className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
          >
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = n === page;
              return (
                <Link
                  key={n}
                  href={buildPageHref(slug, sp, n)}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
                    active
                      ? "bg-bw-950 text-white shadow-sm"
                      : "border border-bw-200 bg-white text-bw-600 hover:border-bw-300 hover:text-bw-950"
                  }`}
                >
                  {n}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>

      <CategoryGuideFab categorySlug={slug} categoryName={category.name} />
    </main>
  );
}
