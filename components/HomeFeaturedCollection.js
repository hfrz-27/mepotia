"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getPrimaryImage } from "@/lib/productDisplay";

/**
 * Tek imza koleksiyon stili — full-bleed hero + alt ürün şeridi.
 * align: "left" | "center"
 * strip: "chips" (metinli) | "thumbs" (sadece foto çerçeveli)
 */
function SignatureCover({
  items,
  priority,
  label,
  title,
  description,
  linkLabel,
  align = "left",
  strip = "thumbs",
}) {
  const hero = items[0];
  const row = items.slice(0, 4);
  const centered = align === "center";

  return (
    <div className="relative overflow-hidden rounded-[20px] bg-black shadow-xl sm:rounded-[28px]">
      {hero ? (
        <div className="absolute inset-0">
          <ProductImage
            src={getPrimaryImage(hero)}
            alt=""
            fill
            priority={priority}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#141414]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/25" />
      {!centered ? (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      ) : null}

      <div className="relative flex min-h-[280px] flex-col justify-between p-4 sm:min-h-[380px] sm:p-8 lg:min-h-[420px] lg:p-10">
        <div className={`flex items-center gap-2 ${centered ? "justify-between" : "justify-between"}`}>
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase sm:px-3 sm:text-[11px]">
            {label}
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-black sm:px-3 sm:text-[11px]">
            {items.length} ürün
          </span>
        </div>

        <div className={centered ? "mx-auto max-w-xl px-1 py-3 text-center sm:py-0" : "max-w-xl py-3 sm:py-0"}>
          <h2
            className={[
              "font-semibold leading-[1.05] tracking-[-0.035em] text-white",
              "text-[1.5rem] sm:text-[2.4rem] md:text-[2.85rem]",
            ].join(" ")}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={[
                "mt-2 text-[13px] leading-relaxed text-white/60 line-clamp-2 sm:text-[15px]",
                centered ? "mx-auto max-w-md" : "max-w-md",
              ].join(" ")}
            >
              {description}
            </p>
          ) : null}
          <span
            className={[
              "mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-black sm:mt-5 sm:px-5 sm:text-[14px]",
              centered ? "" : "",
            ].join(" ")}
          >
            {linkLabel}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </span>
        </div>

        {/* Alt ürün şeridi — tam beyaz çerçeve (kesilmez) */}
        <div
          className={[
            "flex gap-2 sm:gap-2.5",
            centered ? "justify-center" : "justify-start sm:justify-start",
            "overflow-x-auto news-touch-scroll hide-scrollbar pb-0.5",
          ].join(" ")}
        >
          {row.map((p) =>
            strip === "chips" ? (
              <div
                key={p.id}
                className="flex min-w-[8.5rem] shrink-0 items-center gap-2 rounded-2xl border border-white/15 bg-black/45 p-1.5 sm:min-w-0 sm:flex-1 sm:max-w-[12rem]"
              >
                <div className="shrink-0 rounded-[9px] bg-white p-[2px]">
                  <div className="relative h-9 w-9 overflow-hidden rounded-[7px] bg-[#e8e8ed] sm:h-10 sm:w-10">
                    <ProductImage src={getPrimaryImage(p)} alt="" fill className="object-cover" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-[10px] font-semibold text-white sm:text-[11px]">
                    {p.title}
                  </p>
                  {p.price != null ? (
                    <p className="text-[10px] font-semibold text-white/85 tabular-nums sm:text-[11px]">
                      {formatPrice(p.price)}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div key={p.id} className="shrink-0 rounded-[11px] bg-white p-[3px] shadow-md sm:p-1">
                <div className="relative h-11 w-11 overflow-hidden rounded-[8px] bg-[#e8e8ed] sm:h-14 sm:w-14 sm:rounded-[10px]">
                  <ProductImage src={getPrimaryImage(p)} alt="" fill className="object-cover" />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/** variant → imza stil ayarı (tek tasarım ailesi) */
const VARIANT = {
  mosaic: { align: "left", strip: "chips" },
  split: { align: "left", strip: "thumbs" },
  cinema: { align: "center", strip: "thumbs" },
};

export default function HomeFeaturedCollection({
  id,
  products = [],
  href = "/ara",
  linkLabel = "Koleksiyonu keşfet",
  eyebrow,
  title = "Koleksiyon.",
  description = "",
  variant = "cinema",
  ariaLabel,
  priority = false,
}) {
  const items = (products || []).filter(Boolean);
  if (!items.length) return null;

  const label = eyebrow || "Koleksiyon";
  const conf = VARIANT[variant] || VARIANT.cinema;

  return (
    <section
      id={id}
      className="scroll-mt-16 bg-[#f5f5f7] py-6 sm:py-9"
      aria-label={ariaLabel || title}
    >
      <div className="pv-wrap">
        <Link href={href} className="group block outline-none">
          <SignatureCover
            items={items}
            priority={priority}
            label={label}
            title={title}
            description={description}
            linkLabel={linkLabel}
            align={conf.align}
            strip={conf.strip}
          />
        </Link>
      </div>
    </section>
  );
}
