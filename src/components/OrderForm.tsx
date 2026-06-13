import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ShoppingBag, Sparkles, Minus, Plus, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { WILAYAS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { createChargerOrder, createPatchesOrder } from "@/lib/orders.functions";

interface Props {
  product: "charger" | "patches";
  price: number;
  productName: string;
}

export function OrderForm({ product, price, productName }: Props) {
  const { t, lang } = useI18n();
  const submit = useServerFn(product === "charger" ? createChargerOrder : createPatchesOrder);

  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ prenom: "", nom: "", telephone: "", wilaya: "", adresse: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const total = price * qty;
  const fmt = (n: number) => `${n.toLocaleString(lang === "ar" ? "ar-DZ" : "fr-DZ")} DA`;

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.prenom || !form.nom || !form.telephone || !form.wilaya) {
      setError(t("required"));
      return;
    }
    setLoading(true);
    try {
      await submit({ data: { ...form, notes: form.notes || null, quantity: qty, total_price: total } });
      setSuccess(true);
    } catch {
      setError(t("server_error"));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-[color:var(--success)]" />
        <h3 className="mt-4 font-display text-2xl text-white">{t("order_confirmed")}</h3>
        <p className="mt-3 text-sm text-white/70">
          {t("thanks")} <strong className="text-gold">{form.prenom}</strong> ! {t("contact_24h")}{" "}
          <strong className="text-white">{form.telephone}</strong>.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-gold hover:underline">
          {t("back_store")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
        <Sparkles className="h-3 w-3" /> {productName}
      </div>
      <h3 className="font-display text-2xl text-white">{t("place_order")}</h3>
      <p className="mt-1 text-xs text-white/55">{t("cod_note")}</p>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2 text-xs text-gold">
        <Flame className="h-3.5 w-3.5" />
        {lang === "fr" ? "Stock limité — Commandez maintenant" : "الكمية محدودة — اطلب الآن"}
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
          <span className="luxury-label !mb-0">{t("quantity")}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-md border border-gold/30 text-white hover:bg-gold/10">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center font-display font-bold text-white">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid h-8 w-8 place-items-center rounded-md border border-gold/30 text-white hover:bg-gold/10">
              <Plus className="h-3.5 w-3.5" />
            </button>
            <span className="ml-3 font-display text-lg font-bold text-gold">= {fmt(total)}</span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="luxury-label">{t("first_name")} *</label>
            <input className="luxury-input" value={form.prenom} onChange={handle("prenom")} required maxLength={80} />
          </div>
          <div>
            <label className="luxury-label">{t("last_name")} *</label>
            <input className="luxury-input" value={form.nom} onChange={handle("nom")} required maxLength={80} />
          </div>
        </div>

        <div>
          <label className="luxury-label">{t("phone")} *</label>
          <input className="luxury-input" type="tel" value={form.telephone} onChange={handle("telephone")} required placeholder="05XX XX XX XX" maxLength={30} />
        </div>

        <div>
          <label className="luxury-label">{t("wilaya")} *</label>
          <select className="luxury-input" value={form.wilaya} onChange={handle("wilaya")} required>
            <option value="">{t("select_wilaya")}</option>
            {WILAYAS.map((w) => (
              <option key={w} value={w} className="bg-[color:var(--navy)]">{w}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="luxury-label">{t("address")}</label>
          <input className="luxury-input" value={form.adresse} onChange={handle("adresse")} maxLength={300} />
        </div>

        <div>
          <label className="luxury-label">{t("notes")}</label>
          <textarea className="luxury-input" rows={2} value={form.notes} onChange={handle("notes")} maxLength={500} />
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-[color:var(--destructive)]">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-[color:var(--gold-foreground)] shadow-gold transition hover:brightness-110 disabled:opacity-60"
        >
          <ShoppingBag className="h-4 w-4" />
          {loading ? t("processing") : `${t("order_now")} — ${fmt(total)}`}
        </button>
        <p className="text-center text-[11px] text-white/40">{t("cod_note")}</p>
      </div>
    </form>
  );
}
