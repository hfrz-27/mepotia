"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu } from "lucide-react";
import { formatTechDate } from "@/lib/techPostUtils";

function CoverImage({ src, alt, className, sizes, priority = false, loading }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={loading}
      className={className}
      sizes={sizes}
      quality={80}
    />
  );
}

export function TechNewsHomeCard({ post, index = 0 }) {
  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className="group flex h-[min(68vh,480px)] w-[min(82vw,340px)] shrink-0 flex-col overflow-hidden rounded-[1.75rem] bg-[#f5f5f7] transition hover:bg-[#ebebed] sm:h-[500px] sm:w-[360px] md:h-[520px] md:w-[380px] lg:h-[550px] lg:w-[400px]"
    >
      <div className="px-6 pt-6 sm:px-7 sm:pt-7">
        <p className="text-xs text-bw-500 sm:text-sm">{formatTechDate(post.created_at)}</p>
        <h3 className="mt-2 line-clamp-3 text-xl font-semibold leading-snug tracking-tight text-bw-950 sm:mt-3 sm:text-2xl">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bw-600">{post.excerpt}</p>
        ) : null}
      </div>

      <div className="relative mx-6 mb-6 mt-auto h-[200px] sm:mx-7 sm:mb-8 sm:h-[240px] lg:h-[260px]">
        {post.cover_url ? (
          <CoverImage
            src={post.cover_url}
            alt={post.title}
            className="rounded-2xl object-cover object-center sm:transition sm:duration-500 sm:group-hover:scale-[1.02]"
            sizes="(max-width:640px) 82vw, 400px"
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-bw-200/60">
            <Cpu className="h-10 w-10 text-bw-400" strokeWidth={1.25} />
          </div>
        )}
      </div>
    </Link>
  );
}

export function TechNewsCardCompact({ post, index = 0, wide = false }) {
  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className={`group relative block shrink-0 overflow-hidden rounded-[1.25rem] border border-bw-200 bg-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.3)] sm:transition sm:duration-300 sm:hover:-translate-y-0.5 sm:hover:border-bw-300 ${
        wide
          ? "w-[min(72vw,260px)] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px]"
          : "w-[min(78vw,280px)]"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bw-900">
        {post.cover_url ? (
          <CoverImage
            src={post.cover_url}
            alt={post.title}
            className="object-cover sm:transition sm:duration-500 sm:group-hover:scale-[1.03]"
            sizes="78vw"
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
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

export default function TechNewsCard({ post, index = 0, featured = false, compact = false }) {
  const imageShell = featured
    ? "relative min-h-[18rem] flex-1 overflow-hidden bg-bw-900 sm:min-h-[20rem] lg:min-h-[24rem]"
    : compact
      ? "relative aspect-[5/4] overflow-hidden bg-bw-900"
      : "relative aspect-[16/9] overflow-hidden bg-bw-900";

  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className={`group relative flex overflow-hidden rounded-[1.25rem] border border-bw-200 bg-white shadow-[0_20px_48px_-38px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-bw-300 ${
        featured ? "h-full min-h-[22rem] flex-col lg:min-h-0" : "block"
      }`}
    >
      <div className={imageShell}>
        {post.cover_url ? (
          <CoverImage
            src={post.cover_url}
            alt={post.title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes={featured ? "(max-width:1024px) 100vw, 50vw" : compact ? "25vw" : "(max-width:640px) 100vw, 33vw"}
            priority={index === 0}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Cpu className="h-8 w-8 text-white/20" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-bw-950 ${featured ? "via-bw-950/35" : "via-bw-950/65"} to-transparent`} />
        <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-4 sm:p-7" : compact ? "p-2.5 sm:p-3" : "p-3 sm:p-4"}`}>
          <p className="inline-flex rounded-full border border-white/15 bg-bw-950/40 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-bw-300 uppercase backdrop-blur-sm">
            {featured ? "Öne çıkan haber" : formatTechDate(post.created_at)}
          </p>
          <h3
            className={`mt-2 font-semibold leading-snug text-white transition group-hover:text-bw-200 ${
              featured
                ? "line-clamp-3 text-lg sm:mt-3 sm:text-2xl"
                : compact
                  ? "line-clamp-2 text-[11px] sm:text-xs"
                  : "line-clamp-2 text-xs sm:text-sm"
            }`}
          >
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
