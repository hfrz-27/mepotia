import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function FormPageShell({
  eyebrow,
  title,
  description,
  children,
  maxWidth = "max-w-2xl",
  tips = [],
  sideLinks = [],
}) {
  return (
    <main className="min-h-screen bg-[#f6f6f7]">
      <section className="relative overflow-hidden">
        {/* Ambient hero */}
        <div className="absolute inset-x-0 top-0 h-[22rem] bg-bw-950 sm:h-[24rem]" aria-hidden />
        <div
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-20 -left-16 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] opacity-[0.07] sm:h-[24rem]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-[18rem] h-24 bg-gradient-to-b from-transparent to-[#f6f6f7] sm:top-[20rem]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:px-8">
          <Link
            href="/"
            className="group mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-md transition hover:bg-white/15"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Vitrine dön
          </Link>

          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
            {description ? (
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/55 sm:text-[15px]">
                {description}
              </p>
            ) : null}

            {tips.length ? (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {tips.map((tip) => (
                  <span
                    key={tip}
                    className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[11px] font-medium text-white/70"
                  >
                    {tip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className={`mx-auto mt-8 overflow-hidden rounded-[1.5rem] border border-bw-200/90 bg-white p-5 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.45)] sm:mt-10 sm:p-7 lg:p-8 ${maxWidth}`}
          >
            {children}
          </div>

          {sideLinks.length ? (
            <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-2">
              {sideLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-bw-200 bg-white px-3.5 py-2 text-xs font-semibold text-bw-700 shadow-sm transition hover:border-bw-300 hover:text-bw-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
