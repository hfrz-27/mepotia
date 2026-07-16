import BackHomeLink from "@/components/BackHomeLink";
import ProductMiniStrip from "@/components/ProductMiniStrip";
import { Cpu, Sparkles } from "lucide-react";

export default function TechNewsPageHero({ count = 0, products = [], heroImage = "", heroVideo = "" }) {
  return (
    <section className="relative scroll-mt-28 overflow-hidden border-b border-bw-200 bg-white">
      {heroVideo ? (
        <>
          <video src={heroVideo} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
          <div className="absolute inset-0 bg-gradient-to-r from-bw-950/90 via-bw-950/68 to-bw-950/38" aria-hidden />
        </>
      ) : heroImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bw-950/90 via-bw-950/68 to-bw-950/38" aria-hidden />
        </>
      ) : null}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white via-bw-50 to-bw-100 ${heroImage || heroVideo ? "opacity-0" : ""}`}
        aria-hidden
      />
      <div className={`story-band-grid absolute inset-0 ${heroImage || heroVideo ? "opacity-[0.12]" : "opacity-[0.04]"}`} aria-hidden />
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
          <p className={`inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] uppercase ${heroImage || heroVideo ? "text-white/75" : "text-bw-500"}`}>
            <Sparkles className={`h-3.5 w-3.5 ${heroImage || heroVideo ? "text-white" : "text-bw-600"}`} />
            Güncel haberler
          </p>
          <h1 className={`mt-3 font-display text-3xl font-semibold tracking-wide sm:text-4xl lg:text-5xl ${heroImage || heroVideo ? "text-white" : "text-bw-950"}`}>
            Teknoloji Dünyasından
            <span className={`mt-1 block ${heroImage || heroVideo ? "text-white/80" : "text-bw-700"}`}>Son Gelişmeler</span>
          </h1>
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${heroImage || heroVideo ? "text-white/80" : "text-bw-600"}`}>
            Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler ve
            Mepotia vitrininden seçilmiş fırsatlar.
          </p>
          <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium backdrop-blur-sm ${heroImage || heroVideo ? "border border-white/20 bg-white/10 text-white/80" : "border border-bw-200 bg-white/80 text-bw-500"}`}>
            <Cpu className={`h-3 w-3 ${heroImage || heroVideo ? "text-white/70" : "text-bw-400"}`} />
            {count} haber · düzenli güncellenir
          </p>
        </div>

        <ProductMiniStrip products={products} className="mt-8 lg:mt-10" />
      </div>
    </section>
  );
}
