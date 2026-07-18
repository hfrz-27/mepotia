# Mepotia — Design Brief

**Project:** Mepotia (second-hand tech marketplace)  
**Site:** https://mepotia.com  
**Stack:** Next.js web app (implementation exists — design for visual system & polish)  
**Owner:** Mepotia  
**Goal:** One coherent, premium, trustworthy visual language across home + key flows.

---

## 1. Brand

| Item | Direction |
|------|-----------|
| Name | **MEPOTIA** |
| Positioning | Trusted second-hand tech storefront — transparent prices, real photos, honest trade |
| Tone | Calm, premium, clear — not flashy marketplace chaos |
| Logo | Wordmark (black on light; inverted on dark) |
| Type (current) | Outfit (UI/body) + Cinzel (display/headings) — open to refined alternatives if system is complete |
| Color base | Black / white / warm grays |
| Accent | Optional champagne / gold for premium moments (badges, CTAs) — use sparingly |
| Principles | Trust · transparency · ease · “buy with confidence” |

**References (mood, not copy):** Apple Store editorial cleanliness + modern marketplace clarity (e.g. refined product cards, strong hierarchy). Avoid generic “crypto dark UI” or cluttered classifieds.

---

## 2. Scope

### In scope
1. **Global shell** — Navbar, footer, WhatsApp FAB  
2. **Homepage** — full vertical scroll (all sections below)  
3. **Product card** — all states  
4. **Product detail (PDP)**  
5. **Compare tools** — Price + Specs  
6. **Forms** — Sell to us + Request product  
7. **Category / Search** listing layouts  
8. **News** home module + news list/detail (high level)  

### Out of scope (unless agreed)
- Admin panel deep redesign  
- Full illustration system / 3D renders  
- Motion design package (light micro-interactions OK in Figma)

### Deliverables
- Figma file (components + auto-layout)  
- Desktop **1440** + Mobile **390**  
- Design tokens: color, type scale, spacing, radius, shadow  
- Component library: buttons, inputs, cards, nav, badges  
- Homepage + listed key screens  
- Short design notes (how to use gold, cards, sections)

---

## 3. Homepage structure (top → bottom)

Design every block as a system that can stack without visual conflict.

| # | Section | Purpose | Content / behavior |
|---|---------|---------|-------------------|
| 1 | **Hero** | Brand entry + search | Background video or image carousel; logo wordmark; short value line; **search**; CTAs: Price compare, View storefront, News; trust shortcuts (Guide / Price / Trade); optional review strip |
| 2 | **Mobile review strip** | Social proof | Mobile-only thin marquee of reviews |
| 3 | **News (“Nexus desk”)** | Editorial tech news | Interactive headline stage + side “signal list” (hover changes headline); auto-advance optional; link to full archive |
| 4 | **Categories** | Navigate by category | **Cards only — no section title block**; horizontal scroll; each card is a **category cover** (not a product listing); **tap opens category page** |
| 5 | **Featured products** | Highlighted / opportunity items | Section header + horizontal product carousel + “View all” |
| 6 | **Compare gate** | Two tools | Two clear paths: **Price compare** · **Spec compare**; must fit page language (simple, premium, not gimmicky) |
| 7 | **Storefront (Vitrin)** | Latest listings | Header + product carousel + “See all” |
| 8 | **Sell / Request** | User actions | Two cards: **Sell to us** · **Request a product** |
| 9 | **Value band** | Trust messages | Horizontal chips/marquee (trust, fair price, transparent, etc.) |
| 10 | **Popular** | Most viewed | Product carousel + link to popular list |
| 11 | **Story + reviews** | Brand story + UGC | About blurb (Mesopotamia-inspired trust); pillars; write review form; review list |

**Global on page:** sticky navbar, WhatsApp help button (bottom corner; hidden on category pages).

---

## 4. Product card (critical component)

Used on home carousels, search, category, related products.

### Content
- Image  
- Badges: Premium · Featured · Demo · Discount · Sold  
- Price ( + strikethrough original if discount)  
- Title (2 lines max)  
- City · view count  
- Footer action: **Price compare**

### States to design
Default · Hover · Premium · Featured · Discount · Sold · Demo · Loading (optional)

### Feel
Clean, trustworthy, slightly luxury — consistent with category/news premium moments without copying their layout 1:1.

---

## 5. Key screens beyond home

