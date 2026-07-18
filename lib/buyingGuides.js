export const BUYING_GUIDES = {
  "telefon-alma-rehberi": {
    eyebrow: "Mepotia satın alma rehberi",
    title: "Telefon alırken nelere dikkat etmelisin?",
    description: "İhtiyacına, bütçene ve kullanım alışkanlıklarına uygun telefonu seçmek için kısa ve net rehber.",
    search: "telefon",
    accent: "from-violet-950 via-bw-950 to-bw-800",
    steps: [
      ["Kullanımını belirle", "Sosyal medya, kamera, oyun, iş veya günlük kullanım: önceliğini netleştir. Böylece gereksiz özelliklere para vermezsin."],
      ["Ekran ve boyut", "Tek elle kullanım için kompakt modelleri; video, oyun ve üretkenlik için daha büyük, yüksek yenileme hızlı ekranları değerlendir."],
      ["Kamera ihtiyacı", "Sadece megapiksele bakma. Gece çekimi, sabitleme, portre ve video kalitesi için örnek çekimleri incele."],
      ["Pil ve şarj", "Gün boyu kullanım için pil kapasitesini, hızlı şarj desteğini ve kutudan adaptör çıkıp çıkmadığını kontrol et."],
      ["Depolama ve güncelleme", "Fotoğraf/video çekiyorsan en az 128 GB düşün. Yazılım güncelleme süresi uzun modeller daha uzun ömürlü olur."],
    ],
    checklist: ["IMEI ve cihaz kaydını doğrula", "Ekran, kasa ve kameraları test et", "Pil sağlığını ve şarj girişini kontrol et", "Kutu, fatura ve aksesuarları sor", "Takas değeri için net fotoğraflar hazırla"],
  },
  "bilgisayar-alma-rehberi": {
    eyebrow: "Mepotia satın alma rehberi",
    title: "Bilgisayar alırken nelere dikkat etmelisin?",
    description: "İş, okul, tasarım, oyun ve günlük kullanım için doğru bilgisayarı seçmenin pratik yolu.",
    search: "bilgisayar",
    accent: "from-sky-950 via-bw-950 to-bw-800",
    steps: [
      ["Kullanım senaryonu seç", "Ofis ve okul için hafif bir dizüstü; oyun ve tasarım için güçlü ekran kartlı bir sistem; ev kullanımı için masaüstü daha uygun olabilir."],
      ["İşlemci ve bellek", "Günlük kullanımda güncel bir orta seviye işlemci ve 8–16 GB RAM yeterlidir. Çoklu görev, tasarım ve oyun için 16 GB ve üstünü hedefle."],
      ["Depolama", "SSD, açılış ve uygulama hızını doğrudan etkiler. 512 GB iyi bir başlangıç; büyük dosyalar için yükseltilebilirlik avantajdır."],
      ["Ekran ve taşınabilirlik", "Dışarıda çalışıyorsan parlaklık ve pil ömrüne; masa başında çalışıyorsan ekran boyutu, çözünürlük ve bağlantılara öncelik ver."],
      ["İkinci el kontrolü", "Batarya, klavye, menteşe, ekran pikseli, fan sesi ve portları tek tek dene. Mümkünse kısa bir performans testi yap."],
    ],
    checklist: ["Cihazın seri numarası ve faturasını kontrol et", "Ekranda ölü piksel veya ışık sızması var mı bak", "Klavye, touchpad, webcam ve tüm portları dene", "Batarya ve şarj adaptörünü test et", "RAM/SSD yükseltme imkânını sor"],
  },
};

export const BUYING_GUIDE_LIST = Object.entries(BUYING_GUIDES).map(([slug, guide]) => ({ slug, ...guide }));
