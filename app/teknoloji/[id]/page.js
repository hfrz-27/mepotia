import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Cpu } from "lucide-react";
import TechPostBody from "@/components/TechPostBody";
import { formatTechDate, getTechPostById } from "@/lib/techPosts";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const ShareTechPostButtons = dynamic(() => import("@/components/ShareTechPostButtons"), {
  loading: () => null,
});

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) return { title: "Yazı bulunamadı — Mepotia" };

  const pageUrl = absoluteUrl(`/teknoloji/${id}`);
  const description = post.excerpt || post.title;
  const ogImage = post.cover_url
    ? [{ url: post.cover_url, width: 1200, height: 630, alt: post.title }]
    : [{ url: absoluteUrl("/mepotia-logo.png"), width: 1200, height: 630, alt: SITE_NAME }];

  return {
    title: `${post.title} — Mepotia Teknoloji`,
    description,
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: pageUrl,
      siteName: SITE_NAME,
      title: post.title,
      description,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImage.map((img) => img.url),
    },
  };
}

export default async function TechPostPage({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) notFound();

  const postUrl = absoluteUrl(`/teknoloji/${id}`);

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
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/50 to-bw-950/20" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
            <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-300 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              Güncel Haber · {formatTechDate(post.created_at)}
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
              Güncel Haber · {formatTechDate(post.created_at)}
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

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-bw-200 bg-white shadow-[0_24px_60px_-48px_rgba(0,0,0,0.18)]">
          {post.excerpt ? (
            <div className="border-b border-bw-100 bg-gradient-to-r from-bw-50 to-white px-6 py-5 sm:px-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">Özet</p>
              <p className="mt-2 text-lg leading-relaxed text-bw-700">{post.excerpt}</p>
            </div>
          ) : null}

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">Haber</p>
            <TechPostBody text={post.body} />
          </div>
        </div>

        <div className="mt-12 border-t border-bw-200 pt-8">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
            Paylaş
          </p>
          <p className="mt-1 text-sm text-bw-500">Bu haberi arkadaşlarınla paylaş.</p>
          <div className="mt-4">
            <ShareTechPostButtons
              title={post.title}
              excerpt={post.excerpt || ""}
              url={postUrl}
              imageUrl={post.cover_url || ""}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
