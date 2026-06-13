import { createFileRoute } from "@tanstack/react-router";
import { Zap, Shield, Smartphone, Package, Sparkles, Award, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderForm } from "@/components/OrderForm";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/constants";
import chargerMain from "@/assets/charger-main.jpeg";
import chargerAlt from "@/assets/charger-alt.jpeg";

export const Route = createFileRoute("/charger")({
  head: () => ({
    meta: [
      { title: "Chargeur Intelligent 140W — Novixo Store" },
      {
        name: "description",
        content:
          "Chargeur compact 140W ultra-rapide. Compatible smartphones, tablettes. Livraison gratuite en Algérie, paiement à la livraison.",
      },
      { property: "og:title", content: "Chargeur Intelligent 140W — Novixo Store" },
      {
        property: "og:description",
        content: "Compact, puissant, universel. Livraison gratuite + paiement à la livraison.",
      },
      { property: "og:image", content: chargerMain },
    ],
  }),
  component: ChargerPage,
});

function ChargerPage() {
  const { t, lang } = useI18n();
  const p = PRODUCTS.charger;
  const fmt = (n: number) =>
    `${n.toLocaleString(lang === "ar" ? "ar-DZ" : "fr-DZ")} DA`;
  const images = [chargerMain, chargerAlt];
  const [active, setActive] = useState(0);

  const isFr = lang === "fr";

  const specs = [
    {
      icon: Zap,
      label: isFr ? "Puissance" : "القدرة",
      value: "140W Super Fast",
    },
    {
      icon: Smartphone,
      label: isFr ? "Compatibilité" : "التوافق",
      value: isFr
        ? "Smartphones, Tablettes, Laptops"
        : "هواتف، أجهزة لوحية، حواسيب",
    },
    {
      icon: Shield,
      label: isFr ? "Protection" : "الحماية",
      value: isFr ? "Système intelligent batterie" : "نظام حماية ذكي",
    },
    {
      icon: Package,
      label: isFr ? "Dans la boîte" : "محتويات العلبة",
      value: isFr ? "1× Chargeur + Câble + Manuel" : "شاحن + كابل + دليل",
    },
    {
      icon: Award,
      label: isFr ? "Qualité" : "الجودة",
      value: isFr ? "Aluminium premium" : "ألمنيوم فاخر",
    },
    {
      icon: Sparkles,
      label: isFr ? "Poids" : "الوزن",
      value: "85g",
    },
  ];

  const badges = [
    isFr ? "140W Ultra-rapide" : "140 واط فائق",
    isFr ? "Compatibilité universelle" : "توافق عام",
    isFr ? "Puce intelligente" : "شريحة ذكية",
    isFr ? "Finition aluminium" : "ألمنيوم",
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--navy-deep, #0b0f1a)" }}>
      <Header />

      {/* ── Page shell ── */}
      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">

        {/* Breadcrumb */}
        <nav
          className="mb-8 flex items-center gap-1.5 text-xs"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          <span>{t("home")}</span>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{t("charger")}</span>
        </nav>

        {/* ── Two-column layout ── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex flex-col gap-8">

            {/* Hero image */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Pill labels — minimal, top strip */}
              <div className="flex items-center justify-between px-5 pt-5">
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {t("new_arrival")}
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
                  style={{
                    background: "rgba(var(--gold-rgb,212,175,55),0.12)",
                    color: "var(--gold, #d4af37)",
                  }}
                >
                  −38%
                </span>
              </div>

              {/* Main product image */}
              <div className="px-8 py-6 md:px-16 md:py-10">
                <img
                  src={images[active]}
                  alt={p.name_fr}
                  className="mx-auto w-full max-w-sm object-contain"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="overflow-hidden rounded-xl p-1 transition-all duration-150"
                  style={{
                    width: 72,
                    height: 72,
                    background: "rgba(255,255,255,0.04)",
                    border: i === active
                      ? "1.5px solid var(--gold, #d4af37)"
                      : "1px solid rgba(255,255,255,0.08)",
                    opacity: i === active ? 1 : 0.55,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* ── Specs grid ── */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="mb-5 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.13em" }}
              >
                {isFr ? "Spécifications" : "المواصفات"}
              </p>

              <div className="grid grid-cols-2 gap-0">
                {specs.map((s, i) => {
                  const isLastRow =
                    i >= specs.length - (specs.length % 2 === 0 ? 2 : 1);
                  const isRightCol = i % 2 === 1;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-4"
                      style={{
                        borderBottom: isLastRow
                          ? "none"
                          : "1px solid rgba(255,255,255,0.05)",
                        borderRight: !isRightCol
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                        paddingLeft: isRightCol ? 20 : 0,
                        paddingRight: isRightCol ? 0 : 20,
                      }}
                    >
                      <s.icon
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--gold, #d4af37)", opacity: 0.7 }}
                      />
                      <div>
                        <p
                          className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {s.label}
                        </p>
                        <p
                          className="text-sm leading-snug"
                          style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                          {s.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="flex flex-col gap-7">

            {/* Stock badge */}
            <div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  color: "rgb(74,222,128)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "rgb(74,222,128)" }}
                />
                {t("in_stock")}
              </span>
            </div>

            {/* Product name + subtitle */}
            <div>
              <h1
                className="font-display text-3xl font-bold leading-tight text-white md:text-[2.1rem]"
              >
                {isFr ? p.name_fr : p.name_ar}
              </h1>
              <p
                className="mt-2 text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {isFr ? p.subtitle_fr : p.subtitle_ar}
              </p>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="var(--gold, #d4af37)"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                250+ {t("reviews")}
              </span>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

            {/* Pricing block */}
            <div className="flex items-end gap-4">
              <span
                className="font-display text-4xl font-bold leading-none"
                style={{ color: "var(--gold, #d4af37)" }}
              >
                {fmt(p.price)}
              </span>
              <div className="mb-1 flex flex-col gap-0.5">
                <span
                  className="text-sm line-through"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {fmt(p.old_price)}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {isFr ? "Vous économisez" : "تربح"}{" "}
                  {fmt(p.old_price - p.price)}
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-sm leading-7"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {isFr
                ? "Chargeur intelligent ultra-compact 140W. Recharge vos appareils rapidement et en toute sécurité. Puce intelligente détectant le bon niveau de puissance pour chaque appareil."
                : "شاحن ذكي مدمج بقدرة 140 واط. يشحن أجهزتك بسرعة وأمان. شريحة ذكية تكتشف وتوفر القدرة المناسبة لكل جهاز."}
            </p>

            {/* Feature chips — minimal */}
            <div className="flex flex-wrap gap-2">
              {badges.map((f) => (
                <span
                  key={f}
                  className="rounded-full px-3 py-1.5 text-xs"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

            {/* Order form */}
            <div>
              <OrderForm
                product="charger"
                price={p.price}
                productName={isFr ? p.name_fr : p.name_ar}
              />
            </div>

            {/* Trust strip */}
            <div
              className="grid grid-cols-3 gap-3 rounded-xl px-4 py-4"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                {
                  icon: "🚚",
                  label: isFr ? "Livraison gratuite" : "توصيل مجاني",
                },
                {
                  icon: "🔄",
                  label: isFr ? "Retour 14j" : "إرجاع 14 يوم",
                },
                {
                  icon: "🔒",
                  label: isFr ? "Paiement sécurisé" : "دفع آمن",
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className="text-[10px] font-medium leading-snug"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
