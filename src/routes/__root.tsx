import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--navy-deep)] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 font-display text-xl text-white">Page introuvable</h2>
        <p className="mt-2 text-sm text-white/60">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--navy-deep)] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-white">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-white/60">Une erreur est survenue.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-[color:var(--navy-deep)]"
          >
            Réessayer
          </button>
          <a href="/" className="rounded-md border border-white/15 px-4 py-2 text-sm text-white">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Novixo Store — Discover What's Next" },
      { name: "description", content: "Tech intelligente et solutions bien-être livrées partout en Algérie. Paiement à la livraison." },
      { name: "author", content: "Novixo Store" },
      { property: "og:title", content: "Novixo Store — Discover What's Next" },
      { property: "og:description", content: "Tech intelligente et solutions bien-être livrées partout en Algérie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Urbanist:wght@300;400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Outlet />
      </I18nProvider>
    </QueryClientProvider>
  );
}
