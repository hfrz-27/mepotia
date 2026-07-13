import ProductDescription from "@/components/ProductDescription";

function DetailsHeader({ product, compact = false }) {
  return (
    <div
      className={`border-b border-bw-100 bg-bw-950 ${
        compact ? "rounded-t-[1.75rem] px-5 py-5 sm:px-6" : "px-8 py-6 lg:px-10"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
            Ürün detayı
          </p>
          <h2
            className={`mt-2 font-display font-semibold tracking-wide text-white ${
              compact ? "text-xl sm:text-2xl" : "text-2xl"
            }`}
          >
            Açıklama
          </h2>
        </div>
        <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm sm:gap-x-8">
          {product.brand ? (
            <div className="flex gap-2">
              <dt className="text-bw-500">Marka</dt>
              <dd className="font-medium text-white">{product.brand}</dd>
            </div>
          ) : null}
          {product.model ? (
            <div className="flex gap-2">
              <dt className="text-bw-500">Model</dt>
              <dd className="font-medium text-white">{product.model}</dd>
            </div>
          ) : null}
          <div className="flex gap-2">
            <dt className="text-bw-500">Görüntülenme</dt>
            <dd className="font-medium text-white">{product.views}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function ProductDetailsBlock({ product, variant = "mobile" }) {
  const isDesktop = variant === "desktop";

  return (
    <section
      className={`overflow-hidden border border-bw-200 bg-white shadow-[0_24px_60px_-48px_rgba(0,0,0,0.2)] ${
        isDesktop ? "mt-0 rounded-[2rem] bg-gradient-to-br from-white via-white to-bw-50" : "mt-8 rounded-[1.75rem]"
      }`}
    >
      <DetailsHeader product={product} compact={!isDesktop} />

      <div className={isDesktop ? "px-8 py-8 lg:px-10 lg:py-10" : "px-5 py-6 sm:px-6 sm:py-8"}>
        <ProductDescription text={product.description} wide={isDesktop} />
      </div>
    </section>
  );
}
