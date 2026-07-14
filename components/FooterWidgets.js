"use client";

import { useEffect, useState } from "react";
import { CloudSun, Coins } from "lucide-react";

function formatRate(value) {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export default function FooterWidgets() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/footer-widgets")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const items = [
    data?.usd ? `USD ${formatRate(data.usd)} ₺` : null,
    data?.eur ? `EUR ${formatRate(data.eur)} ₺` : null,
    data?.gold ? `Altın ${formatRate(data.gold)} ₺` : null,
    data?.weather
      ? `${data.weather.city} ${data.weather.temp}° · ${data.weather.label}`
      : null,
  ].filter(Boolean);

  const loop = items.length ? [...items, ...items] : ["Kurlar yükleniyor…", "Kurlar yükleniyor…"];

  return (
    <div className="border-t border-bw-100 bg-bw-50/80 py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Coins className="h-3.5 w-3.5 shrink-0 text-bw-400" />
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="review-marquee-track review-marquee-continuous gap-6"
            style={{ "--marquee-duration": "28s" }}
          >
            {loop.map((text, i) => (
              <span
                key={`${text}-${i}`}
                className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-medium tracking-wide text-bw-500"
              >
                {text.includes("°") ? <CloudSun className="h-3 w-3 text-bw-400" /> : null}
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
