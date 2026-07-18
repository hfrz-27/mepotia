import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleCheck,
  Sparkles,
} from "lucide-react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import OtherGuidesMenu from "@/components/OtherGuidesMenu";
import PageHeroMedia from "@/components/PageHeroMedia";
import { BUYING_GUIDE_LIST, BUYING_GUIDES } from "@/lib/buyingGuides";
import { getCategoryBySlug, getSiteSettings } from "@/lib/categories";
import { mergeCategoryProducts } from "@/lib/categoryDemoProducts";
import { getPublishedProducts } from "@/lib/products";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(BUYING_GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = BUYING_GUIDES[slug];
  return guide
    ? {
        title: `${guide.title} | Mepotia Rehber`,
        description: guide.description,
      }
    : {};
}

export default async function BuyingGuidePage({ params }) {
  const { slug } = await params;
  const guide = BUYING_GUIDES[slug];
  if (!guide) notFound();

  const categorySlug = guide.categorySlug;
  const category = categorySlug ? await getCategoryBySlug(categorySlug) : null;

  const [{ data: rawProducts }, settings] = await Promise.all([
    category?.id
      ? getPublishedProducts({ limit: 8, categoryId: category.id, orderBy: "created_at" })
      : getPublishedProducts({ limit: 8, search: guide.search }),
    getSiteSettings(),
  ]);

  const products = categorySlug
    ? mergeCategoryProducts(rawProducts || [], categorySlug, 8)
    : rawProducts || [];

  const otherGuides = BUYING_GUIDE_LIST.filter((g) => g.slug !== slug);
  const categoryHref = categorySlug ? `/kategori/${categorySlug}` : `/ara?q=${encodeURIComponent(guide.search)}`;
  const categoryLabel = category?.name || guide.shortLabel;

  const guideVideo = settings?.guide_hero_video || "";
  const guideImages = [
    settings?.guide_hero,
    settings?.guide_hero_2,
    settings?.guide_hero_3,
  ].filter(Boolean);
  const hasGuideMedia = Boolean(guideVideo || guideImages.length);

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-bw-950">
      {/* ── Hero ── */}
      <section
        className={`relative isolate overflow-hidden bg-gradient-to-br ${guide.accent} px-4 pb-10 pt-6 text-white sm:px-6 sm:pb-14 sm:pt-8 lg:px-8`}
      >
        {hasGuideMedia ? (
          <PageHeroMedia video={guideVideo} images={guideImages} videoOpacity={0.7} imageOpacity={0.5} />
        ) : (
          <>
            <div
              className={`pointer-events-none absolute -top-24 -right-16 -z-20 h-72 w-72 rounded-full ${guide.glow || "bg-white/20"} blur-3xl`}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-32 -left-20 -z-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
          </>
        )}

        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bw-950/90 via-bw-950/40 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/55">
            <Link href="/" className="transition hover:text-white">
              Vitrin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <Link href="/rehber" className="transition hover:text-white">
              Rehberler
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            <span className="text-white/90">{guide.shortLabel}</span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                <BookOpenCheck className="h-3.5 w-3.5" />
                {guide.eyebrow}
              </p>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                {guide.title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                {guide.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <a
                  href="#adimlar"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-bw-950 shadow-lg shadow-black/20 transition hover:bg-bw-100"
                >
                  <Sparkles className="h-4 w-4" />
                  Adımları oku
                </a>
                <a
                  href="#kontrol-listesi"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  <CircleCheck className="h-4 w-4" />
                  Kontrol listesi
                </a>
                <Link
                  href={categoryHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/12"
                >
                  {categoryLabel} vitrini
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid w-full max-w-xs grid-cols-2 gap-2 sm:max-w-sm">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Adım</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{guide.steps.length}</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Kontrol</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{guide.checklist.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other guides strip ── */}
      <div className="sticky top-0 z-30 border-b border-bw-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8 hide-scrollbar">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-bw-400">
            Rehberler
          </span>
          <div className="mx-1 h-4 w-px shrink-0 bg-bw-200" />
          <Link
            href={`/rehber/${slug}`}
            className="shrink-0 rounded-full bg-bw-950 px-3 py-1.5 text-xs font-semibold text-white"
          >
            {guide.shortLabel}
          </Link>
          {otherGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/rehber/${g.slug}`}
              className="shrink-0 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-xs font-semibold text-bw-600 transition hover:border-bw-300 hover:text-bw-950"
            >
              {g.shortLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start xl:grid-cols-[1fr_22rem]">
          {/* Steps */}
          <section id="adimlar">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bw-400">
                  Satın alma adımları
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-bw-950 sm:text-3xl">
                  Karar vermeden önce
                </h2>
              </div>
            </div>

            <ol className="relative space-y-3">
              <div
                className="absolute top-4 bottom-4 left-[1.35rem] w-px bg-gradient-to-b from-bw-300 via-bw-200 to-transparent sm:left-[1.6rem]"
                aria-hidden
              />
              {guide.steps.map(([heading, text], index) => (
                <li key={heading}>
                  <article className="group relative flex gap-4 rounded-2xl border border-bw-200/90 bg-white p-4 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-bw-300 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.4)] sm:gap-5 sm:p-5">
                    <span className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-xs font-bold text-white ring-4 ring-[#f7f7f8] sm:h-11 sm:w-11 sm:text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-base font-semibold tracking-tight text-bw-950 sm:text-lg">
                        {heading}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-bw-500 sm:text-[15px]">
                        {text}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          {/* Sticky checklist */}
          <aside id="kontrol-listesi" className="lg:sticky lg:top-16">
            <div className="overflow-hidden rounded-2xl border border-bw-200 bg-white shadow-[0_20px_50px_-36px_rgba(0,0,0,0.4)]">
              <div className="border-b border-bw-100 bg-gradient-to-br from-bw-950 to-bw-800 px-5 py-4 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Hızlı kontrol
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  Almadan önce bak
                </h2>
              </div>
              <ul className="space-y-1 p-3">
                {guide.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 rounded-xl px-2.5 py-2.5 text-sm text-bw-700 transition hover:bg-bw-50"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bw-950 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-bw-100 p-3">
                <Link
                  href={categoryHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
                >
                  {categoryLabel} ilanları
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Category products ── */}
        <section className="mt-14 sm:mt-16">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-bw-400">
                {categoryLabel} vitrini
              </p>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-bw-950 sm:text-3xl">
                Bu kategorideki ilanlar
              </h2>
            </div>
            <Link
              href={categoryHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3.5 py-2 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
            >
              Tümünü gör
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {products?.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-bw-200 bg-white px-5 py-10 text-center">
              <p className="text-sm font-semibold text-bw-900">Henüz ilan yok</p>
              <p className="mt-1 text-sm text-bw-500">
                Yeni {categoryLabel.toLowerCase()} ilanları için vitrini takip et.
              </p>
              <Link
                href={categoryHref}
                className="mt-4 inline-flex rounded-full bg-bw-950 px-4 py-2 text-xs font-semibold text-white"
              >
                Kategoriye git
              </Link>
            </div>
          )}
        </section>

        <OtherGuidesMenu guides={otherGuides} />
      </div>
    </main>
  );
}
