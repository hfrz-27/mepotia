export default function ProductLoading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
      <div className="h-4 w-32 rounded bg-bw-100" />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="aspect-[4/3] rounded-[2rem] bg-bw-100" />
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-lg bg-bw-100" />
            <div className="h-6 w-16 rounded-lg bg-bw-100" />
          </div>
          <div className="rounded-2xl border border-bw-200 p-4">
            <div className="h-6 w-full rounded bg-bw-100" />
            <div className="mt-2 h-6 w-3/4 rounded bg-bw-100" />
            <div className="mt-4 h-8 w-28 rounded bg-bw-100" />
          </div>
          <div className="h-12 w-full rounded-2xl bg-bw-100" />
        </div>
      </div>
    </main>
  );
}
