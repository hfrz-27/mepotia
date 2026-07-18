import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, Laptop, Smartphone } from "lucide-react";
import { BUYING_GUIDE_LIST } from "@/lib/buyingGuides";

export const metadata = { title: "Satın alma rehberleri", description: "Mepotia'da doğru ürünü seçmene yardımcı kısa satın alma rehberleri." };

const icons = [Smartphone, Laptop];

export default function RehberPage() {
  return (
    <main className="min-h-screen bg-bw-50">
      <section className="bg-bw-950 px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-bw-300"><BookOpenCheck className="h-4 w-4" /> Mepotia rehber</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Doğru ürünü, daha güvenle seç.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bw-300 sm:text-lg">Kısa kontrol listeleri ve net kriterlerle, ihtiyacına uygun teknolojiyi bul.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {BUYING_GUIDE_LIST.map((guide, index) => {
            const Icon = icons[index];
            return <Link key={guide.slug} href={`/rehber/${guide.slug}`} className="group rounded-[1.75rem] border border-bw-200 bg-white p-6 shadow-[0_20px_48px_-38px_rgba(0,0,0,.4)] transition hover:-translate-y-1 hover:shadow-[0_28px_55px_-38px_rgba(0,0,0,.45)] sm:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-bw-950 text-white"><Icon className="h-5 w-5" /></span>
              <h2 className="mt-7 text-2xl font-semibold tracking-tight text-bw-950">{guide.title}</h2>
              <p className="mt-3 leading-relaxed text-bw-600">{guide.description}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-bw-950">Rehberi oku <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>;
          })}
        </div>
      </section>
    </main>
  );
}
