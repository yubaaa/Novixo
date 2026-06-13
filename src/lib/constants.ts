export const WILAYAS = [
  "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida","Bouira",
  "Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel","Sétif","Saïda",
  "Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara",
  "Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt",
  "El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane",
];

export const PRODUCTS = {
  charger: {
    id: "charger",
    slug: "/charger",
    name_fr: "Chargeur Intelligent 140W",
    name_ar: "شاحن تلقائي ذكي 140 واط",
    subtitle_fr: "Compact. Puissant. Universel.",
    subtitle_ar: "صغير الحجم، قوي الأداء",
    price: 4900, // DZD
    old_price: 7900,
    currency: "DA",
  },
  patches: {
    id: "patches",
    slug: "/patches",
    name_fr: "Patches Anti-Mycose (21 patches)",
    name_ar: "لاصقات علاج فطريات الأظافر (21 لاصقة)",
    subtitle_fr: "Traitement doux et efficace, à domicile.",
    subtitle_ar: "علاج لطيف وفعّال في المنزل",
    price: 2900,
    old_price: 4500,
    currency: "DA",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

export const ADMIN_TOKEN_KEY = "novixo_admin_token";
