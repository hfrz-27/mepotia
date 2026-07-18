"use client";

import { ReviewThinStrip } from "@/components/HomeReviews";

export default function HomeMobileTopBand() {
  return (
    <section className="border-b border-bw-800 bg-bw-950 py-2 sm:hidden">
      <div className="mx-auto max-w-7xl px-4">
        <ReviewThinStrip variant="dark" showLabel duration={32} mobileStatic={false} compact />
      </div>
    </section>
  );
}
