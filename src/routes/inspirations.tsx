import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import inspSahara from "@/assets/insp-sahara.jpg";
import inspAtlas from "@/assets/insp-atlas.jpg";
import inspMedina from "@/assets/insp-medina.jpg";

export const Route = createFileRoute("/inspirations")({
  head: () => ({
    meta: [
      { title: "Inspirations — Circuits sur mesure au Maroc | marocatlastour" },
      { name: "description", content: "Découvrez nos circuits signature au Maroc : Sahara, Atlas, médinas. Chaque voyage est ensuite ajusté à vos envies." },
    ],
  }),
  component: InspirationsPage,
});

const items = [
  { image: inspSahara, eyebrow: "08 jours · Guide privé", title: "Le seuil du Sahara", desc: "Bivouac sous les étoiles à Erg Chigaga, oasis de Mhamid et thé chez les nomades.", from: "À partir de 2 900 €", slug: "le-seuil-du-sahara" },
  { image: inspAtlas, eyebrow: "12 jours · Lent & immersif", title: "Atlas et vallées cachées", desc: "Randonnées douces, kasbahs en pisé et nuits chez l'habitant à Imlil et Aït Ben Haddou.", from: "À partir de 3 400 €", slug: "atlas-et-vallees-cachees" },
  { image: inspMedina, eyebrow: "06 jours · Culturel", title: "Médinas & artisans", desc: "Marrakech, Fès et Tétouan. Ateliers privés de zellige, tannerie et soie.", from: "À partir de 2 100 €", slug: "medinas-artisans" },
  { image: inspSahara, eyebrow: "10 jours · Romantique", title: "Lune de miel berbère", desc: "Riads d'exception, hammam privé et nuit en camp de luxe au Sahara.", from: "À partir de 4 500 €", slug: "lune-de-miel-berbere" },
  { image: inspAtlas, eyebrow: "14 jours · Famille", title: "Grand tour du Sud", desc: "Marrakech, Aït Ben Haddou, Dadès, Merzouga et retour par les gorges du Toudgha.", from: "À partir de 3 800 €", slug: "grand-tour-du-sud" },
  { image: inspMedina, eyebrow: "07 jours · Gastronomie", title: "Saveurs du Maroc", desc: "Cours de cuisine à Fès, marchés aux épices, dîners chez l'habitant.", from: "À partir de 2 600 €", slug: "saveurs-du-maroc" },
];

function InspirationsPage() {
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-32 px-6 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto mb-16 animate-fade-up">
          <p className="label-eyebrow text-clay mb-4">Inspirations</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-balance">Circuits signature.</h1>
          <p className="text-lg text-night/65 leading-relaxed">
            Une sélection d’itinéraires éprouvés. Chacun se réinvente selon vos envies
            dans le configurateur.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <Link
              key={idx}
              to="/circuit/$slug"
              params={{ slug: i.slug }}
              className="group block"
            >
              <article>
                <div className="overflow-hidden mb-6 aspect-[4/5]">
                  <img
                    src={i.image}
                    alt={i.title}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="label-eyebrow text-clay mb-2">{i.eyebrow}</p>
                <h3 className="font-serif text-2xl mb-2 group-hover:text-clay transition-colors">{i.title}</h3>
                <p className="text-night/65 text-sm leading-relaxed mb-3">{i.desc}</p>
                <p className="text-sm font-medium text-clay">{i.from}</p>
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
            Composer mon voyage →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
