import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import TechNewsHomeRow from "@/components/TechNewsHomeRow";
import HomeCategoryExplorer from "@/components/HomeCategoryExplorer";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import { getHomeCategoryProductMap } from "@/lib/getHomeCategoryProducts";
import { getTechPosts } from "@/lib/techPosts";

export default async function TechNewsSection({ categories = [] }) {
  const [{ data: posts, error }, productsByCategory] = await Promise.all([
    getTechPosts({ limit: 8 }),
    getHomeCategoryProductMap(categories),
  ]);

  const categoryMeta = categories.map((cat) => ({
    slug: cat.slug,
    catalogOnly: Boolean(cat.catalogOnly),
  }));

  return (
    <section id="teknoloji" className="relative scroll-mt-28 border-t border-bw-200 bg-white">
      <div className="story-band-grid absolute inset-0 opacity-[0.03]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <HomeSectionHeader
          eyebrow="Güncel haberler"
          title="Teknoloji haberleri"
          description="Telefon, oyun ve yazılım dünyasından güncel gelişmeler."
          href="/teknoloji"
          linkLabel="Haberlere git"
        />

        {error ? (
          <div className="mb-8 rounded-xl border border-dashed border-bw-300 bg-bw-50 px-4 py-6 text-center text-sm text-bw-600">
            Supabase&apos;de <code className="text-bw-950">tech_posts.sql</code> çalıştır.
          </div>
        ) : !posts.length ? (
          <div className="mb-8 rounded-xl border border-dashed border-bw-300 bg-bw-50 px-4 py-8 text-center">
            <Cpu className="mx-auto h-7 w-7 text-bw-300" />
            <p className="mt-2 text-sm font-medium text-bw-700">Henüz paylaşım yok</p>
          </div>
        ) : null}
      </div>

      {posts?.length && !error ? (
        <>
          <TechNewsHomeRow posts={posts} />

          <div className="mt-5 flex justify-center px-4 pb-6 sm:hidden">
            <Link
              href="/teknoloji"
              prefetch
              className="inline-flex items-center gap-2 rounded-xl bg-bw-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-bw-800"
            >
              Haberlere git
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : null}

      <HomeCategoryExplorer categories={categoryMeta} productsByCategory={productsByCategory} />
    </section>
  );
}
