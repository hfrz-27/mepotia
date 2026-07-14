"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

function NewsCard({ post, index = 0 }) {
  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className="group relative block w-[min(76vw,270px)] shrink-0 overflow-hidden rounded-[1.25rem] border border-bw-200 bg-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bw-900">
        {post.cover_url ? (
          <Image
            src={post.cover_url}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="76vw"
            priority={index === 0}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Cpu className="h-8 w-8 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <p className="inline-flex rounded-full border border-white/15 bg-bw-950/40 px-2 py-0.5 text-[9px] font-semibold tracking-[0.16em] text-bw-300 uppercase backdrop-blur-sm">
            {formatTechDate(post.created_at)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function TechNewsMobileScroll({ posts }) {
  const loop = [...posts, ...posts];

  return (
    <div className="mt-5 overflow-hidden sm:hidden">
      <div
        className="review-marquee-track review-marquee-continuous gap-3 py-1"
        style={{ "--marquee-duration": "38s" }}
      >
        {loop.map((post, index) => (
          <NewsCard key={`${post.id}-${index}`} post={post} index={index % posts.length} />
        ))}
      </div>
    </div>
  );
}
