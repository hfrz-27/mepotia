import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Cpu } from "lucide-react";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import TechNewsHybridScroll from "@/components/TechNewsHybridScroll";
import TechNewsCard from "@/components/TechNewsCard";
import TechNewsPageHero from "@/components/TechNewsPageHero";
import PremiumPagination from "@/components/PremiumPagination";
import { getTechPosts, resolveTechPostsPageSize } from "@/lib/techPosts";
import { getPublishedProducts } from "@/lib/products";

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
  const [{ data: posts, count, error }, { data: featuredProducts }] = await Promise.all([
    getTechPosts({
      limit: pageSize,
      page,
    }),
    getPublishedProducts({ limit: 10, featured: true, orderBy: "created_at" }),
  ]);

  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));
  const paginationQuery = view === "mobile" ? { view: "mobile" } : {};

  if (count > 0 && page > totalPages) {
    redirect(buildRedirectPath(totalPages > 1 ? totalPages : 1, view));
  }

  return (
    <main className="min-h-screen bg-white sm:bg-bw-50">
      <Suspense fallback={null}>
        <TechNewsViewSync />
      </Suspense>

      <TechNewsPageHero count={count || 0} products={featuredProducts || []} />

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
            <div className="sm:hidden">
              <TechNewsHybridScroll posts={posts} />
            </div>

            <div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
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
