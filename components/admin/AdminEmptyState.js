export default function AdminEmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center">
      <p className="text-sm font-semibold text-bw-800">{title}</p>
      {description ? <p className="mt-2 text-sm text-bw-500">{description}</p> : null}
    </div>
  );
}
