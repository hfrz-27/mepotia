import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Newspaper, Radio, Sparkles } from "lucide-react";
import TechNewsFeaturedCarousel from "@/components/TechNewsFeaturedCarousel";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import PremiumPagination from "@/components/PremiumPagination";
import { getTechPosts, resolveTechPostsPageSize } from "@/lib/techPosts";
import { formatTechDate } from "@/lib/techPostUtils";
import { displayImageUrl } from "@/lib/productImage";

export const revalidate = 60;

function NewsCard({ post, index, large = false, wide = false }) {
  const readMinutes = Math.max(1, Math.ceil((post.body || post.excerpt || "").split(/\s+/).filter(Boolean).length / 180));
  return (
    <article className={`group ${large ? "lg:col-span-2" : wide ? "md:col-span-2" : ""}`}>
      <Link
        href={`/teknoloji/${post.id}`}
        style={large ? { backgroundColor: "#09090b" } : undefined}
        className={`relative flex h-full overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_22px_50px_-42px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:border-bw-300 hover:shadow-[0_28px_60px_-40px_rgba(0,0,0,0.3)] ${
          large ? "min-h-[25rem] bg-bw-950 md:min-h-[31rem]" : "flex-col"
        }`}
      >
        <div className={`relative overflow-hidden bg-bw-900 ${large ? "absolute inset-0" : "aspect-[16/10]"}`}>
          {post.cover_url ? (
            <Image
              src={displayImageUrl(post.cover_url)}
              alt={post.title}
              fill
              priority={large || index < 2}
              sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-bw-800 to-bw-950" />
          )}
          {large ? <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/70 to-bw-950/20" /> : null}
        </div>

        <div className={`relative ${large ? "mt-auto p-6 sm:p-8" : "p-5 sm:p-6"}`}>
          <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${large ? "text-bw-300" : "text-bw-500"}`}>
            <Clock3 className="h-3.5 w-3.5" />
            <span>{formatTechDate(post.created_at)} · {readMinutes} dk</span>
          </div>
          <h2 className={`mt-3 font-semibold tracking-tight ${large ? "max-w-3xl text-2xl leading-tight text-white sm:text-4xl" : "text-xl leading-snug text-bw-950"}`}>
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className={`mt-3 leading-relaxed ${large ? "max-w-2xl text-sm text-bw-200 sm:text-base" : "line-clamp-2 text-sm text-bw-600"}`}>
              {post.excerpt}
            </p>
          ) : null}
          <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${large ? "text-white" : "text-bw-900"}`}>
            Haberi oku <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function NewsDigest({ posts = [] }) {
  const digest = posts.slice(0, 5);
  if (!digest.length) return null;
  return (
    <section
      aria-label="Gündem"
      className="rounded-[1.5rem] border border-bw-200 bg-white p-5 shadow-[0_20px_44px_-36px_rgba(0,0,0,.45)] sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-bw-100 pb-4">
        <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-bw-500">
          <Radio className="h-3.5 w-3.5" /> Gündem
        </p>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-emerald-700">
          Canlı
        </span>
      </div>
      <ol className="mt-1 divide-y divide-bw-100">
        {digest.map((post, index) => (
          <li key={post.id}>
            <Link href={`/teknoloji/${post.id}`} className="group flex gap-3 py-3.5 sm:py-4">
              <span className="font-display text-xl font-semibold text-bw-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 block text-sm font-semibold leading-snug text-bw-900 transition group-hover:text-bw-600">
                  {post.title}
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[.14em] text-bw-400">
                  {formatTechDate(post.created_at)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function TeknolojiPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page || 1));
  const view = sp?.view === "mobile" ? "mobile" : "";
  const headerList = await headers();
  const pageSize = resolveTechPostsPageSize(headerList.get("user-agent") || "", headerList.get("sec-ch-ua-mobile") || "", view);

  const [{ data: posts, count }, { data: carouselItems }, { data: trendingItems }] = await Promise.all([
    getTechPosts({ limit: pageSize, page, featuredFilter: "none" }),
    getTechPosts({ limit: 5, featuredFilter: "only" }),
    getTechPosts({ limit: 5, trendingOnly: true }),
  ]);
  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));
  const carouselPosts = (carouselItems || []).sort((a, b) => a.featured_order - b.featured_order).slice(0, 5);
  const feedPosts = posts || [];
  const trendingPosts = (trendingItems || []).sort((a, b) => a.trending_order - b.trending_order).slice(0, 5);

  if (page > totalPages) redirect(`/teknoloji?page=${totalPages}`);

  return (
    <main className="min-h-screen bg-bw-50">
      <Suspense fallback={null}><TechNewsViewSync /></Suspense>

      {page === 1 && carouselPosts.length ? (
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
                Seçki
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-bw-950 sm:text-3xl">
                Öne çıkanlar
              </h2>
            </div>
          </div>
          <TechNewsFeaturedCarousel posts={carouselPosts} />
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-bw-200 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-bw-500"><Sparkles className="h-3.5 w-3.5" /> Mepotia teknoloji</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-bw-950 sm:text-5xl">Bugünün teknoloji gündemi</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-bw-500 sm:text-right">{count || 0} haber, seçili gelişmeler ve net bir teknoloji akışı.</p>
        </div>

        {posts?.length ? (
          <>
            {page === 1 ? (
              <div className="mb-8 sm:mb-10">
                <NewsDigest posts={trendingPosts.length ? trendingPosts : feedPosts} />
              </div>
            ) : null}

            {feedPosts.length ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                {feedPosts.map((post, index) => (
                  <NewsCard
                    key={post.id}
                    post={post}
                    index={index}
                    large={page === 1 && !carouselPosts.length && index === 0}
                    wide={
                      feedPosts.length > 1 &&
                      feedPosts.length % 2 === 1 &&
                      index === feedPosts.length - 1
                    }
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center">
            <Newspaper className="mx-auto h-9 w-9 text-bw-400" strokeWidth={1.4} />
            <h2 className="mt-4 text-xl font-semibold text-bw-900">Henüz haber yok</h2>
            <p className="mt-2 text-sm text-bw-500">Yeni teknoloji haberleri kısa süre içinde burada yer alacak.</p>
          </div>
        )}

        <PremiumPagination basePath="/teknoloji" page={page} totalPages={totalPages} />
      </section>
    </main>
  );
}
