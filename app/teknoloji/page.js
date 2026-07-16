import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import TechNewsPageHero from "@/components/TechNewsPageHero";
import TechNewsViewSync from "@/components/TechNewsViewSync";
import { getTechPosts, resolveTechPostsPageSize } from "@/lib/techPosts";
import { getPublishedProducts } from "@/lib/products";
import PremiumPagination from "@/components/PremiumPagination";

export const revalidate = 60;

export default async function TeknolojiPage({ searchParams }) {
  const sp = await searchParams;
  const page = Number(sp?.page || 1);
  const view = sp?.view === "mobile" ? "mobile" : "";
  const headerList = await headers();
  const pageSize = resolveTechPostsPageSize(headerList.get("user-agent") || "", headerList.get("sec-ch-ua-mobile") || "", view);

  const [{ data: posts, count }, { data: featuredProducts }] = await Promise.all([
    getTechPosts({ limit: pageSize, page }),
    getPublishedProducts({ limit: 6, featured: true }),
  ]);

  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  if (page > totalPages) redirect(`/teknoloji?page=${totalPages}`);

  return (
    <main className="bg-white min-h-screen">
      <Suspense fallback={null}>
        <TechNewsViewSync />
      </Suspense>

      <TechNewsPageHero count={count || 0} products={featuredProducts || []} />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-baseline mb-10">
          <h1 className="text-5xl md:text-6xl font-display font-semibold tracking-tighter text-bw-950">
            Teknoloji
          </h1>
          <p className="text-bw-500 text-lg">2026'nın en önemli gelişmeleri</p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group">
                <div className="aspect-video bg-bw-100 rounded-3xl overflow-hidden mb-6 relative">
                  {post.image && <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-bw-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{new Date(post.published_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <h2 className="text-2xl font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-3">
                    {post.title}
                  </h2>
                  <p className="text-bw-600 line-clamp-3 text-[15px]">{post.excerpt}</p>
                  <a href={`/teknoloji/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-bw-950 group-hover:gap-3 transition-all">
                    Devamını oku <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-bw-500">Henüz haber yok.</p>
        )}

        <div className="mt-16">
          <PremiumPagination basePath="/teknoloji" page={page} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
