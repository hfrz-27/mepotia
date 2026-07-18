"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { appleTextLinkClass } from "@/lib/appleUi";

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Tümü",
  className = "",
  align = "center",
}) {
  const centered = align !== "left";

  return (
    <div
      className={[
        centered ? "mx-auto max-w-3xl text-center" : "flex flex-wrap items-end justify-between gap-4",
        className,
      ].join(" ")}
    >
      <div className={centered ? "" : "max-w-xl"}>
        {eyebrow ? (
          <p className="text-[12px] font-semibold tracking-[-0.01em] text-[#6e6e73] sm:text-[14px]">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={[
            "font-semibold tracking-[-0.03em] text-[#1d1d1f]",
            eyebrow ? "mt-1" : "",
            "text-[28px] leading-[1.1] sm:text-[40px] md:text-[48px]",
          ].join(" ")}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={[
              "mt-3 text-[17px] leading-snug font-normal text-[#6e6e73] sm:text-[19px]",
              centered ? "mx-auto max-w-xl" : "",
            ].join(" ")}
          >
            {description}
          </p>
        ) : null}
        {href && centered ? (
          <div className="mt-4">
            <Link href={href} className={appleTextLinkClass}>
              {linkLabel}
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        ) : null}
      </div>
      {href && !centered ? (
        <Link href={href} className={`shrink-0 ${appleTextLinkClass}`}>
          {linkLabel}
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      ) : null}
    </div>
  );
}
