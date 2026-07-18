import HomeSectionHeader from "@/components/HomeSectionHeader";
import HomeProductScroll from "@/components/HomeProductScroll";

export default function HomeProductSection({
  id,
  tone = "light",
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  products,
  prefetchCount = 2,
  ariaLabel,
}) {
  const bg =
    tone === "footer"
      ? "bg-white sm:bg-[#f5f5f7]"
      : tone === "bw-50"
        ? "bg-white sm:bg-bw-50"
        : "bg-white";

  return (
    <section id={id} className={`scroll-mt-28 border-y border-bw-200 ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <HomeSectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </div>

      <div className="pb-8 sm:pb-10">
        <HomeProductScroll
          products={products}
          href={href}
          linkLabel={linkLabel}
          prefetchCount={prefetchCount}
          ariaLabel={ariaLabel || title}
        />
      </div>
    </section>
  );
}
