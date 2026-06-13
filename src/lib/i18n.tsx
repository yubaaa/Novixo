import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar";

type Dict = Record<string, { fr: string; ar: string }>;

export const T: Dict = {
  home: { fr: "Accueil", ar: "الرئيسية" },
  shop: { fr: "Boutique", ar: "المتجر" },
  charger: { fr: "Chargeur 140W", ar: "الشاحن" },
  patches: { fr: "Patches Anti-Mycose", ar: "اللاصقات" },
  admin: { fr: "Admin", ar: "إدارة" },
  shop_now: { fr: "Commander", ar: "اطلب الآن" },
  shop_now_long: { fr: "Commander maintenant", ar: "اطلب الآن" },
  discover: { fr: "Découvrir", ar: "اكتشف" },
  new_arrival: { fr: "Nouveauté", ar: "وصل حديثاً" },
  free_shipping: { fr: "Livraison gratuite", ar: "توصيل مجاني" },
  cod: { fr: "Paiement à la livraison", ar: "الدفع عند الاستلام" },
  secure_payment: { fr: "Paiement sécurisé", ar: "دفع آمن" },
  support_24: { fr: "Support 24/7", ar: "دعم 24/7" },
  easy_returns: { fr: "Retours faciles", ar: "إرجاع سهل" },
  place_order: { fr: "Passer votre commande", ar: "أكمل طلبك" },
  cod_note: { fr: "Paiement à la livraison · Livraison gratuite · Confirmation sous 24h", ar: "الدفع عند الاستلام · توصيل مجاني · تأكيد خلال 24 ساعة" },
  first_name: { fr: "Prénom", ar: "الاسم" },
  last_name: { fr: "Nom", ar: "اللقب" },
  phone: { fr: "Numéro de téléphone", ar: "رقم الهاتف" },
  wilaya: { fr: "Wilaya", ar: "الولاية" },
  address: { fr: "Adresse complète", ar: "العنوان الكامل" },
  notes: { fr: "Notes (optionnel)", ar: "ملاحظات (اختياري)" },
  select_wilaya: { fr: "Sélectionnez votre wilaya", ar: "اختر ولايتك" },
  quantity: { fr: "Quantité", ar: "الكمية" },
  total: { fr: "Total", ar: "المجموع" },
  required: { fr: "Veuillez remplir tous les champs requis.", ar: "يرجى ملء جميع الحقول المطلوبة." },
  server_error: { fr: "Une erreur est survenue. Réessayez.", ar: "حدث خطأ، أعد المحاولة." },
  processing: { fr: "Traitement…", ar: "جارٍ المعالجة…" },
  order_now: { fr: "Commander maintenant", ar: "اطلب الآن" },
  order_confirmed: { fr: "Commande confirmée !", ar: "تم تأكيد طلبك!" },
  thanks: { fr: "Merci", ar: "شكراً لك" },
  contact_24h: { fr: "Nous vous contacterons sous 24h au", ar: "سنتصل بك خلال 24 ساعة على" },
  back_store: { fr: "← Retour à la boutique", ar: "العودة إلى المتجر →" },
  in_stock: { fr: "En stock", ar: "متوفر" },
  reviews: { fr: "avis vérifiés", ar: "تقييم موثق" },
  customer_says: { fr: "Ce que disent nos clients", ar: "ما يقوله عملاؤنا" },
  off: { fr: "DE RÉDUCTION", ar: "خصم" },
  why_choose: { fr: "Pourquoi nous choisir", ar: "لماذا تختارنا" },
  best_sellers: { fr: "Best Sellers", ar: "الأكثر مبيعاً" },
  view_product: { fr: "Voir le produit", ar: "عرض المنتج" },
  hero_kicker: { fr: "Discover What's Next", ar: "اكتشف ما هو قادم" },
  hero_title: { fr: "Tech intelligente pour une vie plus simple.", ar: "تقنية ذكية لحياة أبسط." },
  hero_sub: { fr: "Sélection premium d'accessoires connectés et de solutions bien-être livrés à travers toute l'Algérie.", ar: "تشكيلة مميزة من الإكسسوارات الذكية ومنتجات العناية، توصيل لكل الجزائر." },
  footer_tagline: { fr: "Novixo Store — Discover What's Next.", ar: "نوفيكسو ستور — اكتشف الجديد." },
  copyright: { fr: "© 2026 Novixo Store. Tous droits réservés.", ar: "© 2026 نوفيكسو ستور. جميع الحقوق محفوظة." },
  add_to_cart: { fr: "Commander", ar: "اطلب" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof T) => string;
  dir: "ltr" | "rtl";
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("novixo_lang") as Lang)) || "fr";
    setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("novixo_lang", l);
  };

  const t = (key: keyof typeof T) => T[key][lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <Ctx.Provider value={{ lang, setLang, t, dir }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
