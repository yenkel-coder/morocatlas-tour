import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { circuits, pick } from "@/lib/circuits";
import { useLanguage } from "@/lib/i18n";
import inspSahara from "@/assets/insp-sahara.jpg";
import inspAtlas from "@/assets/insp-atlas.jpg";
import inspMedina from "@/assets/insp-medina.jpg";
import inspHoneymoon from "@/assets/insp-honeymoon.jpg";
import inspSaveurs from "@/assets/insp-saveurs.jpg";
import inspToursud from "@/assets/insp-toursud.jpg";

const imageMap: Record<string, string> = {
  "/assets/insp-sahara.jpg": inspSahara,
  "/assets/insp-atlas.jpg": inspAtlas,
  "/assets/insp-medina.jpg": inspMedina,
  "/assets/insp-honeymoon.jpg": inspHoneymoon,
  "/assets/insp-saveurs.jpg": inspSaveurs,
  "/assets/insp-toursud.jpg": inspToursud,
};

export const Route = createFileRoute("/inspirations")({
  head: () => ({
    meta: [
      { title: "Inspirations — Circuits sur mesure au Maroc | marocatlastour" },
      { name: "description", content: "Découvrez nos circuits signature au Maroc : Sahara, Atlas, médinas. Chaque voyage est ensuite ajusté à vos envies." },
    ],
  }),
  component: InspirationsPage,
});

const TEXT = {
  fr: {
    eyebrow: "Inspirations",
    title: "Circuits signature.",
    body: "Une sélection d’itinéraires éprouvés. Chacun se réinvente selon vos envies dans le configurateur.",
    cta: "Composer mon voyage →",
  },
  en: {
    eyebrow: "Inspirations",
    title: "Signature journeys.",
    body: "A selection of proven itineraries. Each one is reshaped around your own desires in the trip builder.",
    cta: "Design my trip →",
  },
} as const;

function InspirationsPage() {
  const { language } = useLanguage();
  const t = TEXT[language];
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-32 px-6 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 animate-fade-up">
            <p className="label-eyebrow text-clay mb-4">{t.eyebrow}</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-balance">{t.title}</h1>
            <p className="text-lg text-night/65 leading-relaxed">
              {t.body}
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {circuits.map((c) => (
              <Link
                key={c.slug}
                to="/circuit/$slug"
                params={{ slug: c.slug }}
                className="group block"
              >
                <article>
                  <div className="overflow-hidden mb-6 aspect-[4/5]">
                    <img
                      src={imageMap[c.image] ?? inspSahara}
                      alt={pick(c.title, language)}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="label-eyebrow text-clay mb-2">{pick(c.eyebrow, language)}</p>
                  <h3 className="font-serif text-2xl mb-2 group-hover:text-clay transition-colors">{pick(c.title, language)}</h3>
                  <p className="text-night/65 text-sm leading-relaxed mb-3">{pick(c.desc, language)}</p>
                  <p className="text-sm font-medium text-clay">{pick(c.from, language)}</p>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link
              to="/configurer"
              search={{ etape: 1 }}
              className="inline-flex items-center gap-2 bg-clay text-sand px-8 py-4 rounded-xl font-medium hover:bg-clay/90 transition-colors"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
