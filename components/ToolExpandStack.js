"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Full-width tool grid — no carousel, no dark stack. */
export default function ToolExpandStack({
  eyebrow = "Araçlar",
  title,
  subtitle,
  cards = [],
  tone = "soft",
}) {
  if (!cards.length) return null;

  return (
    <section className={`sx-section ${tone === "white" ? "sx-section-alt" : ""}`}>
      <div className="sx-wrap">
        <div className="mb-8 max-w-2xl">
          <p className="sx-kicker">{eyebrow}</p>
          <h2 className="sx-title mt-2 text-3xl sm:text-4xl">{title}</h2>
          {subtitle ? <p className="sx-sub mt-3">{subtitle}</p> : null}
        </div>

        <div
          className={`grid gap-px bg-[#2a2a30] ${
            cards.length === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex min-h-[280px] flex-col bg-[#111114] p-6 transition hover:bg-[#16161a] sm:min-h-[300px] sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center bg-[#ff4d1a] text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.16em] text-zinc-500 uppercase">
                    {card.eyebrow || `0${index + 1}`}
                  </span>
                </div>

                <h3 className="sx-title mt-6 text-2xl">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.description}</p>

                <ul className="mt-5 space-y-2 border-t border-[#2a2a30] pt-4">
                  {(card.steps || card.points || []).slice(0, 3).map((step, i) => (
                    <li key={`${card.href}-${i}`} className="flex gap-2 text-xs text-zinc-400">
                      <span className="font-bold text-[#ff4d1a]">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold tracking-[0.12em] text-white uppercase">
                  {card.cta}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
