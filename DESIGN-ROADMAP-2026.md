# Mepotia 2026 — Tasarım & Ürün Yol Haritası

> **Bu site marketplace değil.**  
> **Premium vitrin + güven hissi.**  
> Sade · temiz · güven veren · Apple seviyesinde boşluk.

---

## Teknoloji’ye çeviri (giyim brief’i değil)

| Genel fikir | Mepotia’da karşılığı |
|-------------|----------------------|
| Model + ürün hero | Vitrin ürün + temiz foto hero |
| Kombin önerisi AI | “Benzer ürünler / Bu modele bakanlar” + rehber |
| Reel ürün tanıtımı | Kısa hero video / ürün videosu (ileride) |
| Sepet animasyonu | Vitrinde sepet yok → **WhatsApp / teklif** sticky CTA |
| Son 3 ürün kaldı | Dikkat: sahte stok güveni bozar → sadece gerçek stokta |

---

## Öncelik matrisi

### P0 — Şimdi (sistem + hissiyat)
| # | Madde | Not |
|---|--------|-----|
| 1 | Global design tokens | ink / mist / gold, radius 12–20, soft shadow |
| 2 | Sticky blur navbar | Apple sakinliği |
| 3 | Hero: full width + search + 2 CTA | Kalite ilk 3 sn |
| 4 | Product card tek sistem | Hover zoom, soft lift |
| 5 | Carousel (ok + swipe) | Featured / vitrin / popüler |
| 6 | News: sol manşet + sağ liste | Kategori kartından farklı |
| 7 | Compare: 2 sade kart | Fiyat · Özellik |
| 8 | PDP: sol galeri / sağ bilgi | Büyük butonlar |
| 9 | Mobil: sticky iletişim barı | Tek parmak CTA |
| 10 | Micro: soft bounce buton | Premium dokunuş |

### P1 — Sonraki sprint
| # | Madde |
|---|--------|
| 11 | Bento grid (home “senin için”) |
| 12 | Scroll reveal (hafif, yavaş) |
| 13 | Dark / light toggle (isteğe bağlı) |
| 14 | Markalı loading / logo animasyonu |
| 15 | Alt mobil menü (Instagram tarzı) |
| 16 | PDP zoom / kaliteli galeri iyileştirme |

### P2 — İleri (AI & wow)
| # | Madde |
|---|--------|
| 17 | “Senin için seçtik” kişiselleştirme |
| 18 | Chat: “Hangi telefonu almalıyım?” |
| 19 | Sesli arama |
| 20 | 360° ürün / video anlatım |
| 21 | Gamification (puan, rozet) — dikkat: ucuz his riski |

### Yasak / kaçın
- Sahibinden kalabalığı  
- Çok renk, çok yazı  
- Sahte countdown / sahte “son 3 ürün”  
- Her bölüm farklı template  

---

## Hero varyasyonları (tasarım keşfi)

| Stil | Ne zaman |
|------|----------|
| **Ultra minimal** | Varsayılan Mepotia (boşluk + tipografi) |
| **Video background** | Admin’de hero video doluysa |
| Glassmorphism | Sadece arama / üst bar katmanında çok az |
| Neon / cyberpunk | **Hayır** (marka güveni bozar) |

Opsiyonel: fareye göre hafif 3D (kategori/ürün kartında, abartısız).

---

## Layout sistemleri

| Sistem | Kullanım |
|--------|----------|
| Yatay carousel | Ürün şeritleri (şu an) |
| Magazin split | Haber masası (şu an) |
| Cover kart rail | Kategoriler (şu an) |
| Bento | P1 “senin için” bandı |
| Asimetrik grid | İleride featured zone |

---

## Micro-interactions (kral detay)

| Etkileşim | Mepotia |
|-----------|---------|
| Hover ürün büyür | ✅ Product card |
| Soft bounce buton | ✅ `pv-btn` |
| Smooth transition | CSS 0.4–0.7s |
| Sepete uçuş | Yok (sepet yok) → sticky WA pulse |

---

## Mobil

- Tek kolon  
- Büyük CTA  
- Swipe carousel  
- Alt sticky bar (PDP)  
- (P1) Bottom tab: Ana · Ara · Kategori · WA · Hesap  

---

## Premium his formülü

```
az renk + bol boşluk + yavaş animasyon + büyük tipografi + soft gölge
= güven
```

---

## Yazılımcıya tek cümle (talimat)

> Bu site marketplace değil, premium vitrin olacak.  
> Apple seviyesinde sade ve güven veren tasarım.  
> Component bazlı tek sistem: kart, navbar, hero, carousel.  
> Her section aynı dil; farklı template yok.

---

*Mepotia Design Roadmap 2026 · v1*
