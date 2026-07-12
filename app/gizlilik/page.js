import StaticPage from "@/components/StaticPage";

export default function Page() {
  return (
    <StaticPage title="Gizlilik Politikası">
      <p className="text-sm text-bw-500">
        <strong>Son Güncelleme:</strong> 12 Temmuz 2026
      </p>
      <p>
        Mepotia olarak ziyaretçilerimizin gizliliğine önem veriyoruz. Bu
        Gizlilik Politikası, web sitemizi ziyaret ettiğinizde hangi bilgilerin
        toplanabileceğini, bu bilgilerin hangi amaçlarla kullanıldığını ve
        nasıl korunduğunu açıklamaktadır.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        1. Toplanan Bilgiler
      </h2>
      <p>
        Şu anda web sitemizde kullanıcı hesabı oluşturma veya üyelik sistemi
        bulunmamaktadır.
      </p>
      <p>
        Bununla birlikte, web sitemizi ziyaret ettiğinizde aşağıdaki teknik
        bilgiler otomatik olarak işlenebilir:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>IP adresi</li>
        <li>Tarayıcı ve cihaz bilgileri</li>
        <li>İşletim sistemi bilgileri</li>
        <li>Ziyaret tarihi ve saati</li>
        <li>Görüntülenen sayfalar</li>
        <li>Çerez (Cookie) verileri</li>
      </ul>
      <p>
        Bu bilgiler kişisel profil oluşturmak amacıyla değil, yalnızca web
        sitesinin güvenliğini ve performansını artırmak amacıyla
        kullanılmaktadır.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        2. Bilgilerin Kullanım Amaçları
      </h2>
      <p>Toplanan teknik bilgiler aşağıdaki amaçlarla kullanılabilir:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Web sitesinin güvenliğini sağlamak.</li>
        <li>Site performansını analiz etmek ve geliştirmek.</li>
        <li>Teknik hataları tespit etmek ve gidermek.</li>
        <li>Kullanıcı deneyimini iyileştirmek.</li>
        <li>Olası kötüye kullanım ve güvenlik ihlallerini önlemek.</li>
      </ul>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        3. Çerez (Cookie) Politikası
      </h2>
      <p>
        Mepotia, ziyaretçilere daha iyi bir kullanıcı deneyimi sunabilmek
        amacıyla çerezlerden (Cookies) yararlanabilir.
      </p>
      <p>Çerezler;</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Site performansını artırmak,</li>
        <li>Sayfa kullanım istatistiklerini analiz etmek,</li>
        <li>Kullanıcı deneyimini geliştirmek</li>
      </ul>
      <p>
        amacıyla kullanılabilir. Tarayıcınızın ayarlarından çerezleri istediğiniz
        zaman silebilir veya devre dışı bırakabilirsiniz.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        4. Üçüncü Taraf Hizmetleri
      </h2>
      <p>
        Web sitemizde WhatsApp, sosyal medya hesapları veya diğer üçüncü taraf
        internet sitelerine yönlendiren bağlantılar bulunabilir.
      </p>
      <p>
        Bu platformların gizlilik uygulamaları kendi politikalarına tabidir.
        Mepotia, üçüncü taraf hizmet sağlayıcılarının veri işleme süreçlerinden
        sorumlu değildir.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        5. Veri Güvenliği
      </h2>
      <p>
        Mepotia, ziyaretçilerden elde edilen teknik verilerin korunması amacıyla
        gerekli teknik ve idari güvenlik önlemlerini almaktadır.
      </p>
      <p>
        Bununla birlikte, internet üzerinden gerçekleştirilen hiçbir veri
        aktarımının %100 güvenli olduğu garanti edilemez.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        6. Politika Değişiklikleri
      </h2>
      <p>
        Mepotia, bu Gizlilik Politikasını gerekli gördüğü durumlarda önceden
        bildirimde bulunmaksızın güncelleme hakkını saklı tutar.
      </p>
      <p>Güncel politika her zaman bu sayfada yayımlanacaktır.</p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        7. İletişim
      </h2>
      <p>
        Bu Gizlilik Politikası ile ilgili her türlü soru, görüş veya talebiniz
        için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.
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
      <p className="pt-2">
        <strong>
          Mepotia web sitesini kullanarak bu Gizlilik Politikasını
          okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
        </strong>
      </p>
    </StaticPage>
  );
}
