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
  const alt = tone === "footer" || tone === "bw-50";

  return (
    <section id={id} className={`sx-section ${alt ? "sx-section-alt" : ""}`}>
      <div className="sx-wrap pb-6 sm:pb-8">
        <HomeSectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-8"
        />
      </div>
      <div className="pb-12 sm:pb-14">
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
