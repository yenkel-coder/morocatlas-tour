import type { Language } from "./i18n";
import type { LocalizedText } from "./circuits";
import inspSahara from "@/assets/insp-sahara.jpg";
import gMajorelle from "@/assets/gallery/g-majorelle.jpg";
import gKoutoubia from "@/assets/gallery/g-koutoubia.jpg";
import gMarcheCaftans from "@/assets/gallery/g-marche-caftans.jpg";
import gAtlas1 from "@/assets/gallery/g-atlas-1.jpg";
import inspMedina from "@/assets/insp-medina.jpg";
import gPanneauSouk from "@/assets/gallery/g-panneau-souk.jpg";
import inspSaveurs from "@/assets/insp-saveurs.jpg";
import gFamilleGorges from "@/assets/gallery/g-famille-gorges.jpg";
import gPiscineNuit from "@/assets/gallery/g-piscine-nuit.jpg";

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
  {
    slug: "fes-en-2-jours",
    eyebrow: { fr: "Guide ville", en: "City guide" },
    title: { fr: "Fès en 2 jours : l'essentiel de la médina la plus authentique du Maroc", en: "Fès in 2 days: the essentials of Morocco's most authentic medina" },
    excerpt: {
      fr: "Moins touristique que Marrakech, Fès impressionne par l'ampleur de sa médina classée UNESCO. Deux jours suffisent pour saisir l'essentiel, à condition de bien s'organiser.",
      en: "Less touristy than Marrakech, Fès impresses with the sheer scale of its UNESCO-listed medina. Two days are enough to grasp the essentials, provided you plan well.",
    },
    readTime: { fr: "5 min de lecture", en: "5 min read" },
    image: inspMedina,
    imageAlt: { fr: "Ruelle animée de la médina de Fès", en: "Bustling alley in the Fès medina" },
    content: [
      {
        paragraphs: [
          {
            fr: "Avec plus de 9 000 ruelles, la médina de Fès el-Bali est la plus grande zone piétonne au monde. S'y perdre fait partie de l'expérience, mais un minimum d'organisation permet d'en voir l'essentiel sans épuiser vos deux jours en fausses routes.",
            en: "With over 9,000 alleys, the Fès el-Bali medina is the largest pedestrian zone in the world. Getting lost is part of the experience, but a little planning helps you see the essentials without burning your two days on wrong turns.",
          },
        ],
      },
      {
        heading: { fr: "Jour 1 — Tanneries et artisanat", en: "Day 1 — Tanneries and craftsmanship" },
        paragraphs: [
          {
            fr: "Commencez tôt aux tanneries Chouara, les plus anciennes du monde arabe, en pleine activité le matin. Poursuivez vers les souks des dinandiers et des tisserands de soie, puis visitez la médersa Bou Inania, chef-d'œuvre d'architecture mérinide ouvert au public.",
            en: "Start early at the Chouara tannery, the oldest in the Arab world, in full swing in the morning. Continue to the coppersmiths' and silk weavers' souks, then visit the Bou Inania Madrasa, a masterpiece of Marinid architecture open to the public.",
          },
        ],
      },
      {
        heading: { fr: "Jour 2 — Vue d'ensemble et Ville Nouvelle", en: "Day 2 — Overview and the New Town" },
        paragraphs: [
          {
            fr: "Montez tôt aux tombeaux mérinides ou au Borj Nord pour une vue d'ensemble sur la médina avant la chaleur. L'après-midi, contrastez avec la Ville Nouvelle, plus posée, avant un dernier tour des souks pour les derniers achats — cuir, poterie bleue de Fès, épices.",
            en: "Head up early to the Marinid Tombs or Borj Nord for an overview of the medina before the heat sets in. In the afternoon, contrast with the calmer New Town, before one last stroll through the souks for final purchases — leather, Fès blue pottery, spices.",
          },
        ],
      },
      {
        heading: { fr: "Un bon complément à Marrakech", en: "A good complement to Marrakech" },
        paragraphs: [
          {
            fr: "Si Marrakech séduit par son énergie, Fès impressionne par sa densité historique et son caractère moins touristique. Sur un itinéraire de deux semaines, l'associer à Marrakech et au désert offre un contraste que peu de voyageurs regrettent.",
            en: "If Marrakech seduces with its energy, Fès impresses with its historical density and less touristy character. On a two-week itinerary, pairing it with Marrakech and the desert offers a contrast few travellers regret.",
          },
        ],
      },
    ],
  },
  {
    slug: "essaouira-que-faire",
    eyebrow: { fr: "Guide ville", en: "City guide" },
    title: { fr: "Essaouira : que faire dans la cité des alizés ?", en: "Essaouira: what to do in the city of trade winds?" },
    excerpt: {
      fr: "À deux heures de Marrakech, Essaouira offre un Maroc plus détendu : remparts face à l'Atlantique, médina bleu et blanc, et vent iodé qui change des dunes du désert.",
      en: "Two hours from Marrakech, Essaouira offers a more relaxed Morocco: ramparts facing the Atlantic, a blue-and-white medina, and salt air that's a world away from the desert dunes.",
    },
    readTime: { fr: "5 min de lecture", en: "5 min read" },
    image: gPanneauSouk,
    imageAlt: { fr: "Enseigne artisanale colorée dans un souk d'Essaouira", en: "Colourful craft sign in an Essaouira souk" },
    content: [
      {
        paragraphs: [
          {
            fr: "Essaouira tranche avec le reste du Maroc : moins de bousculade dans les souks, une lumière atlantique particulière, et un rythme volontairement plus lent. C'est souvent l'étape que les voyageurs citent comme leur préférée, en fin de circuit.",
            en: "Essaouira stands apart from the rest of Morocco: less hustle in the souks, a distinctive Atlantic light, and a deliberately slower pace. It's often the stop travellers name as their favourite, toward the end of a trip.",
          },
        ],
      },
      {
        heading: { fr: "La médina et le port", en: "The medina and the port" },
        paragraphs: [
          {
            fr: "Classée UNESCO, la médina fortifiée se parcourt facilement en une demi-journée : remparts des Skala, ruelles bleu et blanc, ateliers de marqueterie en bois de thuya. Le port, avec ses barques bleues et ses étals de poisson grillé, mérite une halte en fin de matinée.",
            en: "UNESCO-listed, the fortified medina is easily explored in half a day: the Skala ramparts, blue-and-white alleys, thuya wood marquetry workshops. The port, with its blue boats and grilled fish stalls, deserves a stop toward the end of the morning.",
          },
        ],
      },
      {
        heading: { fr: "Vent, plage et activités nautiques", en: "Wind, beach and water sports" },
        paragraphs: [
          {
            fr: "Essaouira est un spot reconnu de windsurf et de kitesurf grâce à ses alizés réguliers. Même sans pratiquer, la plage au sud de la ville offre une belle balade à cheval ou à dromadaire, un contraste inattendu après le désert.",
            en: "Essaouira is a well-known windsurfing and kitesurfing spot thanks to its steady trade winds. Even without practising, the beach south of the city makes for a lovely horseback or camel ride — an unexpected contrast after the desert.",
          },
        ],
      },
      {
        heading: { fr: "Combien de temps y rester ?", en: "How long to stay?" },
        paragraphs: [
          {
            fr: "Deux jours suffisent pour l'essentiel, mais beaucoup de voyageurs prolongent d'une journée pour simplement ralentir avant le retour. C'est aussi une excellente étape de fin de circuit avant un vol depuis Marrakech.",
            en: "Two days cover the essentials, but many travellers stay an extra day simply to slow down before heading home. It's also an excellent final stop before a flight out of Marrakech.",
          },
        ],
      },
    ],
  },
  {
    slug: "que-manger-au-maroc",
    eyebrow: { fr: "Gastronomie", en: "Food & drink" },
    title: { fr: "Que manger au Maroc ? Les spécialités à ne pas manquer", en: "What to eat in Morocco? Specialities you shouldn't miss" },
    excerpt: {
      fr: "Tajine, couscous, pastilla... la cuisine marocaine dépasse largement les clichés. Voici les plats et habitudes culinaires qui méritent votre attention pendant le séjour.",
      en: "Tajine, couscous, pastilla... Moroccan cuisine goes well beyond the clichés. Here are the dishes and food customs worth your attention during your stay.",
    },
    readTime: { fr: "5 min de lecture", en: "5 min read" },
    image: inspSaveurs,
    imageAlt: { fr: "Tajine traditionnel garni d'épices et de fruits secs", en: "Traditional tajine garnished with spices and dried fruit" },
    content: [
      {
        paragraphs: [
          {
            fr: "La cuisine marocaine varie beaucoup selon les régions et les saisons, bien au-delà du duo tajine-couscous que l'on associe souvent au pays. Voici quelques repères pour mieux la découvrir pendant votre voyage.",
            en: "Moroccan cuisine varies a great deal by region and season, well beyond the tajine-and-couscous duo often associated with the country. Here are a few pointers to help you discover it during your trip.",
          },
        ],
      },
      {
        heading: { fr: "Au-delà du tajine", en: "Beyond the tajine" },
        paragraphs: [
          {
            fr: "Le tajine change selon la région : aux pruneaux et amandes à Fès, au citron confit et olives à Marrakech, au poisson sur la côte. Le couscous, lui, est traditionnellement réservé au vendredi dans les familles marocaines — le commander un autre jour reste possible, mais c'est un bon indice culturel.",
            en: "Tajine varies by region: with prunes and almonds in Fès, with preserved lemon and olives in Marrakech, with fish on the coast. Couscous, meanwhile, is traditionally reserved for Fridays in Moroccan households — ordering it another day is still possible, but it's a useful cultural cue.",
          },
        ],
      },
      {
        heading: { fr: "Street food et marchés", en: "Street food and markets" },
        paragraphs: [
          {
            fr: "La pastilla (feuilleté sucré-salé au pigeon ou poulet), les msemen (crêpes feuilletées) et la harira (soupe consistante, souvent servie au coucher du soleil pendant le Ramadan) se dégustent avant tout dans la rue ou sur les marchés, loin des restaurants pour touristes.",
            en: "Pastilla (a sweet-savoury pastry with pigeon or chicken), msemen (layered flatbread) and harira (a hearty soup, often served at sunset during Ramadan) are best enjoyed on the street or in markets, away from tourist-oriented restaurants.",
          },
        ],
      },
      {
        heading: { fr: "Le thé à la menthe, un rituel", en: "Mint tea, a ritual" },
        paragraphs: [
          {
            fr: "Plus qu'une boisson, le thé à la menthe accompagne chaque rencontre, chaque négociation dans les souks. Le refuser peut être perçu comme un manque de courtoisie — prenez le temps de l'accepter, même une gorgée.",
            en: "More than a drink, mint tea accompanies every encounter, every negotiation in the souks. Declining it can be seen as a lack of courtesy — take the time to accept at least a sip.",
          },
        ],
      },
    ],
  },
  {
    slug: "voyager-au-maroc-en-famille",
    eyebrow: { fr: "Conseils voyage", en: "Travel tips" },
    title: { fr: "Voyager au Maroc en famille : nos conseils pour un séjour réussi", en: "Travelling to Morocco with family: our tips for a successful trip" },
    excerpt: {
      fr: "Entre désert, montagne et médinas, le Maroc a de quoi captiver petits et grands — à condition d'adapter le rythme. Voici comment organiser un séjour familial sans fatigue inutile.",
      en: "Between desert, mountains and medinas, Morocco has plenty to captivate kids and adults alike — provided you adapt the pace. Here's how to plan a family trip without unnecessary fatigue.",
    },
    readTime: { fr: "6 min de lecture", en: "6 min read" },
    image: gFamilleGorges,
    imageAlt: { fr: "Famille en excursion dans les gorges marocaines", en: "Family on an excursion in the Moroccan gorges" },
    content: [
      {
        paragraphs: [
          {
            fr: "Le Maroc est une destination familiale plus facile qu'on ne l'imagine : vols courts depuis l'Europe, décalage horaire nul ou minime, et une hospitalité qui inclut naturellement les enfants. Quelques ajustements suffisent pour que le voyage profite à tout le monde.",
            en: "Morocco is an easier family destination than you might think: short flights from Europe, little to no time difference, and a hospitality that naturally welcomes children. A few adjustments are enough to make the trip enjoyable for everyone.",
          },
        ],
      },
      {
        heading: { fr: "Adapter le rythme, pas le programme", en: "Adjust the pace, not the programme" },
        paragraphs: [
          {
            fr: "Avec des enfants, mieux vaut prévoir moins d'étapes mais plus de temps sur chacune. Deux à trois nuits minimum par lieu évitent les trajets à répétition, souvent le point le plus fatigant du voyage pour les plus jeunes.",
            en: "With children, it's better to plan fewer stops but more time at each one. Two to three nights minimum per location avoid repeated transfers, often the most tiring part of the trip for younger travellers.",
          },
        ],
      },
      {
        heading: { fr: "Les activités qui plaisent aux enfants", en: "Activities kids enjoy" },
        paragraphs: [
          {
            fr: "La balade à dos de dromadaire dans le désert, la baignade dans une piscine de riad, les cascades de la vallée de l'Ourika ou les tours de calèche à Marrakech font partie des expériences qui marquent les plus jeunes — sans pour autant lasser les adultes.",
            en: "A camel ride in the desert, a swim in a riad pool, the waterfalls of the Ourika valley or a horse-drawn carriage ride in Marrakech are among the experiences that stick with younger travellers — without boring the adults either.",
          },
        ],
      },
      {
        heading: { fr: "Hébergement : privilégier le confort", en: "Accommodation: prioritise comfort" },
        paragraphs: [
          {
            fr: "Les riads avec piscine, chambres familiales ou suites communicantes rendent le séjour beaucoup plus confortable. Dans le désert, les camps de luxe proposent souvent des tentes familiales spacieuses, une option à privilégier pour une première nuit sous tente en famille.",
            en: "Riads with a pool, family rooms or connecting suites make the stay far more comfortable. In the desert, luxury camps often offer spacious family tents — worth choosing for a first night under canvas as a family.",
          },
        ],
      },
    ],
  },
  {
    slug: "budget-voyage-au-maroc",
    eyebrow: { fr: "Conseils pratiques", en: "Practical tips" },
    title: { fr: "Budget voyage au Maroc : combien prévoir pour un séjour sur mesure ?", en: "Morocco travel budget: how much to plan for a tailor-made trip?" },
    excerpt: {
      fr: "Entre riad de charme et camp de luxe dans le désert, le budget d'un voyage au Maroc varie fortement. Voici les postes de dépense à anticiper pour un séjour sur mesure.",
      en: "Between a charming riad and a luxury desert camp, the budget for a trip to Morocco varies widely. Here are the expense categories to anticipate for a tailor-made stay.",
    },
    readTime: { fr: "6 min de lecture", en: "6 min read" },
    image: gPiscineNuit,
    imageAlt: { fr: "Piscine de riad illuminée à la nuit tombée", en: "Riad pool illuminated at nightfall" },
    content: [
      {
        paragraphs: [
          {
            fr: "Le Maroc reste une destination abordable comparée à d'autres voyages long-courriers, mais le budget varie beaucoup selon le niveau d'hébergement, le rythme du circuit et le nombre de voyageurs. Voici comment s'y retrouver avant de composer votre devis.",
            en: "Morocco remains an affordable destination compared to other long-haul trips, but the budget varies considerably depending on the level of accommodation, the pace of the itinerary and the number of travellers. Here's how to make sense of it before building your quote.",
          },
        ],
      },
      {
        heading: { fr: "L'hébergement, le principal poste de variation", en: "Accommodation, the main source of variation" },
        paragraphs: [
          {
            fr: "Une maison d'hôtes simple et un riad 5 étoiles ou un camp de luxe dans le désert n'ont évidemment pas le même tarif. C'est le levier le plus important pour ajuster un budget à la hausse ou à la baisse, bien plus que les activités elles-mêmes.",
            en: "A simple guesthouse and a 5-star riad or a luxury desert camp obviously don't carry the same price tag. It's the single biggest lever for adjusting a budget up or down — far more than the activities themselves.",
          },
        ],
      },
      {
        heading: { fr: "Transport et guide privés", en: "Private transport and guide" },
        paragraphs: [
          {
            fr: "Un circuit sur mesure inclut généralement un véhicule privé climatisé et un chauffeur-guide francophone pour toute la durée du séjour — un poste de dépense fixe qui augmente peu avec le nombre de voyageurs, ce qui rend les circuits en groupe ou en famille proportionnellement plus avantageux.",
            en: "A tailor-made itinerary generally includes a private air-conditioned vehicle and a French-speaking driver-guide for the whole stay — a fixed cost that rises only slightly with the number of travellers, which makes group or family trips proportionally better value.",
          },
        ],
      },
      {
        heading: { fr: "Ce qui n'est généralement pas inclus", en: "What's usually not included" },
        paragraphs: [
          {
            fr: "Vols internationaux, assurance voyage et la plupart des déjeuners restent en général à la charge du voyageur, sauf mention contraire. Prévoyez aussi un budget pour les achats dans les souks — l'artisanat marocain se négocie, et cela fait partie de l'expérience.",
            en: "International flights, travel insurance and most lunches are generally the traveller's responsibility, unless stated otherwise. Also budget for souk purchases — Moroccan crafts are meant to be haggled over, and that's part of the experience.",
          },
        ],
      },
      {
        heading: { fr: "Notre approche", en: "Our approach" },
        paragraphs: [
          {
            fr: "Plutôt qu'un tarif générique, nous établissons un devis après avoir compris votre rythme, votre niveau de confort souhaité et vos priorités — certains préfèrent économiser sur l'hébergement pour investir dans une expérience unique comme un bivouac privatisé.",
            en: "Rather than a generic rate, we build a quote once we understand your pace, your desired comfort level and your priorities — some travellers prefer to save on accommodation to invest in a unique experience, like a privatised bivouac.",
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
