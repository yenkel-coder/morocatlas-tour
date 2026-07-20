import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import aboutImage from "@/assets/about-riad.jpg";

export const Route = createFileRoute("/qui-sommes-nous")({
  head: () => ({
    meta: [
      { title: "Qui sommes-nous — marocatlastour" },
      { name: "description", content: "Depuis plus de 20 ans, nous imaginons des voyages sur mesure au Maroc, sincères, élégants et profondément personnels." },
      { property: "og:title", content: "Qui sommes-nous — marocatlastour" },
      { property: "og:description", content: "Une équipe installée à Marrakech, un réseau d'adresses choisies et un accompagnement humain de bout en bout." },
      { property: "og:image", content: aboutImage },
    ],
  }),
  component: QuiSommesNousPage,
});

const PARAGRAPHS = [
  "Depuis plus de 20 ans, nous imaginons des voyages sur mesure au Maroc pour des voyageurs en quête d'expériences sincères, élégantes et profondément personnelles.",
  "Notre métier ne consiste pas à vendre des circuits standardisés. Nous concevons, avec exigence et sens du détail, des itinéraires façonnés selon votre rythme, vos envies, votre budget et votre manière de voyager.",
  "Installée à Marrakech, notre équipe s'appuie sur une connaissance fine du terrain, un réseau d'adresses sélectionnées avec soin et une relation privilégiée avec des partenaires locaux de confiance.",
  "Chaque projet commence par une écoute attentive. À partir de vos inspirations, nous composons un voyage fluide, cohérent et vivant, où chaque étape a sa raison d'être.",
  "Riads de charme, paysages minéraux, vallées secrètes, médinas vibrantes, rencontres humaines, haltes confidentielles : nous dessinons des séjours qui révèlent un Maroc sensible, généreux et multiple.",
  "Avant, pendant et après votre départ, nous restons présents avec un accompagnement humain, réactif et attentif à chaque détail.",
  "Plus qu'un itinéraire, nous créons une expérience juste, sur mesure, et fidèle à ce que vous êtes.",
];

function QuiSommesNousPage() {
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-28 md:pt-32 pb-20">
        <section className="px-6 md:px-8">
          <div className="max-w-7xl mx-auto grid gap-12 lg:gap-20 lg:grid-cols-12 items-start">
            {/* Text */}
            <div className="lg:col-span-7 animate-fade-up">
              <p className="label-eyebrow text-clay mb-4">Qui sommes-nous</p>
              <h1 className="font-serif text-4xl md:text-6xl mb-10 text-balance leading-[1.05]">
                Le Maroc, <span className="italic text-clay">pensé avec vous</span>.
              </h1>
              <div className="space-y-6 text-night/85 leading-relaxed text-[15px] md:text-base">
                <p className="text-lg md:text-xl font-serif italic text-night leading-snug">
                  {PARAGRAPHS[0]}
                </p>
                {PARAGRAPHS.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/configurer" className="btn-brand">
                  Composer mon voyage
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms] lg:sticky lg:top-28">
              <div className="relative">
                <img
                  src={aboutImage}
                  alt="Patio d'un riad marocain, lumière naturelle et zellige"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover shadow-soft"
                />
                <div className="hidden md:block absolute -bottom-6 -left-6 bg-sand-soft p-6 max-w-[260px] shadow-card">
                  <p className="font-serif italic text-sm text-night/85 leading-relaxed">
                    « Plus qu'un itinéraire, une expérience juste, fidèle à ce que vous êtes. »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
