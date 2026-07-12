# Mepotia — Metin Düzenleme Rehberi

Sitedeki yazıların çoğu kod dosyalarında durur. Bu dosyada **hangi ekranın metni nerede** olduğunu bulabilirsin.

---

## Hızlı başlangıç

1. Cursor’da ilgili dosyayı aç
2. `Ctrl + F` ile metni ara
3. Değiştir → `Ctrl + S` ile kaydet
4. Canlıya almak için terminalde:

```powershell
cd C:\Users\MEPOTIA\Desktop\mepotia
git add .
git commit -m "Metin guncellemesi"
git push origin main
```

2–3 dakika sonra **mepotia.com** güncellenir.

---

## Ortak bileşenler (her sayfada görünür)

| Ne | Dosya |
|----|-------|
| Üst menü (logo, hamburger, Paylaş, Yönetim) | `components/Navbar.js` |
| Alt kısım (footer, linkler, telefon) | `components/Footer.js` |
| WhatsApp yüzen butonu | `components/WhatsAppHelpButton.js` |
| Tarayıcı sekmesi başlığı ve açıklama | `app/layout.js` |

---

## Sayfa sayfa

| Sayfa | URL | Dosya |
|-------|-----|-------|
| Ana sayfa | `/` | `app/page.js` |
| Hakkında | `/hakkimizda` | `app/hakkimizda/page.js` |
| İletişim | `/iletisim` | `app/iletisim/page.js` |
| Ürün ara / keşfet | `/ara` | `app/ara/page.js` |
| Kategoriler | `/kategoriler` | `app/kategoriler/page.js` |
| Kategori detay | `/kategori/...` | `app/kategori/[slug]/page.js` |
| En çok bakılanlar | `/en-cok-bakilanlar` | `app/en-cok-bakilanlar/page.js` |
| Ürün detay | `/urun/...` | `app/urun/[id]/page.js` |
| Bize ürün sat | `/bana-sat` | `app/bana-sat/page.js` + `app/bana-sat/BanaSatClient.js` |
| Ürün iste | `/urun-iste` | `app/urun-iste/page.js` + `app/urun-iste/UrunIsteClient.js` |
| Giriş | `/giris` | `app/giris/GirisClient.js` |
| Ürün paylaş (admin) | `/ilan-ver` | `app/ilan-ver/page.js` |
| Yönetim paneli | `/admin` | `app/admin/page.js` |
| Blog | `/blog` | `app/blog/page.js` |
| SSS | `/sss` | `app/sss/page.js` |
| Şikayet | `/sikayet` | `app/sikayet/page.js` |

### Yasal sayfalar

| Sayfa | Dosya |
|-------|-------|
| Gizlilik | `app/gizlilik/page.js` |
| KVKK | `app/kvkk/page.js` |
| Kullanım şartları | `app/kullanim-sartlari/page.js` |
| Çerez politikası | `app/cerez/page.js` |

---

## Özel bileşenler

| Ne | Dosya |
|----|-------|
| Ana sayfa arama kutusu | `components/HeroSearch.js` |
| Ürün kartları (Premium etiketi vb.) | `components/ProductCard.js` |
| Hikaye reklamı yazıları (MEPOTIA, VİTRİNDE…) | `components/ShareProductButtons.js` |
| Boş sayfa şablonu (Hakkında, İletişim vb.) | `components/StaticPage.js` |

---

## Kodda DEĞİL — panelden / veritabanından değişenler

Bunlar dosyadan değil, **admin paneli veya Supabase** üzerinden güncellenir:

| İçerik | Nereden değiştirilir |
|--------|----------------------|
| Ürün başlığı, fiyat, açıklama | Yönetim → **Yeni paylaşım** veya **Vitrin ürünleri** |
| Ürün görselleri | Aynı yer |
| Öne çıkan / Premium | Yönetim → Vitrin ürünleri |
| Kategoriler | Supabase → `categories` tablosu |
| Site ayarları (telefon, WhatsApp) | Supabase → `site_settings` tablosu |

---

## En çok düzenlenecek 3 dosya

1. **Ana sayfa** → `app/page.js`
   - Büyük başlık, alt açıklama, butonlar, hikâye bölümü, vitrin başlıkları

2. **Hakkında** → `app/hakkimizda/page.js`
   - Kuruluş hikâyesi, vizyon, misyon, iletişim bilgileri

3. **Menü + footer** → `components/Navbar.js` + `components/Footer.js`
   - Menü linkleri, telefon numarası, alt yazı

---

## Telefon ve WhatsApp numarası

Birden fazla yerde geçebilir. Hepsini güncellemek için projede ara:

```
Ctrl + Shift + F  →  905059574122
```

veya

```
0505 957 41 22
```

Bulduğun tüm dosyalarda aynı numarayı değiştir.

---

## Örnek: Ana sayfa açıklamasını değiştir

1. `app/page.js` dosyasını aç
2. `Ctrl + F` → `Mezopotamya` yaz
3. Şu satırı bul ve değiştir:

```jsx
Mezopotamya&apos;dan ilham alan kişisel ikinci el vitrin. Her ürün
tek tek seçilir — güven, şeffaflık ve emekle.
```

4. Kaydet → commit → push

---

## Yerel önizleme (canlıya göndermeden)

```powershell
cd C:\Users\MEPOTIA\Desktop\mepotia
npm run dev
```

Tarayıcıda: **http://localhost:3000**

---

## Sorun olursa

- Değişiklik görünmüyorsa: tarayıcıda **Ctrl + F5** (sert yenile)
- Canlı sitede yoksa: `git push` yaptın mı kontrol et
- Vercel deploy: [vercel.com](https://vercel.com) → mepotia → Deployments → **Ready** olmalı
