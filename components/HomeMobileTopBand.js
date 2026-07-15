"use client";

import { ReviewThinStrip } from "@/components/HomeReviews";

export default function HomeMobileTopBand() {
  return (
    <section className="border-b border-bw-200 bg-white py-2.5 sm:hidden">
      <div className="mx-auto max-w-7xl px-4">
        <ReviewThinStrip variant="light" showLabel duration={32} mobileStatic={false} />
      </div>
    </section>
  );
}
