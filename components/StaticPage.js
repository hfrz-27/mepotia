import Link from "next/link";

export default function StaticPage({ title, children }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Mepotia</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-wide text-bw-950">
        {title}
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-bw-600">{children}</div>
      <Link href="/" className="mt-12 inline-block text-sm font-medium text-bw-900 underline underline-offset-4">
        Ana sayfaya dön
      </Link>
    </main>
  );
}
