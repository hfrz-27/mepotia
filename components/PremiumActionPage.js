import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
  children,
}) {
  const isSell = accent === "sell";
  const badge = isSell
    ? "border-amber-300 bg-amber-50 text-amber-700"
    : "border-violet-300 bg-violet-50 text-violet-700";

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-bw-950">
      <div className="relative isolate">
        <div className="relative mx-auto max-w-6xl px-4 pt-5 pb-10 sm:px-6 sm:pt-7 sm:pb-14 lg:px-8">
          <Link
            href="/"
            className="group mb-7 inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-white px-3 py-1.5 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Vitrine dön
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-12">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${badge}`}>
                {Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> : null}
                {eyebrow}
              </p>
              <h1 className="mt-4 font-display text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.6rem]">
                {title}
              </h1>
              {description ? (
                <p className="mt-3 max-w-md text-sm leading-relaxed text-bw-500 sm:text-[15px]">
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
                        className="flex items-start gap-3 rounded-2xl border border-bw-200 bg-white p-3.5 shadow-sm"
                      >
                        {HIcon ? (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bw-950 text-white">
                            <HIcon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                        ) : null}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-bw-950">{item.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-bw-500">{item.text}</p>
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
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-bw-200 bg-white text-[11px] font-bold tabular-nums text-bw-900 shadow-sm">
                          {i + 1}
                        </span>
                        {i < steps.length - 1 ? (
                          <span className="my-1 w-px flex-1 bg-bw-200" aria-hidden />
                        ) : null}
                      </div>
                      <p className={`pb-4 text-sm text-bw-600 ${i === steps.length - 1 ? "pb-0" : ""}`}>
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
                      className="rounded-full border border-bw-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-bw-600 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </aside>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-bw-200 bg-white text-bw-950 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.35)]">
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
                      className="rounded-full border border-bw-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-bw-600 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
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
