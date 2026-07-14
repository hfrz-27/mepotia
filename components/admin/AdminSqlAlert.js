export default function AdminSqlAlert({ title, children }) {
  return (
    <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
      <p className="font-semibold">{title}</p>
      <div className="mt-2 leading-relaxed">{children}</div>
    </div>
  );
}
