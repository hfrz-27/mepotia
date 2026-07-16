import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Cpu, ArrowRight } from "lucide-react";
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
    return { title: `Teknoloji Haberleri — Sayfa ${page}` };
  }
  return { title: "Teknoloji Haberleri" };
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
    getTechPosts({ limit: pageSize, page }),
    getPublishedProducts({ limit: 6, featured: true, orderBy: "created_at" }),
  ]);

  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  if (count > 0 && page > totalPages) {
    redirect(buildRedirectPath(totalPages > 1 ? totalPages : 1, view));
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bw-50 to-white">
      <Suspense fallback={null}>
        <TechNewsViewSync />
      </Suspense>

      <TechNewsPageHero count={count || 0} products={featuredProducts || []} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {error ? (
          <div className="rounded-3xl border border-bw-200 bg-white p-12 text-center">
            <Cpu className="mx-auto h-12 w-12 text-bw-300" />
            <p className="mt-4 text-lg text-bw-600">Haberler yüklenirken bir sorun oluştu.</p>
          </div>
        ) : !posts.length ? (
          <div className="rounded-3xl border border-dashed border-bw-200 bg-white py-20 text-center">
            <Cpu className="mx-auto h-12 w-12 text-bw-300" />
            <p className="mt-4 text-xl font-medium text-bw-700">Henüz haber bulunmuyor.</p>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-4xl font-display font-semibold tracking-tight text-bw-950">
                Son Teknoloji Haberleri
              </h2>
              <p className="text-bw-500">Güncel ve seçkin içerikler</p>
            </div>

            <div className="sm:hidden">
              <TechNewsHybridScroll posts={posts} />
            </div>

            <div className="hidden grid-cols-1 gap-8 sm:grid lg:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <TechNewsCard key={post.id} post={post} index={index} />
              ))}
            </div>

            <div className="mt-16">
              <PremiumPagination
                basePath="/teknoloji"
                page={page}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
