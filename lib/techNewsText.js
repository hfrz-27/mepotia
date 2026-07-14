const SOURCE_PATTERNS = [
  /donanımhaber|donanimhaber|webtekno|shiftdelete\.?net?|shiftdelete/gi,
  /\bDH\b|\bWT\b/g,
  /dh'de|webtekno'da|webtekno\.com|donanimhaber\.com/gi,
];

const JUNK_LINE_PATTERNS = [
  /^(kaynak|fotoğraf|foto|editör|yazar|reklam|sponsor|ilgili|benzer|etiket|tag|yorum|paylaş|abone|bülten|video|galeri)/i,
  /devamını oku|tıklayın|haberin devamı|detaylar haberimizde|işte detaylar|haberi görüntülemek/i,
  /son güncelleme|güncelleme tarihi|yayınlanma tarihi|okunma sayısı|görüntülenme/i,
  /^(facebook|twitter|x\.com|instagram|whatsapp|telegram|linkedin|youtube)/i,
  /cookie|çerez|kvkk|gizlilik politikası/i,
  /^https?:\/\//i,
  /^\d+\s*(okunma|görüntülenme|dk okuma)/i,
  /^(•|\*|-)\s*\d/,
];

export function decodeHtml(text) {
  return (text || "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
}

export function looksLikeCode(text) {
  const value = (text || "").trim();
  if (value.length < 6) return false;

  if (/^(var|let|const|function|import|export|class|return|if\s*\(|for\s*\(|while\s*\(|switch\s*\()/i.test(value)) {
    return true;
  }
  if (/(\{\s*"@type"|"@context"|application\/ld\+json|wp\.|jquery|\$\()/i.test(value)) return true;
  if (/^(<[!?]?[a-z]|<\/|<!DOCTYPE|\<\?xml)/i.test(value)) return true;
  if (/document\.|window\.|console\.|getElementById|addEventListener|innerHTML/i.test(value)) return true;
  if (/^\s*[\[{<][\s\S]*[\]}>]\s*$/.test(value) && value.length > 40) return true;

  const symbols = (value.match(/[{}<>[\];=`$\\|]/g) || []).length;
  const letters = (value.match(/[\p{L}]/gu) || []).length;

  if (symbols >= 5 && letters / value.length < 0.55) return true;
  if (value.length > 35 && letters / value.length < 0.42) return true;

  return false;
}

export function cleanText(text, { isTitle = false } = {}) {
  let value = decodeHtml(text || "");

  value = value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<code[\s\S]*?<\/code>/gi, " ")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  value = value.replace(/`{1,3}[\s\S]*?`{1,3}/g, " ");
  value = value.replace(/https?:\/\/\S+/gi, " ");
  value = value.replace(/\bwww\.\S+/gi, " ");
  value = value.replace(/\{[^{}]{0,900}\}/g, " ");
  value = value.replace(/\[[^\[\]]{0,900}\]/g, (match) =>
    /["'`{}]|@type|@context|function/i.test(match) ? " " : match,
  );

  for (const pattern of SOURCE_PATTERNS) {
    value = value.replace(pattern, " ");
  }

  value = value
    .replace(/detaylar haberimizde\.?/gi, "")
    .replace(/işte detaylar:?/gi, "")
    .replace(/Son Güncelleme:\s*[\d.]+\s*\w+\s*\d+/gi, "")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .replace(/[""„«»]/g, '"')
    .replace(/[''‚‹›]/g, "'")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+([,.!?:;])/g, "$1")
    .replace(/([,.!?])\1+/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (isTitle) {
    value = value.replace(/\s*[-|–—:]\s*(DonanımHaber|Webtekno|DH|WT).*$/i, "").trim();
    value = value.replace(/\s*[-|–—:]+\s*$/g, "").trim();
  }

  return value;
}

export function cleanTitle(title) {
  const cleaned = cleanText(title, { isTitle: true });
  if (cleaned && cleaned.length >= 8 && !looksLikeCode(cleaned)) {
    return cleaned.slice(0, 220);
  }

  const fallback = cleanText(title)
    .replace(/[{}<>[\];=`$\\|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (fallback.length >= 8 && !looksLikeCode(fallback)) {
    return fallback.slice(0, 220);
  }

  return "Teknoloji Haberi";
}

export function isJunkParagraph(text) {
  const value = (text || "").trim();
  if (value.length < 35) return true;
  if (looksLikeCode(value)) return true;
  if (JUNK_LINE_PATTERNS.some((re) => re.test(value))) return true;
  if (SOURCE_PATTERNS.some((re) => re.test(value))) return true;
  if ((value.match(/https?:\/\//gi) || []).length >= 2) return true;
  if (/^[\d\s•\-–—|]+$/.test(value)) return true;
  return false;
}

export function stripHtml(html) {
  return cleanText(html);
}
