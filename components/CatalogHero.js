import { BadgeCheck, MessageCircleMore, RefreshCcw, Sparkles } from "lucide-react";

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
    <header className="relative mb-5 overflow-hidden rounded-[26px] bg-[#09090c] px-5 py-7 text-white shadow-[0_28px_80px_-46px_rgba(0,0,0,0.9)] sm:mb-7 sm:rounded-[34px] sm:px-9 sm:py-10 lg:px-12">
      {imageSrc ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt="" className="h-full w-full object-cover object-center opacity-75" />
          <span className="absolute inset-0 bg-gradient-to-r from-[#09090c] via-[#09090c]/95 to-[#09090c]/10" />
        </div>
      ) : null}

      <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.17em] text-white/50 uppercase sm:text-[11px]">
            <Sparkles className="h-3.5 w-3.5 text-white/70" strokeWidth={1.8} />
            {eyebrow}
          </p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[3rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/58 sm:text-[16px]">
              {description}
            </p>
          ) : null}
        </div>

        {count != null ? (
          <div className="w-fit rounded-[18px] border border-white/12 bg-white/[0.07] px-4 py-3 backdrop-blur-md">
            <p className="text-[10px] font-semibold tracking-[0.13em] text-white/40 uppercase">
              Vitrinde
            </p>
            <p className="mt-0.5 text-[1.35rem] font-semibold tracking-[-0.03em] text-white tabular-nums">
              {count} ürün
            </p>
          </div>
        ) : null}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 sm:mt-8">
        {TRUST.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5 text-[11px] text-white/48 sm:text-[12px]">
            <Icon className="h-3.5 w-3.5 text-emerald-300" strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>
    </header>
  );
}
