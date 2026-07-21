export type Circuit = {
  slug: string;
  eyebrow: string;
  title: string;
  desc: string;
  from: string;
  image: string;
  highlights: string[];
  itinerary: { day: string; label: string }[];
  included: string[];
  notIncluded: string[];
};

export const circuits: Circuit[] = [
  {
    slug: "le-seuil-du-sahara",
    eyebrow: "08 jours · Guide privé",
    title: "Le seuil du Sahara",
    desc: "Bivouac sous les étoiles à Erg Chigaga, oasis de Mhamid et thé chez les nomades.",
    from: "À partir de 2 900 €",
    image: "/assets/insp-sahara.jpg",
    highlights: [
      "Bivouac en camp de luxe à Erg Chigaga",
      "Rencontre avec des familles nomades",
      "Oasis de Mhamid et palmeraie de Tamegroute",
      "Nuit sous un ciel étoilé exceptionnel",
      "Guide privé francophone tout au long du séjour",
    ],
    itinerary: [
      { day: "Jour 1", label: "Arrivée à Marrakech — installation et dîner de bienvenue" },
      { day: "Jour 2", label: "Route vers Ouarzazate via le col du Tichka" },
      { day: "Jour 3", label: "Aït Ben Haddou et vallée du Drâa" },
      { day: "Jour 4", label: "Mhamid — portes du désert" },
      { day: "Jour 5", label: "Erg Chigaga — arrivée à dos de dromadaire" },
      { day: "Jour 6", label: "Lever de soleil sur les dunes — journée libre au camp" },
      { day: "Jour 7", label: "Retour vers Zagora et Agdez" },
      { day: "Jour 8", label: "Transfert Marrakech — départ" },
    ],
    included: ["Transport privé climatisé", "Guide privé francophone", "7 nuits en hôtels & camp de luxe", "Petit-déjeuner chaque matin", "Dromadaire pour rejoindre le camp"],
    notIncluded: ["Vols internationaux", "Déjeuners et dîners (sauf mention)", "Assurance voyage"],
  },
  {
    slug: "atlas-et-vallees-cachees",
    eyebrow: "12 jours · Lent & immersif",
    title: "Atlas et vallées cachées",
    desc: "Randonnées douces, kasbahs en pisé et nuits chez l'habitant à Imlil et Aït Ben Haddou.",
    from: "À partir de 3 400 €",
    image: "/assets/insp-atlas.jpg",
    highlights: [
      "Randonnée dans la vallée de l'Ourika",
      "Nuits chez l'habitant à Imlil",
      "Kasbahs en pisé du XVIIe siècle",
      "Villages berbères isolés",
      "Cuisine traditionnelle faite maison",
    ],
    itinerary: [
      { day: "Jour 1", label: "Arrivée à Marrakech" },
      { day: "Jour 2", label: "Vallée de l'Ourika et cascades de Setti Fatma" },
      { day: "Jour 3", label: "Montée vers Imlil — accueil chez l'habitant" },
      { day: "Jour 4-5", label: "Randonnées dans le massif du Toubkal" },
      { day: "Jour 6", label: "Aït Ben Haddou — ksar classé UNESCO" },
      { day: "Jour 7-8", label: "Vallée des roses et gorges du Dadès" },
      { day: "Jour 9-10", label: "Vallée du Todgha et villages troglodytes" },
      { day: "Jour 11", label: "Retour vers Marrakech via Ouarzazate" },
      { day: "Jour 12", label: "Départ" },
    ],
    included: ["Transport privé", "Guide montagne certifié", "11 nuits en maisons d'hôtes & riad", "Petits-déjeuners et dîners"],
    notIncluded: ["Vols", "Déjeuners", "Assurance"],
  },
  {
    slug: "medinas-artisans",
    eyebrow: "06 jours · Culturel",
    title: "Médinas & artisans",
    desc: "Marrakech, Fès et Tétouan. Ateliers privés de zellige, tannerie et soie.",
    from: "À partir de 2 100 €",
    image: "/assets/insp-medina.jpg",
    highlights: [
      "Atelier privé de zellige à Fès",
      "Visite des tanneries Chouara",
      "Souk des tisserands de soie",
      "Médina de Tétouan classée UNESCO",
      "Rencontre avec des maîtres artisans",
    ],
    itinerary: [
      { day: "Jour 1", label: "Arrivée à Marrakech — médina et souks" },
      { day: "Jour 2", label: "Ateliers de poterie et de tadelakt" },
      { day: "Jour 3", label: "Vol ou train vers Fès" },
      { day: "Jour 4", label: "Fès el-Bali — tanneries et atelier zellige" },
      { day: "Jour 5", label: "Route vers Tétouan — médina andalouse" },
      { day: "Jour 6", label: "Retour et départ" },
    ],
    included: ["Transport privé", "Guide culturel spécialisé", "5 nuits en riads de charme", "Petits-déjeuners", "Entrées aux ateliers"],
    notIncluded: ["Vols", "Déjeuners et dîners", "Achats personnels"],
  },
  {
    slug: "lune-de-miel-berbere",
    eyebrow: "10 jours · Romantique",
    title: "Lune de miel berbère",
    desc: "Riads d'exception, hammam privé et nuit en camp de luxe au Sahara.",
    from: "À partir de 4 500 €",
    image: "/assets/insp-sahara.jpg",
    highlights: [
      "Suite nuptiale dans un riad de luxe à Marrakech",
      "Hammam privatif et soins de couple",
      "Dîner aux chandelles dans les dunes",
      "Camp de luxe au Sahara avec piscine",
      "Coucher de soleil à cheval sur les dunes",
    ],
    itinerary: [
      { day: "Jour 1-2", label: "Marrakech — riad de luxe, hammam, spa" },
      { day: "Jour 3", label: "Route panoramique vers Ouarzazate" },
      { day: "Jour 4", label: "Aït Ben Haddou et dîner privé au coucher du soleil" },
      { day: "Jour 5-6", label: "Merzouga — camp de luxe dans les dunes" },
      { day: "Jour 7", label: "Gorges du Todgha — bivouac romantique" },
      { day: "Jour 8-9", label: "Essaouira — ville bleue et océan" },
      { day: "Jour 10", label: "Retour Marrakech — départ" },
    ],
    included: ["Transport privé de luxe", "Guide dédié", "9 nuits en riads 5★ et camp de luxe", "Petits-déjeuners et dîners romantiques", "Hammam de couple"],
    notIncluded: ["Vols", "Déjeuners", "Soins spa supplémentaires"],
  },
  {
    slug: "grand-tour-du-sud",
    eyebrow: "14 jours · Famille",
    title: "Grand tour du Sud",
    desc: "Marrakech, Aït Ben Haddou, Dadès, Merzouga et retour par les gorges du Toudgha.",
    from: "À partir de 3 800 €",
    image: "/assets/insp-atlas.jpg",
    highlights: [
      "Route des mille kasbahs",
      "Dunes de Merzouga à dos de dromadaire",
      "Gorges du Todgha à pied",
      "Vallée du Dadès en 4x4",
      "Nuit en auberge berbère",
    ],
    itinerary: [
      { day: "Jour 1", label: "Arrivée à Marrakech" },
      { day: "Jour 2-3", label: "Marrakech — médina, Majorelle, souks" },
      { day: "Jour 4", label: "Col du Tichka — Ouarzazate" },
      { day: "Jour 5", label: "Aït Ben Haddou — Skoura" },
      { day: "Jour 6", label: "Vallée du Dadès et gorges" },
      { day: "Jour 7", label: "Gorges du Todgha" },
      { day: "Jour 8-9", label: "Merzouga — dunes et bivouac" },
      { day: "Jour 10", label: "Retour par Erfoud et Rissani" },
      { day: "Jour 11-12", label: "Vallée du Drâa — Zagora" },
      { day: "Jour 13", label: "Route des kasbahs retour" },
      { day: "Jour 14", label: "Marrakech — départ" },
    ],
    included: ["Transport privé 4x4", "Guide accompagnateur", "13 nuits en hôtels et camps", "Petits-déjeuners"],
    notIncluded: ["Vols", "Repas du midi et du soir", "Assurance voyage"],
  },
  {
    slug: "saveurs-du-maroc",
    eyebrow: "07 jours · Gastronomie",
    title: "Saveurs du Maroc",
    desc: "Cours de cuisine à Fès, marchés aux épices, dîners chez l'habitant.",
    from: "À partir de 2 600 €",
    image: "/assets/insp-medina.jpg",
    highlights: [
      "Cours de cuisine berbère avec une cheffe locale",
      "Visite du marché aux épices de Fès",
      "Dîner chez une famille marrakchie",
      "Dégustation d'huiles d'argan et d'olives",
      "Atelier pâtisseries marocaines",
    ],
    itinerary: [
      { day: "Jour 1", label: "Arrivée à Marrakech — dîner d'accueil" },
      { day: "Jour 2", label: "Marché de Djemaa el-Fna et cours de cuisine" },
      { day: "Jour 3", label: "Route vers Fès" },
      { day: "Jour 4", label: "Fès — marché aux épices et atelier gastronomique" },
      { day: "Jour 5", label: "Meknès et Volubilis — déjeuner en riad" },
      { day: "Jour 6", label: "Retour Marrakech — dîner chez l'habitant" },
      { day: "Jour 7", label: "Départ" },
    ],
    included: ["Transport privé", "Guide gastronomique", "6 nuits en riads", "Tous les repas du programme", "Cours de cuisine"],
    notIncluded: ["Vols", "Repas libres", "Achats d'épices"],
  },
];

export function getCircuitBySlug(slug: string): Circuit | undefined {
  return circuits.find((c) => c.slug === slug);
}
