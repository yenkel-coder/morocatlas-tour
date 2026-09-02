import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/lib/i18n";
import gKoutoubia from "@/assets/gallery/g-koutoubia.jpg";
import gPetitdej1 from "@/assets/gallery/g-petitdej-1.jpg";
import gPetitdej2 from "@/assets/gallery/g-petitdej-2.jpg";
import gDiner from "@/assets/gallery/g-diner.jpg";
import gGueliz from "@/assets/gallery/g-gueliz.jpg";
import gFamilleGorges from "@/assets/gallery/g-famille-gorges.jpg";
import gKasbahVisite1 from "@/assets/gallery/g-kasbah-visite-1.jpg";
import gKasbahVisite2 from "@/assets/gallery/g-kasbah-visite-2.jpg";
import gBouddha from "@/assets/gallery/g-bouddha.jpg";
import gAtlas1 from "@/assets/gallery/g-atlas-1.jpg";
import gAtlas2 from "@/assets/gallery/g-atlas-2.jpg";
import gMarcheCaftans from "@/assets/gallery/g-marche-caftans.jpg";
import gPetitdejAgadir from "@/assets/gallery/g-petitdej-agadir.jpg";
import gPanneauSouk from "@/assets/gallery/g-panneau-souk.jpg";
import gPiscineNuit from "@/assets/gallery/g-piscine-nuit.jpg";
import gMajorelle from "@/assets/gallery/g-majorelle.jpg";
import gHassan2 from "@/assets/gallery/g-hassan2.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Le Maroc en images | marocatlastour" },
      { name: "description", content: "Une galerie immersive du Maroc : riads, médinas, dunes, montagnes et artisans. Inspirez votre prochain voyage sur mesure." },
      { property: "og:title", content: "Galerie — Le Maroc en images | marocatlastour" },
      { property: "og:description", content: "Riads, médinas, dunes, montagnes et artisans : laissez-vous porter par le Maroc." },
      { property: "og:image", content: gKoutoubia },
    ],
  }),
  component: GaleriePage,
});

type Item = { src: string; alt: { fr: string; en: string }; caption: { fr: string; en: string } };

const ITEMS: Item[] = [
  { src: gKoutoubia, alt: { fr: "Minaret de la Koutoubia au coucher du soleil", en: "The Koutoubia minaret at sunset" }, caption: { fr: "Koutoubia — Marrakech", en: "Koutoubia — Marrakech" } },
  { src: gHassan2, alt: { fr: "Mosquée Hassan II à Casablanca", en: "Hassan II Mosque in Casablanca" }, caption: { fr: "Mosquée Hassan II — Casablanca", en: "Hassan II Mosque — Casablanca" } },
  { src: gMajorelle, alt: { fr: "Jardin Majorelle et son bleu emblématique", en: "Majorelle Garden and its iconic blue" }, caption: { fr: "Jardin Majorelle — Marrakech", en: "Majorelle Garden — Marrakech" } },
  { src: gAtlas1, alt: { fr: "Crêtes de l'Atlas et vallée encaissée", en: "Atlas ridgelines above a deep valley" }, caption: { fr: "Montagnes de l'Atlas", en: "The Atlas Mountains" } },
  { src: gAtlas2, alt: { fr: "Panorama sur les collines de l'Atlas", en: "Panoramic view over the Atlas foothills" }, caption: { fr: "Route de l'Atlas", en: "The Atlas road" } },
  { src: gKasbahVisite1, alt: { fr: "Visite guidée d'une kasbah en pisé", en: "Guided visit of a rammed-earth kasbah" }, caption: { fr: "Visite de kasbah", en: "Kasbah visit" } },
  { src: gKasbahVisite2, alt: { fr: "Ruelles d'une kasbah traditionnelle", en: "Alleys of a traditional kasbah" }, caption: { fr: "Kasbah — Sud marocain", en: "Kasbah — Southern Morocco" } },
  { src: gMarcheCaftans, alt: { fr: "Marché coloré et caftans traditionnels", en: "A colourful market and traditional caftans" }, caption: { fr: "Marché aux caftans", en: "Caftan market" } },
  { src: gGueliz, alt: { fr: "Avenue moderne bordée de palmiers à Marrakech", en: "A modern palm-lined avenue in Marrakech" }, caption: { fr: "Guéliz — Marrakech moderne", en: "Guéliz — Modern Marrakech" } },
  { src: gPanneauSouk, alt: { fr: "Enseigne artisanale colorée dans un souk", en: "A colourful hand-painted sign in a souk" }, caption: { fr: "Détail — Souk d'Essaouira", en: "Detail — Essaouira souk" } },
  { src: gPiscineNuit, alt: { fr: "Piscine de riad illuminée à la nuit tombée", en: "A riad pool lit up after dark" }, caption: { fr: "Riad de nuit", en: "Riad by night" } },
  { src: gBouddha, alt: { fr: "Statue dorée dans une boutique d'antiquités", en: "A golden statue in an antiques shop" }, caption: { fr: "Artisanat & antiquités", en: "Craft & antiques" } },
  { src: gPetitdej1, alt: { fr: "Petit-déjeuner marocain en terrasse de riad", en: "Moroccan breakfast on a riad terrace" }, caption: { fr: "Petit-déjeuner — Riad", en: "Breakfast — Riad" } },
  { src: gPetitdej2, alt: { fr: "Jus d'orange frais et viennoiseries", en: "Fresh orange juice and pastries" }, caption: { fr: "Douceurs du matin", en: "Morning treats" } },
  { src: gPetitdejAgadir, alt: { fr: "Pâtisseries en famille sur la corniche d'Agadir", en: "Family pastries on the Agadir seafront" }, caption: { fr: "En famille — Agadir", en: "With family — Agadir" } },
  { src: gDiner, alt: { fr: "Dîner gourmet en soirée", en: "An elegant evening dinner" }, caption: { fr: "Dîner du soir", en: "Evening dinner" } },
  { src: gFamilleGorges, alt: { fr: "Famille en excursion dans les gorges", en: "A family excursion through the gorges" }, caption: { fr: "En famille — Gorges", en: "With family — Gorges" } },
];

