import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroRiad from "@/assets/hero-riad.jpg";
import inspSahara from "@/assets/insp-sahara.jpg";
import inspAtlas from "@/assets/insp-atlas.jpg";
import inspMedina from "@/assets/insp-medina.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Le Maroc en images | marocatlastour" },
      { name: "description", content: "Une galerie immersive du Maroc : riads, médinas, dunes, montagnes et artisans. Inspirez votre prochain voyage sur mesure." },
      { property: "og:title", content: "Galerie — Le Maroc en images | marocatlastour" },
      { property: "og:description", content: "Riads, médinas, dunes, montagnes et artisans : laissez-vous porter par le Maroc." },
      { property: "og:image", content: heroRiad },
    ],
  }),
  component: GaleriePage,
});

type Item = { src: string; alt: string; caption: string };

const ITEMS: Item[] = [
  { src: heroRiad, alt: "Patio d'un riad marocain", caption: "Riad — Marrakech" },
  { src: inspSahara, alt: "Dunes du Sahara au coucher du soleil", caption: "Erg Chigaga — Sahara" },
  { src: inspAtlas, alt: "Vallées de l'Atlas marocain", caption: "Vallée — Atlas" },
  { src: inspMedina, alt: "Ruelle d'une médina marocaine", caption: "Médina — Fès" },
  { src: heroRiad, alt: "Zellige et patio", caption: "Détail — Zellige" },
  { src: inspAtlas, alt: "Kasbah en pisé", caption: "Kasbah — Aït Ben Haddou" },
  { src: inspSahara, alt: "Camp berbère sous les étoiles", caption: "Bivouac — Merzouga" },
  { src: inspMedina, alt: "Souk et artisans", caption: "Souk — Marrakech" },
  { src: heroRiad, alt: "Thé à la menthe sur une terrasse", caption: "Terrasse — Médina" },
];

function GaleriePage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isOpen = openIdx !== null;

  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i - 1 + ITEMS.length) % ITEMS.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? i : (i + 1) % ITEMS.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  const open = (i: number) => setOpenIdx(i);
  const current = openIdx !== null ? ITEMS[openIdx] : null;

  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-28 md:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl mb-12 md:mb-16 animate-fade-up">
            <p className="label-eyebrow text-clay mb-4">Galerie</p>
            <h1 className="font-serif text-4xl md:text-6xl mb-6 text-balance leading-[1.05]">
              Le Maroc, <span className="italic text-clay">image après image</span>.
            </h1>
            <p className="text-base md:text-lg text-night/65 leading-relaxed">
              Une immersion visuelle dans les lieux, les matières et les rencontres
              qui inspirent nos voyages sur mesure.
            </p>
          </div>

          {/* Mobile — vertical immersive feed */}
          <div className="md:hidden flex flex-col gap-3">
            {ITEMS.map((it, i) => (
              <button
                key={i}
                type="button"
                onClick={() => open(i)}
                aria-label={`Ouvrir : ${it.caption}`}
                className="relative overflow-hidden w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent text-sand text-xs uppercase tracking-[0.18em] px-4 py-3 text-left">
                  {it.caption}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop masonry */}
          <div className="hidden md:block columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {ITEMS.map((it, i) => (
              <button
                key={i}
                type="button"
                onClick={() => open(i)}
                aria-label={`Ouvrir : ${it.caption}`}
                className="break-inside-avoid mb-6 overflow-hidden group relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "4 / 5" : "1 / 1" }}
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-night/70 to-transparent text-sand text-[10px] uppercase tracking-[0.2em] px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity text-left">
                  {it.caption}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/configurer" className="btn-brand">Composer mon voyage →</Link>
          </div>
        </div>
      </main>
      <SiteFooter />

      {/* Lightbox */}
      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image : ${current.caption}`}
          className="fixed inset-0 z-[100] bg-night/95 backdrop-blur-sm flex flex-col animate-fade-up"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 md:px-8 py-4 text-sand">
            <span className="text-[11px] uppercase tracking-[0.22em] text-sand/70">
              {String((openIdx ?? 0) + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Fermer"
              className="inline-flex items-center justify-center w-11 h-11 hover:text-clay transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              <X size={22} />
            </button>
          </div>

          {/* Image area */}
          <div className="relative flex-1 flex items-center justify-center px-4 md:px-16">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Image précédente"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 text-sand hover:text-clay bg-night/40 hover:bg-night/60 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              <ChevronLeft size={26} />
            </button>

            <img
              key={openIdx}
              src={current.src}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] max-w-full object-contain shadow-soft animate-fade-up"
            />

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Image suivante"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 text-sand hover:text-clay bg-night/40 hover:bg-night/60 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              <ChevronRight size={26} />
            </button>
          </div>

          {/* Caption */}
          <div
            className="px-6 md:px-8 pb-8 pt-6 text-center text-sand"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-xl md:text-2xl italic">{current.caption}</p>
            <p className="mt-2 text-xs md:text-sm text-sand/60">{current.alt}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-sand/40">
              Échap pour fermer · ← → pour naviguer
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
