import ProductDescription from "@/components/ProductDescription";

export default function ProductDetailsBlock({ product, variant = "mobile" }) {
  const isDesktop = variant === "desktop";

  if (isDesktop) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-bw-200 bg-gradient-to-br from-white via-white to-bw-50 shadow-[0_24px_60px_-48px_rgba(0,0,0,0.2)]">
        <div className="border-b border-bw-100 bg-bw-950 px-8 py-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-bw-400 uppercase">
                Ürün detayı
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide text-white">
                Açıklama
              </h2>
            </div>
            <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
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

        <div className="px-8 py-8 lg:px-10 lg:py-10">
          <ProductDescription text={product.description} wide />
        </div>
      </section>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-bw-200 bg-white p-6 sm:p-8">
      <h2 className="text-xs font-semibold tracking-[0.2em] text-bw-500 uppercase">Açıklama</h2>
      <ProductDescription text={product.description} />
      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-bw-100 pt-6 text-sm">
        {product.brand ? (
          <>
            <dt className="text-bw-400">Marka</dt>
            <dd className="text-bw-900">{product.brand}</dd>
          </>
        ) : null}
        {product.model ? (
          <>
            <dt className="text-bw-400">Model</dt>
            <dd className="text-bw-900">{product.model}</dd>
          </>
        ) : null}
        <dt className="text-bw-400">Görüntülenme</dt>
        <dd className="text-bw-900">{product.views}</dd>
      </dl>
    </div>
  );
}
