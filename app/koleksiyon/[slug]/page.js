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
 * Koleksiyon sayfası — SADECE admin'in bu slota atadığı ürünler.
 * Tüm ürünler listesi değil (/urunler).
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-12 lg:px-8">
        <PremiumBreadcrumb
          className="mb-3"
          items={[
            { href: "/", label: "Ana sayfa" },
            { href: meta.href, label: meta.label, current: true },
          ]}
        />

        <header className="mb-6 max-w-2xl sm:mb-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#86868b] uppercase">
            {meta.eyebrow} · Koleksiyon
          </p>
          <h1 className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2.25rem]">
            {meta.title.replace(/\.$/, "")}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#6e6e73] sm:text-[15px]">
            {meta.description} · {total} ürün
          </p>
          <p className="mt-1 text-[12px] text-[#a1a1a6]">
            Bu sayfada sadece senin bu koleksiyona eklediğin ürünler var — tüm vitrin değil.
          </p>
        </header>

        {items.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-bw-200 bg-white px-5 py-14 text-center">
            <p className="text-sm font-semibold text-bw-900">Bu koleksiyonda henüz ürün yok</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-bw-500">
              Admin → ürün paylaşırken “Ana sayfa koleksiyonu”ndan{" "}
              <strong>{meta.label}</strong> seç.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link
                href="/ilan-ver"
                className="rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white"
              >
                Ürün ekle
              </Link>
              <Link
                href="/urunler"
                className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f]"
              >
                Tüm ürünler
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/urunler"
            className="text-[13px] font-semibold text-[#6e6e73] underline-offset-4 hover:text-[#1d1d1f] hover:underline"
          >
            Tüm ürünler sayfasına git
          </Link>
        </div>
      </div>
    </main>
  );
}
