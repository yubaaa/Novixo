import { createFileRoute } from "@tanstack/react-router";
import { Star, Leaf, Shield, Clock, Sparkles, HeartPulse, Package } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderForm } from "@/components/OrderForm";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/constants";
import patchesMain from "@/assets/patches-main.jpg";
import patchesAlt from "@/assets/patches-alt.jpg";

export const Route = createFileRoute("/patches")({
  head: () => ({
    meta: [
      { title: "Patches Anti-Mycose (21 patches) — Novixo Store" },
      { name: "description", content: "Traitement doux et efficace des mycoses des ongles. 21 patches, application simple à domicile. Livraison gratuite en Algérie." },
      { property: "og:title", content: "Patches Anti-Mycose — Novixo Store" },
      { property: "og:description", content: "Traitement doux et efficace à domicile. Paiement à la livraison." },
      { property: "og:image", content: patchesMain },
    ],
  }),
  component: PatchesPage,
});

function PatchesPage() {
  const { t, lang } = useI18n();
  const p = PRODUCTS.patches;
  const fmt = (n: number) => `${n.toLocaleString(lang === "ar" ? "ar-DZ" : "fr-DZ")} DA`;
  const images = [patchesMain, patchesAlt];
  const [active, setActive] = useState(0);

  const specs = [
    { icon: Package, label: lang === "fr" ? "Contenu" : "المحتوى", value: lang === "fr" ? "21 patches par boîte" : "21 لاصقة في العلبة" },
    { icon: Leaf, label: lang === "fr" ? "Ingrédients" : "المكونات", value: lang === "fr" ? "Naturels & sans douleur" : "طبيعية وبدون ألم" },
    { icon: Clock, label: lang === "fr" ? "Durée" : "المدة", value: lang === "fr" ? "8h par application" : "8 ساعات لكل تطبيق" },
    { icon: HeartPulse, label: lang === "fr" ? "Action" : "الفعالية", value: lang === "fr" ? "Antifongique avancé" : "مضاد للفطريات" },
    { icon: Shield, label: lang === "fr" ? "Sécurité" : "الأمان", value: lang === "fr" ? "Testé dermatologiquement" : "اختبر طبياً" },
    { icon: Sparkles, label: lang === "fr" ? "Résultats" : "النتائج", value: lang === "fr" ? "Visibles en 2-4 semaines" : "خلال 2-4 أسابيع" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="mb-5 text-xs text-white/50">
          <span>{t("home")}</span> <span className="mx-1.5">/</span>
          <span className="text-white">{t("patches")}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-white p-4">
              <span className="absolute left-5 top-5 z-10 rounded-full bg-[color:var(--success)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{lang === "fr" ? "Bestseller" : "الأكثر مبيعاً"}</span>
              <span className="absolute right-5 top-5 z-10 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[color:var(--gold-foreground)]">-36% {t("off")}</span>
              <img src={images[active]} alt={p.name_fr} className="mx-auto aspect-square w-full max-w-md object-contain" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-xl border-2 bg-white p-1 transition ${i === active ? "border-gold" : "border-white/10 hover:border-white/30"}`}
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover rounded-lg" loading="lazy" />
                </button>
              ))}
            </div>

            <div className="glass mt-8 rounded-2xl p-6">
              <h3 className="mb-4 font-display text-lg text-white">{lang === "fr" ? "Caractéristiques" : "الخصائص"}</h3>
              <div className="space-y-3">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold ring-1 ring-gold/25">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white/45">{s.label}</div>
                      <div className="text-sm text-white">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="rounded-full bg-[color:var(--success)]/15 px-3 py-1 font-semibold text-[color:var(--success)] ring-1 ring-[color:var(--success)]/30">● {t("in_stock")}</span>
              <span className="text-white/55">180+ {t("reviews")}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl text-white md:text-4xl">{lang === "fr" ? p.name_fr : p.name_ar}</h1>
            <p className="mt-1 text-base" style={{ color: "var(--blue-accent)" }}>{lang === "fr" ? p.subtitle_fr : p.subtitle_ar}</p>

            <div className="mt-4 flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold" />)}
              <span className="ml-2 text-xs text-white/55">(180+ {t("reviews")})</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-gold">{fmt(p.price)}</span>
              <span className="text-base text-white/40 line-through">{fmt(p.old_price)}</span>
              <span className="rounded-md bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">-36%</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {lang === "fr"
                ? "Patches anti-mycose à base d'ingrédients naturels. Action ciblée pour traiter les mycoses des ongles en douceur, directement à la maison. Sans douleur, sans odeur, sans effets secondaires."
                : "لاصقات علاج فطريات الأظافر بمكونات طبيعية. علاج لطيف وفعّال في المنزل، بدون ألم ولا روائح ولا أعراض جانبية."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                lang === "fr" ? "21 patches inclus" : "21 لاصقة",
                lang === "fr" ? "Application simple" : "تطبيق سهل",
                lang === "fr" ? "Résultats prouvés" : "نتائج مؤكدة",
                lang === "fr" ? "100% naturel" : "100% طبيعي",
              ].map((f) => (
                <span key={f} className="rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs text-gold">✓ {f}</span>
              ))}
            </div>

            <div className="mt-8">
              <OrderForm product="patches" price={p.price} productName={lang === "fr" ? p.name_fr : p.name_ar} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
