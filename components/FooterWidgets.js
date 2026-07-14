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
    const load = () => {
      fetch("/api/footer-widgets")
        .then((r) => r.json())
        .then(setData)
        .catch(() => setData(null));
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(load, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const items = [
    data?.usd ? `USD ${formatRate(data.usd)} ₺` : null,
    data?.eur ? `EUR ${formatRate(data.eur)} ₺` : null,
    data?.gold ? `Altın ${formatRate(data.gold)} ₺` : null,
    data?.weather
      ? `${data.weather.city} ${data.weather.temp}° · ${data.weather.label}`
      : null,
  ].filter(Boolean);

  const fallback = "Kurlar yükleniyor…";

  return (
    <div className="border-t border-bw-100 bg-bw-50/80 py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        <Coins className="h-3.5 w-3.5 shrink-0 text-bw-400" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:hidden">
            {(items.length ? items : [fallback]).map((text) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-bw-500"
              >
                {text.includes("°") ? <CloudSun className="h-3 w-3 text-bw-400" /> : null}
                {text}
              </span>
            ))}
          </div>
          <div className="hidden min-w-0 flex-1 overflow-hidden sm:block">
            <div
              className="review-marquee-track review-marquee-continuous gap-6"
              style={{ "--marquee-duration": "36s" }}
            >
              {(items.length ? [...items, ...items] : [fallback, fallback]).map((text, i) => (
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
    </div>
  );
}
