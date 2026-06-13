import { createFileRoute } from "@tanstack/react-router";
import { Zap, Shield, Smartphone, ShoppingCart, Heart, ChevronRight, Truck, Lock, Headphones, RotateCcw, Package, Cpu, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderForm } from "@/components/OrderForm";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/constants";
import chargerMain from "@/assets/adaptateur.svg";
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
  const [wishlisted, setWishlisted] = useState(false);

  const isFr = lang === "fr";
  const isAr = lang === "ar";

  const heroBadges = [
    { icon: Zap, label: isFr ? "140W Super Fast Charging" : "شحن فائق 140 واط" },
    { icon: Shield, label: isFr ? "Battery Protection" : "حماية البطارية" },
    { icon: Smartphone, label: isFr ? "Universal Compatibility" : "توافق عالمي" },
  ];

  const trustItems = [
    { icon: Truck, title: isFr ? "Free Shipping" : "شحن مجاني", sub: isFr ? "On all orders" : "على جميع الطلبات" },
    { icon: Lock, title: isFr ? "Secure Payment" : "دفع آمن", sub: isFr ? "100% Protected" : "محمي 100٪" },
    { icon: Headphones, title: isFr ? "24/7 Support" : "دعم 24/7", sub: isFr ? "We're here to help" : "نحن هنا للمساعدة" },
    { icon: RotateCcw, title: isFr ? "Easy Returns" : "إرجاع سهل", sub: isFr ? "14-day return" : "إرجاع خلال 14 يوم" },
  ];

  const bulletFeatures = [
    {
      icon: Zap,
      title: isFr ? "Charge ultra-rapide 140W" : "شحن فائق السرعة 140 واط",
      sub: isFr ? "Supporte la charge rapide multi-appareils" : "يدعم الشحن السريع لأجهزة متعددة",
    },
    {
      icon: Smartphone,
      title: isFr ? "Compatible tous appareils" : "متوافق مع جميع الأجهزة",
      sub: isFr ? "Smartphones, Tablets, iPad, iPhone 15/16, لاب…" : "Smartphones, Tablets, iPad, iPhone 15/16، لاب…",
    },
    {
      icon: Shield,
      title: isFr ? "Protection intelligente batterie" : "حماية البطارية الذكية",
      sub: isFr ? "Protection avancée contre la chaleur, les surtensions et la charge rapide." : "نظام حماية متقدم ضد الحرارة، الزائد، والشحن الزائد.",
    },
  ];

  const reviews = [
    {
      name: "Karim B.",
      location: isFr ? "Alger" : "الجزائر",
      rating: 5,
      date: isFr ? "il y a 3 jours" : "منذ 3 أيام",
      verified: true,
      text: isFr
        ? "Franchement bluffant. Mon téléphone passe de 0 à 80% en moins de 30 minutes. Le design est super compact, ça rentre parfaitement dans ma poche. Je recommande à 100%."
        : "صراحةً مذهل. هاتفي يشحن من 0 إلى 80% في أقل من 30 دقيقة. التصميم مدمج جداً ويدخل في الجيب بسهولة. أنصح به 100%.",
    },
    {
      name: "Yasmine M.",
      location: isFr ? "Oran" : "وهران",
      rating: 5,
      date: isFr ? "il y a 1 semaine" : "منذ أسبوع",
      verified: true,
      text: isFr
        ? "J'utilise ce chargeur pour mon MacBook et mon iPhone en même temps — aucun problème de chaleur. La qualité de l'aluminium est top, on sent que c'est du solide."
        : "أستخدم هذا الشاحن للماك بوك والآيفون في نفس الوقت — لا مشكلة في الحرارة إطلاقاً. جودة الألمنيوم رائعة، تحسس بالمتانة.",
    },
    {
      name: "Amine T.",
      location: isFr ? "Constantine" : "قسنطينة",
      rating: 4,
      date: isFr ? "il y a 2 semaines" : "منذ أسبوعين",
      verified: true,
      text: isFr
        ? "Très bon chargeur, livraison rapide. Le câble inclus est de bonne qualité. Je retire une étoile car la boîte était légèrement abîmée à la livraison, mais le produit est parfait."
        : "شاحن ممتاز، توصيل سريع. الكابل المرفق ذو جودة جيدة. أخذت نجمة واحدة لأن الصندوق وصل به ضرر بسيط، لكن المنتج مثالي.",
    },
    {
      name: "Sara H.",
      location: isFr ? "Annaba" : "عنابة",
      rating: 5,
      date: isFr ? "il y a 3 semaines" : "منذ 3 أسابيع",
      verified: true,
      text: isFr
        ? "J'ai acheté ça pour remplacer le chargeur de base de mon Samsung — la différence est énorme ! La charge est vraiment ultra-rapide et le chargeur ne chauffe presque pas."
        : "اشتريته لاستبدال الشاحن الأصلي لسامسونج — الفرق كبير جداً! الشحن سريع فعلاً والشاحن لا يسخن تقريباً.",
    },
    {
      name: "Mohamed R.",
      location: isFr ? "Sétif" : "سطيف",
      rating: 5,
      date: isFr ? "il y a 1 mois" : "منذ شهر",
      verified: false,
      text: isFr
        ? "Produit conforme à la description. Le paiement à la livraison c'est rassurant. Je l'utilise depuis un mois sans aucun souci — la batterie de mon téléphone dure plus longtemps grâce à la charge intelligente."
        : "المنتج مطابق للوصف. الدفع عند الاستلام مريح جداً. أستخدمه منذ شهر بدون أي مشكلة — بطارية هاتفي تدوم أطول بفضل الشحن الذكي.",
    },
    {
      name: "Nour L.",
      location: isFr ? "Tlemcen" : "تلمسان",
      rating: 5,
      date: isFr ? "il y a 1 mois" : "منذ شهر",
      verified: true,
      text: isFr
        ? "Un must-have. Compact, puissant, et esthétiquement très beau. Le finition aluminium donne un côté premium. Livraison en 2 jours — top !"
        : "ضروري جداً. مدمج، قوي، وجمالي رائع. التشطيب بالألمنيوم يعطيه مظهراً فاخراً. التوصيل في يومين — ممتاز!",
    },
  ];

  const ratingBreakdown = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ];

  const footerFeatures = [
    { icon: Smartphone, title: isFr ? "Ultra Compact" : "مدمج جداً", sub: isFr ? "Fits in your pocket" : "يناسب جيبك" },
    { icon: Cpu, title: isFr ? "Smart Chip" : "شريحة ذكية", sub: isFr ? "Detects & delivers the right power" : "تكتشف وتوفر الطاقة المناسبة" },
    { icon: Shield, title: isFr ? "Safe Charging" : "شحن آمن", sub: isFr ? "Multi-protection system" : "نظام حماية متعدد" },
    { icon: Package, title: isFr ? "Premium Build" : "بناء فاخر", sub: isFr ? "High-quality aluminum finish" : "تشطيب ألمنيوم عالي الجودة" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--navy-deep, #0b0f1a)", direction: isAr ? "rtl" : "ltr" }}
    >
      <Header />

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(135deg, #0b0f1a 0%, #0d1a35 60%, #0b1628 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* subtle radial glow behind product */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            insetInlineEnd: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,80,160,0.35) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="mx-auto max-w-6xl px-5 md:px-8" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left: copy */}
            <div style={{ order: isAr ? 2 : 1 }}>
              {/* pill */}
              <span
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(20,60,140,0.5)",
                  border: "1px solid rgba(80,140,255,0.3)",
                  color: "#7aaeff",
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#7aaeff",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                {t("new_arrival")}
              </span>

              <h1
                className="font-display font-bold leading-tight text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 16 }}
              >
                {isFr ? (
                  <>Ultimate Power.<br />Compact Freedom.</>
                ) : (
                  <>طاقة مطلقة.<br />حرية مدمجة.</>
                )}
              </h1>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>
                {isFr
                  ? "Designed for speed, built for safety.\nPower in your pocket, always ready."
                  : "صُمِّم للسرعة، بُني للأمان.\nطاقة في جيبك، دائمًا جاهز."}
              </p>

              {/* 3 icon badges */}
              <div className="flex flex-wrap gap-6 mb-10">
                {heroBadges.map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-2 text-center" style={{ minWidth: 72 }}>
                    <div
                      style={{
                        width: 52, height: 52, borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <b.icon style={{ width: 22, height: 22, color: "#d4af37" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>{b.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#product-detail"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#d4af37", color: "#0b0f1a",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.05em",
                  padding: "14px 28px", borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                {isFr ? "SHOP NOW" : "تسوق الآن"} →
              </a>
            </div>

            {/* Right: product image with rings */}
            <div
              style={{
                order: isAr ? 1 : 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}
            >
              {/* decorative rings */}
              {[280, 340, 400].map((size, i) => (
                <div
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: size, height: size,
                    borderRadius: "50%",
                    border: `1px solid rgba(100,160,255,${0.15 - i * 0.04})`,
                    pointerEvents: "none",
                  }}
                />
              ))}
              <img
                src={chargerMain}
                alt={p.name_fr}
                style={{ width: "min(340px, 90vw)", objectFit: "contain", position: "relative", zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRUST BAR
      ════════════════════════════════════════ */}
      <section
        style={{
          background: "#f8f8f8",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="mx-auto max-w-6xl px-5 md:px-8"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div
                  style={{
                    width: 44, height: 44, flexShrink: 0, borderRadius: 8,
                    background: "rgba(0,0,0,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <item.icon style={{ width: 20, height: 20, color: "#0b0f1a" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#0b0f1a", margin: 0 }}>{item.title}</p>
                  <p style={{ fontSize: 12, color: "#666", margin: 0 }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCT DETAIL SECTION
      ════════════════════════════════════════ */}
      <section id="product-detail" style={{ background: "#fff" }}>
        <div
          className="mx-auto max-w-6xl px-5 md:px-8"
          style={{ paddingTop: 56, paddingBottom: 56 }}
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">

            {/* LEFT — image gallery */}
            <div>
              {/* main image */}
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#f5f5f5",
                  aspectRatio: "1 / 1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12,
                  position: "relative",
                }}
              >
                <img
                  src={images[active]}
                  alt={p.name_fr}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* thumbnails row */}
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      width: 88, height: 88, flexShrink: 0,
                      borderRadius: 8, overflow: "hidden",
                      border: i === active ? "2.5px solid #d4af37" : "1.5px solid #e0e0e0",
                      background: "#f5f5f5",
                      cursor: "pointer",
                      padding: 0,
                      opacity: i === active ? 1 : 0.65,
                      transition: "all 0.15s",
                    }}
                  >
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — product info */}
            <div style={{ direction: isAr ? "rtl" : "ltr" }}>

              {/* title */}
              <h2
                style={{
                  fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                  color: "#0b0f1a", marginBottom: 4, lineHeight: 1.25,
                }}
              >
                {isAr ? p.name_ar : p.name_fr}
              </h2>
              <p style={{ color: "#d4af37", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>
                {isAr ? p.subtitle_ar : p.subtitle_fr}
              </p>

              {/* stars */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "#d4af37" }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "#888" }}>(250+ {t("reviews")})</span>
              </div>

              {/* description */}
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.75, marginBottom: 20 }}>
                {isFr
                  ? "Dites adieu aux câbles encombrants. Rechargez vos appareils rapidement et en toute sécurité, où que vous soyez. Design compact, performances avancées."
                  : "وداعاً للأسلاك. اشحن أجهزتك بسرعة وأمان أينما كنت. تصميم مدمج، أداء فائق، وحماية متقدمة."}
              </p>

              {/* bullet features */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {bulletFeatures.map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 36, height: 36, flexShrink: 0, borderRadius: "50%",
                        background: "#0b0f1a",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <f.icon style={{ width: 16, height: 16, color: "#d4af37" }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, color: "#0b0f1a", margin: 0 }}>{f.title}</p>
                      <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.5 }}>{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: "#0b0f1a" }}>
                  {fmt(p.price)}
                </span>
                <span style={{ fontSize: 16, color: "#aaa", textDecoration: "line-through" }}>
                  {fmt(p.old_price)}
                </span>
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{
                    flex: 1,
                    background: "#d4af37", color: "#0b0f1a",
                    fontWeight: 700, fontSize: 15,
                    padding: "15px 20px", borderRadius: 8, border: "none",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <ShoppingCart style={{ width: 18, height: 18 }} />
                  {isFr ? "ADD TO CART" : "أضف إلى السلة"}
                </button>

                <button
                  onClick={() => setWishlisted((v) => !v)}
                  style={{
                    width: 52, height: 52, flexShrink: 0,
                    borderRadius: 8,
                    background: wishlisted ? "rgba(212,175,55,0.1)" : "transparent",
                    border: wishlisted ? "1.5px solid #d4af37" : "1.5px solid #e0e0e0",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <Heart
                    style={{
                      width: 20, height: 20,
                      color: wishlisted ? "#d4af37" : "#aaa",
                      fill: wishlisted ? "#d4af37" : "none",
                      transition: "all 0.15s",
                    }}
                  />
                </button>
              </div>

              {/* Order form (kept for existing functionality) */}
              <div style={{ marginTop: 28 }}>
                <OrderForm
                  product="charger"
                  price={p.price}
                  productName={isFr ? p.name_fr : p.name_ar}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REVIEWS SECTION
      ════════════════════════════════════════ */}
      <section style={{ background: "#f9f9f9", borderTop: "1px solid #ebebeb" }}>
        <div
          className="mx-auto max-w-6xl px-5 md:px-8"
          style={{ paddingTop: 64, paddingBottom: 64 }}
        >
          {/* Section header */}
          <div style={{ marginBottom: 40 }}>
            <p
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "#d4af37", marginBottom: 8,
              }}
            >
              {isFr ? "Ce qu'ils disent" : "ما يقولونه"}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 800, color: "#0b0f1a", margin: 0,
              }}
            >
              {isFr ? "Avis clients vérifiés" : "تقييمات العملاء الموثوقة"}
            </h2>
          </div>

          {/* Rating summary + bars */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 12,
              padding: "28px 32px",
              marginBottom: 36,
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              alignItems: "center",
            }}
          >
            {/* Big score */}
            <div style={{ textAlign: "center", minWidth: 100 }}>
              <p style={{ fontSize: 56, fontWeight: 900, color: "#0b0f1a", margin: 0, lineHeight: 1 }}>4.8</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 3, margin: "8px 0 4px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "#d4af37" }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#999", margin: 0 }}>250+ {t("reviews")}</p>
            </div>

            {/* Bar breakdown */}
            <div style={{ flex: 1, minWidth: 200 }}>
              {ratingBreakdown.map((r) => (
                <div
                  key={r.stars}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}
                >
                  <span style={{ fontSize: 12, color: "#555", minWidth: 14, textAlign: "right" }}>{r.stars}</span>
                  <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, fill: "#d4af37", flexShrink: 0 }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div style={{ flex: 1, height: 7, background: "#ebebeb", borderRadius: 99, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${r.pct}%`, height: "100%",
                        background: r.pct > 50 ? "#d4af37" : "#ddd",
                        borderRadius: 99,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 12, color: "#999", minWidth: 30 }}>{r.pct}%</span>
                </div>
              ))}
            </div>

            {/* Recommend badge */}
            <div
              style={{
                textAlign: "center",
                padding: "20px 24px",
                background: "rgba(212,175,55,0.07)",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: 10,
                minWidth: 130,
              }}
            >
              <ThumbsUp style={{ width: 28, height: 28, color: "#d4af37", marginBottom: 8 }} />
              <p style={{ fontSize: 26, fontWeight: 900, color: "#0b0f1a", margin: 0 }}>96%</p>
              <p style={{ fontSize: 11, color: "#888", margin: "4px 0 0", lineHeight: 1.4 }}>
                {isFr ? "recommandent\nce produit" : "يوصون\nبهذا المنتج"}
              </p>
            </div>
          </div>

          {/* Review cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 12,
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {/* Top row: avatar + name + date */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  {/* Avatar initials */}
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                      background: "#0b0f1a",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: "#d4af37",
                    }}
                  >
                    {r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "#0b0f1a" }}>{r.name}</span>
                      {r.verified && (
                        <span
                          style={{
                            fontSize: 10, fontWeight: 600,
                            background: "rgba(34,197,94,0.1)",
                            color: "rgb(22,163,74)",
                            border: "1px solid rgba(34,197,94,0.25)",
                            borderRadius: 99, padding: "1px 7px",
                          }}
                        >
                          ✓ {isFr ? "Achat vérifié" : "شراء موثق"}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: "#bbb", margin: "2px 0 0" }}>
                      {r.location} · {r.date}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: si < r.rating ? "#d4af37" : "#e5e5e5" }}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.7, margin: 0 }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BOTTOM FEATURES BAR
      ════════════════════════════════════════ */}
      <section style={{ background: "#0b0f1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="mx-auto max-w-6xl px-5 md:px-8"
          style={{ paddingTop: 32, paddingBottom: 32 }}
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {footerFeatures.map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40, height: 40, flexShrink: 0, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <f.icon style={{ width: 18, height: 18, color: "#d4af37" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#fff", margin: 0 }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.4 }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
