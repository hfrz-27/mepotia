"use client";

import ProductImage from "@/components/ProductImage";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images = [], title = "" }) {
  const urls = images.length
    ? images.map((img) => (typeof img === "string" ? img : img.url)).filter(Boolean)
    : [];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % urls.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + urls.length) % urls.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, urls.length]);

  if (!urls.length) return null;

  const main = urls[active] || urls[0];

  return (
    <>
      <div className="rounded-[24px] bg-white p-2.5 ring-1 ring-black/[0.05] shadow-[0_24px_70px_-48px_rgba(0,0,0,0.55)] sm:rounded-[30px] sm:p-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[19px] bg-gradient-to-br from-[#fafafa] to-[#ececf0] sm:rounded-[24px]"
        >
          <ProductImage
            src={main}
            alt={title}
            fill
            className="object-contain bg-bw-50"
            sizes="(max-width: 1024px) 100vw, 640px"
            priority
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-[9px] font-semibold tracking-wide text-white uppercase backdrop-blur-md">
            Tam ekran
          </span>
        </button>
        {urls.length > 1 ? (
          <div className="mt-2.5 flex gap-2 overflow-x-auto hide-scrollbar">
            {urls.map((url, i) => (
              <button
                key={url + i}
                type="button"
                onClick={() => {
                  setActive(i);
                  setOpen(true);
                }}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[14px] border bg-[#f5f5f7] transition sm:h-24 sm:w-24 sm:rounded-[17px] ${
                  i === active ? "border-black ring-1 ring-black" : "border-black/[0.06] hover:border-black/20"
                }`}
              >
                <ProductImage
                  src={url}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bw-950/90 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>

          {urls.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i - 1 + urls.length) % urls.length);
                }}
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
                aria-label="Önceki"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i + 1) % urls.length);
                }}
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
                aria-label="Sonraki"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <div
            className="relative h-[75vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductImage
              src={urls[active]}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
