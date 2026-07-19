import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import {
  getPublishedProducts,
  HOME_COLLECTIONS,
  resolveHomeCollectionSlug,
} from "@/lib/products";

export const revalidate = 30;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const key = resolveHomeCollectionSlug(slug);
  const meta = key ? HOME_COLLECTIONS[key] : null;
  if (!meta) return { title: "Koleksiyon — Mepotia" };
  return {
    title: `${meta.label} — Mepotia`,
    description: meta.description,
  };
}

/**
 * 3 vitrin kategorisinin özel sayfası.
 * /urunler DEĞİL — sadece bu koleksiyona atanmış ürünler.
 */
export default async function KoleksiyonPage({ params }) {
  const { slug } = await params;
  const key = resolveHomeCollectionSlug(slug);
  if (!key) notFound();

  const meta = HOME_COLLECTIONS[key];
  const { data: products, count } = await getPublishedProducts({
    homeCollection: key,
    limit: 48,
    page: 1,
  });
  const items = products || [];
  const total = count ?? items.length;

  const siblings = Object.values(HOME_COLLECTIONS);

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-12 lg:px-8">
        <PremiumBreadcrumb
          className="mb-3"
          items={[
            { href: "/", label: "Ana sayfa" },
            { href: meta.href, label: meta.label, current: true },
          ]}
        />

        <header className="mb-5 max-w-2xl sm:mb-7">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">
            Vitrin kategorisi · {meta.eyebrow}
          </p>
          <h1 className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2.25rem]">
            {meta.title.replace(/\.$/, "")}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73] sm:text-[15px]">
            {meta.description}
          </p>
          <p className="mt-1 text-[13px] font-medium text-[#1d1d1f]">
            {total} ürün · özel sayfa (tüm ürünler listesi değil)
          </p>
        </header>

        {/* Diğer 2 vitrin kategorisi */}
        <nav
          aria-label="Vitrin kategorileri"
          className="mb-6 flex flex-wrap gap-2"
        >
          {siblings.map((s) => {
            const on = s.key === key;
            return (
              <Link
                key={s.key}
                href={s.href}
                className={[
                  "rounded-full px-3.5 py-2 text-[12px] font-semibold transition sm:text-[13px]",
                  on
                    ? "bg-black text-white"
                    : "bg-white text-[#1d1d1f] ring-1 ring-black/[0.06]",
                ].join(" ")}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>

        {items.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-bw-200 bg-white px-5 py-14 text-center">
            <p className="text-sm font-semibold text-bw-900">Bu vitrin kategorisinde ürün yok</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-bw-500">
              Admin → Paylaş / İlan ver →{" "}
              <strong>Ana sayfa vitrin kategorisi</strong> olarak{" "}
              <strong>{meta.label}</strong> seç.
            </p>
            <Link
              href="/ilan-ver"
              className="mt-5 inline-flex rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white"
            >
              Ürün paylaş
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
