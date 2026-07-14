import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, Cpu } from "lucide-react";
import PremiumPagination from "@/components/PremiumPagination";
import {
  formatTechDate,
  getTechPosts,
  resolveTechPostsPageSize,
} from "@/lib/techPosts";

export const revalidate = 60;

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

  const headerList = await headers();
  const pageSize = resolveTechPostsPageSize(
    headerList.get("user-agent") || "",
    headerList.get("sec-ch-ua-mobile") || "",
  );

  const { data: posts, count, error } = await getTechPosts({
    limit: pageSize,
    page,
  });

  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  if (count > 0 && page > totalPages) {
    redirect(page === 2 ? "/teknoloji" : `/teknoloji?page=${totalPages}`);
  }

  return (
    <main className="min-h-screen bg-bw-50">
      <section className="relative overflow-hidden border-b border-bw-200 bg-bw-950">
        <div className="story-band-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] text-bw-400 uppercase">
            <Cpu className="h-3.5 w-3.5" />
            Güncel Haberler
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-wide text-white sm:text-5xl">
            Teknoloji Dünyasından Son Gelişmeler
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bw-400 sm:text-base">
            Yapay zekâdan akıllı telefonlara, oyunlardan yazılıma kadar en güncel haberler.
          </p>
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
                        sizes="33vw"
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
            />
          </>
        )}

        <Link
          href="/"
          className="mt-12 inline-block text-sm font-medium text-bw-600 hover:text-bw-950"
        >
          ← Ana sayfa
        </Link>
      </div>
    </main>
  );
}
