import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getCircuitBySlug } from "@/lib/circuits";
import inspSahara from "@/assets/insp-sahara.jpg";
import inspAtlas from "@/assets/insp-atlas.jpg";
import inspMedina from "@/assets/insp-medina.jpg";

const imageMap: Record<string, string> = {
  "/assets/insp-sahara.jpg": inspSahara,
  "/assets/insp-atlas.jpg": inspAtlas,
  "/assets/insp-medina.jpg": inspMedina,
};

export const Route = createFileRoute("/inspirations/$slug")({
  head: ({ params }) => {
    const circuit = getCircuitBySlug(params.slug);
    return {
      meta: [
        { title: circuit ? `${circuit.title} — marocatlastour` : "Circuit introuvable" },
        { name: "description", content: circuit?.desc ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const circuit = getCircuitBySlug(params.slug);
    if (!circuit) throw notFound();
    return circuit;
  },
  component: CircuitDetailPage,
});

function CircuitDetailPage() {
  const circuit = Route.useLoaderData();
  const image = imageMap[circuit.image] ?? inspSahara;

  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={image}
          alt={circuit.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-night/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-16">
          <p className="label-eyebrow text-sand/70 mb-2">{circuit.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl text-sand">{circuit.title}</h1>
          <p className="text-sand/80 mt-3 max-w-xl text-lg">{circuit.desc}</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 grid md:grid-cols-3 gap-12">

        {/* Left column */}
        <div className="md:col-span-2 space-y-12">

          {/* Points forts */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Points forts</h2>
            <ul className="space-y-3">
              {circuit.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-clay flex-shrink-0" />
                  <span className="text-night/80">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinéraire */}
          <section>
            <h2 className="font-serif text-2xl mb-6">Itinéraire jour par jour</h2>
            <ol className="space-y-4">
              {circuit.itinerary.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-20 flex-shrink-0 text-clay font-medium text-sm pt-0.5">{step.day}</div>
                  <div className="text-night/80">{step.label}</div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right column — sidebar */}
        <aside className="space-y-8">

          {/* Prix & CTA */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-night/50 uppercase tracking-wider mb-1">Tarif indicatif</p>
            <p className="font-serif text-3xl text-clay mb-4">{circuit.from}</p>
            <Link
              to="/configurer"
              search={{ etape: 1 }}
              className="block w-full text-center bg-clay text-sand py-3 rounded-xl font-medium hover:bg-clay/90 transition-colors"
            >
              Composer ce voyage →
            </Link>
          </div>

          {/* Inclus */}
          <div>
            <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Inclus</h3>
            <ul className="space-y-2">
              {circuit.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-night/70">
                  <span className="text-green-600 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Non inclus */}
          <div>
            <h3 className="font-medium mb-3 text-sm uppercase tracking-wider">Non inclus</h3>
            <ul className="space-y-2">
              {circuit.notIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-night/70">
                  <span className="text-clay mt-0.5">×</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Retour */}
          <Link
            to="/inspirations"
            className="block text-sm text-night/50 hover:text-clay transition-colors"
          >
            ← Tous les circuits
          </Link>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
