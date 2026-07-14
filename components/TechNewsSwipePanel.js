"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Newspaper, X } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

export default function TechNewsSwipePanel({ posts, previousHref, nextHref }) {
  const [open, setOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const onTouchEnd = (event) => {
    if (touchStart == null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (distance > 56) setOpen(true);
    if (distance < -56) setOpen(false);
    setTouchStart(null);
  };

  return (
    <div
      className="relative min-h-[42vh] touch-pan-y"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex min-h-[42vh] flex-col items-center justify-center px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-bw-200 bg-white text-bw-950 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.3)]">
          <Newspaper className="h-5 w-5" />
        </span>
        <p className="mt-5 text-sm font-semibold text-bw-800">Haberler için sağa kaydır</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-bw-500">
          Güncel teknoloji haberlerini açmak için ekranı sağa sürükle.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white px-4 py-2 text-sm font-semibold text-bw-700 transition hover:border-bw-300 hover:text-bw-950"
        >
          Haberleri aç
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-[70] flex w-[min(92vw,680px)] flex-col border-r border-bw-200 bg-bw-50 shadow-[28px_0_70px_-38px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-bw-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-500 uppercase">
              Teknoloji Haberleri
            </p>
            <p className="mt-1 text-sm font-semibold text-bw-950">Güncel akış</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-bw-200 text-bw-700 transition hover:bg-bw-50"
            aria-label="Haber panelini kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="hide-scrollbar flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/teknoloji/${post.id}`}
                onClick={() => setOpen(false)}
                className="group flex gap-3 rounded-2xl border border-bw-200 bg-white p-3 shadow-[0_16px_36px_-30px_rgba(0,0,0,0.28)] transition hover:border-bw-300 hover:bg-bw-50"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-bw-100 sm:h-24 sm:w-32">
                  {post.cover_url ? (
                    <Image
                      src={post.cover_url}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      priority={index < 2}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-bw-950 text-white/30">
                      <Newspaper className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 py-0.5">
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-bw-400 uppercase">
                    {formatTechDate(post.created_at)}
                  </p>
                  <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-bw-950">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-1 line-clamp-1 text-xs text-bw-500">{post.excerpt}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          {previousHref || nextHref ? (
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-bw-200 pt-5">
              {previousHref ? (
                <Link
                  href={previousHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-bw-200 bg-white px-3 py-2 text-sm font-semibold text-bw-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Önceki
                </Link>
              ) : (
                <span />
              )}
              {nextHref ? (
                <Link
                  href={nextHref}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-bw-950 px-3 py-2 text-sm font-semibold text-white"
                >
                  Sonraki
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
