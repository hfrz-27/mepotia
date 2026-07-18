import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import TechNewsHomeRow from "@/components/TechNewsHomeRow";
import HomeCategoryExplorer from "@/components/HomeCategoryExplorer";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import { getHomeCategoryProductMap } from "@/lib/getHomeCategoryProducts";
import { getTechPosts } from "@/lib/techPosts";

export default async function TechNewsSection({ categories = [] }) {
  const [{ data: posts, error }, productsByCategory] = await Promise.all([
    getTechPosts({ limit: 7 }),
    getHomeCategoryProductMap(categories),
  ]);

  const categoryMeta = categories.map((cat) => ({
    slug: cat.slug,
    catalogOnly: Boolean(cat.catalogOnly),
  }));

  return (
    <section id="teknoloji" className="sx-section">
      <HomeCategoryExplorer categories={categoryMeta} productsByCategory={productsByCategory} />

      <div className="sx-section-alt border-t border-[#2a2a30]">
        <div className="sx-wrap pb-8">
          <HomeSectionHeader
            eyebrow="Sinyal"
            title="Teknoloji haberleri"
            description="Seçilmiş gelişmeler — gürültü yok, net özet."
            className="mb-0"
          />
          {error ? (
            <p className="mt-6 border border-[#2a2a30] bg-[#111114] px-4 py-3 text-sm text-zinc-400">
              tech_posts.sql gerekli.
            </p>
          ) : !posts.length ? (
            <div className="mt-8 border border-[#2a2a30] bg-[#111114] px-4 py-10 text-center">
              <Cpu className="mx-auto h-8 w-8 text-zinc-600" />
              <p className="mt-2 text-sm text-zinc-400">Henüz paylaşım yok</p>
            </div>
          ) : null}
        </div>

        {posts?.length && !error ? (
          <>
            <TechNewsHomeRow posts={posts} />
            <div className="flex justify-center px-4 py-10">
              <Link href="/teknoloji" prefetch className="sx-btn">
                Tüm haberler
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
