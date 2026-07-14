export default function PremiumScrollRow({
  children,
  className = "",
  fadeFrom = "from-white/35",
  gap = "gap-3",
  ariaLabel,
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r ${fadeFrom} to-transparent`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l ${fadeFrom} to-transparent`}
        aria-hidden
      />
      <div
        role="region"
        aria-label={ariaLabel}
        className={`news-touch-scroll hide-scrollbar flex overflow-x-auto ${gap} snap-x snap-proximity py-1`}
      >
        {children}
      </div>
    </div>
  );
}
