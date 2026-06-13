import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Shield, Sparkles, Truck, Lock, Headphones, RefreshCw, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/constants";
import chargerImg from "@/assets/adaptateur.svg";
import patchesImg from "@/assets/patches-main.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novixo Store — Discover What's Next" },
      { name: "description", content: "Boutique premium tech et bien-être en Algérie. Chargeur 140W, patches anti-mycose. Paiement à la livraison." },
      { property: "og:title", content: "Novixo Store" },
      { property: "og:description", content: "Discover What's Next — Tech intelligente livrée partout en Algérie." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useI18n();
  const fmt = (n: number) => `${n.toLocaleString(lang === "ar" ? "ar-DZ" : "fr-DZ")} DA`;

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section className="bg-hero-radial relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold ring-1 ring-gold/30">
              <Sparkles className="h-3 w-3" /> {t("new_arrival")}
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] text-white md:text-6xl">
              {t("hero_title")}
            </h1>
            <p className="mt-5 max-w-md text-base text-white/65">{t("hero_sub")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/charger" className="group inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 font-display text-sm font-bold uppercase tracking-widest text-[color:var(--gold-foreground)] shadow-gold transition hover:brightness-110">
                {t("shop_now")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link to="/patches" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gold hover:text-gold">
                {t("discover")}
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { icon: Zap, label: lang === "fr" ? "140W Ultra-rapide" : "140 واط فائق السرعة" },
                { icon: Shield, label: lang === "fr" ? "Protection batterie" : "حماية البطارية" },
                { icon: Sparkles, label: lang === "fr" ? "Universel" : "متوافق" },
              ].map((f, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-[11px] leading-tight text-white/65">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--blue-accent)_40%,transparent)_0%,transparent_70%)]" />
            <img src={chargerImg} alt="Novixo Smart Charger 140W" className="animate-float mx-auto w-full max-w-md drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]" />
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="border-y border-white/5 bg-[color:var(--navy)]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-7 md:grid-cols-4 md:px-8">
          {[
            { icon: Truck, title: t("free_shipping"), sub: lang === "fr" ? "Toute l'Algérie" : "كل الجزائر" },
            { icon: Lock, title: t("secure_payment"), sub: t("cod") },
            { icon: Headphones, title: t("support_24"), sub: lang === "fr" ? "Nous sommes là" : "نحن هنا" },
            { icon: RefreshCw, title: t("easy_returns"), sub: lang === "fr" ? "14 jours" : "14 يوم" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <f.icon className="h-6 w-6 shrink-0 text-gold" />
              <div>
                <div className="text-sm font-semibold text-white">{f.title}</div>
                <div className="text-[11px] text-white/55">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="mb-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">✦ {t("best_sellers")}</span>
          <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">{lang === "fr" ? "Nos produits phares" : "منتجاتنا الأكثر مبيعاً"}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { ...PRODUCTS.charger, img: chargerImg },
            { ...PRODUCTS.patches, img: patchesImg },
          ].map((p) => (
            <Link
              key={p.id}
              to={p.slug as "/charger" | "/patches"}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[color:var(--card)] transition hover:border-gold/40"
            >
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img src={p.img} alt={p.name_fr} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-gold" />))}
                  <span className="ml-1 text-[11px] text-white/55">(250+)</span>
                </div>
                <h3 className="font-display text-lg text-white group-hover:text-gold">{lang === "fr" ? p.name_fr : p.name_ar}</h3>
                <p className="mt-1 text-xs text-white/55">{lang === "fr" ? p.subtitle_fr : p.subtitle_ar}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl font-bold text-gold">{fmt(p.price)}</span>
                    <span className="ml-2 text-xs text-white/40 line-through">{fmt(p.old_price)}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold ring-1 ring-gold/30 group-hover:bg-gold group-hover:text-[color:var(--navy-deep)]">
                    {t("view_product")} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
