export const PRODUCT_TAXONOMY = {
  telefon: { brands: ["Apple (iPhone)", "Samsung", "Xiaomi", "Google", "Huawei", "OPPO", "vivo", "Diğer Android"], models: ["iPhone 16", "iPhone 15", "iPhone 14", "Galaxy S24", "Galaxy S23", "Galaxy A55", "Redmi Note 13", "Diğer"], specs: [["storage", "Depolama", ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"]], ["network", "Bağlantı", ["4G", "5G"]], ["battery", "Pil durumu", ["Mükemmel", "İyi", "Normal", "Değişti"]]] },
  bilgisayar: { brands: ["Apple", "ASUS", "Acer", "Dell", "HP", "Lenovo", "MSI", "Samsung", "Diğer"], models: ["MacBook Air", "MacBook Pro", "ThinkPad", "IdeaPad", "ROG", "Victus", "Inspiron", "Diğer"], specs: [["device_type", "Cihaz tipi", ["Laptop", "Masaüstü", "Monitör"]], ["processor", "İşlemci", ["Apple Silicon", "Intel Core i5", "Intel Core i7", "AMD Ryzen 5", "AMD Ryzen 7", "Diğer"]], ["memory", "RAM", ["8 GB", "16 GB", "32 GB", "64 GB"]], ["storage", "Depolama", ["256 GB SSD", "512 GB SSD", "1 TB SSD", "Diğer"]]] },
  tablet: { brands: ["Apple", "Samsung", "Xiaomi", "Lenovo", "Huawei", "Diğer"], models: ["iPad", "iPad Air", "iPad Pro", "Galaxy Tab S", "Galaxy Tab A", "Diğer"], specs: [["storage", "Depolama", ["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"]], ["network", "Bağlantı", ["Wi-Fi", "Wi-Fi + Cellular"]]] },
};

export function getProductTaxonomy(slug) {
  return PRODUCT_TAXONOMY[slug] || { brands: [], models: [], specs: [] };
}
