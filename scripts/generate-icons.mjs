import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

function iconSvg(size) {
  const r = Math.round(size * 0.22);
  const stroke = Math.max(1, size * 0.008);
  const gold = "#c9a962";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111113"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${r}" fill="url(#bg)"/>
  <rect x="${stroke * 2}" y="${stroke * 2}" width="${size - stroke * 4}" height="${size - stroke * 4}" rx="${r - stroke * 2}" fill="none" stroke="${gold}" stroke-width="${stroke * 1.5}" opacity="0.55"/>
  <g transform="translate(${size / 2}, ${size * 0.52})">
    <path d="M -${size * 0.19} -${size * 0.17} L -${size * 0.19} ${size * 0.17} L -${size * 0.07} ${size * 0.0} L 0 ${size * 0.17} L ${size * 0.07} ${size * 0.0} L ${size * 0.19} ${size * 0.17} L ${size * 0.19} -${size * 0.17} L ${size * 0.07} -${size * 0.17} L 0 ${size * 0.02} L -${size * 0.07} -${size * 0.17} Z" fill="#ffffff"/>
    <circle cx="0" cy="${size * 0.11}" r="${size * 0.055}" fill="none" stroke="${gold}" stroke-width="${Math.max(1.5, size * 0.012)}"/>
    <line x1="0" y1="${size * 0.055}" x2="0" y2="${size * 0.165}" stroke="${gold}" stroke-width="${Math.max(1, size * 0.008)}"/>
    <line x1="${size * 0.048}" y1="${size * 0.083}" x2="-${size * 0.048}" y2="${size * 0.137}" stroke="${gold}" stroke-width="${Math.max(1, size * 0.008)}"/>
    <line x1="-${size * 0.048}" y1="${size * 0.083}" x2="${size * 0.048}" y2="${size * 0.137}" stroke="${gold}" stroke-width="${Math.max(1, size * 0.008)}"/>
    <line x1="${size * 0.039}" y1="${size * 0.11}" x2="-${size * 0.039}" y2="${size * 0.11}" stroke="${gold}" stroke-width="${Math.max(1, size * 0.008)}"/>
  </g>
</svg>`;
}

async function writePng(name, size) {
  const svg = iconSvg(size);
  const out = join(publicDir, name);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).resize(size, size).toFile(out);
  console.log("OK", name, size);
}

async function writeIco() {
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(Buffer.from(iconSvg(size))).png().resize(size, size).toBuffer(),
    ),
  );

  const out = join(publicDir, "favicon.ico");
  const ico = buildIco(pngBuffers, sizes);
  writeFileSync(out, ico);
  console.log("OK favicon.ico", sizes.join(","));
}

function buildIco(buffers, sizes) {
  const count = buffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const parts = buffers.map((buf, i) => {
    const size = sizes[i];
    const part = { size, buf, offset };
    offset += buf.length;
    return part;
  });

  const total = offset;
  const out = Buffer.alloc(total);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  parts.forEach((part, i) => {
    const base = 6 + i * 16;
    out.writeUInt8(part.size === 256 ? 0 : part.size, base);
    out.writeUInt8(part.size === 256 ? 0 : part.size, base + 1);
    out.writeUInt8(0, base + 2);
    out.writeUInt8(0, base + 3);
    out.writeUInt16LE(1, base + 4);
    out.writeUInt16LE(32, base + 6);
    out.writeUInt32LE(part.buf.length, base + 8);
    out.writeUInt32LE(part.offset, base + 12);
  });

  parts.forEach((part) => part.buf.copy(out, part.offset));
  return out;
}

await writePng("favicon.png", 192);
await writePng("favicon-48.png", 48);
await writePng("apple-touch-icon.png", 180);
await writePng("icon-512.png", 512);
await writeIco();
