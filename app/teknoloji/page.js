import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Newspaper } from "lucide-react";
import TechNewsPageHero from "@/components/TechNewsPageHero";
import TechNewsCategoryNav from "@/components/TechNewsCategoryNav";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import PremiumPagination from "@/components/PremiumPagination";
import { getTechPosts, resolveTechPostsPageSize } from "@/lib/techPosts";
import { TECH_NEWS_CATEGORIES } from "@/lib/techNewsCategories";
import { formatTechDate } from "@/lib/techPostUtils";
import { getPublishedProducts } from "@/lib/products";

export const revalidate = 60;

function NewsCard({ post, index }) {
  return (
    <article className={`group ${index === 0 ? "lg:col-span-2" : ""}`}>
      <Link
        href={`/teknoloji/${post.id}`}
        className={`relative flex h-full overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_22px_50px_-42px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:border-bw-300 hover:shadow-[0_28px_60px_-40px_rgba(0,0,0,0.3)] ${
          index === 0 ? "min-h-[25rem] md:min-h-[31rem]" : "flex-col"
        }`}
      >
        <div className={`relative overflow-hidden bg-bw-900 ${index === 0 ? "absolute inset-0" : "aspect-[16/10]"}`}>
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              priority={index < 2}
              sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-bw-800 to-bw-950" />
          )}
          {index === 0 ? <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/45 to-transparent" /> : null}
        </div>

        <div className={`relative ${index === 0 ? "mt-auto p-6 sm:p-8" : "p-5 sm:p-6"}`}>
          <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${index === 0 ? "text-bw-300" : "text-bw-500"}`}>
            {post.category ? <span>{post.category}</span> : null}
            {post.category ? <span className="h-1 w-1 rounded-full bg-current" /> : null}
            <Clock3 className="h-3.5 w-3.5" />
            <span>{formatTechDate(post.created_at)}</span>
          </div>
          <h2 className={`mt-3 font-semibold tracking-tight ${index === 0 ? "max-w-3xl text-2xl leading-tight text-white sm:text-4xl" : "text-xl leading-snug text-bw-950"}`}>
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className={`mt-3 leading-relaxed ${index === 0 ? "max-w-2xl text-sm text-bw-200 sm:text-base" : "line-clamp-2 text-sm text-bw-600"}`}>
              {post.excerpt}
            </p>
          ) : null}
          <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${index === 0 ? "text-white" : "text-bw-900"}`}>
            Haberi oku <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default async function TeknolojiPage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page || 1));
  const category = TECH_NEWS_CATEGORIES.includes(sp?.category) ? sp.category : "";
  const view = sp?.view === "mobile" ? "mobile" : "";
  const headerList = await headers();
  const pageSize = resolveTechPostsPageSize(headerList.get("user-agent") || "", headerList.get("sec-ch-ua-mobile") || "", view);

  const [{ data: posts, count }, { data: featuredProducts }] = await Promise.all([
    getTechPosts({ limit: pageSize, page, category }),
    getPublishedProducts({ limit: 6, featured: true }),
  ]);
  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  if (page > totalPages) redirect(category ? `/teknoloji?page=${totalPages}&category=${encodeURIComponent(category)}` : `/teknoloji?page=${totalPages}`);

  return (
    <main className="min-h-screen bg-bw-50">
      <Suspense fallback={null}><TechNewsViewSync /></Suspense>
      <TechNewsPageHero count={count || 0} products={featuredProducts || []} />
      <TechNewsCategoryNav activeCategory={category} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 border-b border-bw-200 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bw-500">Mepotia teknoloji</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-bw-950 sm:text-4xl">{category ? `${category} haberleri` : "Son haberler"}</h2>
          </div>
          <p className="text-sm text-bw-500">{count || 0} haber · En yeni gelişmeler ilk sırada.</p>
        </div>

        {posts?.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {posts.map((post, index) => <NewsCard key={post.id} post={post} index={index} />)}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-bw-300 bg-white px-6 py-20 text-center">
            <Newspaper className="mx-auto h-9 w-9 text-bw-400" strokeWidth={1.4} />
            <h2 className="mt-4 text-xl font-semibold text-bw-900">Henüz haber yok</h2>
            <p className="mt-2 text-sm text-bw-500">Yeni teknoloji haberleri kısa süre içinde burada yer alacak.</p>
          </div>
        )}

        <PremiumPagination basePath="/teknoloji" page={page} totalPages={totalPages} query={category ? { category } : {}} />
      </section>
    </main>
  );
}
