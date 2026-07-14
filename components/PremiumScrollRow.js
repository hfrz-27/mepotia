export default function PremiumScrollRow({
  children,
  className = "",
  fadeFrom = "from-white/35",
  gap = "gap-3",
  ariaLabel,
  showFades = false,
}) {
  return (
    <div className={`relative ${className}`}>
      {showFades ? (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-5 bg-gradient-to-r sm:block ${fadeFrom} to-transparent`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-5 bg-gradient-to-l sm:block ${fadeFrom} to-transparent`}
            aria-hidden
          />
        </>
      ) : null}
      <div
        role="region"
        aria-label={ariaLabel}
        className={`news-touch-scroll hide-scrollbar flex overflow-x-auto ${gap} py-1`}
      >
        {children}
      </div>
    </div>
  );
}
