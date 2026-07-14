export default function AdminToast({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-bw-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-sm text-bw-700">{message}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-xs font-semibold text-bw-400 hover:text-bw-700"
        >
          Kapat
        </button>
      ) : null}
    </div>
  );
}
