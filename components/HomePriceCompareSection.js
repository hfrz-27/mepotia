import { Scale, Sparkles, TrendingDown } from "lucide-react";
import HomeSectionHeader from "@/components/HomeSectionHeader";

const POINTS = [
  { icon: Scale, text: "Gerçek ilan fiyatı" },
  { icon: TrendingDown, text: "Piyasa karşılaştırması" },
  { icon: Sparkles, text: "Hızlı sonuç" },
];

export default function HomePriceCompareSection() {
  return (
    <section className="border-y border-bw-200 bg-bw-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <HomeSectionHeader
          eyebrow="Fiyat karşılaştır"
          title="Mepotia mı piyasa mı?"
          description="Model yaz; vitrindeki gerçek ilan fiyatını mağaza fiyatlarıyla yan yana gör."
          href="/fiyat-karsilastir"
          linkLabel="Karşılaştırmaya git"
        />

        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {POINTS.map((point) => (
            <li
              key={point.text}
              className="inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-xs font-medium text-bw-600"
            >
              <point.icon className="h-3.5 w-3.5 text-bw-500" strokeWidth={1.75} />
              {point.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
