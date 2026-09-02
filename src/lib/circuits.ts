import type { Language } from "./i18n";

export type LocalizedText = { fr: string; en: string };

export type Circuit = {
  slug: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  desc: LocalizedText;
  from: LocalizedText;
  image: string;
  highlights: LocalizedText[];
  itinerary: { day: LocalizedText; label: LocalizedText }[];
  included: LocalizedText[];
  notIncluded: LocalizedText[];
};

export const circuits: Circuit[] = [
  {
    slug: "le-seuil-du-sahara",
    eyebrow: { fr: "08 jours · Guide privé", en: "08 days · Private guide" },
    title: { fr: "Le seuil du Sahara", en: "The threshold of the Sahara" },
    desc: {
      fr: "Bivouac sous les étoiles à Erg Chigaga, oasis de Mhamid et thé chez les nomades.",
      en: "Star-lit bivouac at Erg Chigaga, the oasis of Mhamid and tea with nomad families.",
    },
    from: { fr: "À partir de 2 900 €", en: "From €2,900" },
    image: "/assets/insp-sahara.jpg",
    highlights: [
      { fr: "Bivouac en camp de luxe à Erg Chigaga", en: "Luxury camp bivouac at Erg Chigaga" },
      { fr: "Rencontre avec des familles nomades", en: "Meeting nomad families" },
      { fr: "Oasis de Mhamid et palmeraie de Tamegroute", en: "Mhamid oasis and the Tamegroute palm grove" },
      { fr: "Nuit sous un ciel étoilé exceptionnel", en: "A night under an exceptional starry sky" },
      { fr: "Guide privé francophone tout au long du séjour", en: "Private French-speaking guide throughout your stay" },
    ],
    itinerary: [
      { day: { fr: "Jour 1", en: "Day 1" }, label: { fr: "Arrivée à Marrakech — installation et dîner de bienvenue", en: "Arrival in Marrakech — check-in and welcome dinner" } },
      { day: { fr: "Jour 2", en: "Day 2" }, label: { fr: "Route vers Ouarzazate via le col du Tichka", en: "Drive to Ouarzazate via the Tichka pass" } },
      { day: { fr: "Jour 3", en: "Day 3" }, label: { fr: "Aït Ben Haddou et vallée du Drâa", en: "Aït Ben Haddou and the Drâa valley" } },
      { day: { fr: "Jour 4", en: "Day 4" }, label: { fr: "Mhamid — portes du désert", en: "Mhamid — gateway to the desert" } },
      { day: { fr: "Jour 5", en: "Day 5" }, label: { fr: "Erg Chigaga — arrivée à dos de dromadaire", en: "Erg Chigaga — arrival by camel" } },
      { day: { fr: "Jour 6", en: "Day 6" }, label: { fr: "Lever de soleil sur les dunes — journée libre au camp", en: "Sunrise over the dunes — free day at camp" } },
      { day: { fr: "Jour 7", en: "Day 7" }, label: { fr: "Retour vers Zagora et Agdez", en: "Return via Zagora and Agdez" } },
      { day: { fr: "Jour 8", en: "Day 8" }, label: { fr: "Transfert Marrakech — départ", en: "Transfer to Marrakech — departure" } },
    ],
    included: [
      { fr: "Transport privé climatisé", en: "Private air-conditioned transport" },
      { fr: "Guide privé francophone", en: "Private French-speaking guide" },
      { fr: "7 nuits en hôtels & camp de luxe", en: "7 nights in hotels & luxury camp" },
      { fr: "Petit-déjeuner chaque matin", en: "Breakfast every morning" },
      { fr: "Dromadaire pour rejoindre le camp", en: "Camel ride to reach the camp" },
    ],
    notIncluded: [
      { fr: "Vols internationaux", en: "International flights" },
      { fr: "Déjeuners et dîners (sauf mention)", en: "Lunches and dinners (unless stated)" },
      { fr: "Assurance voyage", en: "Travel insurance" },
    ],
  },
  {
    slug: "atlas-et-vallees-cachees",
    eyebrow: { fr: "12 jours · Lent & immersif", en: "12 days · Slow & immersive" },
    title: { fr: "Atlas et vallées cachées", en: "Atlas and hidden valleys" },
    desc: {
      fr: "Randonnées douces, kasbahs en pisé et nuits chez l'habitant à Imlil et Aït Ben Haddou.",
      en: "Gentle hikes, rammed-earth kasbahs and homestays in Imlil and Aït Ben Haddou.",
    },
    from: { fr: "À partir de 3 400 €", en: "From €3,400" },
    image: "/assets/insp-atlas.jpg",
    highlights: [
      { fr: "Randonnée dans la vallée de l'Ourika", en: "Hiking in the Ourika valley" },
      { fr: "Nuits chez l'habitant à Imlil", en: "Homestay nights in Imlil" },
      { fr: "Kasbahs en pisé du XVIIe siècle", en: "17th-century rammed-earth kasbahs" },
      { fr: "Villages berbères isolés", en: "Remote Berber villages" },
      { fr: "Cuisine traditionnelle faite maison", en: "Traditional home cooking" },
    ],
    itinerary: [
      { day: { fr: "Jour 1", en: "Day 1" }, label: { fr: "Arrivée à Marrakech", en: "Arrival in Marrakech" } },
      { day: { fr: "Jour 2", en: "Day 2" }, label: { fr: "Vallée de l'Ourika et cascades de Setti Fatma", en: "Ourika valley and Setti Fatma waterfalls" } },
      { day: { fr: "Jour 3", en: "Day 3" }, label: { fr: "Montée vers Imlil — accueil chez l'habitant", en: "Ascent to Imlil — homestay welcome" } },
      { day: { fr: "Jour 4-5", en: "Day 4-5" }, label: { fr: "Randonnées dans le massif du Toubkal", en: "Hikes in the Toubkal massif" } },
      { day: { fr: "Jour 6", en: "Day 6" }, label: { fr: "Aït Ben Haddou — ksar classé UNESCO", en: "Aït Ben Haddou — UNESCO-listed ksar" } },
      { day: { fr: "Jour 7-8", en: "Day 7-8" }, label: { fr: "Vallée des roses et gorges du Dadès", en: "Valley of Roses and Dadès gorges" } },
      { day: { fr: "Jour 9-10", en: "Day 9-10" }, label: { fr: "Vallée du Todgha et villages troglodytes", en: "Todgha valley and troglodyte villages" } },
      { day: { fr: "Jour 11", en: "Day 11" }, label: { fr: "Retour vers Marrakech via Ouarzazate", en: "Return to Marrakech via Ouarzazate" } },
      { day: { fr: "Jour 12", en: "Day 12" }, label: { fr: "Départ", en: "Departure" } },
    ],
    included: [
      { fr: "Transport privé", en: "Private transport" },
      { fr: "Guide montagne certifié", en: "Certified mountain guide" },
      { fr: "11 nuits en maisons d'hôtes & riad", en: "11 nights in guesthouses & riad" },
      { fr: "Petits-déjeuners et dîners", en: "Breakfasts and dinners" },
    ],
    notIncluded: [
      { fr: "Vols", en: "Flights" },
      { fr: "Déjeuners", en: "Lunches" },
      { fr: "Assurance", en: "Insurance" },
    ],
  },
  {
    slug: "medinas-artisans",
    eyebrow: { fr: "06 jours · Culturel", en: "06 days · Cultural" },
    title: { fr: "Médinas & artisans", en: "Medinas & artisans" },
    desc: {
      fr: "Marrakech, Fès et Tétouan. Ateliers privés de zellige, tannerie et soie.",
      en: "Marrakech, Fès and Tétouan. Private workshops in zellige, tanning and silk.",
    },
    from: { fr: "À partir de 2 100 €", en: "From €2,100" },
    image: "/assets/insp-medina.jpg",
    highlights: [
      { fr: "Atelier privé de zellige à Fès", en: "Private zellige workshop in Fès" },
      { fr: "Visite des tanneries Chouara", en: "Visit to the Chouara tanneries" },
      { fr: "Souk des tisserands de soie", en: "Silk weavers' souk" },
      { fr: "Médina de Tétouan classée UNESCO", en: "UNESCO-listed medina of Tétouan" },
      { fr: "Rencontre avec des maîtres artisans", en: "Meeting master craftsmen" },
    ],
    itinerary: [
      { day: { fr: "Jour 1", en: "Day 1" }, label: { fr: "Arrivée à Marrakech — médina et souks", en: "Arrival in Marrakech — medina and souks" } },
      { day: { fr: "Jour 2", en: "Day 2" }, label: { fr: "Ateliers de poterie et de tadelakt", en: "Pottery and tadelakt workshops" } },
      { day: { fr: "Jour 3", en: "Day 3" }, label: { fr: "Vol ou train vers Fès", en: "Flight or train to Fès" } },
      { day: { fr: "Jour 4", en: "Day 4" }, label: { fr: "Fès el-Bali — tanneries et atelier zellige", en: "Fès el-Bali — tanneries and zellige workshop" } },
      { day: { fr: "Jour 5", en: "Day 5" }, label: { fr: "Route vers Tétouan — médina andalouse", en: "Drive to Tétouan — Andalusian medina" } },
      { day: { fr: "Jour 6", en: "Day 6" }, label: { fr: "Retour et départ", en: "Return and departure" } },
    ],
    included: [
      { fr: "Transport privé", en: "Private transport" },
      { fr: "Guide culturel spécialisé", en: "Specialised cultural guide" },
      { fr: "5 nuits en riads de charme", en: "5 nights in charming riads" },
      { fr: "Petits-déjeuners", en: "Breakfasts" },
      { fr: "Entrées aux ateliers", en: "Workshop entrance fees" },
    ],
    notIncluded: [
      { fr: "Vols", en: "Flights" },
      { fr: "Déjeuners et dîners", en: "Lunches and dinners" },
      { fr: "Achats personnels", en: "Personal purchases" },
    ],
  },
  {
    slug: "lune-de-miel-berbere",
    eyebrow: { fr: "10 jours · Romantique", en: "10 days · Romantic" },
    title: { fr: "Lune de miel berbère", en: "Berber honeymoon" },
    desc: {
      fr: "Riads d'exception, hammam privé et nuit en camp de luxe au Sahara.",
      en: "Exceptional riads, a private hammam and a night in a luxury Sahara camp.",
    },
    from: { fr: "À partir de 4 500 €", en: "From €4,500" },
    image: "/assets/insp-honeymoon.jpg",
    highlights: [
      { fr: "Suite nuptiale dans un riad de luxe à Marrakech", en: "Honeymoon suite in a luxury Marrakech riad" },
      { fr: "Hammam privatif et soins de couple", en: "Private hammam and couple's treatments" },
      { fr: "Dîner aux chandelles dans les dunes", en: "Candlelit dinner in the dunes" },
      { fr: "Camp de luxe au Sahara avec piscine", en: "Luxury Sahara camp with a pool" },
      { fr: "Coucher de soleil à cheval sur les dunes", en: "Sunset horseback ride over the dunes" },
    ],
    itinerary: [
      { day: { fr: "Jour 1-2", en: "Day 1-2" }, label: { fr: "Marrakech — riad de luxe, hammam, spa", en: "Marrakech — luxury riad, hammam, spa" } },
      { day: { fr: "Jour 3", en: "Day 3" }, label: { fr: "Route panoramique vers Ouarzazate", en: "Scenic drive to Ouarzazate" } },
      { day: { fr: "Jour 4", en: "Day 4" }, label: { fr: "Aït Ben Haddou et dîner privé au coucher du soleil", en: "Aït Ben Haddou and a private sunset dinner" } },
      { day: { fr: "Jour 5-6", en: "Day 5-6" }, label: { fr: "Merzouga — camp de luxe dans les dunes", en: "Merzouga — luxury camp among the dunes" } },
      { day: { fr: "Jour 7", en: "Day 7" }, label: { fr: "Gorges du Todgha — bivouac romantique", en: "Todgha gorges — romantic bivouac" } },
      { day: { fr: "Jour 8-9", en: "Day 8-9" }, label: { fr: "Essaouira — ville bleue et océan", en: "Essaouira — blue city and ocean" } },
      { day: { fr: "Jour 10", en: "Day 10" }, label: { fr: "Retour Marrakech — départ", en: "Return to Marrakech — departure" } },
    ],
    included: [
      { fr: "Transport privé de luxe", en: "Private luxury transport" },
      { fr: "Guide dédié", en: "Dedicated guide" },
      { fr: "9 nuits en riads 5★ et camp de luxe", en: "9 nights in 5-star riads and luxury camp" },
      { fr: "Petits-déjeuners et dîners romantiques", en: "Breakfasts and romantic dinners" },
      { fr: "Hammam de couple", en: "Couple's hammam" },
    ],
    notIncluded: [
      { fr: "Vols", en: "Flights" },
      { fr: "Déjeuners", en: "Lunches" },
      { fr: "Soins spa supplémentaires", en: "Additional spa treatments" },
    ],
  },
  {
    slug: "grand-tour-du-sud",
    eyebrow: { fr: "14 jours · Famille", en: "14 days · Family" },
    title: { fr: "Grand tour du Sud", en: "Grand tour of the South" },
    desc: {
      fr: "Marrakech, Aït Ben Haddou, Dadès, Merzouga et retour par les gorges du Toudgha.",
      en: "Marrakech, Aït Ben Haddou, Dadès, Merzouga and back via the Todgha gorges.",
    },
    from: { fr: "À partir de 3 800 €", en: "From €3,800" },
    image: "/assets/insp-toursud.jpg",
    highlights: [
      { fr: "Route des mille kasbahs", en: "The road of a thousand kasbahs" },
      { fr: "Dunes de Merzouga à dos de dromadaire", en: "Merzouga dunes by camel" },
      { fr: "Gorges du Todgha à pied", en: "Todgha gorges on foot" },
      { fr: "Vallée du Dadès en 4x4", en: "Dadès valley by 4x4" },
      { fr: "Nuit en auberge berbère", en: "Night in a Berber guesthouse" },
    ],
    itinerary: [
      { day: { fr: "Jour 1", en: "Day 1" }, label: { fr: "Arrivée à Marrakech", en: "Arrival in Marrakech" } },
      { day: { fr: "Jour 2-3", en: "Day 2-3" }, label: { fr: "Marrakech — médina, Majorelle, souks", en: "Marrakech — medina, Majorelle, souks" } },
      { day: { fr: "Jour 4", en: "Day 4" }, label: { fr: "Col du Tichka — Ouarzazate", en: "Tichka pass — Ouarzazate" } },
      { day: { fr: "Jour 5", en: "Day 5" }, label: { fr: "Aït Ben Haddou — Skoura", en: "Aït Ben Haddou — Skoura" } },
      { day: { fr: "Jour 6", en: "Day 6" }, label: { fr: "Vallée du Dadès et gorges", en: "Dadès valley and gorges" } },
      { day: { fr: "Jour 7", en: "Day 7" }, label: { fr: "Gorges du Todgha", en: "Todgha gorges" } },
      { day: { fr: "Jour 8-9", en: "Day 8-9" }, label: { fr: "Merzouga — dunes et bivouac", en: "Merzouga — dunes and bivouac" } },
      { day: { fr: "Jour 10", en: "Day 10" }, label: { fr: "Retour par Erfoud et Rissani", en: "Return via Erfoud and Rissani" } },
      { day: { fr: "Jour 11-12", en: "Day 11-12" }, label: { fr: "Vallée du Drâa — Zagora", en: "Drâa valley — Zagora" } },
      { day: { fr: "Jour 13", en: "Day 13" }, label: { fr: "Route des kasbahs retour", en: "Return along the kasbah road" } },
      { day: { fr: "Jour 14", en: "Day 14" }, label: { fr: "Marrakech — départ", en: "Marrakech — departure" } },
    ],
    included: [
      { fr: "Transport privé 4x4", en: "Private 4x4 transport" },
      { fr: "Guide accompagnateur", en: "Accompanying guide" },
      { fr: "13 nuits en hôtels et camps", en: "13 nights in hotels and camps" },
      { fr: "Petits-déjeuners", en: "Breakfasts" },
    ],
    notIncluded: [
      { fr: "Vols", en: "Flights" },
      { fr: "Repas du midi et du soir", en: "Lunches and dinners" },
      { fr: "Assurance voyage", en: "Travel insurance" },
    ],
  },
  {
    slug: "saveurs-du-maroc",
    eyebrow: { fr: "07 jours · Gastronomie", en: "07 days · Gastronomy" },
    title: { fr: "Saveurs du Maroc", en: "Flavours of Morocco" },
    desc: {
      fr: "Cours de cuisine à Fès, marchés aux épices, dîners chez l'habitant.",
      en: "Cooking classes in Fès, spice markets, dinners with local families.",
    },
    from: { fr: "À partir de 2 600 €", en: "From €2,600" },
    image: "/assets/insp-saveurs.jpg",
    highlights: [
      { fr: "Cours de cuisine berbère avec une cheffe locale", en: "Berber cooking class with a local chef" },
      { fr: "Visite du marché aux épices de Fès", en: "Visit to the Fès spice market" },
      { fr: "Dîner chez une famille marrakchie", en: "Dinner with a Marrakech family" },
      { fr: "Dégustation d'huiles d'argan et d'olives", en: "Argan and olive oil tasting" },
      { fr: "Atelier pâtisseries marocaines", en: "Moroccan pastry workshop" },
    ],
    itinerary: [
      { day: { fr: "Jour 1", en: "Day 1" }, label: { fr: "Arrivée à Marrakech — dîner d'accueil", en: "Arrival in Marrakech — welcome dinner" } },
      { day: { fr: "Jour 2", en: "Day 2" }, label: { fr: "Marché de Djemaa el-Fna et cours de cuisine", en: "Djemaa el-Fna market and cooking class" } },
      { day: { fr: "Jour 3", en: "Day 3" }, label: { fr: "Route vers Fès", en: "Drive to Fès" } },
      { day: { fr: "Jour 4", en: "Day 4" }, label: { fr: "Fès — marché aux épices et atelier gastronomique", en: "Fès — spice market and culinary workshop" } },
      { day: { fr: "Jour 5", en: "Day 5" }, label: { fr: "Meknès et Volubilis — déjeuner en riad", en: "Meknès and Volubilis — lunch in a riad" } },
      { day: { fr: "Jour 6", en: "Day 6" }, label: { fr: "Retour Marrakech — dîner chez l'habitant", en: "Return to Marrakech — dinner with locals" } },
      { day: { fr: "Jour 7", en: "Day 7" }, label: { fr: "Départ", en: "Departure" } },
    ],
    included: [
      { fr: "Transport privé", en: "Private transport" },
      { fr: "Guide gastronomique", en: "Culinary guide" },
      { fr: "6 nuits en riads", en: "6 nights in riads" },
      { fr: "Tous les repas du programme", en: "All meals in the itinerary" },
      { fr: "Cours de cuisine", en: "Cooking classes" },
    ],
    notIncluded: [
      { fr: "Vols", en: "Flights" },
      { fr: "Repas libres", en: "Free-choice meals" },
      { fr: "Achats d'épices", en: "Spice purchases" },
    ],
  },
];

export function getCircuitBySlug(slug: string): Circuit | undefined {
  return circuits.find((c) => c.slug === slug);
}

export function pick(text: LocalizedText, language: Language): string {
  return text[language];
}
