"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Tümü",
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-5 ${className}`}>
      <div className="min-w-0 max-w-2xl">
        {eyebrow ? <p className="sx-kicker">{eyebrow}</p> : null}
        <h2 className="sx-title mt-2 text-3xl sm:text-4xl md:text-[2.75rem]">{title}</h2>
        {description ? <p className="sx-sub mt-3 max-w-lg">{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="sx-btn shrink-0">
          {linkLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        </Link>
      ) : null}
    </div>
  );
}
