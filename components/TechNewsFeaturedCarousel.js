"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3, ImageOff } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

export default function TechNewsFeaturedCarousel({ posts = [] }) {
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState({});
  const [startX, setStartX] = useState(null);
  const count = posts.length;
  if (!count) return null;

  const move = (direction) => setActive((current) => (current + direction + count) % count);
  const onPointerUp = (event) => {
    if (startX == null) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    setStartX(null);
  };

  return (
    <section className="mb-8 overflow-hidden rounded-[2rem] bg-bw-950 shadow-[0_32px_70px_-42px_rgba(0,0,0,.75)] sm:mb-10">
      <div className="relative min-h-[27rem] sm:min-h-[32rem]" onPointerDown={(event) => setStartX(event.clientX)} onPointerUp={onPointerUp}>
        {posts.map((post, index) => {
          const visible = index === active;
          const hasImage = post.cover_url && !broken[post.id];
          return (
            <article key={post.id} aria-hidden={!visible} className={`absolute inset-0 transition-[opacity,transform] duration-700 ${visible ? "translate-x-0 opacity-100" : index < active ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0"}`}>
              {hasImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.cover_url} alt="" className="absolute inset-0 h-full w-full object-cover" onError={() => setBroken((state) => ({ ...state, [post.id]: true }))} />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,#3f3f46,transparent_35%),linear-gradient(135deg,#18181b,#09090b)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/65 to-bw-950/10" />
              {!hasImage ? <ImageOff className="absolute right-8 top-8 h-8 w-8 text-white/20" /> : null}
              <Link href={`/teknoloji/${post.id}`} tabIndex={visible ? 0 : -1} className="absolute inset-0 z-10 flex items-end p-6 sm:p-10">
                <div className="max-w-3xl">
                  <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/70"><Clock3 className="h-3.5 w-3.5" /> {formatTechDate(post.created_at)}</p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{post.title}</h2>
                  {post.excerpt ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{post.excerpt}</p> : null}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">Haberi oku <ArrowUpRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </article>
          );
        })}

        {count > 1 ? (
          <>
            <div className="absolute right-5 top-5 z-20 flex gap-2 sm:right-7 sm:top-7">
              <button type="button" onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-bw-950/45 text-white backdrop-blur transition hover:bg-white hover:text-bw-950" aria-label="Önceki haber"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-bw-950/45 text-white backdrop-blur transition hover:bg-white hover:text-bw-950" aria-label="Sonraki haber"><ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="absolute bottom-5 right-6 z-20 flex gap-1.5 sm:bottom-8 sm:right-10">
              {posts.map((post, index) => <button key={post.id} type="button" onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`} aria-label={`${index + 1}. öne çıkan haber`} aria-current={index === active ? "true" : undefined} />)}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
