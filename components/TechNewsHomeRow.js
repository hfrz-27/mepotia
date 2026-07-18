"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

/**
 * NEXUS DESK — etkileşimli manşet sineması.
 * Kategori luxury kartlarından tamamen ayrı dil: print registration marks,
 * otomatik geçiş, hover ile manşet değiştirme, Ken Burns, ink/cream.
 */
function CropMarks({ className = "" }) {
  const corner = "absolute h-3 w-3 border-[#1d1d1f]/25";
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <span className={`${corner} top-0 left-0 border-t border-l`} />
      <span className={`${corner} top-0 right-0 border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

export default function TechNewsHomeRow({ posts }) {
  const items = (posts || []).slice(0, 6);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);

  const go = useCallback(
    (i) => {
      if (!items.length) return;
      setFade(false);
      window.setTimeout(() => {
        setActive(((i % items.length) + items.length) % items.length);
        setFade(true);
      }, 120);
    },
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const t = window.setInterval(() => go(active + 1), 5200);
    return () => window.clearInterval(t);
  }, [active, paused, items.length, go]);

  if (!items.length) return null;

  const current = items[active] || items[0];

  return (
    <div
      className="relative overflow-hidden bg-[#f7f5f0]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft paper texture wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 60% at 10% 0%, rgba(28,28,30,0.04), transparent 50%), radial-gradient(ellipse 60% 40% at 90% 100%, rgba(180,140,60,0.05), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-11 sm:px-6 sm:py-14 lg:px-8">
        {/* Masthead */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#1d1d1f]/10 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#1d1d1f]/30" />
              <p className="text-[10px] font-bold tracking-[0.32em] text-[#1d1d1f]/45 uppercase">
                Nexus desk · Vol. 26
              </p>
            </div>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.035em] text-[#1d1d1f]">
              Bugünün sinyali
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1d1d1f]/12 bg-white text-[#1d1d1f] shadow-sm transition hover:border-[#1d1d1f]/25"
              aria-label={paused ? "Otomatik geçişi başlat" : "Duraklat"}
            >
              {paused ? (
                <Play className="h-3.5 w-3.5" fill="currentColor" />
              ) : (
                <Pause className="h-3.5 w-3.5" fill="currentColor" />
              )}
            </button>
            <Link
              href="/teknoloji"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase transition hover:bg-black"
            >
              Arşiv
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Theater stage */}
        <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Immersive hero */}
          <div className="relative lg:col-span-8">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.25rem] bg-[#0e0e10] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px]">
              <CropMarks className="absolute inset-3 z-20 sm:inset-4" />

              {/* Crossfade layer */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {current.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={current.id}
                    src={current.cover_url}
                    alt=""
                    className="h-full w-full object-cover ken-burns"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#1c1c1f] to-[#0a0a0b]" />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
              <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(255,255,255,0.35), transparent 55%)",
                }}
                aria-hidden
              />

              {/* Progress bar */}
              <div className="absolute inset-x-0 top-0 z-30 h-[2px] bg-white/10">
                <div
                  key={`${current.id}-${paused}`}
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5e6b8]"
                  style={{
                    width: paused ? "100%" : "0%",
                    animation: paused ? "none" : "nexus-progress 5.2s linear forwards",
                  }}
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-white/80 uppercase backdrop-blur-md">
                    Live desk
                  </span>
                  <span className="text-[11px] font-medium text-white/50">
                    {formatTechDate(current.created_at) || "—"}
                  </span>
                  <span className="text-[11px] tabular-nums text-white/35">
                    {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 max-w-2xl font-display text-[1.45rem] font-semibold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2rem] lg:text-[2.15rem]">
                  {current.title}
                </h3>
                {current.excerpt ? (
                  <p className="mt-2 max-w-xl line-clamp-2 text-sm leading-relaxed text-white/55">
                    {current.excerpt}
                  </p>
                ) : null}
                <Link
                  href={`/teknoloji/${current.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12px] font-bold tracking-[0.08em] text-[#1d1d1f] uppercase transition hover:bg-[#f5e6b8]"
                >
                  Manşeti aç
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Signal tickets — hover changes hero */}
          <div className="flex flex-col gap-2.5 lg:col-span-4">
            <p className="px-1 text-[10px] font-bold tracking-[0.24em] text-[#1d1d1f]/40 uppercase">
              Sinyal sırası
            </p>
            <div className="flex flex-1 flex-col gap-2">
              {items.map((post, i) => {
                const on = i === active;
                return (
                  <button
                    key={post.id}
                    type="button"
                    onMouseEnter={() => go(i)}
                    onFocus={() => go(i)}
                    onClick={() => go(i)}
                    className={[
                      "group relative flex min-h-[72px] flex-1 items-stretch gap-3 overflow-hidden rounded-2xl border text-left transition-all duration-400",
                      on
                        ? "border-[#1d1d1f]/15 bg-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.25)]"
                        : "border-transparent bg-white/50 hover:border-[#1d1d1f]/10 hover:bg-white",
                    ].join(" ")}
                  >
                    {/* Active accent bar */}
                    <span
                      className="w-1 shrink-0 rounded-full transition-all duration-400"
                      style={{
                        background: on
                          ? "linear-gradient(180deg, #d4af37, #f5e6b8)"
                          : "transparent",
                        boxShadow: on ? "0 0 16px rgba(212,175,55,0.45)" : "none",
                      }}
                    />
                    <div className="relative my-2.5 h-auto w-16 shrink-0 overflow-hidden rounded-xl bg-[#111] sm:w-[4.5rem]">
                      {post.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.cover_url}
                          alt=""
                          className={[
                            "h-full w-full object-cover transition duration-500",
                            on ? "scale-105" : "scale-100 opacity-80 group-hover:opacity-100",
                          ].join(" ")}
                        />
                      ) : (
                        <div className="h-full w-full bg-[#222]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "font-display text-[11px] font-bold tabular-nums tracking-wider",
                            on ? "text-[#b8942e]" : "text-[#1d1d1f]/30",
                          ].join(" ")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-[10px] text-[#86868b]">
                          {formatTechDate(post.created_at)}
                        </span>
                      </div>
                      <p
                        className={[
                          "mt-1 line-clamp-2 text-[13px] font-semibold leading-snug tracking-tight transition",
                          on ? "text-[#1d1d1f]" : "text-[#3f3f46] group-hover:text-[#1d1d1f]",
                        ].join(" ")}
                      >
                        {post.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom ticker of remaining links */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#1d1d1f]/10 pt-5">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#1d1d1f]/35 uppercase">
            Hızlı hat
          </span>
          {items.map((post, i) => (
            <Link
              key={`fast-${post.id}`}
              href={`/teknoloji/${post.id}`}
              className={[
                "text-[12px] font-medium transition hover:text-[#1d1d1f]",
                i === active ? "text-[#b8942e]" : "text-[#6e6e73]",
              ].join(" ")}
            >
              {post.title.length > 42 ? `${post.title.slice(0, 42)}…` : post.title}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
