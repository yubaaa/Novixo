import { Link } from "@tanstack/react-router";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/novixo-logo.png";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: t("home") },
    { to: "/charger", label: t("charger") },
    { to: "/patches", label: t("patches") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-deep/85 backdrop-blur-xl" style={{ background: "color-mix(in oklab, var(--navy-deep) 85%, transparent)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoAsset} alt="Novixo Store" className="h-10 w-10 rounded-md object-cover" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-wider text-white">NOVIXO</div>
            <div className="text-[9px] tracking-[0.25em] text-gold">STORE</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-white/75 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
            className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition hover:border-gold hover:text-gold"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "fr" ? "AR" : "FR"}
          </button>
          <button onClick={() => setOpen((v) => !v)} className="md:hidden rounded-md border border-white/10 p-2 text-white/80">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-gold">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
