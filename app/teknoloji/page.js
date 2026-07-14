import BackHomeLink from "@/components/BackHomeLink";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, Cpu } from "lucide-react";
import PremiumPagination from "@/components/PremiumPagination";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import {
  formatTechDate,
  getTechPosts,
  resolveTechPostsPageSize,
} from "@/lib/techPosts";

export const revalidate = 60;

function buildRedirectPath(page, view) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (view === "mobile") params.set("view", "mobile");
  const qs = params.toString();
  return qs ? `/teknoloji?${qs}` : "/teknoloji";
}

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const page = Number(sp?.page || 1);
  if (page > 1) {
    return {
      title: `Teknoloji Haberleri — Sayfa ${page}`,
    };
  }
  return {
    title: "Teknoloji Haberleri",
  };
}

export default async function TeknolojiPage({ searchParams }) {
  const sp = await searchParams;
  const rawPage = Number(sp?.page || 1);
  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  const view = sp?.view === "mobile" ? "mobile" : "";

  const headerList = await headers();
  const pageSize = resolveTechPostsPageSize(
    headerList.get("user-agent") || "",
    headerList.get("sec-ch-ua-mobile") || "",
    view,
  );
  const isMobileView = pageSize === 10;
  const paginationQuery = isMobileView ? { view: "mobile" } : {};

  const { data: posts, count, error } = await getTechPosts({
    limit: pageSize,
    page,
  });

  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  if (count > 0 && page > totalPages) {
    redirect(buildRedirectPath(totalPages > 1 ? totalPages : 1, view));
  }

  return (
    <main className="min-h-screen bg-bw-50">
      <Suspense fallback={null}>
        <TechNewsViewSync />
      </Suspense>

      <section className="relative overflow-hidden bg-bw-50">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-bw-950 px-6 py-8 shadow-[0_32px_80px_-42px_rgba(0,0,0,0.7)] sm:px-10 sm:py-11 lg:px-12">
            <div className="story-band-grid absolute inset-0 opacity-20" aria-hidden />
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-bw-500/15 blur-3xl" aria-hidden />

            <div className="relative">
              <BackHomeLink variant="dark" className="mb-9" />
              <div className="max-w-3xl border-l border-white/25 pl-4 sm:pl-5">
                <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] text-bw-400 uppercase">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white">
                    <Cpu className="h-3 w-3" />
                  </span>
                  Güncel Haberler
                </p>
                <h1 className="mt-4 font-display text-4xl font-semibold tracking-wide text-white sm:text-5xl">
                  Teknoloji Dünyasından Son Gelişmeler
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bw-400 sm:text-base">
                  Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {error ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            Supabase&apos;de <code>tech_posts.sql</code> çalıştır.
          </p>
        ) : !posts.length ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            {page > 1 ? "Bu sayfada haber yok." : "Henüz paylaşım yok."}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/teknoloji/${post.id}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-bw-200 bg-white shadow-[0_20px_50px_-40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-bw-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bw-100">
                    {post.cover_url ? (
                      <Image
                        src={post.cover_url}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-bw-950">
                        <Cpu className="h-8 w-8 text-white/25" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bw-950/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-bw-400 uppercase">
                      {formatTechDate(post.created_at)}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-bw-950 group-hover:text-bw-700">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bw-500">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950">
                      Devamını oku
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <PremiumPagination
              basePath="/teknoloji"
              page={page}
              totalPages={totalPages}
              totalItems={count}
              pageSize={pageSize}
              query={paginationQuery}
            />
          </>
        )}
      </div>
    </main>
  );
}
