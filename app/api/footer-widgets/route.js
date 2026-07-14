import { NextResponse } from "next/server";

export const revalidate = 300;

const WEATHER_LABELS = {
  0: "Açık",
  1: "Az bulutlu",
  2: "Parçalı bulutlu",
  3: "Kapalı",
  45: "Sisli",
  48: "Sisli",
  51: "Çisenti",
  61: "Yağmurlu",
  63: "Yağmurlu",
  65: "Şiddetli yağmur",
  71: "Karlı",
  80: "Sağanak",
  95: "Fırtına",
};

async function fetchJson(url, fallback = null) {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

export async function GET() {
  const [usdData, eurData, goldData, weatherData] = await Promise.all([
    fetchJson("https://api.frankfurter.app/latest?from=USD&to=TRY"),
    fetchJson("https://api.frankfurter.app/latest?from=EUR&to=TRY"),
    fetchJson("https://api.genelpara.com/embed/altin.json"),
    fetchJson(
      "https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.98&current=temperature_2m,weather_code&timezone=Europe%2FIstanbul",
    ),
  ]);

  const usd = usdData?.rates?.TRY ? Number(usdData.rates.TRY) : null;
  const eur = eurData?.rates?.TRY ? Number(eurData.rates.TRY) : null;

  let gold = null;
  if (goldData?.GA) {
    gold = Number(String(goldData.GA).replace(/\./g, "").replace(",", "."));
    if (Number.isNaN(gold)) gold = null;
  }

  const temp = weatherData?.current?.temperature_2m;
  const code = weatherData?.current?.weather_code;
  const weatherLabel = WEATHER_LABELS[code] || "Güncel";

  return NextResponse.json({
    usd,
    eur,
    gold,
    weather: Number.isFinite(temp)
      ? { temp: Math.round(temp), label: weatherLabel, city: "İstanbul" }
      : null,
    updatedAt: new Date().toISOString(),
  });
}