const TEXT = {
  fr: {
    eyebrow: "Galerie",
    titleA: "Le Maroc,",
    titleB: "image après image",
    body: "Une immersion visuelle dans les lieux, les matières et les rencontres qui inspirent nos voyages sur mesure.",
    open: (caption: string) => `Ouvrir : ${caption}`,
    close: "Fermer",
    prev: "Image précédente",
    next: "Image suivante",
    imageOf: (caption: string) => `Image : ${caption}`,
    hint: "Échap pour fermer · ← → pour naviguer",
    cta: "Composer mon voyage →",
  },
  en: {
    eyebrow: "Gallery",
    titleA: "Morocco,",
    titleB: "image after image",
    body: "A visual immersion in the places, textures and encounters that inspire our tailor-made journeys.",
    open: (caption: string) => `Open: ${caption}`,
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    imageOf: (caption: string) => `Image: ${caption}`,
    hint: "Esc to close · ← → to navigate",
    cta: "Design my trip →",
  },
} as const;

function GaleriePage() {
  const { language } = useLanguage();
  const t = TEXT[language];
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
            <p className="label-eyebrow text-clay mb-4">{t.eyebrow}</p>
            <h1 className="font-serif text-4xl md:text-6xl mb-6 text-balance leading-[1.05]">
              {t.titleA} <span className="italic text-clay">{t.titleB}</span>.
            </h1>
            <p className="text-base md:text-lg text-night/65 leading-relaxed">
              {t.body}
            </p>
          </div>

          {/* Mobile — vertical immersive feed */}
          <div className="md:hidden flex flex-col gap-3">
            {ITEMS.map((it, i) => (
              <button
                key={i}
                type="button"
                onClick={() => open(i)}
                aria-label={t.open(it.caption[language])}
                className="relative overflow-hidden w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
              >
                <img
                  src={it.src}
                  alt={it.alt[language]}
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent text-sand text-xs uppercase tracking-[0.18em] px-4 py-3 text-left">
                  {it.caption[language]}
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
                aria-label={t.open(it.caption[language])}
                className="break-inside-avoid mb-6 overflow-hidden group relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "4 / 5" : "1 / 1" }}
              >
                <img
                  src={it.src}
                  alt={it.alt[language]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-night/70 to-transparent text-sand text-[10px] uppercase tracking-[0.2em] px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity text-left">
                  {it.caption[language]}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link to="/configurer" className="btn-brand">{t.cta}</Link>
          </div>
        </div>
      </main>
      <SiteFooter />

      {/* Lightbox */}
      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.imageOf(current.caption[language])}
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
              aria-label={t.close}
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
              aria-label={t.prev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 text-sand hover:text-clay bg-night/40 hover:bg-night/60 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              <ChevronLeft size={26} />
            </button>

            <img
              key={openIdx}
              src={current.src}
              alt={current.alt[language]}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] max-w-full object-contain shadow-soft animate-fade-up"
            />

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t.next}
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
            <p className="font-serif text-xl md:text-2xl italic">{current.caption[language]}</p>
            <p className="mt-2 text-xs md:text-sm text-sand/60">{current.alt[language]}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-sand/40">
              {t.hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
