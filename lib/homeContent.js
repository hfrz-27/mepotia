export const HOME_CONTENT_DEFAULTS = {
  hero_eyebrow: "Mepotia Yeni Nesil", hero_title: "Teknolojinin yeni hali.", hero_copy: "Seçilmiş ürünleri, net bilgileri ve sana uygun seçenekleri Mepotia’da keşfet.", hero_link: "Daha fazla bilgi", hero_action: "Ürünleri incele",
  phone_title: "Günlük hayatına hazır.", phone_copy: "Kondisyonu açıkça anlatılmış akıllı telefonlar.", computer_title: "İşine güç kat.", computer_copy: "Okul, iş ve üretkenlik için dengeli seçenekler.", tablet_title: "Her fikrine hazır.", tablet_copy: "Çalışmak, üretmek ve eğlenmek için güçlü tabletleri keşfet.",
  trade_title: "Eski cihazınla yenisine yaklaş.", trade_copy: "Cihazını anlat, istediğin modeli seç. Değer farkını açık ve anlaşılır bir süreçle birlikte hesaplayalım.", trade_action: "Takas teklifi al",
  compare_title: "Farkları gör. Kararını net ver.", compare_copy: "Fiyatı, ekranı, performansı ve bataryayı aynı yerde karşılaştır. İhtiyacına uyan modeli güvenle seç.", compare_action: "Karşılaştırmaya başla",
  request_title: "Aklındaki ürünü söyle.", request_accent: "Bulunca haber verelim.", request_copy: "Modeli ve bütçeni paylaş. Sana uygun ürün vitrinde yerini aldığında ilk bilen sen ol.", request_action: "Ürün isteği oluştur",
  guide_title: "Doğru teknolojiye kısa yol.", guide_copy: "Teknik terimlere boğulmadan, kullanımına ve bütçene uygun seçeneği adım adım bul.",
  sell_title: "Cihazın sende beklemesin.", sell_accent: "Değeri sana dönsün.", sell_copy: "Birkaç ayrıntı ve fotoğraf paylaş. Cihazını açık, anlaşılır ve takip edilebilir bir süreçle değerlendirelim.",
  faq_eyebrow: "Merak ettiklerin", faq_title: "Sorular kısa.", faq_accent: "Yanıtlar net.", faq_copy: "Ürün seçiminden takasa, satıştan desteğe kadar en çok merak edilenleri bir araya getirdik.", faq_support_title: "Yanıtını bulamadın mı?", faq_support_copy: "Mepotia’ya doğrudan sor, birlikte netleştirelim.",
};

export function getHomeContent(content) {
  return { ...HOME_CONTENT_DEFAULTS, ...(content?.home || content || {}) };
}
