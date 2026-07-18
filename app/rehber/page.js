import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenCheck,
  Gamepad2,
  Headphones,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Cable,
  Shield,
  Package,
} from "lucide-react";
import { BUYING_GUIDE_LIST } from "@/lib/buyingGuides";
import { getSiteSettings } from "@/lib/categories";
import PageHeroMedia from "@/components/PageHeroMedia";

export const metadata = {
  title: "Satın alma rehberleri | Mepotia",
  description:
    "Mepotia'da doğru ürünü seçmene yardımcı premium satın alma rehberleri — adımlar, kontrol listeleri ve kategori vitrinleri.",
};

export const revalidate = 60;

const ICONS = {
  "telefon-alma-rehberi": Smartphone,
  "bilgisayar-alma-rehberi": Laptop,
  "tablet-alma-rehberi": Tablet,
  "kulaklik-alma-rehberi": Headphones,
  "kilif-alma-rehberi": Shield,
  "sarj-alma-rehberi": Cable,
  "aksesuar-alma-rehberi": Package,
  "akilli-saat-alma-rehberi": Watch,
  "oyun-alma-rehberi": Gamepad2,
};

export default async function RehberPage() {
  const settings = await getSiteSettings();
  const heroVideo = settings?.guide_hero_video || "";
  const heroImages = [
    settings?.guide_hero,
    settings?.guide_hero_2,
    settings?.guide_hero_3,
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      <section className="relative isolate overflow-hidden bg-bw-950 px-4 pb-14 pt-10 text-white sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <PageHeroMedia video={heroVideo} images={heroImages} videoOpacity={0.72} imageOpacity={0.52} />

        {!heroVideo && !heroImages.length ? (
          <>
            <div
              className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-violet-500/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl"
              aria-hidden
            />
          </>
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
            <BookOpenCheck className="h-3.5 w-3.5" />
            Mepotia rehber
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Doğru ürünü, daha güvenle seç.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            Kısa adımlar, net kontrol listeleri ve kategori vitrinleriyle ihtiyacına uygun
            teknolojiyi bul.
          </p>
          <p className="mt-6 text-xs font-medium text-white/40">
            {BUYING_GUIDE_LIST.length} premium rehber
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-6xl px-4 pb-14 sm:-mt-10 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUYING_GUIDE_LIST.map((guide, index) => {
            const Icon = ICONS[guide.slug] || BookOpenCheck;
            const featured = index === 0;
            return (
              <Link
                key={guide.slug}
                href={`/rehber/${guide.slug}`}
                className={`group relative overflow-hidden rounded-[1.35rem] border border-bw-200 bg-white p-5 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-1 hover:border-bw-300 hover:shadow-[0_28px_55px_-30px_rgba(0,0,0,0.45)] sm:p-6 ${
                  featured ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div
                  className={`pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full ${guide.glow || "bg-bw-200"} opacity-40 blur-2xl transition duration-500 group-hover:opacity-80`}
                  aria-hidden
                />
                <div className="relative">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bw-950 text-white shadow-lg shadow-black/15 transition group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-bw-400">
                    {guide.shortLabel}
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-bw-950 sm:text-xl">
                    {guide.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bw-500">
                    {guide.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950">
                    Rehberi oku
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
