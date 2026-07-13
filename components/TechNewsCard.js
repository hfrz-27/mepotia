"use client";

import Link from "next/link";
import Image from "next/image";
import { Cpu } from "lucide-react";
import ShareTechPostButtons from "@/components/ShareTechPostButtons";
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
      unoptimized={src.includes("supabase.co")}
    />
  );
}

export default function TechNewsCard({ post, index = 0, postUrl }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.08]">
      <Link href={`/teknoloji/${post.id}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-bw-900">
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
          <div className="absolute inset-0 bg-gradient-to-t from-bw-950/80 via-transparent to-transparent" />
        </div>
        <div className="p-3.5 sm:p-4">
          <p className="text-[10px] font-semibold tracking-wide text-bw-500 uppercase">
            {formatTechDate(post.created_at)}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-bw-200">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-bw-400">{post.excerpt}</p>
          ) : null}
        </div>
      </Link>
      <div className="border-t border-white/10 px-3.5 pb-3.5 sm:px-4 sm:pb-4">
        <ShareTechPostButtons
          compact
          title={post.title}
          excerpt={post.excerpt || ""}
          url={postUrl}
          imageUrl={post.cover_url || ""}
        />
      </div>
    </article>
  );
}
