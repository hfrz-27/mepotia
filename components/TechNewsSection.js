import { Cpu } from "lucide-react";
import TechNewsHomeRow from "@/components/TechNewsHomeRow";
import { getTechPosts } from "@/lib/techPosts";

export default async function TechNewsSection({ coverUrl = null } = {}) {
  const { data: posts, error } = await getTechPosts({ limit: 8 });

  return (
    <section id="teknoloji" className="relative scroll-mt-28 bg-[#f5f5f7]">
      {error ? (
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-bw-600 sm:px-6">
          Supabase&apos;de <code className="text-bw-950">tech_posts.sql</code> çalıştır.
        </div>
      ) : !posts?.length ? (
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6">
          <Cpu className="mx-auto h-7 w-7 text-bw-300" />
          <p className="mt-2 text-sm font-medium text-bw-700">Henüz paylaşım yok</p>
        </div>
      ) : (
        <TechNewsHomeRow posts={posts} coverUrl={coverUrl} />
      )}
    </section>
  );
}
