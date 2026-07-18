import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeroMedia from "@/components/PageHeroMedia";

/**
 * Premium split layout for action forms (sell / request).
 * accent: "sell" | "request"
 */
export default function PremiumActionPage({
  accent = "sell",
  eyebrow,
  title,
  description,
  icon: Icon,
  highlights = [],
  steps = [],
  sideLinks = [],
  heroVideo = "",
  heroImages = [],
  children,
}) {
  const isSell = accent === "sell";
  const glowA = isSell ? "bg-amber-400/25" : "bg-violet-400/25";
  const glowB = isSell ? "bg-orange-500/15" : "bg-sky-500/20";
  const badge = isSell
    ? "border-amber-400/25 bg-amber-400/10 text-amber-100"
    : "border-violet-300/25 bg-violet-400/10 text-violet-100";
  const hasMedia = Boolean(heroVideo || (heroImages || []).filter(Boolean).length);

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-white">
      <div className="relative isolate overflow-hidden">
        {hasMedia ? (
          <PageHeroMedia
            video={heroVideo}
            images={heroImages}
            videoOpacity={0.7}
            imageOpacity={0.5}
          />
        ) : (
          <>
            <div className={`pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full ${glowA} blur-3xl`} aria-hidden />
            <div className={`pointer-events-none absolute top-40 -left-24 h-80 w-80 rounded-full ${glowB} blur-3xl`} aria-hidden />
          </>
        )}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0c0e]" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 pt-5 pb-10 sm:px-6 sm:pt-7 sm:pb-14 lg:px-8">
          <Link
            href="/"
            className="group mb-7 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/12 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Vitrine dön
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-12">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${badge}`}>
                {Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> : null}
                {eyebrow}
              </p>
              <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.6rem]">
                {title}
              </h1>
              {description ? (
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-[15px]">
                  {description}
                </p>
              ) : null}

              {highlights.length ? (
                <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {highlights.map((item) => {
                    const HIcon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.07] p-3.5 backdrop-blur-md"
                      >
                        {HIcon ? (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-bw-950">
                            <HIcon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                        ) : null}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-white/50">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {steps.length ? (
                <ol className="mt-6 hidden space-y-0 lg:block">
                  {steps.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[11px] font-bold tabular-nums">
                          {i + 1}
                        </span>
                        {i < steps.length - 1 ? (
                          <span className="my-1 w-px flex-1 bg-white/15" aria-hidden />
                        ) : null}
                      </div>
                      <p className={`pb-4 text-sm text-white/70 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : null}

              {sideLinks.length ? (
                <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
                  {sideLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </aside>

            <div className="relative">
              <div
                className={`pointer-events-none absolute -inset-px rounded-[1.65rem] opacity-60 blur-sm ${
                  isSell
                    ? "bg-gradient-to-br from-amber-400/40 via-transparent to-orange-500/20"
                    : "bg-gradient-to-br from-violet-400/40 via-transparent to-sky-400/20"
                }`}
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.55rem] border border-white/15 bg-white text-bw-950 shadow-[0_32px_80px_-36px_rgba(0,0,0,0.7)]">
                <div
                  className={`h-1 w-full ${
                    isSell
                      ? "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"
                      : "bg-gradient-to-r from-violet-500 via-fuchsia-400 to-sky-400"
                  }`}
                  aria-hidden
                />
                <div className="p-5 sm:p-7 lg:p-8">{children}</div>
              </div>

              {sideLinks.length ? (
                <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
                  {sideLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-[11px] font-semibold text-white/75 transition hover:bg-white/12 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
