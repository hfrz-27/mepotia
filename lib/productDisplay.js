export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value ?? "");
  return `${num.toLocaleString("tr-TR")} ₺`;
}

export function isSold(product) {
  return product?.status === "sold";
}

export function getPrimaryImage(product) {
  const images = product?.product_images;
  if (Array.isArray(images) && images.length) {
    const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
    return sorted[0].url;
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";
}
