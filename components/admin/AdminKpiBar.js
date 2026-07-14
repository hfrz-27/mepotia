export default function AdminKpiBar({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-bw-200 bg-white px-4 py-3.5 shadow-sm"
        >
          <p className="text-2xl font-semibold tabular-nums text-bw-950">{item.value}</p>
          <p className="mt-1 text-xs text-bw-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
