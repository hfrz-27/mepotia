import BackHomeLink from "@/components/BackHomeLink";
import ProductMiniStrip from "@/components/ProductMiniStrip";
import { Cpu, Sparkles } from "lucide-react";

export default function TechNewsPageHero({ count = 0, products = [] }) {
  return (
    <section className="relative scroll-mt-28 overflow-hidden border-b border-bw-200 bg-white">
      <div
        className="absolute inset-0 bg-gradient-to-br from-white via-bw-50 to-bw-100"
        aria-hidden
      />
      <div className="story-band-grid absolute inset-0 opacity-[0.04]" aria-hidden />
      <div
        className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-bw-200/60 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-bw-100 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <BackHomeLink className="mb-6" />

        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-bw-500 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-bw-600" />
            Güncel haberler
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950">
            Teknoloji Dünyasından
            <span className="mt-1 block text-bw-700">Son Gelişmeler</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bw-600">
            Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler ve
            Mepotia vitrininden seçilmiş fırsatlar.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white/80 px-3 py-1 text-[10px] font-medium text-bw-500 backdrop-blur-sm">
            <Cpu className="h-3 w-3 text-bw-400" />
            {count} haber · düzenli güncellenir
          </p>
        </div>

        <ProductMiniStrip products={products} className="mt-8 lg:mt-10" />
      </div>
    </section>
  );
}
