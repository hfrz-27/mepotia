"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

function CoverImage({ src, alt, className, sizes, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
      quality={80}
    />
  );
}

export function TechNewsCardCompact({ post, index = 0 }) {
  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className="group relative block w-[min(78vw,280px)] shrink-0 snap-start overflow-hidden rounded-[1.25rem] border border-bw-200 bg-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.3)] transition duration-300 hover:-translate-y-0.5 hover:border-bw-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bw-900">
        {post.cover_url ? (
          <CoverImage
            src={post.cover_url}
            alt={post.title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="78vw"
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
          <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-white transition group-hover:text-bw-200">
            {post.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function TechNewsCard({ post, index = 0, featured = false }) {
  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className={`group relative overflow-hidden rounded-[1.25rem] border border-bw-200 bg-white shadow-[0_20px_48px_-38px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-bw-300 ${
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-bw-900 ${featured ? "aspect-[16/11] sm:h-full sm:min-h-[22rem]" : "aspect-[16/9]"}`}>
        {post.cover_url ? (
          <CoverImage
            src={post.cover_url}
            alt={post.title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:640px) 100vw, 33vw"
            priority={index === 0}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Cpu className="h-8 w-8 text-white/20" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-bw-950 ${featured ? "via-bw-950/35" : "via-bw-950/65"} to-transparent`} />
        <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-4 sm:p-7" : "p-3 sm:p-4"}`}>
          <p className="inline-flex rounded-full border border-white/15 bg-bw-950/40 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-bw-300 uppercase backdrop-blur-sm">
            {featured ? "Öne çıkan haber" : formatTechDate(post.created_at)}
          </p>
          <h3 className={`mt-2 font-semibold leading-snug text-white transition group-hover:text-bw-200 ${featured ? "line-clamp-3 text-lg sm:mt-3 sm:text-2xl" : "line-clamp-2 text-xs sm:text-sm"}`}>
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className={`mt-1.5 leading-relaxed text-bw-300 ${featured ? "line-clamp-2 text-xs sm:mt-2 sm:text-sm" : "hidden"}`}>
              {post.excerpt}
            </p>
          ) : null}
          {featured ? (
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white sm:mt-4 sm:text-sm">
              Haberi oku <span aria-hidden>→</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
