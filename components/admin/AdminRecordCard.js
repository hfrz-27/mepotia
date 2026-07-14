export default function AdminRecordCard({
  eyebrow,
  title,
  meta,
  body,
  footer,
  actions,
  isNew = false,
  children,
}) {
  return (
    <article
      className={`rounded-2xl border bg-white shadow-sm ${
        isNew ? "border-bw-900" : "border-bw-200"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-bw-100 px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
            {eyebrow}
          </p>
          {title ? (
            <h3 className="mt-1 font-display text-lg font-semibold text-bw-950 sm:text-xl">
              {title}
            </h3>
          ) : null}
          {meta ? <p className="mt-1 text-sm text-bw-500">{meta}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {(body || children) && (
        <div className="px-5 py-4 sm:px-6">
          {body ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-bw-600">{body}</p>
          ) : null}
          {children}
        </div>
      )}
      {footer ? (
        <div className="border-t border-bw-100 px-5 py-3 text-xs text-bw-400 sm:px-6">{footer}</div>
      ) : null}
    </article>
  );
}
