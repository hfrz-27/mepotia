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
    openGraph: post.cover_url
      ? { images: [{ url: post.cover_url, alt: post.title }] }
      : undefined,
  };
}

export default async function TechPostPage({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-bw-50">
      {post.cover_url ? (
        <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-bw-950">
          <Image
            src={post.cover_url}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
            unoptimized={post.cover_url.includes("supabase.co")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/50 to-bw-950/20" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
            <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-300 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              Teknoloji · {formatTechDate(post.created_at)}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      ) : null}

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        {!post.cover_url ? (
          <>
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
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
              {post.title}
            </h1>
          </>
        ) : (
          <Link
            href="/teknoloji"
            className="inline-flex items-center gap-2 rounded-xl border border-bw-200 bg-white px-4 py-2 text-sm font-medium text-bw-600 hover:text-bw-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm yazılar
          </Link>
        )}

        {post.excerpt ? (
          <p className="mt-6 text-lg leading-relaxed text-bw-600">{post.excerpt}</p>
        ) : null}

        <div className="mt-8 rounded-[2rem] border border-bw-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="whitespace-pre-wrap text-base leading-[1.85] text-bw-700">{post.body}</div>
        </div>

        {post.source_url ? (
          <a
            href={post.source_url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-bw-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-bw-800"
          >
            Kaynak bağlantısı
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </article>
    </main>
  );
}
