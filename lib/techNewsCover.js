import sharp from "sharp";
import { createHash } from "crypto";

const WIDTH = 1200;
const HEIGHT = 675;

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, maxLines = 3, lineLength = 38) {
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

export async function generateTechNewsCoverPng(title) {
  const lines = wrapTitle(title);
  const lineY = lines.length === 1 ? 300 : lines.length === 2 ? 270 : 250;
  const tspans = lines
    .map((line, i) => {
      const dy = i === 0 ? 0 : 52;
      return `<tspan x="600" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111113"/>
      <stop offset="55%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#18181b"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="15%" r="45%">
      <stop offset="0%" stop-color="rgba(201,169,98,0.18)"/>
      <stop offset="100%" stop-color="rgba(201,169,98,0)"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" rx="24" fill="none" stroke="rgba(201,169,98,0.35)" stroke-width="2"/>
  <text x="72" y="78" fill="rgba(255,255,255,0.45)" font-family="Georgia, serif" font-size="14" letter-spacing="6">MEPOTIA TEKNOLOJİ</text>
  <text x="72" y="108" fill="#ffffff" font-family="Georgia, serif" font-size="34" font-weight="700" letter-spacing="8">MEPOTIA</text>
  <rect x="72" y="128" width="120" height="3" fill="#c9a962" opacity="0.85"/>
  <text x="600" y="${lineY}" text-anchor="middle" fill="#ffffff" font-family="Georgia, serif" font-size="46" font-weight="700" letter-spacing="1">${tspans}</text>
  <text x="72" y="${HEIGHT - 56}" fill="rgba(255,255,255,0.55)" font-family="Arial, sans-serif" font-size="18" letter-spacing="2">mepotia.com · Güncel Teknoloji</text>
  <text x="${WIDTH - 72}" y="${HEIGHT - 56}" text-anchor="end" fill="rgba(201,169,98,0.9)" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="3">PREMIUM VİTRİN</text>
</svg>`;

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).resize(WIDTH, HEIGHT).toBuffer();
}
