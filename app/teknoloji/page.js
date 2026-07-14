import BackHomeLink from "@/components/BackHomeLink";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Cpu } from "lucide-react";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import TechNewsCard from "@/components/TechNewsCard";
import PremiumPagination from "@/components/PremiumPagination";
import { getTechPosts, resolveTechPostsPageSize } from "@/lib/techPosts";

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
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
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
  const paginationQuery = view === "mobile" ? { view: "mobile" } : {};

  if (count > 0 && page > totalPages) {
    redirect(buildRedirectPath(totalPages > 1 ? totalPages : 1, view));
  }

  return (
    <main className="min-h-screen bg-bw-50">
      <Suspense fallback={null}>
        <TechNewsViewSync />
      </Suspense>

      <section className="border-b border-bw-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <BackHomeLink className="mb-5" />
          <p className="text-[10px] font-semibold tracking-[0.24em] text-bw-500 uppercase">
            Güncel haberler
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-wide text-bw-950 sm:text-3xl">
            Teknoloji
          </h1>
          <p className="mt-2 text-sm text-bw-500">
            {count || 0} haber · son 7 gün
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {error ? (
          <p className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-12 text-center text-sm text-bw-500">
            Supabase&apos;de <code>tech_posts.sql</code> çalıştır.
          </p>
        ) : !posts.length ? (
          <div className="rounded-2xl border border-dashed border-bw-300 bg-white px-6 py-16 text-center">
            <Cpu className="mx-auto h-7 w-7 text-bw-300" />
            <p className="mt-3 text-sm font-medium text-bw-700">
              {page > 1 ? "Bu sayfada haber yok." : "Henüz paylaşım yok."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {posts.map((post, index) => (
                <TechNewsCard key={post.id} post={post} index={index} />
              ))}
            </div>

            <PremiumPagination
              basePath="/teknoloji"
              page={page}
              totalPages={totalPages}
              query={paginationQuery}
            />
          </>
        )}
      </div>
    </main>
  );
}
