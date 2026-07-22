import { BadgeCheck, MessageCircleMore, RefreshCcw } from "lucide-react";

const TRUST = [
  { icon: BadgeCheck, label: "Net ürün bilgisi" },
  { icon: RefreshCcw, label: "Fiyat karşılaştırma" },
  { icon: MessageCircleMore, label: "Doğrudan iletişim" },
];

/**
 * Banner/foto içermeyen, sade ve profesyonel sayfa başlığı.
 * CatalogHero'nun yerini alır — üstte büyük görsel yok.
 */
export default function CatalogPageHeader({ eyebrow = "Mepotia vitrini", title, description, count }) {
  return (
    <header className="mb-5 border-b border-black/[0.06] pb-5 sm:mb-7 sm:pb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.17em] text-[#86868b] uppercase sm:text-[11px]">
            {eyebrow}
          </p>
          <h1 className="mt-2 max-w-xl text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#1d1d1f] sm:text-[2.6rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-[#6e6e73] sm:text-[15px]">
              {description}
            </p>
          ) : null}
        </div>

        {count != null ? (
          <div className="w-fit shrink-0 rounded-[16px] bg-[#f5f5f7] px-4 py-2.5 ring-1 ring-black/[0.04]">
            <p className="text-[10px] font-semibold tracking-[0.13em] text-[#86868b] uppercase">
              Vitrinde
            </p>
            <p className="mt-0.5 text-[1.15rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] tabular-nums">
              {count} ürün
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {TRUST.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-[#6e6e73] sm:text-[12px]">
            <Icon className="h-3.5 w-3.5 text-[#1d1d1f]" strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>
    </header>
  );
}
