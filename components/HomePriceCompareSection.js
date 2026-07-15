import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Scale, Sparkles, TrendingDown, Zap } from "lucide-react";

const POINTS = [
  { icon: Scale, label: "Gerçek ilan fiyatı", detail: "Vitrindeki canlı ilanlar" },
  { icon: TrendingDown, label: "Piyasa karşılaştırması", detail: "Mağaza fiyatlarıyla yan yana" },
  { icon: Zap, label: "Hızlı sonuç", detail: "Model yaz, anında gör" },
];

const DEMO_IMG =
  "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80";

export default function HomePriceCompareSection({
  heroImage,
}) {
  const imageSrc = heroImage || DEMO_IMG;

  return (
    <section className="relative overflow-hidden border-y border-bw-200 bg-[#f8f8fa]">
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-bw-200/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-bw-500 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Fiyat karşılaştır
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-bw-950 sm:text-4xl">
              Mepotia mı piyasa mı?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-bw-600 sm:text-base lg:mx-0">
              Model yaz; vitrindeki gerçek ilan fiyatını mağaza fiyatlarıyla yan yana gör.
            </p>

            <Link
              href="/fiyat-karsilastir"
              prefetch
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] transition hover:bg-bw-800"
            >
              Karşılaştırmaya git
              <ArrowRight className="h-4 w-4" />
            </Link>

            <ul className="mt-8 space-y-3 text-left">
              {POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <li key={point.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_16px_-8px_rgba(0,0,0,0.15)]">
                      <Icon className="h-4 w-4 text-bw-800" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-bw-950">{point.label}</span>
                      <span className="block text-xs text-bw-500">{point.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[1.75rem] border border-bw-200/80 bg-white p-3 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.28)] sm:p-4">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-bw-100">
                <Image
                  src={imageSrc}
                  alt="Fiyat karşılaştırma örneği"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 90vw, 480px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bw-950/75 via-bw-950/15 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 space-y-2.5 sm:inset-x-5 sm:bottom-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-100 backdrop-blur-sm">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Örnek: iPhone 15 Pro
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-white/15 bg-white/95 p-3 backdrop-blur-md">
                      <p className="text-[10px] font-bold tracking-[0.14em] text-bw-500 uppercase">
                        Mepotia
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold text-bw-950">48.750 ₺</p>
                      <p className="mt-0.5 text-[10px] text-bw-500">Gerçek vitrin ilanı</p>
                    </div>
                    <div className="rounded-xl border border-white/15 bg-bw-950/80 p-3 backdrop-blur-md">
                      <p className="text-[10px] font-bold tracking-[0.14em] text-bw-400 uppercase">
                        Piyasa
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold text-white">52.900 ₺</p>
                      <p className="mt-0.5 text-[10px] text-bw-400">En düşük mağaza</p>
                    </div>
                  </div>

                  <p className="text-center text-xs font-semibold text-emerald-200">
                    Yaklaşık 4.150 ₺ avantaj · %8 daha uygun
                  </p>
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -right-3 -top-3 hidden h-20 w-20 rounded-2xl border border-bw-200 bg-white shadow-lg sm:block"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
