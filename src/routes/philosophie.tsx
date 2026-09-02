import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/philosophie")({
  head: () => ({
    meta: [
      { title: "Notre philosophie — marocatlastour" },
      { name: "description", content: "Une approche artisanale du voyage au Maroc : adresses rares, artisans locaux, conciergerie 24/7 et tarifs transparents." },
    ],
  }),
  component: PhilosophiePage,
});

const TEXT = {
  fr: {
    eyebrow: "Philosophie",
    titleA: "Le voyage comme",
    titleB: "artisanat",
    intro: "Nous ne vendons pas des circuits. Nous composons des voyages, un par un, pour des voyageurs qui ne se ressemblent pas.",
    p1: "marocatlastour est née à Marrakech, du désir de proposer un Maroc plus juste, plus sincère, débarrassé des circuits standardisés et des adresses trop touristiques.",
    p2: "Notre configurateur n'est pas un simple formulaire : c'est une conversation. Vos réponses guident nos concepteurs, qui dessinent ensuite à la main votre itinéraire — étape par étape, hébergement par hébergement, expérience par expérience.",
    commitmentsTitle: "Nos engagements",
    commitments: [
      "Adresses sélectionnées et visitées en personne par notre équipe.",
      "Guides locaux francophones, rémunérés équitablement.",
      "Tarifs transparents, sans commission cachée.",
      "Empreinte limitée : transports groupés, partenaires engagés.",
      "Conciergerie 24/7 pendant tout votre séjour.",
    ],
    cta: "Commencer la création →",
  },
  en: {
    eyebrow: "Philosophy",
    titleA: "Travel as",
    titleB: "craftsmanship",
    intro: "We don't sell circuits. We compose journeys, one at a time, for travellers who are all different.",
    p1: "marocatlastour was born in Marrakech, out of a desire to offer a fairer, more sincere Morocco — free of standardised circuits and overly touristic addresses.",
    p2: "Our trip builder isn't a simple form: it's a conversation. Your answers guide our designers, who then hand-draw your itinerary — stage by stage, stay by stay, experience by experience.",
    commitmentsTitle: "Our commitments",
    commitments: [
      "Addresses selected and personally visited by our team.",
      "Local French-speaking guides, paid fairly.",
      "Transparent pricing, with no hidden commission.",
      "Limited footprint: pooled transport, committed partners.",
      "24/7 concierge throughout your stay.",
    ],
    cta: "Start creating →",
  },
} as const;

function PhilosophiePage() {
  const { language } = useLanguage();
  const t = TEXT[language];
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-32 px-6 md:px-8 pb-24">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <p className="label-eyebrow text-clay mb-4">{t.eyebrow}</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-10 text-balance leading-[1.05]">
            {t.titleA} <span className="italic text-clay">{t.titleB}</span>.
          </h1>
          <div className="space-y-8 text-night/75 leading-relaxed">
            <p className="text-xl font-serif italic text-night">
              {t.intro}
            </p>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <h2 className="font-serif text-3xl pt-6">{t.commitmentsTitle}</h2>
            <ul className="space-y-4">
              {t.commitments.map((c) => (
                <li key={c} className="flex gap-4 items-baseline">
                  <span className="w-6 h-px bg-clay shrink-0 translate-y-2" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 pt-10 border-t border-night/10">
            <Link to="/configurer" className="btn-primary">{t.cta}</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
