import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, useCallback } from "react";
import { Lock, LogOut, RefreshCw, Trash2, Phone, MapPin, Calendar, Package2 } from "lucide-react";
import { ADMIN_TOKEN_KEY } from "@/lib/constants";
import {
  adminLogin,
  adminListOrders,
  adminUpdateStatus,
  adminDeleteOrder,
  type OrderRow,
} from "@/lib/orders.functions";
import logoAsset from "@/assets/novixo-logo.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Novixo Store" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  confirmed: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  shipped: "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  delivered: "bg-green-500/15 text-green-300 ring-green-500/30",
  cancelled: "bg-red-500/15 text-red-300 ring-red-500/30",
};

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setToken(localStorage.getItem(ADMIN_TOKEN_KEY));
  }, []);

  if (!hydrated) return null;
  if (!token) return <LoginScreen onLogin={(tk) => { localStorage.setItem(ADMIN_TOKEN_KEY, tk); setToken(tk); }} />;

  return <Dashboard token={token} onLogout={() => { localStorage.removeItem(ADMIN_TOKEN_KEY); setToken(null); }} />;
}

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const login = useServerFn(adminLogin);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ data: { password: pwd } });
      if (res.ok) onLogin(res.token);
      else setError("Mot de passe incorrect.");
    } catch {
      setError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-hero-radial px-4">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-center gap-2">
          <img src={logoAsset} alt="Novixo" className="h-12 w-12 rounded-md" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-white">NOVIXO</div>
            <div className="text-[9px] tracking-[0.25em] text-gold">ADMIN</div>
          </div>
        </div>
        <h1 className="font-display text-xl text-white">Espace administrateur</h1>
        <p className="mt-1 text-xs text-white/55">Entrez le mot de passe pour accéder aux commandes.</p>
        <div className="mt-5">
          <label className="luxury-label">Mot de passe</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
            <input
              type="password"
              className="luxury-input pl-10"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              autoFocus
              required
            />
          </div>
        </div>
        {error && <div className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-[color:var(--destructive)]">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-gold py-3 font-display text-sm font-bold uppercase tracking-widest text-[color:var(--gold-foreground)] shadow-gold disabled:opacity-60"
        >
          {loading ? "..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [product, setProduct] = useState<"charger" | "patches">("charger");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const list = useServerFn(adminListOrders);
  const updateStatus = useServerFn(adminUpdateStatus);
  const del = useServerFn(adminDeleteOrder);

  const reload = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await list({ data: { token, product } });
      setOrders(res.orders);
    } catch {
      setErr("Impossible de charger les commandes (token invalide ?).");
    } finally {
      setLoading(false);
    }
  }, [list, token, product]);

  useEffect(() => { reload(); }, [reload]);

  const onStatus = async (id: number, status: typeof STATUSES[number]) => {
    await updateStatus({ data: { token, product, id, status } });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };
  const onDelete = async (id: number) => {
    if (!confirm("Supprimer cette commande ?")) return;
    await del({ data: { token, product, id } });
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const totals = orders.reduce(
    (acc, o) => {
      acc.count += 1;
      acc.revenue += parseFloat(o.total_price);
      if (o.status === "pending") acc.pending += 1;
      return acc;
    },
    { count: 0, revenue: 0, pending: 0 }
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 bg-[color:var(--navy-deep)]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <img src={logoAsset} alt="Novixo" className="h-9 w-9 rounded-md" />
            <div className="leading-tight">
              <div className="font-display text-base font-bold text-white">NOVIXO</div>
              <div className="text-[9px] tracking-[0.25em] text-gold">ADMIN PANEL</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={reload} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-gold hover:text-gold">
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Actualiser
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-1.5 rounded-md bg-destructive/15 px-3 py-1.5 text-xs text-[color:var(--destructive)] hover:bg-destructive/25">
              <LogOut className="h-3.5 w-3.5" /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <h1 className="font-display text-2xl text-white md:text-3xl">Commandes</h1>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Stat label="Total commandes" value={totals.count.toString()} />
          <Stat label="En attente" value={totals.pending.toString()} accent />
          <Stat label="Chiffre d'affaires (DA)" value={totals.revenue.toLocaleString("fr-DZ")} />
        </div>

        <div className="mt-7 flex gap-2 border-b border-white/10">
          {(["charger", "patches"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setProduct(p)}
              className={`relative px-4 py-2.5 text-sm font-semibold transition ${product === p ? "text-gold" : "text-white/60 hover:text-white"}`}
            >
              {p === "charger" ? "Chargeur 140W" : "Patches Anti-Mycose"}
              {product === p && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gold" />}
            </button>
          ))}
        </div>

        {err && <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-[color:var(--destructive)]">{err}</div>}

        <div className="mt-5 space-y-3">
          {orders.length === 0 && !loading && (
            <div className="glass rounded-xl p-10 text-center text-sm text-white/55">
              <Package2 className="mx-auto mb-3 h-8 w-8 text-gold/60" />
              Aucune commande pour le moment.
            </div>
          )}
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-bold text-white">#{o.id}</span>
                    <span className="font-display text-base text-gold">{o.prenom} {o.nom}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${STATUS_COLOR[o.status] ?? "bg-white/5 text-white/60 ring-white/10"}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/65">
                    <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3 text-gold" /> {o.telephone}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3 text-gold" /> {o.wilaya} — {o.adresse}</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3 text-gold" /> {new Date(o.created_at).toLocaleString("fr-FR")}</span>
                  </div>
                  {o.notes && <p className="mt-2 text-xs italic text-white/55">« {o.notes} »</p>}
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-bold text-gold">{parseFloat(o.total_price).toLocaleString("fr-DZ")} DA</div>
                  <div className="text-[10px] text-white/45">Qté: {o.quantity}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <select
                  value={o.status}
                  onChange={(e) => onStatus(o.id, e.target.value as typeof STATUSES[number])}
                  className="luxury-input !w-auto !py-1.5 !text-xs"
                >
                  {STATUSES.map((s) => <option key={s} value={s} className="bg-[color:var(--navy)]">{s}</option>)}
                </select>
                <button onClick={() => onDelete(o.id)} className="inline-flex items-center gap-1 rounded-md bg-destructive/15 px-3 py-1.5 text-xs text-[color:var(--destructive)] hover:bg-destructive/25">
                  <Trash2 className="h-3 w-3" /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`glass rounded-xl p-5 ${accent ? "ring-1 ring-gold/40" : ""}`}>
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className={`mt-1 font-display text-2xl font-bold ${accent ? "text-gold" : "text-white"}`}>{value}</div>
    </div>
  );
}
