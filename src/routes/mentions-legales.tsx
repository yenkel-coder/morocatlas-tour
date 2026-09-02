import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — marocatlastour" },
      { name: "description", content: "Mentions légales du site marocatlastour : éditeur, hébergement et propriété intellectuelle." },
    ],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  const { language } = useLanguage();

  if (language === "en") {
    return (
      <div className="min-h-screen bg-sand text-night">
        <SiteHeader />
        <main className="pt-32 px-6 md:px-8 pb-24">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <p className="label-eyebrow text-clay mb-4">Legal information</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-10 text-balance leading-[1.05]">
              Legal notice
            </h1>

            <div className="space-y-10 text-night/75 leading-relaxed">
              <section>
                <h2 className="font-serif text-2xl text-night mb-3">Site publisher</h2>
                <p>
                  The site marocatlastour.com is published by Mhandi, a private individual
                  residing in Paris, Île-de-France, France, acting in a non-professional capacity.
                </p>
                <p className="mt-2">
                  Contact: <a href="mailto:contact@marocatlastour.com" className="text-clay hover:underline">contact@marocatlastour.com</a>
                  {" "}— <a href="tel:+33780390269" className="text-clay hover:underline">+33 7 80 39 02 69</a>
                </p>
                <p className="mt-2">Publication director: Mhandi.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">Hosting</h2>
                <p>
                  This site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
                  United States.
                </p>
                <p className="mt-2">
                  Quote requests submitted through the site are delivered via the Resend
                  email service (Resend Inc.).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">Intellectual property</h2>
                <p>
                  All content on this site (text, photographs, logo, layout) is protected by
                  copyright. Any reproduction or reuse, in whole or in part, without prior
                  authorisation is prohibited.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">Nature of the site</h2>
                <p>
                  marocatlastour.com is a presentation and introduction site allowing you to
                  submit a quote request for a tailor-made trip to Morocco. It is not an online
                  sales platform for tourism services. See our{" "}
                  <a href="/cgv" className="text-clay hover:underline">terms and conditions</a>{" "}
                  for further details.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-night mb-3">Personal data</h2>
                <p>
                  Information submitted through the quote form (name, email, phone, travel
                  preferences) is used solely to prepare your quote and to contact you about it.
                  It is never sold or transferred to third parties. In accordance with the
                  General Data Protection Regulation (GDPR), you have the right to access,
                  rectify and delete your data, which you may exercise by writing to{" "}
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
            Mentions légales
          </h1>

          <div className="space-y-10 text-night/75 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-night mb-3">Éditeur du site</h2>
              <p>
                Le site marocatlastour.com est édité par Mhandi, personne physique domiciliée
                à Paris, Île-de-France, France, agissant à titre non professionnel.
              </p>
              <p className="mt-2">
                Contact : <a href="mailto:contact@marocatlastour.com" className="text-clay hover:underline">contact@marocatlastour.com</a>
                {" "}— <a href="tel:+33780390269" className="text-clay hover:underline">+33 7 80 39 02 69</a>
              </p>
              <p className="mt-2">Directeur de la publication : Mhandi.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">Hébergement</h2>
              <p>
                Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
                États-Unis.
              </p>
              <p className="mt-2">
                Les demandes de devis envoyées depuis le site sont transmises par l'intermédiaire
                du service d'emailing Resend (Resend Inc.).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur ce site (textes, photographies, logo,
                mise en page) est protégé par le droit d'auteur. Toute reproduction ou
                réutilisation, totale ou partielle, sans autorisation préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">Nature du site</h2>
              <p>
                marocatlastour.com est un site de présentation et de mise en relation permettant
                de formuler une demande de devis pour un voyage sur mesure au Maroc. Il ne
                constitue pas une plateforme de vente en ligne de prestations touristiques. Voir
                nos <a href="/cgv" className="text-clay hover:underline">conditions générales</a>{" "}
                pour plus de détails.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-night mb-3">Données personnelles</h2>
              <p>
                Les informations transmises via le formulaire de devis (nom, email, téléphone,
                préférences de voyage) sont utilisées uniquement pour l'établissement de votre
                devis et pour vous recontacter à ce sujet. Elles ne sont ni revendues, ni
                cédées à des tiers. Conformément au Règlement Général sur la Protection des
                Données (RGPD), vous disposez d'un droit d'accès, de rectification et de
                suppression de vos données, exerçable à l'adresse{" "}
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
