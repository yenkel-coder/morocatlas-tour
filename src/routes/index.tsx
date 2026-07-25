import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Gem, HeartHandshake } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroRiad from "@/assets/hero-riad.jpg";
import inspSahara from "@/assets/insp-sahara.jpg";
import inspAtlas from "@/assets/insp-atlas.jpg";
import inspMedina from "@/assets/insp-medina.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "marocatlastour — Circuits sur mesure au Maroc" },
      {
        name: "description",
        content:
          "Configurez votre voyage personnalisé au Maroc en 10 étapes. Riads, Sahara, Atlas, médinas — recevez un devis qualifié sous 48h.",
      },
    ],
  }),
  component: HomePage,
});

const inspirations = [
  {
    image: inspSahara,
    eyebrow: "08 jours · Guide privé",
    title: "Le seuil du Sahara",
    desc: "Bivouac sous les étoiles à Erg Chigaga, oasis de Mhamid et thé chez les nomades.",
    from: "À partir de 2 900 €",
  },
  {
    image: inspAtlas,
    eyebrow: "12 jours · Lent & immersif",
    title: "Atlas et vallées cachées",
    desc: "Randonnées douces, kasbahs en pisé et nuits chez l'habitant à Imlil et rabat.",
    from: "À partir de 3 400 €",
  },
  {
    image: inspMedina,
    eyebrow: "06 jours · Culturel",
    title: "Médinas & artisans",
    desc: "Marrakech, Fès et Tétouan. Ateliers privés de zellige, tannerie et soie.",
    from: "À partir de 2 100 €",
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="pt-32 md:pt-40 pb-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-2 items-center">
            <div className="space-y-8 animate-fade-up">
              <span className="label-eyebrow text-clay">Sur-mesure · Authentique</span>
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-balance">
                L'âme du <span className="italic text-clay">Maroc</span>,<br />
                tracée pour vous.
              </h1>
              <p className="text-base md:text-lg text-night/80 leading-relaxed max-w-xl">
                Depuis plus de 20 ans, nous concevons des voyages sur mesure au Maroc,
                pensés dans les moindres détails selon vos envies, votre rythme et votre
                budget. De la première inspiration aux dernières étapes de votre itinéraire,
                nous vous accompagnons avec une approche humaine, locale et attentive, pour
                créer une expérience fluide, sincère et profondément personnalisée.
              </p>
              <div className="pt-2">
                <Link to="/qui-sommes-nous" className="btn-brand">
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-up [animation-delay:120ms]">
              <img
                src={heroRiad}
                alt="Cour intérieure d'un riad marocain au coucher du soleil"
                width={1024}
                height={1280}
                className="w-full aspect-[3/4] object-cover shadow-soft"
              />
              <div className="hidden lg:block absolute -bottom-8 -left-8 bg-sand-soft p-7 max-w-[260px] shadow-card">
                <p className="font-serif italic text-sm text-night/70 leading-relaxed">
                  « Chaque circuit est une pièce d'artisanat unique, tissée selon votre
                  rythme. »
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-8 py-24 bg-night text-sand">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="label-eyebrow text-clay-soft">Prêt à partir ?</p>
            <h2 className="font-serif text-4xl md:text-5xl text-balance">
              Votre voyage commence par <span className="italic">une envie</span>.
            </h2>
            <p className="text-sand/85 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Partagez vos idées, vos dates et votre rythme, nous imaginons pour vous un
              itinéraire sur mesure, accompagné d'une proposition personnalisée sous 48h.
            </p>
            <div className="pt-2">
              <Link
                to="/configurer"
                className="inline-flex items-center gap-3 bg-sand text-night px-10 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-clay hover:text-sand transition-colors"
              >
                Démarrer le configurateur
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES / RASSURANCE */}
        <section className="px-6 md:px-8 py-24 md:py-28 bg-sand-soft">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-14 md:gap-10 md:grid-cols-3">
              {[
                {
                  Icon: Compass,
                  title: "Itinéraires vraiment sur mesure",
                  desc: "Chaque voyage est construit selon votre rythme, vos envies, votre budget et les temps de trajet réels.",
                },
                {
                  Icon: Gem,
                  title: "Adresses sélectionnées avec soin",
                  desc: "Riads de charme, expériences confidentielles et rencontres locales choisies pour leur authenticité.",
                },
                {
                  Icon: HeartHandshake,
                  title: "Accompagnement de A à Z",
                  desc: "Avant, pendant et après le séjour, notre équipe vous accompagne avec un suivi humain et réactif.",
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-sand/60 md:bg-transparent p-8 md:p-6 space-y-5 border-t border-clay/30 md:border-t-0"
                >
                  <Icon className="text-clay" size={32} strokeWidth={1.2} />
                  <h3 className="font-serif text-2xl leading-snug">{title}</h3>
                  <p className="text-sm md:text-[15px] text-night/80 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSPIRATIONS */}
        <section className="px-6 md:px-8 pt-24 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="label-eyebrow mb-3">Inspirations</p>
                <h2 className="font-serif text-4xl md:text-5xl">Circuits signature</h2>
              </div>
              <Link
                to="/inspirations"
                className="hidden md:inline-flex text-[11px] uppercase tracking-[0.22em] border-b border-clay pb-1 hover:text-clay"
              >
                Voir tous les circuits
              </Link>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              {inspirations.map((i) => (
                <article key={i.title} className="group">
                  <div className="overflow-hidden mb-6 aspect-[4/5]">
                    <img
                      src={i.image}
                      alt={i.title}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-clay mb-2">
                    {i.eyebrow}
                  </p>
                  <h3 className="font-serif text-xl mb-2">{i.title}</h3>
                  <p className="text-sm text-night/75 leading-relaxed mb-3">{i.desc}</p>
                  <p className="text-sm italic text-night/80">{i.from}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
