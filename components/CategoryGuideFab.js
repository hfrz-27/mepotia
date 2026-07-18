import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { BUYING_GUIDES, CATEGORY_GUIDE_SLUGS } from "@/lib/buyingGuides";

export default function CategoryGuideFab({ categorySlug, categoryName }) {
  const guideSlug = CATEGORY_GUIDE_SLUGS[categorySlug];
  const guide = guideSlug ? BUYING_GUIDES[guideSlug] : null;
  if (!guide) return null;

  const label = categoryName ? `${categoryName} rehberi` : "Rehber";

  return (
    <Link
      href={`/rehber/${guideSlug}`}
      className="group fixed right-4 bottom-5 z-[90] flex items-center gap-2 rounded-full bg-bw-950 py-3 pl-3.5 pr-4 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55)] transition hover:scale-105 hover:bg-bw-800 sm:right-6 sm:bottom-6"
      aria-label={`${label} — satın alma rehberini aç`}
      title={label}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
        <BookOpenCheck className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="pr-0.5 text-sm font-semibold tracking-tight">Rehber</span>
    </Link>
  );
}
