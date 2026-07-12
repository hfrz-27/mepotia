import StaticPage from "@/components/StaticPage";

export default function Page() {
  return (
    <StaticPage title="Kullanım Şartları">
      <p className="text-sm text-bw-500">
        <strong>Son Güncelleme:</strong> 12 Temmuz 2026
      </p>
      <p>
        Mepotia web sitesini ziyaret ederek veya kullanarak aşağıdaki kullanım
        şartlarını kabul etmiş sayılırsınız. Lütfen bu sayfayı dikkatlice
        okuyunuz.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        1. Genel Hükümler
      </h2>
      <p>
        Mepotia, ziyaretçilerine ikinci el ürünlerin tanıtımı ve satışı amacıyla
        hizmet sunmaktadır. Web sitesini kullanan herkes bu kullanım şartlarına
        uymayı kabul eder.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        2. Web Sitesinin Kullanımı
      </h2>
      <p>
        Web sitemizi yalnızca yasal amaçlarla kullanabilirsiniz. Siteye zarar
        verecek, güvenliğini tehlikeye atacak veya hizmetlerin çalışmasını
        engelleyecek herhangi bir işlem yapılması yasaktır.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        3. Ürün Bilgileri
      </h2>
      <p>
        Mepotia&apos;da yer alan ürün açıklamaları ve görseller mümkün olduğunca
        doğru ve güncel şekilde hazırlanır. Ancak yazım hataları veya teknik
        nedenlerden kaynaklanan eksiklikler oluşabilir. Gerekli durumlarda
        bilgiler önceden bildirim yapılmaksızın güncellenebilir.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        4. Fikri Mülkiyet Hakları
      </h2>
      <p>
        Web sitesinde yer alan logo, tasarım, metinler, görseller ve diğer tüm
        içerikler Mepotia&apos;ya aittir veya kullanım hakkı alınmıştır. İzinsiz
        kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        5. Sorumluluğun Sınırlandırılması
      </h2>
      <p>
        Mepotia, teknik bakım, sistem güncellemeleri veya beklenmeyen teknik
        sorunlar nedeniyle web sitesinin geçici olarak erişilememesinden sorumlu
        tutulamaz.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        6. Kullanım Şartlarında Değişiklik
      </h2>
      <p>
        Mepotia, gerekli gördüğü durumlarda bu Kullanım Şartlarını güncelleme
        hakkını saklı tutar. Güncel sürüm her zaman bu sayfada yayımlanacaktır.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        7. İletişim
      </h2>
      <p>
        Kullanım Şartları hakkında sorularınız için bizimle iletişime
        geçebilirsiniz.
      </p>
      <p>
        <strong>Mepotia</strong>
      </p>
      <p>
        E-posta:{" "}
        <a
          href="mailto:mepotiaa@gmail.com"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          mepotiaa@gmail.com
        </a>
      </p>
      <p>
        Telefon:{" "}
        <a
          href="tel:+905059574122"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          0505 957 41 22
        </a>
      </p>
    </StaticPage>
  );
}
