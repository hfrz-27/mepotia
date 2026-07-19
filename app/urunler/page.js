import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import CatalogHero from "@/components/CatalogHero";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import { getPublishedProducts } from "@/lib/products";

export const revalidate = 60;

export const metadata = {
  title: "Ürünler — Mepotia",
  description: "Mepotia vitrininde tüm ürünler — ara, filtrele ve karşılaştır.",
};

function buildPageHref(sp, page) {
  const q = new URLSearchParams();
  if (sp?.q) q.set("q", sp.q);
  if (sp?.sort && sp.sort !== "newest") q.set("sort", sp.sort);
  if (sp?.city) q.set("city", sp.city);
  if (sp?.condition) q.set("condition", sp.condition);
  if (sp?.min) q.set("min", sp.min);
  if (sp?.max) q.set("max", sp.max);
  if (sp?.brand) q.set("brand", sp.brand);
  if (sp?.model) q.set("model", sp.model);
  if (sp?.category) q.set("category", sp.category);
  if (page > 1) q.set("page", String(page));
  const s = q.toString();
  return s ? `/urunler?${s}` : "/urunler";
}

export default async function UrunlerPage({ searchParams }) {
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
  const page = Math.max(1, Number(sp?.page || 1) || 1);
  const orderBy =
    sort === "price_asc" || sort === "price_desc"
      ? "price"
      : sort === "views"
        ? "views"
        : "created_at";
  const ascending = sort === "price_asc" || sort === "oldest";

  const { data: raw, count } = await getPublishedProducts({
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
            { href: "/urunler", label: "Ürünler", current: true },
          ]}
        />

        <CatalogHero
          eyebrow={q ? "Arama sonuçları" : "Tüm ürünler"}
          title={q ? `“${q}” için seçtiklerimiz.` : "Teknoloji vitrini."}
          description="Telefon, bilgisayar, tablet ve aksesuarları net ürün bilgileriyle incele; filtrele, karşılaştır ve doğrudan iletişime geç."
          count={total}
        />

        <form id="arama" action="/urunler" method="get" className="mb-3 scroll-mt-24">
          <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-2 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.25)] sm:px-4">
            <input
              name="q"
              defaultValue={q}
              placeholder="Ürün, marka veya şehir ara…"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[15px] text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
              aria-label="Ürün ara"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-black px-4 py-2 text-[13px] font-semibold text-white"
            >
              Ara
            </button>
          </div>
          {sort && sort !== "newest" ? (
            <input type="hidden" name="sort" value={sort} />
          ) : null}
        </form>

        <CategoryFilters
          basePath="/urunler"
          showSearch
          defaults={{
            sort,
            q,
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
            <p className="text-sm font-semibold text-bw-900">Sonuç yok</p>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-bw-500">
              Filtreleri gevşet veya başka bir kelime dene.
            </p>
            <Link
              href="/urunler"
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
