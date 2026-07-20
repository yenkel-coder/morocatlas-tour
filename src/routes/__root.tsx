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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <p className="label-eyebrow mb-4">Erreur 404</p>
        <h1 className="font-serif text-5xl mb-4">Page introuvable</h1>
        <p className="text-sm text-night/60 mb-8">
          Cette destination n'existe pas. Reprenons le fil de votre voyage.
        </p>
        <Link to="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl mb-3">Une parenthèse imprévue</h1>
        <p className="text-sm text-night/60 mb-6">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="btn-primary"
        >
          Réessayer
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "marocatlastour — Voyages sur mesure au Maroc" },
      { name: "description", content: "Build custom Morocco travel itineraries with an intelligent configurator and 10-step journey builder." },
      { property: "og:description", content: "Build custom Morocco travel itineraries with an intelligent configurator and 10-step journey builder." },
      { name: "twitter:description", content: "Build custom Morocco travel itineraries with an intelligent configurator and 10-step journey builder." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ecf8ded8-193f-40c3-a980-a71f9111b91e/id-preview-5411dc83--0c0bdcc6-6fb5-40ed-8294-7e93b7c785c7.lovable.app-1778800214523.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ecf8ded8-193f-40c3-a980-a71f9111b91e/id-preview-5411dc83--0c0bdcc6-6fb5-40ed-8294-7e93b7c785c7.lovable.app-1778800214523.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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
      <Outlet />
    </QueryClientProvider>
  );
}
