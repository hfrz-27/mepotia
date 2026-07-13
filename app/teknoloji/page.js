import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu } from "lucide-react";
import { formatTechDate, getTechPosts } from "@/lib/techPosts";

export const dynamic = "force-dynamic";

export default async function TeknolojiPage() {
  const { data: posts, error } = await getTechPosts({ limit: 48 });

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-500 uppercase">
        <Cpu className="h-3.5 w-3.5" />
        Teknoloji
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-wide text-bw-950 sm:text-5xl">
        Haberler &amp; bilgiler
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-bw-500 sm:text-base">
        Teknoloji dünyasından güncel gelişmeler, ipuçları ve paylaşımlar.
      </p>

      {error ? (
        <p className="mt-10 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-12 text-center text-sm text-bw-500">
          Supabase&apos;de <code>tech_posts.sql</code> dosyasını çalıştırman gerekiyor.
        </p>
      ) : !posts.length ? (
        <p className="mt-10 rounded-2xl border border-dashed border-bw-300 bg-bw-50 px-6 py-12 text-center text-sm text-bw-500">
          Henüz paylaşım yok.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-3xl border border-bw-200 bg-white transition hover:border-bw-300 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.3)]"
            >
              {post.cover_url ? (
                <div className="relative aspect-[16/10] bg-bw-100">
                  <Image
                    src={post.cover_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="33vw"
                    unoptimized={post.cover_url.includes("supabase.co")}
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-bw-950">
                  <Cpu className="h-8 w-8 text-white/25" />
                </div>
              )}
              <div className="p-5">
                <p className="text-[10px] font-semibold tracking-wide text-bw-400 uppercase">
                  {formatTechDate(post.created_at)}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-bw-950">{post.title}</h2>
                {post.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bw-500">{post.excerpt}</p>
                ) : null}
                <Link
                  href={`/teknoloji/${post.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bw-950"
                >
                  Devamını oku
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <Link href="/" className="mt-12 inline-block text-sm font-medium text-bw-600 hover:text-bw-950">
        ← Ana sayfa
      </Link>
    </main>
  );
}
