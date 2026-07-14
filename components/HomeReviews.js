"use client";

import { ReviewsProvider, ReviewThinStrip } from "@/components/ReviewsContext";
import CustomerReviews from "@/components/CustomerReviews";

export function HomeReviewsProvider({ children }) {
  return <ReviewsProvider>{children}</ReviewsProvider>;
}

export { ReviewThinStrip, CustomerReviews };
