import {
  ImageIcon,
  LayoutGrid,
  MessageSquare,
  Newspaper,
  Search,
  ShoppingBag,
} from "lucide-react";

export const ADMIN_TABS = [
  {
    group: "Gelen kutusu",
    items: [
      {
        id: "offers",
        label: "Satış teklifleri",
        hint: "Bana sat formu",
        icon: ShoppingBag,
        badgeKey: "offersNew",
        totalKey: "offersAll",
      },
      {
        id: "requests",
        label: "Ürün istekleri",
        hint: "Ürün iste formu",
        icon: Search,
        badgeKey: "requestsNew",
        totalKey: "requestsAll",
      },
      {
        id: "feedback",
        label: "Şikayet & öneri",
        hint: "Footer anketi",
        icon: MessageSquare,
        badgeKey: "feedbackNew",
        totalKey: "feedbackAll",
      },
    ],
  },
  {
    group: "Vitrin",
    items: [
      {
        id: "products",
        label: "İlanlar",
        hint: "Vitrin düzenleme",
        icon: LayoutGrid,
        badgeKey: null,
        totalKey: "products",
      },
      {
        id: "categories",
        label: "Kategoriler",
        hint: "Ürün kategorileri",
        icon: LayoutGrid,
        badgeKey: null,
        totalKey: null,
      },
    ],
  },
  {
    group: "İçerik",
    items: [
      {
        id: "tech",
        label: "Teknoloji yazıları",
        hint: "Haber yönetimi",
        icon: Newspaper,
        badgeKey: null,
        totalKey: null,
      },
      {
        id: "site",
        label: "Hero & medya",
        hint: "Ana sayfa ve fiyat karşılaştır",
        icon: ImageIcon,
        badgeKey: null,
        totalKey: null,
      },
    ],
  },
];

export const ADMIN_TAB_IDS = ADMIN_TABS.flatMap((group) =>
  group.items.map((item) => item.id),
);

export function findAdminTab(tabId) {
  for (const group of ADMIN_TABS) {
    const item = group.items.find((entry) => entry.id === tabId);
    if (item) return { ...item, group: group.group };
  }
  return null;
}
