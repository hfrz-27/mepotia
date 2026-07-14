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

export default function TechNewsCard({ post, index = 0, featured = false }) {
  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.7)] transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] ${
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
        <div className={`absolute inset-0 bg-gradient-to-t from-bw-950 ${featured ? "via-bw-950/35" : "via-bw-950/70"} to-transparent`} />
        <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-6 sm:p-7" : "p-4"}`}>
          <p className="inline-flex rounded-full border border-white/15 bg-bw-950/40 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-bw-300 uppercase backdrop-blur-sm">
            {featured ? "Öne çıkan haber" : formatTechDate(post.created_at)}
          </p>
          <h3 className={`mt-3 font-semibold leading-snug text-white transition group-hover:text-bw-200 ${featured ? "line-clamp-3 text-xl sm:text-2xl" : "line-clamp-2 text-sm"}`}>
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className={`mt-2 leading-relaxed text-bw-300 ${featured ? "line-clamp-2 text-sm" : "hidden"}`}>
              {post.excerpt}
            </p>
          ) : null}
          {featured ? (
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Haberi oku <span aria-hidden>→</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
