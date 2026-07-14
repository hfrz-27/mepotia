import BackHomeLink from "@/components/BackHomeLink";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Clock3, Cpu } from "lucide-react";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import TechNewsSwipePanel from "@/components/TechNewsSwipePanel";
import {
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
                  Teknoloji Haberleri
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bw-400 sm:text-base">
                  Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-bw-300 uppercase">
                  <Clock3 className="h-3 w-3" />
                  Son 7 günün seçkisi
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
          <TechNewsSwipePanel
            posts={posts}
            previousHref={page > 1 ? buildRedirectPath(page - 1, view) : null}
            nextHref={page < totalPages ? buildRedirectPath(page + 1, view) : null}
          />
        )}
      </div>
    </main>
  );
}
