"use client";

export default function HeroBackgroundVideo({ src, lightOverlay = false }) {
  if (!src) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      {/* Keep video readable under text without washing it out */}
      <div
        className={
          lightOverlay
            ? "absolute inset-0 bg-gradient-to-br from-bw-950/30 via-bw-950/20 to-bw-950/40"
            : "absolute inset-0 bg-gradient-to-br from-bw-950/55 via-bw-950/40 to-bw-950/60"
        }
      />
    </div>
  );
}
