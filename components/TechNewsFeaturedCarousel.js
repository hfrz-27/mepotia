"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, ImageOff, Sparkles } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";
import { displayImageUrl } from "@/lib/productImage";

export default function TechNewsFeaturedCarousel({ posts = [] }) {
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState({});
  const [startX, setStartX] = useState(null);
  const [paused, setPaused] = useState(false);
  const movedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const count = posts.length;
  const move = useCallback((direction) => setActive((current) => (current + direction + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;

    const mobile = window.matchMedia("(max-width: 639px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mobile.matches || reducedMotion.matches) return undefined;

    const interval = window.setInterval(() => move(1), 5000);
    return () => window.clearInterval(interval);
  }, [count, move, paused]);

  useEffect(() => () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, []);

  const resumeAutoplay = () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setPaused(false), 6000);
  };

  if (!count) return null;

  const onPointerUp = (event) => {
    if (startX == null) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 45) {
      movedRef.current = true;
      move(distance < 0 ? 1 : -1);
    }
    setStartX(null);
    resumeAutoplay();
  };

  return (
    <section className="mb-8 overflow-visible sm:mb-12">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-bw-950 shadow-[0_32px_70px_-42px_rgba(0,0,0,.75)]">
      <div className="relative min-h-[31rem] touch-pan-y sm:min-h-[36rem]" onPointerDown={(event) => { movedRef.current = false; setPaused(true); setStartX(event.clientX); }} onPointerUp={onPointerUp} onPointerCancel={() => setStartX(null)} onPointerLeave={() => setStartX(null)}>
        {posts.map((post, index) => {
          const visible = index === active;
          const imageUrl = displayImageUrl(post.cover_url);
          const hasImage = imageUrl && !broken[post.id];
          return (
            <article key={post.id} aria-hidden={!visible} className={`absolute inset-0 transition-[opacity,transform] duration-700 ${visible ? "translate-x-0 opacity-100" : index < active ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0"}`}>
              {hasImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" onError={() => setBroken((state) => ({ ...state, [post.id]: true }))} />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,#3f3f46,transparent_35%),linear-gradient(135deg,#18181b,#09090b)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/72 to-bw-950/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,.16),transparent_26%)]" />
              {!hasImage ? <ImageOff className="absolute right-8 top-8 h-8 w-8 text-white/20" /> : null}
              <Link href={`/teknoloji/${post.id}`} tabIndex={visible ? 0 : -1} onClick={(event) => { if (movedRef.current) event.preventDefault(); }} className="absolute inset-0 z-10 flex items-end p-6 sm:p-10">
                <div className="max-w-3xl">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.2em] text-white/80 backdrop-blur-xl"><Sparkles className="h-3.5 w-3.5" /> Editörün seçimi</p>
                  <p className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/70"><Clock3 className="h-3.5 w-3.5" /> {formatTechDate(post.created_at)}</p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{post.title}</h2>
                  {post.excerpt ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{post.excerpt}</p> : null}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">Haberi oku <ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </article>
          );
        })}

        {count > 1 ? (
          <>
            <div className="absolute right-5 top-5 z-20 rounded-full border border-white/15 bg-bw-950/35 px-3 py-2 text-xs font-semibold tracking-[.16em] text-white/80 backdrop-blur-xl sm:right-7 sm:top-7">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</div>
            <button type="button" onClick={() => { setPaused(true); move(-1); resumeAutoplay(); }} className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bw-200 bg-bw-100/95 text-bw-700 shadow-lg transition duration-300 hover:scale-110 hover:bg-white hover:text-bw-950 sm:left-6 sm:h-14 sm:w-14" aria-label="Önceki haber"><ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" /></button>
            <button type="button" onClick={() => { setPaused(true); move(1); resumeAutoplay(); }} className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-bw-200 bg-bw-100/95 text-bw-700 shadow-lg transition duration-300 hover:scale-110 hover:bg-white hover:text-bw-950 sm:right-6 sm:h-14 sm:w-14" aria-label="Sonraki haber"><ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" /></button>
            <div className="absolute bottom-5 right-6 z-20 flex gap-1.5 sm:bottom-8 sm:right-10">
              {posts.map((post, index) => <button key={post.id} type="button" onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`} aria-label={`${index + 1}. öne çıkan haber`} aria-current={index === active ? "true" : undefined} />)}
            </div>
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <div className="hide-scrollbar flex gap-2 overflow-x-auto border-t border-white/10 bg-bw-950 p-3 sm:p-4">
          {posts.map((post, index) => (
            <button key={post.id} type="button" onClick={() => setActive(index)} className={`group flex w-[12rem] shrink-0 items-center gap-3 rounded-2xl border p-2 text-left transition sm:w-[15rem] ${index === active ? "border-white/40 bg-white/10" : "border-white/5 bg-white/[.03] hover:bg-white/[.07]"}`}>
              <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                {displayImageUrl(post.cover_url) && !broken[post.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayImageUrl(post.cover_url)} alt="" className="h-full w-full object-cover" onError={() => setBroken((state) => ({ ...state, [post.id]: true }))} />
                ) : <span className="block h-full w-full bg-gradient-to-br from-bw-700 to-bw-900" />}
              </span>
              <span className="min-w-0"><span className="line-clamp-2 block text-xs font-semibold leading-snug text-white/85">{post.title}</span></span>
            </button>
          ))}
        </div>
      ) : null}
      </div>
    </section>
  );
}
