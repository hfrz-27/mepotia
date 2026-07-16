import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, Cpu, Gem, Radio } from "lucide-react";
import BackHomeLink from "@/components/BackHomeLink";
import ProductMiniCard from "@/components/ProductMiniCard";
import TechPostBody from "@/components/TechPostBody";
import { formatTechDate, getTechPostById, getTechPosts } from "@/lib/techPosts";
import { getPublishedProducts } from "@/lib/products";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const ShareTechPostButtons = dynamic(() => import("@/components/ShareTechPostButtons"), {
  loading: () => null,
});

export const revalidate = 60;

function SidebarTitle({ children, live = false }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <p className="text-[10px] font-bold tracking-[0.2em] text-bw-500 uppercase">{children}</p>
      {live ? <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-1 text-[9px] font-bold tracking-[0.13em] text-red-600 uppercase"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> Canlı</span> : <Gem className="h-3.5 w-3.5 text-bw-400" />}
    </div>
  );
}

function FeaturedProductsAside({ products }) {
  if (!products.length) return null;

  return (
    <aside className="rounded-[1.5rem] border border-bw-200 bg-white p-3.5 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.3)]">
      <SidebarTitle>Öne çıkanlar</SidebarTitle>
      <div className="grid gap-2">
        {products.slice(0, 4).map((product, index) => <ProductMiniCard key={product.id} product={product} prefetch={index === 0} className="w-full" />)}
      </div>
      <Link href="/ara" className="mt-3 block rounded-xl bg-bw-950 px-3 py-2 text-center text-[10px] font-semibold text-white transition hover:bg-bw-800">Tüm fırsatları gör</Link>
    </aside>
  );
}

function TrendingAside({ posts }) {
  if (!posts.length) return null;

  return (
    <aside className="rounded-[1.5rem] border border-bw-200 bg-white p-4 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.3)]">
      <SidebarTitle live>Gündem</SidebarTitle>
      <div className="divide-y divide-bw-100">
        {posts.map((item, index) => (
          <Link key={item.id} href={`/teknoloji/${item.id}`} className="group flex gap-3 py-3 first:pt-1 last:pb-1">
            <span className="mt-0.5 text-xs font-bold tabular-nums text-bw-300">0{index + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 block text-xs font-semibold leading-snug text-bw-800 transition group-hover:text-bw-500">{item.title}</span>
              <span className="mt-1 flex items-center gap-1 text-[10px] text-bw-400"><Clock3 className="h-3 w-3" /> {formatTechDate(item.created_at)}</span>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/teknoloji" className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-bw-200 px-3 py-2 text-[10px] font-semibold text-bw-700 transition hover:border-bw-300 hover:bg-bw-50"><Radio className="h-3.5 w-3.5" /> Tüm gündem</Link>
    </aside>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) return { title: "Yazı bulunamadı — Mepotia" };

  const pageUrl = absoluteUrl(`/teknoloji/${id}`);
  const description = post.excerpt || post.title;
  const ogImage = post.cover_url
    ? [{ url: post.cover_url, width: 1200, height: 630, alt: post.title }]
    : [{ url: absoluteUrl("/mepotia-logo.png"), width: 1200, height: 630, alt: SITE_NAME }];

  return {
    title: `${post.title} — Mepotia Teknoloji`,
    description,
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url: pageUrl,
      siteName: SITE_NAME,
      title: post.title,
      description,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ogImage.map((img) => img.url),
    },
  };
}

export default async function TechPostPage({ params }) {
  const { id } = await params;
  const { data: post } = await getTechPostById(id);
  if (!post) notFound();

  const [{ data: featuredProducts }, { data: trendingPosts }, { data: latestPosts }] = await Promise.all([
    getPublishedProducts({ limit: 4, featured: true }),
    getTechPosts({ limit: 6, trendingOnly: true }),
    getTechPosts({ limit: 6 }),
  ]);
  const agendaSource = trendingPosts?.length ? trendingPosts : latestPosts;
  const agendaPosts = (agendaSource || []).filter((item) => item.id !== post.id).slice(0, 5);
  const postUrl = absoluteUrl(`/teknoloji/${id}`);

  return (
    <main className="min-h-screen bg-bw-50">
      {post.cover_url ? (
        <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-bw-950">
          <Image
            src={post.cover_url}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bw-950 via-bw-950/50 to-bw-950/20" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-10 sm:px-6">
            <p className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-300 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              Güncel Haber · {formatTechDate(post.created_at)}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-[82rem] grid-cols-1 gap-6 px-4 py-10 sm:px-6 lg:py-14 xl:grid-cols-[12rem_minmax(0,1fr)_15rem] xl:gap-8">
        <div className="order-2 xl:order-1">
          <div className="xl:sticky xl:top-28">
            <FeaturedProductsAside products={featuredProducts || []} />
          </div>
        </div>
      <article className="order-1 mx-auto w-full max-w-3xl xl:order-2">
        {!post.cover_url ? (
          <>
            <BackHomeLink
              href="/teknoloji"
              label="Tüm haberler"
              variant="minimal"
            />
            <p className="mt-6 inline-flex items-center gap-2 text-[10px] tracking-[0.24em] text-bw-500 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              Güncel Haber · {formatTechDate(post.created_at)}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-bw-950 sm:text-4xl">
              {post.title}
            </h1>
          </>
        ) : (
          <BackHomeLink
            href="/teknoloji"
            label="Tüm haberler"
          />
        )}

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-bw-200 bg-white shadow-[0_24px_60px_-48px_rgba(0,0,0,0.18)]">
          {post.excerpt ? (
            <div className="border-b border-bw-100 bg-gradient-to-r from-bw-50 to-white px-6 py-5 sm:px-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">Özet</p>
              <p className="mt-2 text-lg leading-relaxed text-bw-700">{post.excerpt}</p>
            </div>
          ) : null}

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-bw-400 uppercase">Haber</p>
            <TechPostBody text={post.body} />
          </div>
        </div>

        <div className="mt-12 border-t border-bw-200 pt-8">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
            Paylaş
          </p>
          <p className="mt-1 text-sm text-bw-500">Bu haberi arkadaşlarınla paylaş.</p>
          <div className="mt-4">
            <ShareTechPostButtons
              title={post.title}
              excerpt={post.excerpt || ""}
              url={postUrl}
              imageUrl={post.cover_url || ""}
            />
          </div>
        </div>
      </article>
        <div className="order-3">
          <div className="xl:sticky xl:top-28">
            <TrendingAside posts={agendaPosts} />
          </div>
        </div>
      </div>
    </main>
  );
}
