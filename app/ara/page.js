import Link from "next/link";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import { PremiumBreadcrumb } from "@/components/BackHomeLink";
import SearchFocusInput from "@/components/SearchFocusInput";

export const revalidate = 60;

export const metadata = {
  title: "Ara — Mepotia",
  description: "Ürün, marka veya şehir ara.",
};

/**
 * Saf arama sayfası — ürün listesi yok.
 * Sonuçlar /urunler?q=… üzerinde açılır.
 */
export default async function SearchLandingPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp?.q || "").trim();

  // Eski /ara?q=… linkleri → ürün sonuçları
  if (q) {
    const params = new URLSearchParams();
    params.set("q", q);
    if (sp?.sort) params.set("sort", sp.sort);
    if (sp?.city) params.set("city", sp.city);
    if (sp?.condition) params.set("condition", sp.condition);
    if (sp?.min) params.set("min", sp.min);
    if (sp?.max) params.set("max", sp.max);
    if (sp?.brand) params.set("brand", sp.brand);
    if (sp?.model) params.set("model", sp.model);
    redirect(`/urunler?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7]">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
        <PremiumBreadcrumb
          className="mb-8"
          items={[{ href: "/ara", label: "Ara", current: true }]}
        />

        <div className="flex flex-1 flex-col justify-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
            <Search className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h1 className="text-center text-[1.75rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[2.1rem]">
            Ara
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-center text-[14px] text-[#6e6e73]">
            Ürün, marka veya şehir yaz — sonuçlar Ürünler sayfasında açılır.
          </p>

          <form
            id="arama"
            action="/urunler"
            method="get"
            className="mt-8 scroll-mt-24"
          >
            <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-2.5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.28)] sm:px-4 sm:py-3">
              <Search className="h-5 w-5 shrink-0 text-[#86868b]" strokeWidth={1.6} />
              <SearchFocusInput defaultValue={q} />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-black px-5 py-2.5 text-[14px] font-semibold text-white active:scale-[0.98]"
              >
                Ara
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/urunler"
              className="rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white"
            >
              Tüm ürünler
            </Link>
            <Link
              href="/kategoriler"
              className="rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f]"
            >
              Kategoriler
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
