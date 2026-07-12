import StaticPage from "@/components/StaticPage";

export default function Page() {
  return (
    <StaticPage title="KVKK Aydınlatma Metni">
      <p className="text-sm text-bw-500">
        <strong>Son Güncelleme:</strong> 12 Temmuz 2026
      </p>
      <p>
        Mepotia olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (&quot;KVKK&quot;) kapsamında kişisel verilerinizin gizliliğine ve
        güvenliğine önem veriyoruz. Bu metin, kişisel verilerinizin hangi
        amaçlarla işlendiği ve haklarınız hakkında sizleri bilgilendirmek
        amacıyla hazırlanmıştır.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        1. Veri Sorumlusu
      </h2>
      <p>
        Bu aydınlatma metni kapsamında veri sorumlusu Mepotia&apos;dır.
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
        İletişim:{" "}
        <a
          href="https://wa.me/905059574122"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          WhatsApp ile ulaş
        </a>
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        2. İşlenen Kişisel Veriler
      </h2>
      <p>
        Web sitemizi ziyaret etmeniz veya bizimle iletişime geçmeniz halinde
        aşağıdaki bilgiler işlenebilir:
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Ad ve soyad (paylaşmanız hâlinde)</li>
        <li>Telefon numarası</li>
        <li>E-posta adresi</li>
        <li>Mesaj içerikleri</li>
        <li>IP adresi</li>
        <li>Tarayıcı ve cihaz bilgileri</li>
        <li>Çerez (Cookie) verileri</li>
      </ul>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        3. Kişisel Verilerin İşlenme Amaçları
      </h2>
      <p>Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>İletişim taleplerini yanıtlamak,</li>
        <li>Ürünler hakkında bilgi vermek,</li>
        <li>Web sitesinin güvenliğini sağlamak,</li>
        <li>Hizmet kalitesini geliştirmek,</li>
        <li>Yasal yükümlülükleri yerine getirmek.</li>
      </ul>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        4. Kişisel Verilerin Aktarılması
      </h2>
      <p>
        Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle
        satılmaz, kiralanmaz veya izniniz olmadan paylaşılmaz.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        5. KVKK Kapsamındaki Haklarınız
      </h2>
      <p>
        6698 sayılı KVKK&apos;nın 11. maddesi kapsamında;
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
        <li>İşlenen verilere ilişkin bilgi talep etme,</li>
        <li>Eksik veya hatalı verilerin düzeltilmesini isteme,</li>
        <li>
          Kanuni şartlar oluştuğunda verilerin silinmesini veya yok edilmesini
          talep etme,
        </li>
        <li>Kanun kapsamında sahip olduğunuz diğer hakları kullanma</li>
      </ul>
      <p>haklarına sahipsiniz.</p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-wide text-bw-950">
        6. İletişim
      </h2>
      <p>
        KVKK kapsamındaki taleplerinizi aşağıdaki iletişim bilgilerimiz
        üzerinden bize iletebilirsiniz.
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
        İletişim:{" "}
        <a
          href="https://wa.me/905059574122"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-bw-950 underline underline-offset-4"
        >
          WhatsApp ile ulaş
        </a>
      </p>
    </StaticPage>
  );
}
