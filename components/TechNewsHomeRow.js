"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";
import { appleTextLinkClass } from "@/lib/appleUi";

/**
 * Apple + dergi: sol büyük manşet, sağ liste — hover ile manşet değişir.
 */
export default function TechNewsHomeRow({ posts }) {
  const items = (posts || []).slice(0, 6);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 6000);
    return () => window.clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;
  const current = items[active] || items[0];

  // Mobilde liste kısa kalsın
  const listItems = items.slice(0, 6);

  return (
    <div className="bg-[#f5f5f7] py-6 sm:py-10 lg:py-12">
      <div className="pv-wrap">
        <div className="mb-4 text-center sm:mb-6">
          <p className="text-[11px] font-semibold tracking-[-0.01em] text-[#6e6e73] sm:text-[12px]">
            Güncel
          </p>
          <h2 className="mt-1 text-[1.35rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[#1d1d1f] sm:text-[28px] md:text-[32px]">
            Teknoloji haberleri.
          </h2>
          <div className="mt-3 flex justify-center sm:mt-4">
            <Link href="/teknoloji" className={appleTextLinkClass}>
              Tüm haberleri gör
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="grid gap-2.5 lg:grid-cols-12 lg:gap-3">
          {/* Sol büyük */}
          <Link
            href={`/teknoloji/${current.id}`}
            className="group relative min-h-[200px] overflow-hidden rounded-[18px] bg-black sm:min-h-[300px] sm:rounded-[20px] lg:col-span-7 lg:min-h-[340px]"
          >
            {current.cover_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={current.id}
                src={current.cover_url}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu className="h-12 w-12 text-white/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-[10px] font-medium tracking-wide text-white/55">
                {formatTechDate(current.created_at) || "—"}
              </p>
              <h3 className="mt-1.5 max-w-xl text-[18px] font-semibold leading-snug tracking-[-0.025em] text-white sm:text-[22px] md:text-[24px]">
                {current.title}
              </h3>
              <span className="mt-2.5 inline-flex items-center gap-0.5 text-[14px] font-normal text-white/90">
                Oku
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          {/* Sağ liste — mobilde max 4 satır */}
          <div className="flex flex-col gap-1.5 sm:gap-2 lg:col-span-5">
            {listItems.map((post, i) => {
              const on = i === active;
              // Mobilde ilk 4, sm+ hepsi
              const mobileHide = i >= 4 ? "hidden sm:flex" : "flex";
              return (
                <button
                  key={post.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={[
                    mobileHide,
                    "items-center gap-2.5 rounded-[14px] border p-2.5 text-left transition sm:gap-3 sm:rounded-[18px] sm:p-3.5",
                    on
                      ? "border-black/[0.06] bg-white shadow-sm"
                      : "border-transparent bg-white/80 hover:bg-white",
                  ].join(" ")}
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] bg-[#e8e8ed] sm:h-16 sm:w-16 sm:rounded-[14px]">
                    {post.cover_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Cpu className="h-4 w-4 text-[#a3a3a3] sm:h-5 sm:w-5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-medium text-[#a3a3a3] sm:text-[10px]">
                      {formatTechDate(post.created_at)}
                    </p>
                    <p
                      className={[
                        "mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug sm:text-sm",
                        on ? "text-[#0b0b0b]" : "text-[#404040]",
                      ].join(" ")}
                    >
                      {post.title}
                    </p>
                  </div>
                  <Link
                    href={`/teknoloji/${post.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="hidden shrink-0 text-[#0b0b0b] sm:block"
                    aria-label="Haberi aç"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
