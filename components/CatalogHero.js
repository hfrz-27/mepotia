import { BadgeCheck, MessageCircleMore, RefreshCcw } from "lucide-react";

const TRUST = [
  { icon: BadgeCheck, label: "Net ürün bilgisi" },
  { icon: RefreshCcw, label: "Fiyat karşılaştırma" },
  { icon: MessageCircleMore, label: "Doğrudan iletişim" },
];

export default function CatalogHero({
  eyebrow = "Mepotia vitrini",
  title,
  description,
  count,
  imageSrc,
}) {
  return (
    <header className="relative mb-5 min-h-[300px] overflow-hidden rounded-[26px] border border-black/[0.05] bg-white px-5 py-8 text-[#1d1d1f] sm:mb-7 sm:min-h-[380px] sm:rounded-[34px] sm:px-10 sm:py-12 lg:px-14">
      {imageSrc ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt="" className="h-full w-full object-cover object-[75%_center] opacity-85" />
          <span className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/5" />
        </div>
      ) : null}

      <div className="relative flex min-h-[235px] flex-col justify-center gap-6 sm:min-h-[280px] md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.17em] text-[#86868b] uppercase sm:text-[11px]">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-xl text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-[#6e6e73] sm:text-[16px]">
              {description}
            </p>
          ) : null}
        </div>

        {count != null ? (
          <div className="w-fit rounded-[18px] bg-[#f5f5f7] px-4 py-3 ring-1 ring-black/[0.04]">
            <p className="text-[10px] font-semibold tracking-[0.13em] text-[#86868b] uppercase">
              Vitrinde
            </p>
            <p className="mt-0.5 text-[1.35rem] font-semibold tracking-[-0.03em] text-[#1d1d1f] tabular-nums">
              {count} ürün
            </p>
          </div>
        ) : null}
      </div>

      <div className="relative mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/[0.06] pt-4">
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
