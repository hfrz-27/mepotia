"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Cpu } from "lucide-react";
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

export function TechNewsHomeCard({ post, index = 0, featured = false }) {
  if (featured) {
    return (
      <Link
        href={`/teknoloji/${post.id}`}
        prefetch={index === 0}
        className="sx-card group grid overflow-hidden md:grid-cols-2"
      >
        <div className="relative min-h-[220px] bg-[#0a0a0c] md:min-h-[340px]">
          {post.cover_url ? (
            <CoverImage
              src={post.cover_url}
              alt={post.title}
              className="mepo-img-zoom object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Cpu className="h-12 w-12 text-zinc-600" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="sx-kicker">{formatTechDate(post.created_at)}</p>
          <h3 className="sx-title mt-3 text-2xl sm:text-3xl">{post.title}</h3>
          {post.excerpt ? <p className="sx-sub mt-3 line-clamp-3">{post.excerpt}</p> : null}
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#ff4d1a] uppercase">
            Haberi oku <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/teknoloji/${post.id}`}
      prefetch={index === 0}
      className="sx-card group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] bg-[#0a0a0c]">
        {post.cover_url ? (
          <CoverImage
            src={post.cover_url}
            alt={post.title}
            className="mepo-img-zoom object-cover"
            sizes="(max-width:640px) 100vw, 33vw"
            priority={index === 0}
            loading={index === 0 ? undefined : "lazy"}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Cpu className="h-8 w-8 text-zinc-600" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-[#2a2a30] p-4">
        <p className="text-[10px] font-bold tracking-[0.14em] text-zinc-500 uppercase">
          {formatTechDate(post.created_at)}
        </p>
        <h3 className="mt-2 line-clamp-3 font-[family-name:var(--font-syne)] text-base font-bold leading-snug text-zinc-50">
          {post.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[11px] font-bold tracking-wider text-[#ff4d1a] uppercase">
          Oku <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function TechNewsCardCompact({ post, index = 0 }) {
  return <TechNewsHomeCard post={post} index={index} />;
}
