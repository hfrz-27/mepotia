export default function TeknolojiLoading() {
  return (
    <main className="min-h-screen bg-bw-50">
      <section className="border-b border-bw-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-5 h-4 w-24 animate-pulse rounded bg-bw-100" />
          <div className="h-3 w-28 animate-pulse rounded bg-bw-100" />
          <div className="mt-3 h-8 w-40 animate-pulse rounded-lg bg-bw-100" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded bg-bw-100" />
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[16/10] animate-pulse rounded-[1.25rem] bg-bw-100" />
          ))}
        </div>
      </div>
    </main>
  );
}
