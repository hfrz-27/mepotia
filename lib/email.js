/** Yaygın e-posta yazım hatalarını düzelt / uyar */
const DOMAIN_FIXES = {
  "gmail.coom": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.cmo": "gmail.com",
  "gmai.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "hotmail.coom": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlook.coom": "outlook.com",
  "outlook.con": "outlook.com",
  "yahoo.coom": "yahoo.com",
  "icloud.coom": "icloud.com",
};

export function normalizeEmail(raw) {
  return String(raw || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

export function fixEmailTypos(email) {
  const normalized = normalizeEmail(email);
  const at = normalized.lastIndexOf("@");
  if (at < 1) return { email: normalized, fixed: false, suggestion: null };

  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);
  const fixedDomain = DOMAIN_FIXES[domain];

  if (fixedDomain) {
    const suggestion = `${local}@${fixedDomain}`;
    return { email: suggestion, fixed: true, suggestion };
  }

  return { email: normalized, fixed: false, suggestion: null };
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(normalizeEmail(email));
}
