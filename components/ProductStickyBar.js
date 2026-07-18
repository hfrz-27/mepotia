"use client";

import { MessageCircle, Phone } from "lucide-react";
import { formatPrice } from "@/lib/productDisplay";

/**
 * Mobil sticky CTA — sepet yerine WhatsApp / ara (premium vitrin).
 */
export default function ProductStickyBar({
  title,
  price,
  originalPrice,
  discount,
  sold,
  wa,
  tel,
}) {
  if (sold) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-white/95 px-4 py-3 shadow-[0_-12px_40px_-16px_rgba(0,0,0,0.15)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-[#737373]">{title}</p>
          <div className="flex items-baseline gap-2">
            {discount && originalPrice != null ? (
              <span className="text-[11px] text-[#a3a3a3] line-through">
                {formatPrice(originalPrice)}
              </span>
            ) : null}
            <span className="text-base font-semibold tabular-nums text-[#0b0b0b]">
              {formatPrice(price)}
            </span>
          </div>
        </div>
        {tel ? (
          <a
            href={tel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#0b0b0b] text-[#0b0b0b] transition active:scale-95"
            aria-label="Ara"
          >
            <Phone className="h-4 w-4" />
          </a>
        ) : null}
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="pv-btn h-11 shrink-0 px-4 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
