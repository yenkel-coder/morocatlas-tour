import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import aboutImage from "@/assets/about-riad.jpg";
import { useLanguage } from "@/lib/i18n";

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

const CONTENT = {
  fr: {
    eyebrow: "Qui sommes-nous",
    titleA: "Le Maroc,",
    titleB: "pensé avec vous",
    cta: "Composer mon voyage",
    quote: "« Plus qu'un itinéraire, une expérience juste, fidèle à ce que vous êtes. »",
    imgAlt: "Patio d'un riad marocain, lumière naturelle et zellige",
    paragraphs: [
      "Depuis plus de 20 ans, nous imaginons des voyages sur mesure au Maroc pour des voyageurs en quête d'expériences sincères, élégantes et profondément personnelles.",
      "Notre métier ne consiste pas à vendre des circuits standardisés. Nous concevons, avec exigence et sens du détail, des itinéraires façonnés selon votre rythme, vos envies, votre budget et votre manière de voyager.",
      "Installée à Marrakech, notre équipe s'appuie sur une connaissance fine du terrain, un réseau d'adresses sélectionnées avec soin et une relation privilégiée avec des partenaires locaux de confiance.",
      "Chaque projet commence par une écoute attentive. À partir de vos inspirations, nous composons un voyage fluide, cohérent et vivant, où chaque étape a sa raison d'être.",
      "Riads de charme, paysages minéraux, vallées secrètes, médinas vibrantes, rencontres humaines, haltes confidentielles : nous dessinons des séjours qui révèlent un Maroc sensible, généreux et multiple.",
      "Avant, pendant et après votre départ, nous restons présents avec un accompagnement humain, réactif et attentif à chaque détail.",
      "Plus qu'un itinéraire, nous créons une expérience juste, sur mesure, et fidèle à ce que vous êtes.",
    ],
  },
  en: {
    eyebrow: "About us",
    titleA: "Morocco,",
    titleB: "designed with you",
    cta: "Design my trip",
    quote: "\"More than an itinerary — a fitting experience, true to who you are.\"",
    imgAlt: "Courtyard of a Moroccan riad, natural light and zellige tilework",
    paragraphs: [
      "For over 20 years, we've been designing tailor-made journeys across Morocco for travellers seeking experiences that are sincere, elegant and deeply personal.",
      "Our craft isn't selling standardised circuits. With rigour and an eye for detail, we design itineraries shaped around your pace, your desires, your budget and the way you like to travel.",
      "Based in Marrakech, our team draws on deep local knowledge, a network of carefully chosen addresses, and a close relationship with trusted local partners.",
      "Every project begins with attentive listening. Starting from your inspirations, we compose a journey that is fluid, coherent and alive, where every stage has a reason to exist.",
      "Charming riads, mineral landscapes, secret valleys, vibrant medinas, human encounters, confidential hideaways: we design stays that reveal a Morocco that is sensitive, generous and multi-faceted.",
      "Before, during and after your departure, we remain present with a human, responsive follow-up, attentive to every detail.",
      "More than an itinerary, we create a fitting experience — tailor-made, and true to who you are.",
    ],
  },
} as const;

function QuiSommesNousPage() {
  const { language } = useLanguage();
  const t = CONTENT[language];
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-28 md:pt-32 pb-20">
        <section className="px-6 md:px-8">
          <div className="max-w-7xl mx-auto grid gap-12 lg:gap-20 lg:grid-cols-12 items-start">
            {/* Text */}
            <div className="lg:col-span-7 animate-fade-up">
              <p className="label-eyebrow text-clay mb-4">{t.eyebrow}</p>
              <h1 className="font-serif text-4xl md:text-6xl mb-10 text-balance leading-[1.05]">
                {t.titleA} <span className="italic text-clay">{t.titleB}</span>.
              </h1>
              <div className="space-y-6 text-night/85 leading-relaxed text-[15px] md:text-base">
                <p className="text-lg md:text-xl font-serif italic text-night leading-snug">
                  {t.paragraphs[0]}
                </p>
                {t.paragraphs.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/configurer" className="btn-brand">
                  {t.cta}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms] lg:sticky lg:top-28">
              <div className="relative">
                <img
                  src={aboutImage}
                  alt={t.imgAlt}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover shadow-soft"
                />
                <div className="hidden md:block absolute -bottom-6 -left-6 bg-sand-soft p-6 max-w-[260px] shadow-card">
                  <p className="font-serif italic text-sm text-night/85 leading-relaxed">
                    {t.quote}
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
