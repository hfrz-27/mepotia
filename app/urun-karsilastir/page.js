import Link from "next/link";
import ProductVsCompare from "@/components/ProductVsCompare";
import { ArrowLeft, ArrowRight, BadgeDollarSign, Sparkles } from "lucide-react";

export const metadata = {
  title: "Ürün Özellik Karşılaştır | Mepotia",
  description:
    "İki veya üç teknoloji ürününü yan yana karşılaştır. Mepotia spek tablosu: ekran, RAM, batarya, kamera ve daha fazlası.",
};

export default function UrunKarsilastirPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <section className="relative">
        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
              Vitrine dön
            </Link>
            <Link
              href="/fiyat-karsilastir"
              className="inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
            >
              <BadgeDollarSign className="h-3.5 w-3.5" />
              Fiyat aracı
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bw-500">
              <Sparkles className="h-3.5 w-3.5" />
              Özellik karşılaştırma · 2026
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bw-950 sm:text-5xl lg:text-6xl">
              Spekleri net gör.
              <br />
              <span className="text-bw-400">Kararı net ver.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-bw-500 sm:text-base">
              2–3 model yaz. Ekran, RAM, batarya, kamera ve daha fazlası yan yana gelsin.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["Ekran & Hz", "RAM / depolama", "Batarya", "Kamera", "5G / şarj"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-bw-200 bg-white px-3 py-1.5 text-[11px] font-medium text-bw-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-9">
            <ProductVsCompare variant="page" />
          </div>
        </div>
      </section>
    </main>
  );
}
