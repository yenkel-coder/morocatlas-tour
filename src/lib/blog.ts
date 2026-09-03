import type { Language } from "./i18n";
import type { LocalizedText } from "./circuits";
import inspSahara from "@/assets/insp-sahara.jpg";
import gMajorelle from "@/assets/gallery/g-majorelle.jpg";
import gKoutoubia from "@/assets/gallery/g-koutoubia.jpg";
import gMarcheCaftans from "@/assets/gallery/g-marche-caftans.jpg";
import gAtlas1 from "@/assets/gallery/g-atlas-1.jpg";

export type BlogSection = {
  heading?: LocalizedText;
  paragraphs: LocalizedText[];
};

export type BlogPost = {
  slug: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  readTime: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  content: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "que-voir-en-10-jours-au-maroc",
    eyebrow: { fr: "Guide pratique", en: "Practical guide" },
    title: { fr: "Que voir en 10 jours au Maroc ?", en: "What to see in Morocco in 10 days?" },
    excerpt: {
      fr: "Le Maroc en 10 jours, c'est assez pour goûter à ses grands contrastes : médinas, montagnes et désert. Voici comment construire un itinéraire cohérent sans courir.",
      en: "Ten days in Morocco is enough to taste its great contrasts: medinas, mountains and desert. Here's how to build a coherent itinerary without rushing.",
    },
    readTime: { fr: "6 min de lecture", en: "6 min read" },
    image: gMajorelle,
    imageAlt: { fr: "Jardin Majorelle et son bleu emblématique à Marrakech", en: "Majorelle Garden and its emblematic blue in Marrakech" },
    content: [
      {
        paragraphs: [
          {
            fr: "Dix jours au Maroc, c'est le format idéal pour un premier voyage : assez de temps pour ne pas se sentir bousculé, assez court pour rester concentré sur l'essentiel. La question n'est pas \"que voir\" au sens d'une liste à cocher, mais plutôt quel équilibre trouver entre villes impériales, montagne et désert.",
            en: "Ten days in Morocco is the ideal format for a first trip: enough time not to feel rushed, short enough to stay focused on the essentials. The question isn't a checklist of \"what to see\" — it's finding the right balance between imperial cities, mountains and desert.",
          },
        ],
      },
      {
        heading: { fr: "Marrakech, le point de départ naturel", en: "Marrakech, the natural starting point" },
        paragraphs: [
          {
            fr: "La plupart des itinéraires commencent et finissent à Marrakech, bien desservie en vols directs. Comptez deux à trois jours pour la médina, les souks, le jardin Majorelle et un hammam — sans vous épuiser. C'est aussi le meilleur endroit pour s'acclimater avant de partir vers le sud.",
            en: "Most itineraries start and end in Marrakech, which is well served by direct flights. Allow two to three days for the medina, the souks, the Majorelle Garden and a hammam — without exhausting yourself. It's also the best place to acclimatise before heading south.",
          },
        ],
      },
      {
        heading: { fr: "L'Atlas et le désert, en 5 à 6 jours", en: "The Atlas and the desert, in 5 to 6 days" },
        paragraphs: [
          {
            fr: "En route vers le Sahara, la traversée du Haut Atlas via le col du Tichka et les kasbahs d'Aït Ben Haddou constitue à elle seule une étape marquante. Comptez une nuit à Ouarzazate ou dans la vallée du Dadès, puis deux jours vers les dunes de Merzouga ou d'Erg Chigaga, avec une nuit en bivouac sous les étoiles.",
            en: "On the way to the Sahara, crossing the High Atlas via the Tichka pass and the kasbahs of Aït Ben Haddou is a memorable stage in itself. Allow one night in Ouarzazate or the Dadès valley, then two days toward the dunes of Merzouga or Erg Chigaga, with a night bivouacked under the stars.",
          },
        ],
      },
      {
        heading: { fr: "Et si vous préférez la côte ou les médinas ?", en: "What if you prefer the coast or the medinas?" },
        paragraphs: [
          {
            fr: "Certains voyageurs préfèrent troquer le désert contre Essaouira et sa lumière atlantique, ou consacrer plus de temps à Fès, la plus authentique des médinas marocaines. Il n'y a pas de tracé unique : c'est justement ce qu'un itinéraire sur mesure permet d'ajuster, selon votre rythme et vos envies.",
            en: "Some travellers prefer to swap the desert for Essaouira and its Atlantic light, or spend more time in Fès, the most authentic of Morocco's medinas. There's no single route — that's exactly what a tailor-made itinerary lets you adjust, based on your pace and interests.",
          },
        ],
      },
    ],
  },
  {
    slug: "meilleure-periode-visiter-sahara",
    eyebrow: { fr: "Conseils voyage", en: "Travel tips" },
    title: { fr: "Quelle est la meilleure période pour visiter le Sahara marocain ?", en: "What's the best time to visit the Moroccan Sahara?" },
    excerpt: {
      fr: "Entre chaleur écrasante l'été et nuits glaciales l'hiver, le désert marocain impose son propre calendrier. Voici quand partir pour profiter des dunes dans les meilleures conditions.",
      en: "Between crushing summer heat and freezing winter nights, the Moroccan desert sets its own calendar. Here's when to go to enjoy the dunes in the best conditions.",
    },
    readTime: { fr: "5 min de lecture", en: "5 min read" },
    image: inspSahara,
    imageAlt: { fr: "Dunes du Sahara marocain au lever du soleil", en: "Dunes of the Moroccan Sahara at sunrise" },
    content: [
      {
        paragraphs: [
          {
            fr: "Le désert n'a rien d'un climat neutre : à Merzouga ou Erg Chigaga, les écarts de température sont parmi les plus marqués du pays. Choisir la bonne saison change complètement l'expérience du bivouac et des balades à dos de dromadaire.",
            en: "The desert is anything but a neutral climate: in Merzouga or Erg Chigaga, temperature swings are among the sharpest in the country. Choosing the right season completely changes the experience of the bivouac and the camel rides.",
          },
        ],
      },
      {
        heading: { fr: "Octobre à avril : la saison idéale", en: "October to April: the ideal season" },
        paragraphs: [
          {
            fr: "C'est la période la plus confortable : journées douces autour de 20-25°C, ciels dégagés, nuits fraîches mais supportables sous les tentes berbères. Décembre et janvier peuvent être frisquets la nuit (parfois proches de 0°C), prévoyez des couches chaudes même si les jours restent ensoleillés.",
            en: "This is the most comfortable period: mild days around 20-25°C, clear skies, cool but bearable nights under the Berber tents. December and January can be chilly at night (sometimes close to 0°C) — pack warm layers even though the days stay sunny.",
          },
        ],
      },
      {
        heading: { fr: "L'été, à éviter dans le désert", en: "Summer, best avoided in the desert" },
        paragraphs: [
          {
            fr: "De juin à août, les températures diurnes dépassent régulièrement 40°C dans les zones désertiques, rendant les activités en journée éprouvantes. Si vous voyagez l'été, mieux vaut réserver le Sahara pour un lever ou coucher de soleil bref, et privilégier l'Atlas ou la côte pour le reste du séjour.",
            en: "From June to August, daytime temperatures regularly exceed 40°C in the desert areas, making daytime activities gruelling. If you're travelling in summer, it's better to keep the Sahara for a brief sunrise or sunset and favour the Atlas or the coast for the rest of your stay.",
          },
        ],
      },
      {
        heading: { fr: "Notre recommandation", en: "Our recommendation" },
        paragraphs: [
          {
            fr: "Pour un bivouac vraiment mémorable — ciel étoilé, températures agréables au coucher du soleil et à l'aube — visez la fenêtre d'octobre à avril, avec une préférence pour mars-avril ou octobre-novembre, quand les nuits sont moins froides qu'en plein hiver.",
            en: "For a truly memorable bivouac — starry sky, pleasant temperatures at sunset and dawn — aim for the October to April window, ideally March-April or October-November, when nights are milder than in the depths of winter.",
          },
        ],
      },
    ],
  },
  {
    slug: "marrakech-en-3-jours",
    eyebrow: { fr: "Guide ville", en: "City guide" },
    title: { fr: "Marrakech en 3 jours : l'essentiel à ne pas manquer", en: "Marrakech in 3 days: the essentials you shouldn't miss" },
    excerpt: {
      fr: "Trois jours suffisent pour saisir l'âme de Marrakech, à condition de bien répartir médina, jardins et moments de calme. Notre parcours conseillé, jour par jour.",
      en: "Three days are enough to grasp the soul of Marrakech, provided you balance the medina, the gardens and moments of calm. Our recommended day-by-day route.",
    },
    readTime: { fr: "5 min de lecture", en: "5 min read" },
    image: gKoutoubia,
    imageAlt: { fr: "Minaret de la Koutoubia au coucher du soleil à Marrakech", en: "Koutoubia minaret at sunset in Marrakech" },
    content: [
      {
        paragraphs: [
          {
            fr: "Marrakech se découvre par vagues : un premier jour d'étourdissement dans la médina, un deuxième plus posé du côté des jardins, un troisième pour les détails qu'on avait manqués. Voici comment structurer un séjour de 3 jours sans se presser.",
            en: "Marrakech reveals itself in waves: a first day of sensory overload in the medina, a calmer second day around the gardens, a third for the details you missed. Here's how to structure a 3-day stay without rushing.",
          },
        ],
      },
      {
        heading: { fr: "Jour 1 — La médina et la place Jemaa el-Fna", en: "Day 1 — The medina and Jemaa el-Fna square" },
        paragraphs: [
          {
            fr: "Commencez par la Koutoubia et ses jardins, puis plongez dans les souks : épices, cuir, lampes en métal ouvragé. Terminez la journée sur la place Jemaa el-Fna à la tombée du jour, quand les conteurs, musiciens et étals de street food prennent le relais.",
            en: "Start with the Koutoubia and its gardens, then dive into the souks: spices, leather, wrought-metal lamps. End the day on Jemaa el-Fna square at dusk, when storytellers, musicians and street-food stalls take over.",
          },
        ],
      },
      {
        heading: { fr: "Jour 2 — Jardins et palais", en: "Day 2 — Gardens and palaces" },
        paragraphs: [
          {
            fr: "Le jardin Majorelle et son bleu profond méritent une matinée calme, idéalement tôt pour éviter l'affluence. L'après-midi, direction le palais de la Bahia et le Musée Yves Saint Laurent, deux adresses qui racontent des facettes très différentes de la ville.",
            en: "The Majorelle Garden and its deep blue deserve a calm morning, ideally early to avoid the crowds. In the afternoon, head to the Bahia Palace and the Yves Saint Laurent Museum, two addresses that tell very different sides of the city.",
          },
        ],
      },
      {
        heading: { fr: "Jour 3 — Hammam et artisanat", en: "Day 3 — Hammam and craftsmanship" },
        paragraphs: [
          {
            fr: "Réservez votre dernière matinée à un hammam traditionnel, puis flânez dans le quartier de Sidi Ghanem pour des ateliers de designers locaux, loin de la foule des souks touristiques. C'est aussi le bon moment pour un dernier thé à la menthe sur une terrasse avec vue sur les toits.",
            en: "Reserve your last morning for a traditional hammam, then wander the Sidi Ghanem district for local designers' workshops, away from the crowds of the touristy souks. It's also the right moment for one last mint tea on a rooftop terrace.",
          },
        ],
      },
    ],
  },
  {
    slug: "itineraire-maroc-2-semaines",
    eyebrow: { fr: "Guide pratique", en: "Practical guide" },
    title: { fr: "Itinéraire Maroc en 2 semaines : nos conseils pour bien répartir votre séjour", en: "2-week Morocco itinerary: our tips for structuring your trip" },
    excerpt: {
      fr: "Deux semaines permettent de voir le Maroc sans le survoler. Voici comment articuler villes impériales, désert et côte sans multiplier les trajets inutiles.",
      en: "Two weeks let you see Morocco without skimming the surface. Here's how to combine imperial cities, desert and coast without piling on unnecessary transfers.",
    },
    readTime: { fr: "7 min de lecture", en: "7 min read" },
    image: gMarcheCaftans,
    imageAlt: { fr: "Marché coloré et caftans traditionnels", en: "Colourful market and traditional caftans" },
    content: [
      {
        paragraphs: [
          {
            fr: "Avec deux semaines, la tentation est de vouloir tout faire : Marrakech, Fès, le désert, l'Atlas, la côte. C'est possible, mais seulement si l'itinéraire suit une logique géographique en boucle, sans revenir sans cesse sur ses pas.",
            en: "With two weeks, the temptation is to try to do it all: Marrakech, Fès, the desert, the Atlas, the coast. It's possible, but only if the itinerary follows a geographic loop rather than doubling back constantly.",
          },
        ],
      },
      {
        heading: { fr: "Semaine 1 — Marrakech, l'Atlas et le désert", en: "Week 1 — Marrakech, the Atlas and the desert" },
        paragraphs: [
          {
            fr: "Consacrez les 3 premiers jours à Marrakech, puis prenez la route vers le sud : vallée de l'Ourika ou Imlil pour une randonnée dans le Haut Atlas, Aït Ben Haddou, et enfin deux nuits vers Merzouga pour le bivouac dans les dunes.",
            en: "Spend the first 3 days in Marrakech, then head south: the Ourika valley or Imlil for a hike in the High Atlas, Aït Ben Haddou, and finally two nights toward Merzouga for the dune bivouac.",
          },
        ],
      },
      {
        heading: { fr: "Semaine 2 — Fès, les gorges et la côte", en: "Week 2 — Fès, the gorges and the coast" },
        paragraphs: [
          {
            fr: "Remontez vers Fès via les gorges du Todgha et du Dadès, en vous arrêtant dans des maisons d'hôtes en pisé. Après deux jours dans la médina de Fès, terminez le séjour sur la côte, à Essaouira, pour un contraste iodé et reposant avant le départ.",
            en: "Head back up to Fès via the Todgha and Dadès gorges, stopping at rammed-earth guesthouses along the way. After two days in the Fès medina, end the stay on the coast, in Essaouira, for a refreshing, salt-air contrast before departure.",
          },
        ],
      },
      {
        heading: { fr: "Notre conseil", en: "Our tip" },
        paragraphs: [
          {
            fr: "Sur un itinéraire aussi long, gardez au moins une journée sans programme fixe — souvent à Essaouira ou dans l'Atlas — pour absorber le rythme du voyage plutôt que de l'enchaîner sans pause.",
            en: "On a trip this long, keep at least one day with no fixed programme — often in Essaouira or the Atlas — to absorb the rhythm of the journey rather than stacking activities without a break.",
          },
        ],
      },
    ],
  },
  {
    slug: "randonnees-villages-berberes-atlas",
    eyebrow: { fr: "Nature & rencontres", en: "Nature & encounters" },
    title: { fr: "Randonnées et villages berbères dans l'Atlas : que faire et voir ?", en: "Hiking and Berber villages in the Atlas: what to do and see?" },
    excerpt: {
      fr: "À moins d'une heure de Marrakech, le Haut Atlas offre randonnées douces, villages en pisé et rencontres authentiques. Un contrepoint parfait à l'agitation de la ville.",
      en: "Less than an hour from Marrakech, the High Atlas offers gentle hikes, rammed-earth villages and authentic encounters — a perfect counterpoint to the city's bustle.",
    },
    readTime: { fr: "6 min de lecture", en: "6 min read" },
    image: gAtlas1,
    imageAlt: { fr: "Crêtes de l'Atlas et vallée encaissée", en: "Atlas ridges and a deep valley" },
    content: [
      {
        paragraphs: [
          {
            fr: "Le Haut Atlas est souvent traité comme une simple étape sur la route du désert, alors qu'il mérite à lui seul plusieurs jours : vallées verdoyantes, villages en pisé accrochés aux pentes, et un rythme de vie qui contraste fortement avec Marrakech.",
            en: "The High Atlas is often treated as a mere stopover on the road to the desert, yet it deserves several days on its own: green valleys, rammed-earth villages clinging to the slopes, and a pace of life that contrasts sharply with Marrakech.",
          },
        ],
      },
      {
        heading: { fr: "La vallée de l'Ourika, pour une escapade d'un jour", en: "The Ourika valley, for a day trip" },
        paragraphs: [
          {
            fr: "À moins d'une heure de Marrakech, l'Ourika permet une immersion rapide : cascades de Setti Fatma, marché berbère hebdomadaire, et petits restaurants au bord de la rivière. Idéal si votre séjour est court mais que vous voulez sortir de la ville.",
            en: "Less than an hour from Marrakech, the Ourika valley offers a quick immersion: the Setti Fatma waterfalls, a weekly Berber market, and small restaurants along the river. Ideal if your stay is short but you still want to get out of the city.",
          },
        ],
      },
      {
        heading: { fr: "Imlil et le massif du Toubkal, pour la randonnée", en: "Imlil and the Toubkal massif, for hiking" },
        paragraphs: [
          {
            fr: "Village de départ pour l'ascension du Toubkal (point culminant d'Afrique du Nord), Imlil se prête aussi à des randonnées d'une journée, accessibles sans expérience particulière. Les nuits chez l'habitant y sont une des meilleures façons de rencontrer des familles berbères.",
            en: "The starting village for the ascent of Toubkal (North Africa's highest peak), Imlil also lends itself to day hikes accessible without prior experience. Homestays there are one of the best ways to meet Berber families.",
          },
        ],
      },
      {
        heading: { fr: "Ce que révèlent ces villages", en: "What these villages reveal" },
        paragraphs: [
          {
            fr: "Au-delà des paysages, ce sont les rencontres qui marquent : un verre de thé partagé, un repas préparé sur place, l'architecture en pisé pensée pour l'inertie thermique. C'est une facette du Maroc rarement montrée dans les circuits classiques, et pourtant essentielle.",
            en: "Beyond the landscapes, it's the encounters that stay with you: a shared glass of tea, a meal prepared on the spot, the rammed-earth architecture designed for thermal inertia. It's a side of Morocco rarely shown in standard tours, yet an essential one.",
          },
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function pickBlog(text: LocalizedText, language: Language): string {
  return text[language];
}
