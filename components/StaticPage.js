import BackHomeLink from "@/components/BackHomeLink";

export default function StaticPage({ title, children }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <BackHomeLink label="Ana sayfaya dön" className="mb-8" />
      <p className="text-xs tracking-[0.22em] text-bw-500 uppercase">Mepotia</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-wide text-bw-950">
        {title}
      </h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-bw-600">{children}</div>
    </main>
  );
}
