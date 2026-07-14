import Link from "next/link";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";

export default function BackHomeLink({
  href = "/",
  label = "Ana sayfa",
  variant = "pill",
  className = "",
}) {
  if (variant === "button") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2.5 rounded-2xl bg-bw-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)] transition hover:-translate-y-0.5 hover:bg-bw-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bw-950 ${className}`}
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {label}
      </Link>
    );
  }

  if (variant === "minimal") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-3 py-2 text-xs font-semibold text-bw-700 shadow-[0_12px_28px_-24px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5 hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950 ${className}`}
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        {label}
      </Link>
    );
  }

  if (variant === "dark") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-[0_18px_42px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15 ${className}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-bw-950 transition group-hover:scale-105">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        </span>
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-2xl border border-bw-200 bg-white px-3 py-2 text-sm font-semibold text-bw-800 shadow-[0_16px_40px_-32px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-bw-300 hover:bg-bw-50 hover:text-bw-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bw-950 sm:px-4 sm:py-2.5 ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-bw-950 text-white shadow-[0_8px_18px_-12px_rgba(0,0,0,0.65)] transition group-hover:scale-105">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      </span>
      {label}
    </Link>
  );
}

export function PremiumBreadcrumb({ items = [], className = "" }) {
  return (
    <nav
      aria-label="Konum"
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 rounded-xl border border-bw-200 bg-white px-3 py-1.5 text-xs font-semibold text-bw-700 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.35)] transition hover:border-bw-300 hover:text-bw-950"
      >
        <Home className="h-3.5 w-3.5 transition group-hover:scale-105" />
        Vitrin
      </Link>
      {items.map((item) => (
        <span key={item.href + item.label} className="inline-flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5 text-bw-300" aria-hidden />
          {item.current ? (
            <span className="rounded-xl bg-bw-950 px-3 py-1.5 text-xs font-semibold text-white">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="rounded-xl border border-bw-200 bg-bw-50 px-3 py-1.5 text-xs font-semibold text-bw-700 transition hover:border-bw-300 hover:bg-white hover:text-bw-950"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
