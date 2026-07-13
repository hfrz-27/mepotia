import ProductDescription from "@/components/ProductDescription";

function MetaChip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-bw-200 bg-bw-50 px-2.5 py-1 text-[11px] text-bw-600">
      <span className="text-bw-400">{label}</span>
      <span className="font-medium text-bw-800">{value}</span>
    </span>
  );
}

function DetailsHeader({ product, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-t-[1.75rem] border-b border-white/10 bg-bw-950 px-4 py-2.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-3.5 w-px shrink-0 bg-white/30" aria-hidden />
          <div className="min-w-0">
            <p className="text-[9px] font-semibold tracking-[0.18em] text-bw-500 uppercase">
              Ürün detayı
            </p>
            <h2 className="truncate font-display text-sm font-semibold tracking-wide text-white">
              Açıklama
            </h2>
          </div>
        </div>
        <span className="shrink-0 text-[10px] tabular-nums text-bw-500">
          {product.views} görüntülenme
        </span>
      </div>
    );
  }

  return (
    <div className="border-b border-bw-100 bg-bw-950 px-8 py-6 lg:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
            Ürün detayı
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-white">
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

  const hasMobileMeta = !isDesktop && (product.brand || product.model);

  return (
    <section
      className={`overflow-hidden border border-bw-200 bg-white shadow-[0_20px_50px_-40px_rgba(0,0,0,0.18)] ${
        isDesktop ? "mt-0 rounded-[2rem] bg-gradient-to-br from-white via-white to-bw-50" : "mt-6 rounded-[1.75rem]"
      }`}
    >
      <DetailsHeader product={product} compact={!isDesktop} />

      {hasMobileMeta ? (
        <div className="flex flex-wrap gap-1.5 border-b border-bw-100 px-4 py-2 sm:px-5">
          {product.brand ? <MetaChip label="Marka" value={product.brand} /> : null}
          {product.model ? <MetaChip label="Model" value={product.model} /> : null}
        </div>
      ) : null}

      <div className={isDesktop ? "px-8 py-8 lg:px-10 lg:py-10" : "px-4 py-4 sm:px-5 sm:py-5"}>
        <ProductDescription text={product.description} wide={isDesktop} />
      </div>
    </section>
  );
}
