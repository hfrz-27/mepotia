"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Tümü",
  tone = "light",
  centered = true,
  className = "",
}) {
  const dark = tone === "dark";

  const eyebrowClass = dark
    ? "text-[10px] font-semibold tracking-[0.22em] text-white/50 uppercase"
    : "text-[10px] font-semibold tracking-[0.22em] text-bw-500 uppercase";

  const titleClass = dark
    ? "mt-2 font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl"
    : "mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl";

  const descClass = dark
    ? "mt-2 text-sm leading-relaxed text-white/65"
    : "mt-2 text-sm leading-relaxed text-bw-500";

  const linkClass =
    "inline-flex items-center gap-2 rounded-xl bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800";

  const wrapMb = "mb-6 sm:mb-8";

  if (!centered) {
    return (
      <div className={`flex flex-wrap items-end justify-between gap-4 ${wrapMb} ${className}`}>
        <div className="max-w-2xl">
          <p className={eyebrowClass}>{eyebrow}</p>
          <h2 className={titleClass}>{title}</h2>
          {description ? <p className={`${descClass} max-w-xl`}>{description}</p> : null}
        </div>
        {href ? (
          <Link href={href} className={`${linkClass} shrink-0`}>
            {linkLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`mx-auto max-w-2xl text-center ${wrapMb} ${className}`}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={titleClass}>{title}</h2>
      {description ? <p className={descClass}>{description}</p> : null}
      {href ? (
        <div className="mt-4">
          <Link href={href} className={linkClass}>
            {linkLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
