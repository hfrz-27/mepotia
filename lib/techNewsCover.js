import sharp from "sharp";
import { createHash } from "crypto";

const WIDTH = 1200;
const HEIGHT = 675;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, maxLines = 2, lineLength = 42) {
  const words = title.trim().split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= lineLength) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
    if (lines.length >= maxLines) break;
  }

  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, lineLength - 1)}…`;
  }

  return lines.length ? lines : [title.slice(0, lineLength)];
}

export function coverStorageKey(title) {
  return createHash("sha256").update(title.trim().toLowerCase()).digest("hex").slice(0, 20);
}

function brandedOverlaySvg(title) {
  const lines = wrapTitle(title);
  const tspans = lines
    .map((line, i) => {
      const dy = i === 0 ? 0 : 44;
      return `<tspan x="56" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.05)"/>
      <stop offset="45%" stop-color="rgba(0,0,0,0.05)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.88)"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)"/>
  <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" rx="20" fill="none" stroke="rgba(201,169,98,0.45)" stroke-width="2"/>
  <text x="56" y="${HEIGHT - 150}" fill="rgba(255,255,255,0.55)" font-family="Georgia, serif" font-size="13" letter-spacing="5">MEPOTIA TEKNOLOJİ</text>
  <text x="56" y="${HEIGHT - 108}" fill="#ffffff" font-family="Georgia, serif" font-size="38" font-weight="700">${tspans}</text>
  <text x="56" y="${HEIGHT - 48}" fill="rgba(255,255,255,0.75)" font-family="Arial, sans-serif" font-size="16" letter-spacing="2">mepotia.com</text>
  <text x="${WIDTH - 56}" y="${HEIGHT - 48}" text-anchor="end" fill="#c9a962" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3">PREMIUM VİTRİN</text>
</svg>`;
}

export async function generateTechNewsCoverPng(title) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#09090b"/>
  ${brandedOverlaySvg(title).replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
</svg>`;

  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).resize(WIDTH, HEIGHT).toBuffer();
}

export async function generateTechNewsCoverWithPhoto(title, photoUrl) {
  if (!photoUrl) return generateTechNewsCoverPng(title);

  try {
    const res = await fetch(photoUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return generateTechNewsCoverPng(title);

    const input = Buffer.from(await res.arrayBuffer());
    const photo = await sharp(input)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
      .jpeg({ quality: 90 })
      .toBuffer();

    const overlay = Buffer.from(brandedOverlaySvg(title));

    return sharp(photo)
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 88 })
      .toBuffer();
  } catch {
    return generateTechNewsCoverPng(title);
  }
}
