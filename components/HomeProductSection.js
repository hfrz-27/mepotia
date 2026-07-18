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
  const mist = tone === "footer" || tone === "bw-50";

  return (
    <section
      id={id}
      className={`scroll-mt-16 ${mist ? "bg-[#f5f5f7]" : "bg-white"}`}
    >
      <div className="pv-wrap pt-16 sm:pt-20 lg:pt-24">
        <HomeSectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          href={href}
          linkLabel={linkLabel}
          className="mb-8 sm:mb-10"
        />
      </div>
      <div className="pb-16 sm:pb-20 lg:pb-24">
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
