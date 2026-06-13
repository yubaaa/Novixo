import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/novixo-logo.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-white/5 bg-[color:var(--navy-deep)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logoAsset} alt="Novixo" className="h-10 w-10 rounded-md" />
            <div className="font-display text-lg font-bold text-white">NOVIXO</div>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">{t("footer_tagline")}</p>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{t("shop")}</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li><Link to="/charger" className="hover:text-gold">{t("charger")}</Link></li>
            <li><Link to="/patches" className="hover:text-gold">{t("patches")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li>support@novixo.store</li>
            <li>+213 XXX XX XX XX</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Info</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li>{t("free_shipping")}</li>
            <li>{t("cod")}</li>
            <li>{t("easy_returns")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-white/40">{t("copyright")}</div>
    </footer>
  );
}
