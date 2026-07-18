import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, CheckCircle2 } from "lucide-react";
import { BUYING_GUIDES } from "@/lib/buyingGuides";

const GUIDE_BY_CATEGORY = {
  telefon: "telefon-alma-rehberi",
  bilgisayar: "bilgisayar-alma-rehberi",
};

export default function ProductBuyingGuide({ categorySlug, heroImage }) {
  const guideSlug = GUIDE_BY_CATEGORY[categorySlug];
  const guide = guideSlug ? BUYING_GUIDES[guideSlug] : null;
  if (!guide) return null;

  return (
    <section className="mt-10 overflow-hidden rounded-[1.75rem] bg-bw-950 shadow-[0_28px_60px_-42px_rgba(0,0,0,.6)] sm:mt-14">
      <div className="relative isolate min-h-[21rem] overflow-hidden px-5 py-7 sm:min-h-[25rem] sm:px-9 sm:py-10">
        {heroImage ? <Image src={heroImage} alt="" fill className="-z-20 object-cover" sizes="(max-width: 1280px) 100vw, 1200px" /> : null}
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${guide.accent} ${heroImage ? "opacity-85" : ""}`} />
        {heroImage ? <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bw-950 via-bw-950/75 to-bw-950/20" /> : null}
        <div className="max-w-xl text-white">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-bw-200"><BookOpenCheck className="h-4 w-4" /> Mepotia rehber</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{guide.title}</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-bw-200 sm:text-base">Bu ürünü değerlendirirken doğru kararı vermene yardımcı olacak kısa rehbere göz at.</p>
          <div className="mt-6 grid gap-2 text-sm text-bw-100 sm:grid-cols-2">
            {guide.checklist.slice(0, 2).map((item) => <span key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{item}</span>)}
          </div>
          <Link href={`/rehber/${guideSlug}`} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-bw-950 transition hover:-translate-y-0.5 hover:bg-bw-100">Rehberi incele <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