| Screen | Must include |
|--------|----------------|
| **Search `/ara`** | Query, filters, product grid/list, empty state |
| **Category `/kategori/[slug]`** | Category identity, filters, products, optional guide entry |
| **PDP `/urun/[id]`** | Gallery, title, price, city, description, specs if any, offer/contact, market compare block, buying guide, related items |
| **Price compare `/fiyat-karsilastir`** | Search/input, storefront vs market prices, clear CTA |
| **Spec compare `/urun-karsilastir`** | 2–3 products, comparison table |
| **Sell `/bana-sat`** | Hero + multi-step or single form (model, condition, photos, contact) |
| **Request `/urun-iste`** | Hero + form (model, budget, notes) |
| **Guides `/rehber`** | List + detail article layout |
| **News `/teknoloji`** | List + article detail |
| **Static** | About, contact, legal (privacy, KVKK, terms) |
| **Auth `/giris`** | Simple, trustworthy login |

---

## 6. Categories (home module notes)

- **No big section headline** under news (“Kategoriler. Saf premium.” removed by product decision).  
- Only **horizontal premium cover cards**.  
- Cover = category mood image + icon + short pitch (not product SKUs).  
- Click → category page.  
- Categories: Phone, Computer, Tablet, Headphones, Case, Charging, Accessory, Watch, Gaming.

---

## 7. News (home module notes)

- Distinct from category cards (avoid same “luxury tilt card” pattern).  
- Preferred direction: **editorial / interactive desk** — big headline visual + selectable list.  
- Calm paper/cream or white field; strong typography; restrained gold.

---

## 8. Compare gate (home module notes)

- Must feel **native to the page** (same shell as product sections / sell-request rail).  
- Two equal, obvious actions: Price · Specs.  
- Avoid gimmicky dark “VS theater” unless it stays simple and on-brand.  
- Priority: clarity > novelty.

---

## 9. UX requirements

- Mobile-first touch carousels with clear affordance (arrows desktop).  
- Accessible contrast (WCAG AA target).  
- Fast-looking UI: limited heavy blur stacks; intentional motion only.  
- Turkish UI copy (designer can use placeholder TR text from this brief).  
- Empty & error states for: no products, no news, form success/error.

---

## 10. Figma frame list (checklist)

### Foundations
- [ ] Cover / project index  
- [ ] Design tokens  
- [ ] Type styles  
- [ ] Color styles  
- [ ] Grid & spacing  
- [ ] Icons (style only if custom)  

### Components
- [ ] Buttons (primary / secondary / ghost / gold)  
- [ ] Inputs, textarea, select  
- [ ] Badges / pills  
- [ ] Navbar (default + scrolled + menu open)  
- [ ] Footer (desktop + mobile accordion)  
- [ ] Product card (all states)  
- [ ] Section header  
- [ ] Carousel / rail + arrows  
- [ ] WhatsApp FAB  

### Homepage
- [ ] Home desktop 1440  
- [ ] Home mobile 390  
- [ ] Optional: tablet 768  

### Flows
- [ ] Search  
- [ ] Category  
- [ ] PDP  
- [ ] Price compare  
- [ ] Spec compare  
- [ ] Sell form  
- [ ] Request form  
- [ ] News list + article  
- [ ] Guide list + article  
- [ ] Login  

---

## 11. Success criteria

Designer delivers a system where:
1. Homepage sections feel **one brand**, not mixed templates.  
2. Product cards look **premium and trustworthy**.  
3. News ≠ category module (different layout language).  
4. Compare tools are **instantly understandable**.  
5. Mobile scroll is **comfortable**, not sparse or cramped.  
6. Dev can implement with **clear components** (no one-off chaos).

---

## 12. Contact / next steps

1. Align on moodboard (2–3 directions max).  
2. Foundations + product card + home first.  
3. Then PDP + compare + forms.  
4. Handoff with tokens + component notes.

---

## Appendix A — Turkish copy snippets (home)

- Hero value: *Özenle seçilmiş ikinci el teknoloji — dürüst ve şeffaf vitrin.*  
- Compare: *Fiyat mı, özellik mi?* / *Almadan önce netleştir.*  
- Featured: *Yeni sahibini bekleyenler*  
- Storefront: *Özenle seçilmiş ürünler*  
- Sell: *Bana sat* · Request: *Ürün iste*  
- Story: *Geçmişten Gelen Güven* · pillars: *Kökler · Dürüstlük · Özen*

## Appendix B — Routes (for labeling frames)

`/`, `/ara`, `/kategori/[slug]`, `/urun/[id]`, `/fiyat-karsilastir`, `/urun-karsilastir`, `/bana-sat`, `/urun-iste`, `/rehber`, `/rehber/[slug]`, `/teknoloji`, `/teknoloji/[id]`, `/hakkimizda`, `/iletisim`, `/giris`, legal pages.

---

*End of brief — Mepotia Design Brief v1*
