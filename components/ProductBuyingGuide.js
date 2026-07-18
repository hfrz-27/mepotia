import Link from "next/link";
import { ArrowRight, BookOpenCheck, Check } from "lucide-react";
import { BUYING_GUIDES, CATEGORY_GUIDE_SLUGS } from "@/lib/buyingGuides";

export default function ProductBuyingGuide({ categorySlug, categoryName }) {
  const guideSlug = CATEGORY_GUIDE_SLUGS[categorySlug];
  const guide = guideSlug ? BUYING_GUIDES[guideSlug] : null;
  if (!guide) return null;

  const checks = guide.checklist.slice(0, 4);

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-bw-200 bg-white shadow-[0_12px_36px_-28px_rgba(0,0,0,0.35)] sm:mt-8">
      <div className="flex flex-col gap-0 sm:flex-row">
        {/* Left: header + CTA */}
        <div className="relative flex-1 overflow-hidden bg-bw-950 px-4 py-4 text-white sm:max-w-[42%] sm:px-5 sm:py-5">
          <div
            className="pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <p className="relative inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
            <BookOpenCheck className="h-3.5 w-3.5" />
            Hızlı kontrol
          </p>
          <h2 className="relative mt-1.5 text-base font-semibold tracking-tight sm:text-lg">
            Almadan önce bak
          </h2>
          <p className="relative mt-1 text-xs leading-snug text-white/50">
            {categoryName ? `${categoryName} · ` : ""}
            {guide.shortLabel} rehberi
          </p>
          <Link
            href={`/rehber/${guideSlug}`}
            className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-bw-950 transition hover:bg-bw-100"
          >
            Rehbere git
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Right: checklist */}
        <div className="flex-1 px-4 py-3.5 sm:px-5 sm:py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-bw-400">
            Kontrol listesi
          </p>
          <ul className="mt-2 space-y-1.5">
            {checks.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-bw-700 sm:text-[13px]">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bw-950 text-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/rehber/${guideSlug}#adimlar`}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-bw-500 transition hover:text-bw-950"
          >
            Tüm adımları gör
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
