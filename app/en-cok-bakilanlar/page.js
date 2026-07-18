import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import { getPublishedProducts } from "@/lib/products";
export const revalidate = 60;

export const metadata = {
  title: "En çok bakılanlar — Mepotia",
  description: "Mepotia vitrininde en çok görüntülenen ürünler.",
};

function buildPageHref(sp, page) {
  const q = new URLSearchParams();
  if (sp?.sort && sp.sort !== "views") q.set("sort", sp.sort);
  if (sp?.city) q.set("city", sp.city);
  if (sp?.condition) q.set("condition", sp.condition);
  if (sp?.min) q.set("min", sp.min);
  if (sp?.max) q.set("max", sp.max);
  if (sp?.brand) q.set("brand", sp.brand);
  if (sp?.model) q.set("model", sp.model);
  if (page > 1) q.set("page", String(page));
  const s = q.toString();
  return s ? `/en-cok-bakilanlar?${s}` : "/en-cok-bakilanlar";
}

export default async function EnCokBakilanlarPage({ searchParams }) {
  const sp = await searchParams;
  const city = sp?.city || "";
  const condition = sp?.condition || "";
  const minPrice = sp?.min || "";
  const maxPrice = sp?.max || "";
  const brand = sp?.brand || "";
  const model = sp?.model || "";
  const sort = sp?.sort || "views";
  const page = Math.max(1, Number(sp?.page || 1) || 1);
  const orderBy =
    sort === "price_asc" || sort === "price_desc"
      ? "price"
      : sort === "newest" || sort === "oldest"
        ? "created_at"
        : "views";
  const ascending = sort === "price_asc" || sort === "oldest";

  const { data: raw, count } = await getPublishedProducts({
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

  const data = raw || [];
  const total = count || data.length;
  const totalPages = Math.max(1, Math.ceil((count || 0) / 12) || 1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-8 sm:px-6 sm:pt-5 sm:pb-10 lg:px-8">
        <PremiumBreadcrumb
          className="mb-3"
          items={[
            { href: "/kategoriler", label: "Kategoriler" },
            { href: "/en-cok-bakilanlar", label: "En çok bakılanlar", current: true },
          ]}
        />

        <header className="mb-4 max-w-2xl sm:mb-5">
          <h1 className="font-display text-2xl font-semibold leading-tight tracking-tight text-bw-950 sm:text-3xl">
            En çok bakılanlar
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-snug text-bw-500">
            Ziyaretçilerin en çok ilgi gösterdiği ilanlar · {total} ürün
          </p>
        </header>

        <CategoryFilters
          basePath="/en-cok-bakilanlar"
          defaults={{
            sort,
            city,
            condition,
            minPrice,
            maxPrice,
            brand,
            model,
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
            <Link
              href="/en-cok-bakilanlar"
              className="mt-4 inline-flex rounded-full bg-bw-950 px-4 py-2 text-xs font-semibold text-white"
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
            {Array.from({ length: Math.min(totalPages, 12) }).map((_, i) => {
              const n = i + 1;
              const active = n === page;
              return (
                <Link
                  key={n}
                  href={buildPageHref(sp, n)}
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
    </main>
  );
}
