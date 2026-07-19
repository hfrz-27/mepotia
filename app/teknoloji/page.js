import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Cpu, Newspaper, Radio, Sparkles } from "lucide-react";
import TechNewsFeaturedCarousel from "@/components/TechNewsFeaturedCarousel";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import PremiumPagination from "@/components/PremiumPagination";
import { getTechPosts, resolveTechPostsPageSize } from "@/lib/techPosts";
import { formatTechDate } from "@/lib/techPostUtils";
import { displayImageUrl } from "@/lib/productImage";

function LiveBadge({ count }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-bw-200 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-bw-600 shadow-[0_1px_2px_rgba(0,0,0,.04)] backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Canlı akış{count ? ` · ${count} haber` : ""}
    </span>
  );
}

function SectionEyebrow({ children, tone = "default" }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-6 w-[3px] rounded-full ${
          tone === "gold"
            ? "bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700"
            : "bg-gradient-to-b from-bw-300 to-bw-950"
        }`}
      />
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          tone === "gold" ? "text-amber-700" : "text-bw-500"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function NewsCard({ post, index, large = false, wide = false }) {
  const readMinutes = Math.max(1, Math.ceil((post.body || post.excerpt || "").split(/\s+/).filter(Boolean).length / 180));
  return (
    <article className={`group animate-fade-up ${large ? "lg:col-span-2" : wide ? "md:col-span-2" : ""}`}>
      <Link
        href={`/teknoloji/${post.id}`}
        style={large ? { backgroundColor: "#000000" } : undefined}
        className={`relative flex h-full overflow-hidden rounded-[1.75rem] ring-1 ring-black/[0.06] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:ring-black/10 ${
          large
            ? "min-h-[26rem] bg-bw-950 shadow-[0_34px_80px_-48px_rgba(0,0,0,0.75)] md:min-h-[32rem]"
            : "flex-col bg-white shadow-[0_18px_44px_-40px_rgba(0,0,0,0.5)] hover:shadow-[0_34px_66px_-42px_rgba(0,0,0,0.32)]"
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
              className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_75%_15%,#3f3f46,transparent_38%),linear-gradient(135deg,#18181b,#000000)]">
              <Newspaper className="h-9 w-9 text-white/15" strokeWidth={1.4} />
            </div>
          )}
          {large ? <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10" /> : <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
            <Cpu className="h-3 w-3" /> Teknoloji
          </span>
        </div>

        <div className={`relative flex flex-1 flex-col ${large ? "mt-auto p-6 sm:p-9" : "p-5 sm:p-6"}`}>
          <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${large ? "text-white/70" : "text-bw-500"}`}>
            <Clock3 className="h-3.5 w-3.5" />
            <span>{formatTechDate(post.created_at)}</span>
            <span className={large ? "text-white/30" : "text-bw-300"}>•</span>
            <span>{readMinutes} dk okuma</span>
          </div>
          <h2 className={`mt-3 font-display font-semibold tracking-tight ${large ? "max-w-3xl text-2xl leading-[1.1] text-white sm:text-[2.6rem]" : "text-lg leading-snug text-bw-950 sm:text-xl"}`}>
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className={`mt-3 leading-relaxed ${large ? "max-w-2xl text-sm text-white/75 sm:text-base" : "line-clamp-2 text-sm text-bw-600"}`}>
              {post.excerpt}
            </p>
          ) : null}
          <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${large ? "mt-6 text-white" : "mt-auto pt-4 text-bw-900"}`}>
            <span className="relative">
              Haberi oku
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
      className="overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_24px_56px_-44px_rgba(0,0,0,.5)]"
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-bw-50 to-white px-5 py-4 sm:px-6">
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.22em] text-bw-600">
          <Radio className="h-3.5 w-3.5 text-amber-600" /> Gündem
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Canlı
        </span>
      </div>
      <ol className="divide-y divide-bw-100 px-5 sm:px-6">
        {digest.map((post, index) => (
          <li key={post.id}>
            <Link href={`/teknoloji/${post.id}`} className="group flex items-start gap-4 py-3.5 sm:py-4">
              <span className={`font-display text-2xl font-semibold tabular-nums ${index === 0 ? "text-amber-500" : "text-bw-300"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block text-sm font-semibold leading-snug text-bw-900 transition group-hover:text-bw-600">
                  {post.title}
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-[.14em] text-bw-400">
                  {formatTechDate(post.created_at)}
                </span>
              </span>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-bw-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bw-700" />
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
    <main className="min-h-screen bg-gradient-to-b from-white via-bw-50 to-bw-50">
      <Suspense fallback={null}><TechNewsViewSync /></Suspense>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="animate-fade-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-bw-950 text-white shadow-[0_8px_20px_-10px_rgba(0,0,0,.6)]">
              <Newspaper className="h-4.5 w-4.5" strokeWidth={1.6} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bw-400">Mepotia · Teknoloji</p>
              <p className="text-sm font-medium text-bw-600">Editörün seçtiği, net bir teknoloji akışı</p>
            </div>
          </div>
          <LiveBadge count={count || 0} />
        </div>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-bw-200 to-transparent" />
      </section>

      {page === 1 && carouselPosts.length ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <SectionEyebrow tone="gold">Editörün seçimi</SectionEyebrow>
          </div>
          <h2 className="mb-5 -mt-3 pl-[15px] font-display text-2xl font-semibold tracking-tight text-bw-950 sm:text-[1.9rem]">
            Öne çıkanlar
          </h2>
          <TechNewsFeaturedCarousel posts={carouselPosts} />
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 border-b border-bw-200 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Mepotia teknoloji</span>
            </SectionEyebrow>
            <h2 className="mt-3 pl-[15px] font-display text-3xl font-semibold tracking-tight text-bw-950 sm:text-5xl">Bugünün teknoloji gündemi</h2>
          </div>
          <p className="max-w-xs pl-[15px] text-sm leading-relaxed text-bw-500 sm:pl-0 sm:text-right">{count || 0} haber, seçili gelişmeler ve net bir teknoloji akışı.</p>
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
          <div className="rounded-[1.75rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center shadow-[0_20px_50px_-44px_rgba(0,0,0,.4)]">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-bw-50">
              <Newspaper className="h-7 w-7 text-bw-400" strokeWidth={1.4} />
            </span>
            <h2 className="mt-4 text-xl font-semibold text-bw-900">Henüz haber yok</h2>
            <p className="mt-2 text-sm text-bw-500">Yeni teknoloji haberleri kısa süre içinde burada yer alacak.</p>
          </div>
        )}

        <PremiumPagination basePath="/teknoloji" page={page} totalPages={totalPages} />
      </section>
    </main>
  );
}
