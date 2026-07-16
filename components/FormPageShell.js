import BackHomeLink from "@/components/BackHomeLink";
import { Sparkles } from "lucide-react";

export default function FormPageShell({
  eyebrow,
  title,
  description,
  children,
  maxWidth = "max-w-2xl",
}) {
  return (
    <main className="min-h-screen bg-bw-100">
      <section className="relative scroll-mt-28 overflow-hidden bg-bw-100 pb-12 sm:pb-16">
        <div
          className="absolute inset-0 bg-gradient-to-b from-bw-950 via-bw-900/95 to-bw-100"
          aria-hidden
        />
        <div className="hero-grid absolute inset-0 opacity-[0.04]" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <BackHomeLink variant="dark" label="Anasayfaya dön" className="mx-auto mb-6" />

          <div className="mx-auto max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-bw-400 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-bw-500" />
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 text-sm leading-relaxed text-bw-300 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>

          <div
            className={`mx-auto mt-8 overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white p-6 text-left shadow-[0_28px_80px_-48px_rgba(0,0,0,0.45)] sm:p-8 ${maxWidth}`}
          >
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
