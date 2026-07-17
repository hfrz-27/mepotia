import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const faviconSource = readFileSync(join(publicDir, "mepotia-favicon-source.png"));

async function writeAppIcon() {
  const frame = Buffer.from(`
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" fill="#fffefa"/>
      <rect x="7" y="7" width="1010" height="1010" rx="192" fill="none" stroke="#111111" stroke-width="10"/>
    </svg>
  `);
  const wordmark = await sharp(join(publicDir, "Mepotia.png"))
    .resize({ width: 720, kernel: "lanczos3" })
    .png()
    .toBuffer();

  await sharp(frame)
    .composite([{ input: wordmark, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, "mepotia-app-icon.png"));
  console.log("OK mepotia-app-icon.png 1024");
}

async function writePng(name, size, source) {
  const out = join(publicDir, name);
  await sharp(source)
    .resize(size, size, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log("OK", name, size);
}

async function writeIco() {
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(faviconSource).resize(size, size, { fit: "cover" }).png().toBuffer(),
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

await writeAppIcon();
const appIconSource = readFileSync(join(publicDir, "mepotia-app-icon.png"));

await writePng("favicon.png", 192, faviconSource);
await writePng("favicon-48.png", 48, faviconSource);
await writePng("apple-touch-icon.png", 180, faviconSource);
await writePng("icon-512.png", 512, appIconSource);
await writeIco();
