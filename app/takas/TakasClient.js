"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Camera,
  CheckCircle2,
  Clock3,
  ImagePlus,
  MessageCircle,
  Repeat2,
  ShieldCheck,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import PremiumActionPage from "@/components/PremiumActionPage";

const OWNER_WA = "905059574122";

const INITIAL = {
  name: "",
  phone: "",
  offerTitle: "",
  offerBrand: "",
  offerModel: "",
  condition: "used",
  offerValue: "",
  wantTitle: "",
  city: "",
  description: "",
};

const field =
  "w-full rounded-2xl border border-bw-200 bg-[#fafafa] px-3.5 py-3 text-sm text-bw-950 outline-none transition placeholder:text-bw-400 focus:border-bw-900 focus:bg-white focus:ring-4 focus:ring-bw-950/8";
const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-bw-400";

export default function TakasClient() {
  const [form, setForm] = useState(INITIAL);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [savedToAdmin, setSavedToAdmin] = useState(false);

  const progress = useMemo(() => {
    let n = 0;
    if (form.name.trim()) n += 1;
    if (form.phone.trim()) n += 1;
    if (form.offerTitle.trim()) n += 1;
    if (form.wantTitle.trim()) n += 1;
    if (form.description.trim()) n += 1;
    if (files.length) n += 1;
    return Math.round((n / 6) * 100);
  }, [form, files.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFiles = (list) => {
    const next = Array.from(list || []).slice(0, 6);
    setFiles(next);
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return next.map((f) => URL.createObjectURL(f));
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      const copy = [...prev];
      if (copy[index]) URL.revokeObjectURL(copy[index]);
      copy.splice(index, 1);
      return copy;
    });
  };

  const buildMessage = (imageUrls = []) =>
    [
      "Mepotia — Takas teklifi",
      "",
      `İsim: ${form.name}`,
      `Telefon: ${form.phone}`,
      `Şehir: ${form.city || "-"}`,
      "",
      "Verdiğim cihaz:",
      `  ${form.offerTitle}`,
      `  Marka/Model: ${form.offerBrand || "-"} / ${form.offerModel || "-"}`,
      `  Durum: ${form.condition === "new" ? "Sıfır" : "İkinci el"}`,
      `  Tahmini değer: ${form.offerValue || "-"} ₺`,
      "",
      "İstediğim:",
      `  ${form.wantTitle}`,
      "",
      "Not:",
      form.description || "-",
      "",
      imageUrls.length
        ? `Fotoğraflar:\n${imageUrls.join("\n")}`
        : files.length
          ? `Fotoğraf sayısı: ${files.length}`
          : "Fotoğraf yok",
    ].join("\n");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim()) {
      setError("İsim ve telefon zorunlu.");
      return;
    }
    if (!form.offerTitle.trim() || !form.wantTitle.trim()) {
      setError("Verdiğin cihaz ve istediğin ürün zorunlu.");
      return;
    }
    if (!form.description.trim()) {
      setError("Kısa bir açıklama yaz.");
      return;
    }
    if (!files.length) {
      setError("Verdiğin cihaza ait en az 1 fotoğraf ekle.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const imageUrls = [];
    const folder = `trade-offers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let adminOk = false;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${folder}/${i + 1}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("sell-offers")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("sell-offers").getPublicUrl(path);
        if (pub?.publicUrl) imageUrls.push(pub.publicUrl);
      }

      const { error: insertError } = await supabase.from("sell_offers").insert([
        {
          contact_name: form.name.trim(),
          phone: form.phone.trim(),
          title: form.offerTitle.trim(),
          brand: form.offerBrand.trim() || null,
          model: form.offerModel.trim() || null,
          condition: form.condition,
          price: form.offerValue ? Number(form.offerValue) : null,
          city: form.city.trim() || null,
          description: [
            "TAKAS TEKLİFİ",
            `İstenen ürün: ${form.wantTitle.trim()}`,
            form.offerValue ? `Verilen cihaz tahmini değer: ${form.offerValue} ₺` : "",
            "",
            form.description.trim(),
          ]
            .filter(Boolean)
            .join("\n"),
          image_urls: imageUrls,
          status: "new",
        },
      ]);
      if (insertError) throw insertError;
      adminOk = true;
    } catch (err) {
      console.warn("takas kaydı:", err?.message || err);
    }

    const message = buildMessage(imageUrls);
    const wa = `https://wa.me/${OWNER_WA}?text=${encodeURIComponent(message)}`;
    setWaLink(wa);
    setSavedToAdmin(adminOk);
    setDone(true);
    setLoading(false);
    window.open(wa, "_blank", "noopener,noreferrer");
  };

  const shellProps = {
    accent: "sell",
    eyebrow: "Takas",
    title: "Cihazını takas et",
    description: "Verdiğin cihaz + istediğin model. Fark varsa nakit ile kapanır — adil ve net.",
    icon: Repeat2,
    highlights: [
      { icon: ArrowLeftRight, title: "Cihaz ↔ cihaz", text: "İki taraf da değerlenir." },
      { icon: Clock3, title: "Hızlı dönüş", text: "Uygun tekliflerde aynı gün yanıt." },
      { icon: ShieldCheck, title: "Şeffaf fark", text: "Denge net konuşulur." },
      { icon: Camera, title: "Fotoğraf şart", text: "1–6 net kare yeterli." },
    ],
    steps: ["İletişim bilgilerini yaz", "Verdiğin ve istediğin cihazı ekle", "Fotoğraf yükle, gönder"],
    sideLinks: [
      { href: "/ara", label: "Vitrinden seç" },
      { href: "/bana-sat", label: "Bana sat" },
      { href: "/fiyat-karsilastir", label: "Fiyat karşılaştır" },
    ],
  };

  if (done) {
    return (
      <PremiumActionPage
        {...shellProps}
        title="Takas teklifin alındı"
        description={
          savedToAdmin
            ? "Panel ve WhatsApp tarafına iletildi."
            : "WhatsApp ile iletildi. Panel kaydı atlanmış olabilir."
        }
      >
        <div className="py-2 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-bw-950 to-bw-800 text-white shadow-xl shadow-black/20">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-bw-950">Teşekkürler</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-bw-500">
            En kısa sürede takas dengesini ve farkı netleştiririz.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp ile gönder
          </a>
        </div>
      </PremiumActionPage>
    );
  }

  return (
    <PremiumActionPage {...shellProps}>
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold">
          <span className="text-bw-500">Form tamamlanma</span>
          <span className="tabular-nums text-bw-950">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-bw-100">
          <div
            className="h-full rounded-full bg-[#1d1d1f] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-7">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              01
            </span>
            <h2 className="text-sm font-semibold text-bw-950">İletişim</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="name">
                Ad soyad
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Adın soyadın"
                className={field}
                required
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="phone">
                WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="05xx xxx xx xx"
                className={field}
                required
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              02
            </span>
            <h2 className="text-sm font-semibold text-bw-950">Verdiğin cihaz</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className={labelCls} htmlFor="offerTitle">
                Ürün adı
              </label>
              <input
                id="offerTitle"
                name="offerTitle"
                value={form.offerTitle}
                onChange={onChange}
                placeholder="Örn. iPhone 13 128GB"
                className={field}
                required
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="offerBrand">
                  Marka
                </label>
                <input
                  id="offerBrand"
                  name="offerBrand"
                  value={form.offerBrand}
                  onChange={onChange}
                  placeholder="Apple, Samsung..."
                  className={field}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="offerModel">
                  Model
                </label>
                <input
                  id="offerModel"
                  name="offerModel"
                  value={form.offerModel}
                  onChange={onChange}
                  placeholder="13, S24..."
                  className={field}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="condition">
                  Durum
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={form.condition}
                  onChange={onChange}
                  className={field}
                >
                  <option value="used">İkinci el</option>
                  <option value="new">Sıfır</option>
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="offerValue">
                  Tahmini değer (₺)
                </label>
                <input
                  id="offerValue"
                  name="offerValue"
                  type="number"
                  inputMode="numeric"
                  value={form.offerValue}
                  onChange={onChange}
                  placeholder="Opsiyonel"
                  className={field}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              03
            </span>
            <h2 className="text-sm font-semibold text-bw-950">İstediğin ürün</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className={labelCls} htmlFor="wantTitle">
                Model / ilan
              </label>
              <input
                id="wantTitle"
                name="wantTitle"
                value={form.wantTitle}
                onChange={onChange}
                placeholder="Örn. iPhone 15 Pro veya vitrin ilanı"
                className={field}
                required
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="city">
                Şehir
              </label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="İstanbul..."
                className={field}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="description">
                Açıklama
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                rows={4}
                placeholder="Durum, kutu, aksesuar, fark beklentisi..."
                className={`${field} resize-none`}
                required
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-bw-950 text-[11px] font-bold text-white">
              04
            </span>
            <h2 className="text-sm font-semibold text-bw-950">Fotoğraflar</h2>
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-bw-300 bg-[#fafafa] px-4 py-8 transition hover:border-bw-500 hover:bg-white">
            <ImagePlus className="h-6 w-6 text-bw-400" />
            <span className="mt-2 text-sm font-medium text-bw-800">1–6 fotoğraf yükle</span>
            <span className="mt-0.5 text-xs text-bw-400">Verdiğin cihazın net kareleri</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>
          {previews.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {previews.map((src, i) => (
                <div key={src} className="relative h-16 w-16 overflow-hidden rounded-xl border border-bw-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute right-0.5 top-0.5 rounded-full bg-black/70 p-0.5 text-white"
                    aria-label="Fotoğrafı kaldır"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-bw-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bw-800 disabled:opacity-60"
        >
          <Repeat2 className="h-4 w-4" />
          {loading ? "Gönderiliyor..." : "Takas teklifini gönder"}
        </button>
      </form>
    </PremiumActionPage>
  );
}
