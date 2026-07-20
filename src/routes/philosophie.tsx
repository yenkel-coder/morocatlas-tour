import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/philosophie")({
  head: () => ({
    meta: [
      { title: "Notre philosophie — marocatlastour" },
      { name: "description", content: "Une approche artisanale du voyage au Maroc : adresses rares, artisans locaux, conciergerie 24/7 et tarifs transparents." },
    ],
  }),
  component: PhilosophiePage,
});

function PhilosophiePage() {
  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-32 px-6 md:px-8 pb-24">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <p className="label-eyebrow text-clay mb-4">Philosophie</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-10 text-balance leading-[1.05]">
            Le voyage comme <span className="italic text-clay">artisanat</span>.
          </h1>
          <div className="space-y-8 text-night/75 leading-relaxed">
            <p className="text-xl font-serif italic text-night">
              Nous ne vendons pas des circuits. Nous composons des voyages, un par un,
              pour des voyageurs qui ne se ressemblent pas.
            </p>
            <p>
              marocatlastour est née à Marrakech, du désir de proposer un Maroc plus juste,
...
            </p>
            <p>
              Notre configurateur n'est pas un simple formulaire : c'est une conversation.
              Vos réponses guident nos concepteurs, qui dessinent ensuite à la main votre
              itinéraire — étape par étape, hébergement par hébergement, expérience par
              expérience.
            </p>
            <h2 className="font-serif text-3xl pt-6">Nos engagements</h2>
            <ul className="space-y-4">
              {[
                "Adresses sélectionnées et visitées en personne par notre équipe.",
                "Guides locaux francophones, rémunérés équitablement.",
                "Tarifs transparents, sans commission cachée.",
                "Empreinte limitée : transports groupés, partenaires engagés.",
                "Conciergerie 24/7 pendant tout votre séjour.",
              ].map((c) => (
                <li key={c} className="flex gap-4 items-baseline">
                  <span className="w-6 h-px bg-clay shrink-0 translate-y-2" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 pt-10 border-t border-night/10">
            <Link to="/configurer" className="btn-primary">Commencer la création →</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
