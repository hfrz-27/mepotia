"use client";

export default function HeroBackgroundVideo({ src }) {
  if (!src) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-bw-950/78 via-bw-950/58 to-bw-950/82" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_55%)]" />
    </div>
  );
}
