import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Cpu, ExternalLink } from "lucide-react";
import { formatTechDate, getTechPostById } from "@/lib/techPosts";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) return { title: "Yazı bulunamadı — Mepotia" };
  return {
    title: `${post.title} — Mepotia Teknoloji`,
    description: post.excerpt || post.title,
  };
}

export default async function TechPostPage({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <Link
        href="/teknoloji"
        className="inline-flex items-center gap-2 text-sm font-medium text-bw-500 hover:text-bw-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Tüm yazılar
      </Link>

      <p className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-500 uppercase">
        <Cpu className="h-3.5 w-3.5" />
        Teknoloji · {formatTechDate(post.created_at)}
      </p>

      <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>

      {post.excerpt ? (
        <p className="mt-4 text-lg leading-relaxed text-bw-600">{post.excerpt}</p>
      ) : null}

      {post.cover_url ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl border border-bw-200 bg-bw-100">
          <Image
            src={post.cover_url}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized={post.cover_url.includes("supabase.co")}
          />
        </div>
      ) : null}

      <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-bw-700">
        {post.body}
      </div>

      {post.source_url ? (
        <a
          href={post.source_url}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-bw-200 bg-bw-50 px-5 py-3 text-sm font-semibold text-bw-800 hover:border-bw-400"
        >
          Kaynak bağlantısı
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
    </main>
  );
}
