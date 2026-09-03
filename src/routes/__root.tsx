import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import ogImage from "../assets/hero-riad.jpg";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { LanguageProvider, useLanguage } from "../lib/i18n";

const SITE_URL = "https://www.marocatlastour.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Marocatlastour",
  url: SITE_URL,
  description:
    "Voyages sur mesure au Maroc : riads, désert, Atlas et artisanat, composés en 10 étapes.",
  areaServed: {
    "@type": "Country",
    name: "Maroc",
  },
};

function NotFoundComponent() {
  const { language } = useLanguage();
  const t = language === "fr"
    ? { eyebrow: "Erreur 404", title: "Page introuvable", body: "Cette destination n'existe pas. Reprenons le fil de votre voyage.", cta: "Retour à l'accueil" }
    : { eyebrow: "404 error", title: "Page not found", body: "This destination doesn't exist. Let's pick up the thread of your journey.", cta: "Back to home" };
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <p className="label-eyebrow mb-4">{t.eyebrow}</p>
        <h1 className="font-serif text-5xl mb-4">{t.title}</h1>
        <p className="text-sm text-night/60 mb-8">{t.body}</p>
        <Link to="/" className="btn-primary">{t.cta}</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { language } = useLanguage();
  const t = language === "fr"
    ? { title: "Une parenthèse imprévue", cta: "Réessayer" }
    : { title: "An unexpected pause", cta: "Try again" };
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl mb-3">{t.title}</h1>
        <p className="text-sm text-night/60 mb-6">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="btn-primary"
        >
          {t.cta}
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "marocatlastour — Voyages sur mesure au Maroc" },
      {
        name: "description",
        content:
          "Composez votre circuit sur mesure au Maroc en 10 étapes. Riads, désert, Atlas et artisanat — un voyage tissé selon vos désirs.",
      },
      { property: "og:title", content: "marocatlastour — Voyages sur mesure au Maroc" },
      {
        property: "og:description",
        content:
          "Composez votre circuit sur mesure au Maroc en 10 étapes. Devis personnalisé sous 48h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "marocatlastour — Voyages sur mesure au Maroc" },
      { property: "og:image", content: `${SITE_URL}${ogImage}` },
      { name: "twitter:image", content: `${SITE_URL}${ogImage}` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&family=Italiana&family=Cormorant+Garamond:wght@300;400;500&family=Manrope:wght@500;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
      <LanguageProvider>
        <Outlet />
        <WhatsAppFloat />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
