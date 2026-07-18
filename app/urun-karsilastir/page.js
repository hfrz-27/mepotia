import Link from "next/link";
import ProductVsCompare from "@/components/ProductVsCompare";
import PageHeroMedia from "@/components/PageHeroMedia";
import { getSiteSettings } from "@/lib/categories";
import { ArrowLeft, ArrowRight, BadgeDollarSign, Sparkles } from "lucide-react";

export const metadata = {
  title: "Ürün Özellik Karşılaştır | Mepotia",
  description:
    "İki veya üç teknoloji ürününü yan yana karşılaştır. Mepotia spek tablosu: ekran, RAM, batarya, kamera ve daha fazlası.",
};

export const revalidate = 60;

export default async function UrunKarsilastirPage() {
  const settings = await getSiteSettings();
  const heroVideo = settings?.specs_compare_video || "";
  const heroImages = [
    settings?.specs_compare_bg_1,
    settings?.specs_compare_bg_2,
    settings?.specs_compare_bg_3,
  ].filter(Boolean);
  const hasMedia = Boolean(heroVideo || heroImages.length);

  return (
    <main className="min-h-screen bg-[#070709]">
      <section className="relative overflow-hidden">
        <PageHeroMedia
          video={heroVideo}
          images={heroImages}
          videoOpacity={0.72}
          imageOpacity={0.52}
        />

        {!hasMedia ? (
          <>
            <div
              className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-40 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl"
              aria-hidden
            />
          </>
        ) : null}

        <div
          className={`absolute inset-0 ${
            hasMedia
              ? "bg-gradient-to-b from-[#070709]/40 via-[#070709]/55 to-[#070709]"
              : "bg-gradient-to-b from-[#070709]/70 via-[#070709]/90 to-[#070709]"
          }`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-14 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md transition hover:bg-white/10"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
              Vitrine dön
            </Link>
            <Link
              href="/fiyat-karsilastir"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
            >
              <BadgeDollarSign className="h-3.5 w-3.5" />
              Fiyat aracı
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-400/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-100 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Özellik karşılaştırma · 2026
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Spekleri net gör.
              <br />
              <span className="bg-gradient-to-r from-violet-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
                Kararı net ver.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
              2–3 model yaz. Ekran, RAM, batarya, kamera ve daha fazlası yan yana gelsin.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["Ekran & Hz", "RAM / depolama", "Batarya", "Kamera", "5G / şarj"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Floating tool card — same pattern as price tool */}
          <div className="mt-9">
            <ProductVsCompare variant="page" />
          </div>
        </div>
      </section>
    </main>
  );
}
