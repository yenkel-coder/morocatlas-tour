import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions générales — marocatlastour" },
      { name: "description", content: "Conditions générales d'utilisation du configurateur de voyage marocatlastour." },
    ],
  }),
  component: CgvPage,
});

function CgvPage() {
  const { language } = useLanguage();

  if (language === "en") {
    return (
      <div className="min-h-screen bg-sand text-night">
        <SiteHeader />
        <main className="pt-32 px-6 md:px-8 pb-24">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <p className="label-eyebrow text-clay mb-4">Legal information</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-10 text-balance leading-[1.05]">
              Terms and conditions
            </h1>

            <div className="space-y-10 text-night/75 leading-relaxed">
              <section>
                <h2 className="font-serif text-2xl text-night mb-3">1. Purpose</h2>
                <p>
                  These terms and conditions define the rules for using the site
                  marocatlastour.com and its trip builder. They apply to anyone browsing the
                  site or submitting a quote request.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">2. Nature of the service</h2>
                <p>
                  marocatlastour.com is a presentation and introduction site. The trip builder
                  lets you submit a <strong>quote request</strong> for a tailor-made trip to
                  Morocco: it is neither a firm booking nor an online purchase. No payment is
                  taken on the site.
                </p>
                <p className="mt-2">
                  After receiving your request, a personalised quote is sent to you by email,
                  usually within 48 hours. The precise details of the trip (final price, dates,
                  cancellation terms, payment methods) are then agreed directly with you, outside
                  the site, before any confirmation.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">3. Quote request</h2>
                <p>
                  By submitting the trip builder form, you agree to be contacted by email or
                  phone about your request. The information provided (dates, number of
                  travellers, preferences) is indicative and may be refined during the
                  conversation that follows your request.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">4. Liability</h2>
                <p>
                  Information presented on the site (circuit descriptions, indicative prices,
                  photographs) is provided for illustrative purposes and is subject to change.
                  It does not constitute a contractual offer until a final quote has been
                  accepted by both parties.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">5. Governing law</h2>
                <p>
                  These terms are governed by French law. In the event of a dispute, an amicable
                  solution will be sought as a priority before any legal action.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">6. Contact</h2>
                <p>
                  For any question relating to these terms, you can write to us at{" "}
                  <a href="mailto:contact@marocatlastour.com" className="text-clay hover:underline">contact@marocatlastour.com</a>.
                </p>
              </section>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-32 px-6 md:px-8 pb-24">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <p className="label-eyebrow text-clay mb-4">Informations légales</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-10 text-balance leading-[1.05]">
            Conditions générales
          </h1>

          <div className="space-y-10 text-night/75 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-night mb-3">1. Objet</h2>
              <p>
                Les présentes conditions générales définissent les modalités d'utilisation du
                site marocatlastour.com et de son configurateur de voyage. Elles s'appliquent
                à toute personne consultant le site ou soumettant une demande de devis.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">2. Nature du service</h2>
              <p>
                marocatlastour.com est un site de présentation et de mise en relation. Le
                configurateur permet de formuler une <strong>demande de devis</strong> pour un
                voyage sur mesure au Maroc : il ne s'agit ni d'une réservation ferme, ni d'un
                achat en ligne. Aucun paiement n'est effectué sur le site.
              </p>
              <p className="mt-2">
                Après réception de votre demande, un devis personnalisé vous est communiqué par
                email, généralement sous 48 heures. Les modalités précises du voyage (prix
                définitif, dates, conditions d'annulation, moyens de paiement) sont ensuite
                convenues directement avec vous, en dehors du site, avant toute confirmation.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">3. Demande de devis</h2>
              <p>
                En soumettant le formulaire du configurateur, vous acceptez d'être recontacté
                par email ou téléphone au sujet de votre demande. Les informations fournies
                (dates, nombre de voyageurs, préférences) sont indicatives et pourront être
                affinées lors de l'échange qui suit votre demande.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">4. Responsabilité</h2>
              <p>
                Les informations présentées sur le site (descriptions de circuits, tarifs
                indicatifs, photographies) le sont à titre illustratif et sont susceptibles
                d'évoluer. Elles ne constituent pas une offre contractuelle tant qu'un devis
                définitif n'a pas été accepté par les deux parties.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">5. Droit applicable</h2>
              <p>
                Les présentes conditions sont soumises au droit français. En cas de litige,
                une solution amiable sera recherchée en priorité avant toute action judiciaire.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">6. Contact</h2>
              <p>
                Pour toute question relative à ces conditions, vous pouvez nous écrire à{" "}
                <a href="mailto:contact@marocatlastour.com" className="text-clay hover:underline">contact@marocatlastour.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
