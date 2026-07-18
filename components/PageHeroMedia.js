"use client";

import HeroBackgroundCarousel from "@/components/HeroBackgroundCarousel";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

/**
 * Full-bleed page hero media layer (video > photos > nothing).
 * Videos render more clearly; photos keep a slightly softer look.
 */
export default function PageHeroMedia({
  video = "",
  images = [],
  /** 0–1 media layer strength (higher = more visible) */
  opacity,
  videoOpacity = 0.72,
  imageOpacity = 0.55,
}) {
  const hasVideo = Boolean(video);
  const photos = (images || []).filter(Boolean);
  const hasPhotos = !hasVideo && photos.length > 0;

  if (!hasVideo && !hasPhotos) return null;

  const mediaOpacity =
    typeof opacity === "number" ? opacity : hasVideo ? videoOpacity : imageOpacity;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ opacity: mediaOpacity }}>
        {hasVideo ? (
          <HeroBackgroundVideo src={video} lightOverlay />
        ) : (
          <HeroBackgroundCarousel images={photos} />
        )}
      </div>
      {/* Lighter scrim so video stays visible but text stays readable */}
      <div
        className={`absolute inset-0 ${
          hasVideo
            ? "bg-gradient-to-b from-bw-950/35 via-bw-950/45 to-bw-950/85"
            : "bg-gradient-to-b from-bw-950/50 via-bw-950/65 to-bw-950/90"
        }`}
      />
    </div>
  );
}
