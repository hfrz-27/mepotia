import Link from "next/link";
import { Check, ChevronRight, CircleCheck, Search } from "lucide-react";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { BUYING_GUIDES } from "@/lib/buyingGuides";
import { getPublishedProducts } from "@/lib/products";

export const revalidate = 60;

export function generateStaticParams() { return Object.keys(BUYING_GUIDES).map((slug) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = BUYING_GUIDES[slug];
  return guide ? { title: guide.title, description: guide.description } : {};
}

export default async function BuyingGuidePage({ params }) {
  const { slug } = await params;
  const guide = BUYING_GUIDES[slug];
  if (!guide) notFound();
  const { data: products } = await getPublishedProducts({ limit: 4, search: guide.search });

  return <main className="min-h-screen bg-bw-50">
    <section className={`bg-gradient-to-br ${guide.accent} px-4 py-12 text-white sm:px-6 sm:py-20 lg:px-8`}>
      <div className="mx-auto max-w-5xl">
        <Link href="/rehber" className="inline-flex items-center gap-1.5 text-xs font-semibold text-bw-200 transition hover:text-white">Rehberler <ChevronRight className="h-3.5 w-3.5" /> {guide.title}</Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[.22em] text-bw-300">{guide.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{guide.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-bw-200 sm:text-lg">{guide.description}</p>
        <a href="#kontrol-listesi" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-bw-950 transition hover:bg-bw-100"><CircleCheck className="h-4 w-4" /> Kontrol listesine geç</a>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-bw-500">Satın alma adımları</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-bw-950">Karar vermeden önce bunlara bak.</h2></div>
      <div className="space-y-4">{guide.steps.map(([heading, text], index) => <article key={heading} className="flex gap-4 rounded-2xl border border-bw-200 bg-white p-5 shadow-sm sm:gap-6 sm:p-6"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-sm font-bold text-white">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold text-bw-950">{heading}</h3><p className="mt-2 leading-relaxed text-bw-600">{text}</p></div></article>)}</div>
      <section id="kontrol-listesi" className="mt-10 rounded-[1.75rem] border border-bw-200 bg-white p-6 shadow-[0_22px_50px_-40px_rgba(0,0,0,.35)] sm:p-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-bw-500">Hızlı kontrol listesi</p><h2 className="mt-2 text-2xl font-semibold text-bw-950">Satın almadan önce son kez kontrol et.</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{guide.checklist.map((item) => <li key={item} className="flex gap-2.5 rounded-xl bg-bw-50 px-3 py-3 text-sm text-bw-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-bw-950" />{item}</li>)}</ul></section>
      <section className="mt-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-bw-500">Vitrinden seçtiklerimiz</p><h2 className="mt-2 text-2xl font-semibold text-bw-950">İlana göz at.</h2></div><Link href={`/ara?q=${encodeURIComponent(guide.search)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-bw-950 hover:underline"><Search className="h-4 w-4" /> Tümünü ara</Link></div>{products?.length ? <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="mt-5 rounded-2xl border border-dashed border-bw-300 bg-white p-6 text-sm text-bw-600">Bu kategoride şu an ilan yok. Yeni ilanlar için vitrini takip et.</p>}</section>
    </section>
  </main>;
}
