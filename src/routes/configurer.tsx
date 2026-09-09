import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Check, Filter, Calendar as CalendarIcon } from "lucide-react";
import { sendDevisRequest } from "@/lib/devis.functions";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { fr, enGB } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { useLanguage, type Language } from "@/lib/i18n";

export const Route = createFileRoute("/configurer")({
  head: () => ({
    meta: [
      { title: "Composer mon voyage — marocatlastour" },
      {
        name: "description",
        content:
          "Configurateur de voyage sur mesure au Maroc en 7 étapes : date, voyageurs, rythme, villes, lieux, hébergement, coordonnées. Devis sous 48h.",
      },
    ],
  }),
  component: ConfigurerPage,
});

type State = {
  destinations: string[];
  places: string[];
  departureDate: string; // ISO yyyy-mm-dd
  returnDate: string;    // ISO yyyy-mm-dd
  adults: number;
  children: number;
  pace: string;
  lodging: string;
  name: string;
  email: string;
  emailConfirm: string;
  phone: string;
  message: string;
  consent: boolean;
};

const initial: State = {
  destinations: [],
  places: [],
  departureDate: "",
  returnDate: "",
  adults: 2,
  children: 0,
  pace: "",
  lodging: "",
  name: "",
  email: "",
  emailConfirm: "",
  phone: "",
  message: "",
  consent: false,
};

const DESTINATIONS = [
  "Marrakech", "Fès", "Rabat", "Casablanca", "Tanger", "Meknès",
  "Chefchaouen", "Essaouira", "Agadir", "Ouarzazate", "Tétouan", "Asilah",
  "El Jadida", "Safi", "Ifrane", "Azrou", "Taroudant", "Tiznit",
  "Oujda", "Nador", "Al Hoceïma", "Larache", "Beni Mellal", "Khénifra",
  "Sefrou", "Taza", "Midelt", "Errachidia", "Zagora", "Dakhla", "Laâyoune",
  "Moulay Idriss & Volubilis", "Aït Ben Haddou", "Sahara (Merzouga)",
  "Sahara (Mhamid)", "Atlas & Vallées",
];

const PLACES_BY_CITY: Record<string, string[]> = {
  "Marrakech": [
    "Place Jemaa el-Fna", "Souks de la médina", "Jardin Majorelle", "Palais Bahia",
    "Tombeaux saadiens", "Médersa Ben Youssef", "Mosquée Koutoubia", "Jardin secret",
    "Musée Yves Saint Laurent", "Palmeraie",
  ],
  "Fès": [
    "Médina de Fès el-Bali", "Tanneries Chouara", "Médersa Bou Inania",
    "Université Al Quaraouiyine", "Place Seffarine", "Bab Boujloud",
    "Palais royal Dar el-Makhzen", "Mausolée Moulay Idriss II",
  ],
  "Chefchaouen": [
    "Place Outa el-Hammam", "Kasbah de Chefchaouen", "Ras el-Maa",
    "Mosquée espagnole (point de vue)", "Médina bleue", "Cascades d'Akchour",
  ],
  "Essaouira": [
    "Médina d'Essaouira", "Skala de la Kasbah", "Port de pêche",
    "Plage d'Essaouira", "Île de Mogador", "Souk aux poissons",
  ],
  "Sahara (Merzouga)": [
    "Erg Chebbi", "Bivouac sous les étoiles", "Lac Dayet Srji (oiseaux)",
    "Village de Khamlia (musique gnawa)", "Mines de Mfis", "Oasis de Tafilalet",
  ],
  "Sahara (Mhamid)": [
    "Erg Chigaga", "Oasis de M'hamid", "Drâa et palmeraies", "Bivouac berbère",
    "Lac iriqui", "Vieux ksars du Drâa",
  ],
  "Atlas & Vallées": [
    "Vallée de l'Ourika", "Vallée des Roses", "Imlil & Toubkal",
    "Cascades d'Ouzoud", "Vallée du Dadès", "Gorges du Todra", "Telouet",
  ],
  "Aït Ben Haddou": [
    "Ksar d'Aït Ben Haddou", "Greniers fortifiés", "Vue panoramique du sommet",
    "Studios de cinéma de Ouarzazate", "Kasbah de Taourirt",
  ],
  "Tanger": [
    "Médina de Tanger", "Kasbah & Musée", "Cap Spartel", "Grottes d'Hercule",
    "Café Hafa", "Place du 9 avril (Grand Socco)", "Plage municipale",
  ],
  "Casablanca": [
    "Mosquée Hassan II", "Corniche Aïn Diab", "Quartier des Habous",
    "Cathédrale du Sacré-Cœur", "Place Mohammed V", "Marché central",
  ],
  "Rabat": [
    "Tour Hassan", "Mausolée Mohammed V", "Kasbah des Oudayas",
    "Médina de Rabat", "Chellah (nécropole mérinide)", "Musée Mohammed VI d'art moderne",
    "Plage de Rabat",
  ],
  "Meknès": [
    "Place El-Hedim", "Bab Mansour", "Mausolée Moulay Ismaïl",
    "Greniers & écuries royales (Heri es-Souani)", "Médina de Meknès",
    "Bassin de l'Agdal",
  ],
  "Agadir": [
    "Plage d'Agadir", "Marina d'Agadir", "Kasbah Agadir Oufella",
    "Souk El Had", "Vallée du Paradis", "Médina Polizzi",
  ],
  "Ouarzazate": [
    "Kasbah de Taourirt", "Studios Atlas (cinéma)", "Musée du cinéma",
    "Barrage El Mansour Eddahbi", "Kasbah de Tifoultoute",
  ],
  "Tétouan": [
    "Médina de Tétouan (UNESCO)", "Place Hassan II", "Musée ethnographique",
    "École des arts et métiers traditionnels", "Plage de Martil",
  ],
  "Asilah": [
    "Remparts portugais", "Médina blanche & murs peints",
    "Plage de Paradise Beach", "Galerie d'art Hassan II", "Port de pêche",
  ],
  "El Jadida": [
    "Cité portugaise (UNESCO)", "Citerne portugaise", "Remparts de Mazagan",
    "Plage Sidi Bouzid", "Marché central",
  ],
  "Safi": [
    "Quartier des potiers", "Kasbah Dar el Bahar", "Médina de Safi",
    "Cathédrale portugaise", "Plage de Lalla Fatna",
  ],
  "Ifrane": [
    "Centre-ville alpin", "Lion de pierre", "Parc national d'Ifrane",
    "Cèdre Gouraud (forêt de cèdres)", "Lac Dayet Aoua",
  ],
  "Azrou": [
    "Forêt de cèdres & singes magots", "Souk hebdomadaire",
    "Coopératives berbères", "Sources de l'Oum Er-Rbia",
  ],
  "Taroudant": [
    "Remparts de Taroudant", "Souk berbère", "Souk arabe",
    "Place Assarag", "Palais Salam",
  ],
  "Tiznit": [
    "Médina & remparts", "Souk des bijoutiers (argent)",
    "Grande mosquée", "Source bleue (Aïn Aggar)",
  ],
  "Oujda": [
    "Médina d'Oujda", "Place du 16 août", "Parc Lalla Aïcha",
    "Sidi Yahya (oasis sacrée)",
  ],
  "Nador": [
    "Lagune de Marchica", "Corniche de Nador", "Mont Gourougou",
    "Cap des Trois Fourches",
  ],
  "Al Hoceïma": [
    "Baie d'Al Hoceïma", "Parc national d'Al Hoceïma",
    "Plage Quemado", "Péninsule de Badis",
  ],
  "Larache": [
    "Médina de Larache", "Place de la Libération",
    "Ruines de Lixus", "Plage de Larache",
  ],
  "Beni Mellal": [
    "Kasbah Bel Kush", "Source Aïn Asserdoun",
    "Cascades d'Ouzoud (excursion)", "Lac de Bin El Ouidane",
  ],
  "Khénifra": [
    "Pont portugais", "Sources de l'Oum Er-Rbia",
    "Lac Aguelmam Azigza", "Parc national de Khénifra",
  ],
  "Sefrou": [
    "Médina de Sefrou", "Cascades de Sefrou",
    "Mellah historique", "Festival des cerises (saisonnier)",
  ],
  "Taza": [
    "Médina de Taza", "Grande mosquée",
    "Grottes de Friouato", "Parc national de Tazekka",
  ],
  "Midelt": [
    "Marché aux minéraux", "Cirque de Jaffar",
    "Monastère de Tioumliline", "Gorges d'Aouli",
  ],
  "Errachidia": [
    "Vallée du Ziz & palmeraies", "Source bleue de Meski",
    "Barrage Hassan Addakhil", "Gorges du Ziz",
  ],
  "Zagora": [
    "Palmeraie de Zagora", "Mont Zagora (point de vue)",
    "Ksar Tissergate", "Caravanes du désert (Tombouctou 52 jours)",
  ],
  "Dakhla": [
    "Lagune de Dakhla", "Dune blanche", "Île du Dragon",
    "Phare du Cap Boujdour", "Spots de kitesurf",
  ],
  "Laâyoune": [
    "Place du Mechouar", "Cathédrale espagnole",
    "Souk Djemal", "Oasis de Lemsid",
  ],
  "Moulay Idriss & Volubilis": [
    "Site romain de Volubilis (UNESCO)", "Arc de Caracalla",
    "Mausolée Moulay Idriss Ier", "Terrasse panoramique de Moulay Idriss",
  ],
};

const LODGINGS = {
  fr: [
    { id: "riad", title: "Riad de charme", desc: "Patios, zellige et hospitalité familiale." },
    { id: "kasbah", title: "Kasbah & maison d'hôtes", desc: "Pisé, vues sur l'Atlas et table d'hôte." },
    { id: "design", title: "Hôtel design", desc: "Confort contemporain et services premium." },
    { id: "camp", title: "Camp de luxe Sahara", desc: "Tentes berbères, dîner sous les étoiles." },
    { id: "mixte", title: "Mixte", desc: "Une combinaison sur mesure selon les étapes." },
  ],
  en: [
    { id: "riad", title: "Charming riad", desc: "Patios, zellige tilework and family hospitality." },
    { id: "kasbah", title: "Kasbah & guesthouse", desc: "Rammed earth, Atlas views and a shared table." },
    { id: "design", title: "Design hotel", desc: "Contemporary comfort and premium services." },
    { id: "camp", title: "Sahara luxury camp", desc: "Berber tents, dinner under the stars." },
    { id: "mixte", title: "A mix of styles", desc: "A tailor-made combination across your stages." },
  ],
} as const;
const PACES = {
  fr: [
    { id: "slow", title: "Contemplatif", desc: "2 à 3 nuits par étape, immersion lente." },
    { id: "balanced", title: "Équilibré", desc: "Un mélange de découvertes et de repos." },
    { id: "intense", title: "Explorateur", desc: "Itinéraire dynamique, multiples étapes." },
  ],
  en: [
    { id: "slow", title: "Contemplative", desc: "2 to 3 nights per stage, a slow immersion." },
    { id: "balanced", title: "Balanced", desc: "A mix of discovery and rest." },
    { id: "intense", title: "Explorer", desc: "A dynamic itinerary, many stages." },
  ],
} as const;

type DaySource = "main" | "alternate" | "free";
type ItineraryDay = { day: number; city: string; places: string[]; note?: string; source: DaySource };

function buildItinerary(
  destinations: string[],
  places: string[],
  pace: string,
  language: Language = "fr",
): ItineraryDay[] {
  if (destinations.length === 0) return [];
  // Sans champ « durée », on dérive le nombre de jours par ville du rythme.
  const daysPerCity = pace === "slow" ? 3 : pace === "intense" ? 1 : 2;
  const perDay = pace === "intense" ? 3 : pace === "slow" ? 1 : 2;

  const days: ItineraryDay[] = [];
  let dayCounter = 1;
  destinations.forEach((city) => {
    const nDays = Math.max(1, daysPerCity);
    const cityPlaces = (PLACES_BY_CITY[city] ?? []);
    const chosen = places.filter((p) => cityPlaces.includes(p));
    const pool = [
      ...chosen,
      ...cityPlaces.filter((p) => !chosen.includes(p)),
    ];
    const alternates = (ALTERNATES_BY_CITY[city] ?? []).slice();
    let altIdx = 0;
    for (let d = 0; d < nDays; d++) {
      const slice = pool.slice(d * perDay, d * perDay + perDay);
      let dayPlaces: string[];
      let source: DaySource;
      if (slice.length > 0) {
        dayPlaces = slice;
        source = "main";
      } else if (alternates.length > 0 && altIdx < alternates.length) {
        const picked: string[] = [];
        for (let k = 0; k < perDay && altIdx < alternates.length; k++) {
          picked.push(alternates[altIdx++]);
        }
        dayPlaces = picked;
        source = "alternate";
      } else {
        dayPlaces = [language === "fr" ? "Temps libre & flânerie" : "Free time to wander"];
        source = "free";
      }
      days.push({ day: dayCounter++, city, places: dayPlaces, source });
    }
  });
  return days;
}

// Activités d'alternance, cohérentes avec l'esprit de chaque ville. Servent
// à compléter les journées quand les "lieux à visiter" sont épuisés, avant de
// retomber sur un véritable "Temps libre & flânerie".
const ALTERNATES_BY_CITY: Record<string, string[]> = {
  "Marrakech": [
    "Thé à la menthe sur une terrasse de la médina",
    "Atelier de poterie ou de zellige",
    "Promenade en calèche autour des remparts",
    "Hammam traditionnel & gommage",
    "Dîner gastronomique dans un riad",
  ],
  "Fès": [
    "Découverte de l'artisanat du cuivre",
    "Pause dans un café à musique andalouse",
    "Atelier de cuisine fassie",
    "Balade aux jardins Jnan Sbil",
    "Soirée contes au cœur de la médina",
  ],
  "Chefchaouen": [
    "Photographie au lever du jour dans les ruelles bleues",
    "Dégustation de fromage de chèvre du Rif",
    "Atelier de tissage berbère",
    "Pause thé face aux montagnes",
    "Petite randonnée dans les collines",
  ],
  "Essaouira": [
    "Balade à dos de cheval sur la plage",
    "Dégustation de poisson grillé au port",
    "Atelier de marqueterie en thuya",
    "Coucher de soleil sur les remparts",
    "Cours d'initiation au surf ou kitesurf",
  ],
  "Sahara (Merzouga)": [
    "Lever de soleil sur les dunes",
    "Balade en 4x4 hors-piste",
    "Soirée musique berbère autour du feu",
    "Sandboard sur l'erg",
    "Visite d'une famille nomade",
  ],
  "Sahara (Mhamid)": [
    "Marche silencieuse dans les dunes",
    "Nuit à la belle étoile",
    "Rencontre avec une tribu nomade",
    "Méditation au lever du soleil",
    "Repas sous la tente caïdale",
  ],
  "Atlas & Vallées": [
    "Déjeuner chez l'habitant berbère",
    "Baignade dans une rivière de montagne",
    "Trek vers un village d'altitude",
    "Visite d'une coopérative d'huile d'argan",
    "Observation des étoiles en altitude",
  ],
  "Aït Ben Haddou": [
    "Promenade au bord de l'oued Mellah",
    "Atelier de peinture sur safran et henné",
    "Dîner berbère en terrasse",
    "Visite d'une coopérative locale",
    "Coucher de soleil sur le ksar",
  ],
  "Tanger": [
    "Café littéraire dans la médina",
    "Promenade le long de la corniche",
    "Dégustation de fruits de mer au port",
    "Visite d'une galerie d'art contemporain",
    "Excursion à Asilah",
  ],
  "Casablanca": [
    "Brunch dans un café Art déco",
    "Balade architecturale dans le centre",
    "Dîner face à l'océan",
    "Découverte du street art à Sbata",
    "Shopping au Morocco Mall",
  ],
  "Rabat": [
    "Promenade au bord du Bouregreg", "Café à Salé en face",
    "Visite d'une galerie d'art contemporain", "Dégustation de pâtisseries marocaines",
    "Balade en barque sur le fleuve",
  ],
  "Meknès": [
    "Dégustation de vins de Meknès", "Pause dans un café de la médina",
    "Atelier de damasquinerie", "Promenade autour des remparts",
    "Excursion à Volubilis",
  ],
  "Agadir": [
    "Coucher de soleil sur la marina", "Cours de surf à Taghazout",
    "Hammam berbère & argan", "Excursion à Imouzzer (cascades)",
    "Promenade à dos de dromadaire sur la plage",
  ],
  "Ouarzazate": [
    "Visite d'une coopérative de safran", "Tournage en plateau de cinéma",
    "Excursion à la vallée du Drâa", "Soirée musique gnawa",
    "Atelier de tapis berbère",
  ],
  "Tétouan": [
    "Atelier de broderie tétouanaise", "Pause thé sur la place Hassan II",
    "Découverte de la cuisine andalouse", "Excursion à Cabo Negro",
    "Visite d'un atelier de zellige",
  ],
  "Asilah": [
    "Promenade le long des remparts au coucher du soleil",
    "Atelier de peinture murale", "Dégustation de poisson grillé",
    "Pause dans un café de la médina blanche", "Baignade à Paradise Beach",
  ],
  "El Jadida": [
    "Balade dans la cité portugaise", "Dégustation d'huîtres d'Oualidia",
    "Promenade à cheval sur la plage", "Café au bord de la lagune",
    "Visite d'une coopérative de pêcheurs",
  ],
  "Safi": [
    "Atelier de poterie chez un maître artisan", "Dégustation de sardines fraîches",
    "Surf à la plage de Lalla Fatna", "Pause dans un café face à l'océan",
    "Découverte du quartier des potiers",
  ],
  "Ifrane": [
    "Randonnée en forêt de cèdres", "Pause dans un café alpin",
    "Observation des singes magots", "Pique-nique au lac Dayet Aoua",
    "Ski en hiver à Michlifen",
  ],
  "Azrou": [
    "Achat d'artisanat berbère", "Randonnée dans le Moyen Atlas",
    "Déjeuner chez l'habitant", "Visite d'une coopérative féminine",
    "Observation de la faune en forêt",
  ],
  "Taroudant": [
    "Promenade en calèche autour des remparts", "Achat de bijoux berbères",
    "Hammam traditionnel", "Pause thé dans un riad",
    "Excursion vers la vallée du Souss",
  ],
  "Tiznit": [
    "Atelier de bijouterie en argent", "Pause à la source bleue",
    "Dégustation d'huile d'argan", "Promenade dans la médina",
    "Excursion à la plage d'Aglou",
  ],
  "Oujda": [
    "Pause dans un café traditionnel", "Promenade au parc Lalla Aïcha",
    "Dégustation de cuisine de l'Oriental", "Excursion à Saïdia (plage)",
    "Découverte de la musique gharnati",
  ],
  "Nador": [
    "Promenade au bord de la lagune", "Dégustation de fruits de mer",
    "Excursion à Melilla", "Randonnée au mont Gourougou",
    "Sortie en bateau sur Marchica",
  ],
  "Al Hoceïma": [
    "Baignade dans une crique sauvage", "Sortie en bateau dans le parc national",
    "Dégustation de poisson au port", "Randonnée côtière",
    "Coucher de soleil sur la baie",
  ],
  "Larache": [
    "Promenade sur la place de la Libération", "Dégustation de poisson frais",
    "Visite des ruines romaines de Lixus", "Pause dans un café de la médina",
    "Baignade à la plage de Larache",
  ],
  "Beni Mellal": [
    "Excursion aux cascades d'Ouzoud", "Pique-nique à Aïn Asserdoun",
    "Sortie en kayak à Bin El Ouidane", "Visite d'une coopérative d'olives",
    "Randonnée dans le Moyen Atlas",
  ],
  "Khénifra": [
    "Randonnée autour du lac Aguelmam Azigza", "Découverte de la culture amazighe",
    "Pause aux sources de l'Oum Er-Rbia", "Pique-nique en forêt",
    "Observation des macaques",
  ],
  "Sefrou": [
    "Balade dans le mellah historique", "Pause aux cascades",
    "Dégustation de cerises (en saison)", "Achat d'artisanat local",
    "Randonnée dans les collines environnantes",
  ],
  "Taza": [
    "Exploration des grottes de Friouato", "Randonnée au parc de Tazekka",
    "Pause dans un café de la médina", "Découverte de l'artisanat local",
    "Pique-nique en forêt de chênes-lièges",
  ],
  "Midelt": [
    "Achat de fossiles et minéraux", "Excursion au cirque de Jaffar",
    "Dégustation de pommes locales", "Découverte de l'artisanat de tapis",
    "Randonnée dans le Haut Atlas oriental",
  ],
  "Errachidia": [
    "Promenade dans la palmeraie du Ziz", "Baignade à la source bleue de Meski",
    "Dégustation de dattes", "Excursion vers les gorges du Ziz",
    "Pause thé chez l'habitant",
  ],
  "Zagora": [
    "Excursion en 4x4 dans le désert", "Promenade à dos de dromadaire",
    "Dégustation de tajine berbère", "Coucher de soleil sur la palmeraie",
    "Soirée musique sahraouie",
  ],
  "Dakhla": [
    "Session de kitesurf", "Excursion à la dune blanche",
    "Dégustation d'huîtres de Dakhla", "Sortie en bateau dans la lagune",
    "Observation des flamants roses",
  ],
  "Laâyoune": [
    "Découverte de la culture sahraouie", "Pause thé sous la khaïma",
    "Visite du souk traditionnel", "Promenade dans la palmeraie",
    "Dégustation de méchoui",
  ],
  "Moulay Idriss & Volubilis": [
    "Visite guidée du site archéologique", "Pause à la terrasse panoramique",
    "Déjeuner berbère traditionnel", "Achat d'huile d'olive locale",
    "Promenade dans la ville sainte",
  ],
};

const STEPS = {
  fr: [
    "Date souhaitée", "Voyageurs", "Rythme", "Villes à découvrir",
    "Lieux à visiter", "Hébergement", "Coordonnées",
  ],
  en: [
    "Preferred dates", "Travellers", "Pace", "Cities to explore",
    "Places to visit", "Accommodation", "Your details",
  ],
} as const;
const STEP_COUNT = STEPS.fr.length;

// Format long (« 13 juin 2026 » / « 13 June 2026 »). On force le fuseau UTC
// pour éviter qu'une date ISO `yyyy-mm-dd` (interprétée comme minuit UTC) ne
// bascule au jour précédent dans les fuseaux à l'ouest de Greenwich.
const DATE_FORMATTERS: Record<Language, Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  en: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};

/** Calcule le nombre de nuits entre deux dates ISO (>= 0). */
function nightsBetween(departure: string, ret: string): number {
  const a = new Date(departure).getTime();
  const b = new Date(ret).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

function formatDate(iso: string, language: Language = "fr"): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : DATE_FORMATTERS[language].format(d);
}

/**
 * Formatte une période de manière homogène.
 * - les deux dates : « Du 13 juin 2026 au 23 juin 2026 (10 nuits) » / "13 June 2026 to 23 June 2026 (10 nights)"
 * - seule l'aller : « À partir du 13 juin 2026 » / "From 13 June 2026"
 * - seul le retour : « Jusqu'au 23 juin 2026 » / "Until 23 June 2026"
 * - aucune des deux : « — »
 */
function formatDateRange(departure: string, ret: string, language: Language = "fr"): string {
  const d = formatDate(departure, language);
  const r = formatDate(ret, language);
  if (d && r) {
    const n = nightsBetween(departure, ret);
    if (language === "fr") {
      const suffix = n > 0 ? ` (${n} nuit${n > 1 ? "s" : ""})` : "";
      return `Du ${d} au ${r}${suffix}`;
    }
    const suffix = n > 0 ? ` (${n} night${n > 1 ? "s" : ""})` : "";
    return `${d} to ${r}${suffix}`;
  }
  if (d) return language === "fr" ? `À partir du ${d}` : `From ${d}`;
  if (r) return language === "fr" ? `Jusqu'au ${r}` : `Until ${r}`;
  return "—";
}

const STORAGE_KEY = "marocatlastour:config";
const STEP_STORAGE_KEY = "marocatlastour:config:step";
const URL_STEP_PARAM = "etape";
const URL_DEPARTURE_PARAM = "aller";
const URL_RETURN_PARAM = "retour";

/** Vérifie qu'une chaîne est une date ISO `yyyy-mm-dd` valide. */
function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** Lit un numéro d'étape depuis l'URL (query `?etape=N`). */
function readStepFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get(URL_STEP_PARAM);
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

/** Lit les dates aller/retour depuis l'URL (query `?aller=…&retour=…`). */
function readDatesFromUrl(): { departureDate?: string; returnDate?: string } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const dep = params.get(URL_DEPARTURE_PARAM) ?? "";
  const ret = params.get(URL_RETURN_PARAM) ?? "";
  return {
    departureDate: isValidIsoDate(dep) ? dep : undefined,
    returnDate: isValidIsoDate(ret) ? ret : undefined,
  };
}

const CFG_TEXT = {
  fr: {
    validation: {
      depRequired: "Choisissez une date d'aller.",
      retRequired: "Choisissez une date de retour.",
      invalidDates: "Dates invalides.",
      depFuture: "La date d'aller doit être dans le futur.",
      retAfterDep: "La date de retour doit être après l'aller.",
      adultRequired: "Au moins un adulte est requis.",
      paceRequired: "Choisissez un rythme de voyage.",
      cityRequired: "Sélectionnez au moins une ville.",
      lodgingRequired: "Choisissez un type d'hébergement.",
      nameRequired: "Votre nom est requis.",
      emailRequired: "Votre email est requis.",
      emailTooLong: "Email trop long (254 caractères maximum).",
      emailNoSpace: "L'email ne doit pas contenir d'espace.",
      emailInvalid: "Format d'email invalide (ex. prenom.nom@domaine.com).",
      emailConfirmRequired: "Veuillez confirmer votre email.",
      emailMismatch: "Les deux emails ne correspondent pas.",
      phoneRequired: "Votre numéro de téléphone est requis.",
      phoneInvalid: "Numéro de téléphone invalide (7 à 20 chiffres, format international accepté).",
      consentRequired: "Veuillez confirmer votre consentement avant l'envoi.",
    },
    sourceLabels: { main: "Lieux principaux", alternate: "Alternance", free: "Temps libre" },
    toggleOn: (label: string) => `Surlignage « ${label} » activé`,
    toggleOff: (label: string) => `Surlignage « ${label} » désactivé`,
    helpClosed: (text: string) => `Message d'aide fermé : ${text}.`,
    helpAnnounce: (text: string) => `${text}. Bouton OK disponible, ou appuyez sur Échap pour fermer.`,
    stepLabel: (step: string, total: string) => `Étape ${step} / ${total}`,
    review: "Récapitulatif",
    sent: "Demande envoyée",
    verification: "Vérification",
    thanks: "Merci",
    progressAria: "Progression du configurateur",
    stepValueText: (step: number, total: number, label: string) => `Étape ${step} sur ${total} : ${label}`,
    reviewValueText: (total: number) => `Récapitulatif (étape ${total} terminée)`,
    sentValueText: "Demande envoyée",
    stepsNavAria: "Étapes du configurateur",
    statusCurrent: "en cours",
    statusDone: "terminée",
    statusUpcoming: "à venir",
    stepButtonAria: (n: number, total: number, label: string, status: string, done: boolean) =>
      `Étape ${n} sur ${total} : ${label}, ${status}${done ? " (cliquer pour y revenir)" : ""}`,
    step1: {
      title: "Quand souhaitez-vous partir ?",
      subtitle: "Sélectionnez vos dates d'aller et de retour. Le Maroc se visite presque toute l'année.",
      datesLabel: "Dates souhaitées",
      chooseReturn: "Choisissez le retour",
      selectDates: "Sélectionnez vos dates",
      night: (n: number) => `${n} nuit${n > 1 ? "s" : ""}`,
      depRequired: "La date d'aller est requise.",
      retRequired: "La date de retour est requise.",
      retAfterDep: "La date de retour doit être après l'aller.",
      bothRequired: "Aller et retour sont obligatoires.",
    },
    step2: {
      title: "Avec qui voyagez-vous ?",
      subtitle: "Adultes et enfants. Cela nous aide à choisir riads et activités adaptés.",
      adults: "Adultes",
      children: "Enfants",
    },
    step3: {
      title: "Quel rythme pour votre exploration ?",
      subtitle: "Chaque voyageur possède sa propre cadence.",
    },
    step4: {
      title: "Quelles villes souhaitez-vous découvrir ?",
      subtitle: "Sélectionnez une ou plusieurs étapes. Nous tisserons l'itinéraire pour vous.",
    },
    step5: {
      title: "Quels lieux souhaitez-vous visiter ?",
      subtitle: "Pour chaque ville choisie, cochez les lieux qui vous tentent (optionnel).",
      needCity: "Revenez à l'étape précédente pour choisir au moins une ville.",
    },
    step6: {
      title: "Quel type d'hébergement préférez-vous ?",
      subtitle: "Nous ne travaillons qu'avec des adresses sélectionnées avec soin.",
    },
    step7: {
      title: "Vos coordonnées",
      subtitle: "Pour vous envoyer votre devis personnalisé sous 48h.",
      name: "Nom complet",
      namePlaceholder: "Camille Dupont",
      email: "Email",
      emailPlaceholder: "vous@email.com",
      phone: "Téléphone",
      phonePlaceholder: "+33 6 12 34 56 78",
      message: "Message (optionnel)",
      messagePlaceholder: "Une attention particulière, une occasion spéciale ?",
      confirmEmail: "Confirmer l'email",
    },
    reviewStep: {
      title: "Vérifiez votre voyage avant l'envoi.",
      subtitle: "Tout est correct ? Vous pouvez modifier chaque section avant d'envoyer votre demande de devis.",
      previewEyebrow: "Aperçu d'itinéraire",
      previewTitle: "Votre voyage, jour après jour",
      previewNote: "Proposition générée à partir de vos destinations, lieux choisis et style. Affinée par nos concepteurs.",
      helpRegionAria: "Message d'aide du surlignage",
      ok: "OK",
      activeFilter: "Filtre actif :",
      day: (n: number) => `${n} jour${n > 1 ? "s" : ""}`,
      disableFilterAria: "Désactiver le filtre",
      disable: "Désactiver",
      dayLabel: "Jour",
      alternateTooltip: "Lieux principaux épuisés : journée composée d'activités d'alternance.",
      freeTooltip: "Toutes les suggestions sont consommées : journée libre.",
      alternateBadge: "Alternance",
      freeBadge: "Temps libre",
      switchNote: (day: number, hasFree: boolean) =>
        `À partir du jour ${day}, l'itinéraire bascule sur des activités d'alternance${hasFree ? " puis du temps libre" : ""}. Ajoutez des lieux ou des étapes pour densifier le programme.`,
      legendMain: "Lieux principaux",
      legendAlternate: "Activités d'alternance",
      legendFree: "Temps libre",
      period: "Période",
      travelers: "Voyageurs",
      pace: "Rythme",
      cities: "Villes à découvrir",
      places: "Lieux à visiter",
      lodging: "Hébergement",
      contact: "Coordonnées",
      toDefine: "À définir ensemble",
      yourMessage: "Votre message",
      consent: "J'accepte d'être recontacté(e) par l'équipe marocatlastour sous 48h ouvrées concernant ma demande de devis. Mes données restent confidentielles et ne sont jamais cédées. Aucune obligation d'achat.",
      edit: "Modifier",
    },
    successStep: {
      greeting: (name: string) => `Demande bien reçue, ${name}.`,
      fallbackName: "voyageur",
      body1: "Un de nos concepteurs étudie votre voyage et vous revient à",
      body2: "sous 48h ouvrées avec un itinéraire chiffré.",
      back: "Retour à l'accueil",
    },
    nav: {
      ariaLabel: "Navigation entre les étapes",
      prevDisabled: "Précédent (indisponible — première étape)",
      prevTo: (n: number, label: string) => `Précédent : revenir à l'étape ${n} — ${label}`,
      prev: "Précédent",
      next: "Suivant",
      nextTo: (n: number, label: string) => `Suivant : aller à l'étape ${n} — ${label}`,
      review: "Vérifier ma demande",
      reviewAria: "Vérifier ma demande : aller au récapitulatif avant l'envoi",
      submitAria: "Envoyer ma demande de devis personnalisé",
      sending: "Envoi en cours…",
      submit: "Envoyer ma demande",
      sendErrorGeneric: "L'envoi a échoué. Réessayez ou contactez-nous directement.",
      sendErrorNetwork: "L'envoi a échoué. Vérifiez votre connexion et réessayez.",
    },
    recap: {
      eyebrow: "Votre carnet",
      title: "Voyage en cours",
      period: "Période",
      travelers: "Voyageurs",
      pace: "Rythme",
      cities: "Villes",
      places: "Lieux",
      lodging: "Hébergement",
      selected: (n: number) => `${n} sélectionné${n > 1 ? "s" : ""}`,
      note: "Estimation affinée par nos concepteurs sous 48h.",
    },
    travelersValue: (adults: number, children: number) =>
      `${adults} adulte${adults > 1 ? "s" : ""}${children ? ` · ${children} enfant${children > 1 ? "s" : ""}` : ""}`,
    dash: "—",
    confirmEmail: {
      same: "Les deux emails sont identiques.",
      emptyFirst: "Renseignez d'abord votre email dans le champ précédent.",
      incomplete: "L'email de confirmation est incomplet.",
      tooLong: "L'email de confirmation contient des caractères en trop.",
      domainDiffers: (got: string, expected: string) => `Le domaine diffère : « ${got} » au lieu de « ${expected} ».`,
      localDiffers: "La partie avant @ est différente (vérifiez l'orthographe).",
      caseDiffers: "Une différence de casse ou de caractère spécial empêche la correspondance.",
      match: "Les emails correspondent.",
      matchAria: "Les emails correspondent. Plus d'informations.",
      mismatchAria: "Les emails ne correspondent pas. Plus d'informations.",
      closeTitle: "Fermer (Échap)",
    },
    closeMessage: (text: string) => `Fermer le message « ${text} » (touche Échap)`,
  },
  en: {
    validation: {
      depRequired: "Choose a departure date.",
      retRequired: "Choose a return date.",
      invalidDates: "Invalid dates.",
      depFuture: "The departure date must be in the future.",
      retAfterDep: "The return date must be after the departure date.",
      adultRequired: "At least one adult is required.",
      paceRequired: "Choose a travel pace.",
      cityRequired: "Select at least one city.",
      lodgingRequired: "Choose a type of accommodation.",
      nameRequired: "Your name is required.",
      emailRequired: "Your email is required.",
      emailTooLong: "Email too long (254 characters maximum).",
      emailNoSpace: "The email must not contain spaces.",
      emailInvalid: "Invalid email format (e.g. jane.doe@domain.com).",
      emailConfirmRequired: "Please confirm your email.",
      emailMismatch: "The two emails do not match.",
      phoneRequired: "Your phone number is required.",
      phoneInvalid: "Invalid phone number (7 to 20 digits, international format accepted).",
      consentRequired: "Please confirm your consent before sending.",
    },
    sourceLabels: { main: "Main highlights", alternate: "Alternate activities", free: "Free time" },
    toggleOn: (label: string) => `“${label}” highlight enabled`,
    toggleOff: (label: string) => `“${label}” highlight disabled`,
    helpClosed: (text: string) => `Help message closed: ${text}.`,
    helpAnnounce: (text: string) => `${text}. OK button available, or press Escape to close.`,
    stepLabel: (step: string, total: string) => `Step ${step} / ${total}`,
    review: "Review",
    sent: "Request sent",
    verification: "Review",
    thanks: "Thank you",
    progressAria: "Trip builder progress",
    stepValueText: (step: number, total: number, label: string) => `Step ${step} of ${total}: ${label}`,
    reviewValueText: (total: number) => `Review (step ${total} completed)`,
    sentValueText: "Request sent",
    stepsNavAria: "Trip builder steps",
    statusCurrent: "in progress",
    statusDone: "completed",
    statusUpcoming: "upcoming",
    stepButtonAria: (n: number, total: number, label: string, status: string, done: boolean) =>
      `Step ${n} of ${total}: ${label}, ${status}${done ? " (click to go back)" : ""}`,
    step1: {
      title: "When would you like to travel?",
      subtitle: "Select your departure and return dates. Morocco can be visited almost year-round.",
      datesLabel: "Preferred dates",
      chooseReturn: "Choose your return",
      selectDates: "Select your dates",
      night: (n: number) => `${n} night${n > 1 ? "s" : ""}`,
      depRequired: "The departure date is required.",
      retRequired: "The return date is required.",
      retAfterDep: "The return date must be after the departure date.",
      bothRequired: "Both departure and return dates are required.",
    },
    step2: {
      title: "Who's travelling with you?",
      subtitle: "Adults and children. This helps us choose the right riads and activities.",
      adults: "Adults",
      children: "Children",
    },
    step3: {
      title: "What pace suits your exploration?",
      subtitle: "Every traveller has their own rhythm.",
    },
    step4: {
      title: "Which cities would you like to explore?",
      subtitle: "Select one or several stops. We'll weave the itinerary together for you.",
    },
    step5: {
      title: "Which places would you like to visit?",
      subtitle: "For each city you chose, tick the places that appeal to you (optional).",
      needCity: "Go back to the previous step to choose at least one city.",
    },
    step6: {
      title: "What type of accommodation do you prefer?",
      subtitle: "We only work with carefully selected addresses.",
    },
    step7: {
      title: "Your details",
      subtitle: "So we can send you your personalised quote within 48 hours.",
      name: "Full name",
      namePlaceholder: "Jane Smith",
      email: "Email",
      emailPlaceholder: "you@email.com",
      phone: "Phone",
      phonePlaceholder: "+1 555 123 4567",
      message: "Message (optional)",
      messagePlaceholder: "A special occasion, a particular request?",
      confirmEmail: "Confirm email",
    },
    reviewStep: {
      title: "Review your trip before sending.",
      subtitle: "Is everything correct? You can edit any section before sending your quote request.",
      previewEyebrow: "Itinerary preview",
      previewTitle: "Your trip, day by day",
      previewNote: "Proposal generated from your destinations, chosen places and style. Refined by our designers.",
      helpRegionAria: "Highlight help message",
      ok: "OK",
      activeFilter: "Active filter:",
      day: (n: number) => `${n} day${n > 1 ? "s" : ""}`,
      disableFilterAria: "Disable the filter",
      disable: "Disable",
      dayLabel: "Day",
      alternateTooltip: "Main highlights exhausted: the day is filled with alternate activities.",
      freeTooltip: "All suggestions have been used: a free day.",
      alternateBadge: "Alternate",
      freeBadge: "Free time",
      switchNote: (day: number, hasFree: boolean) =>
        `From day ${day}, the itinerary switches to alternate activities${hasFree ? " then free time" : ""}. Add places or stops to fill out the programme.`,
      legendMain: "Main highlights",
      legendAlternate: "Alternate activities",
      legendFree: "Free time",
      period: "Dates",
      travelers: "Travellers",
      pace: "Pace",
      cities: "Cities to explore",
      places: "Places to visit",
      lodging: "Accommodation",
      contact: "Your details",
      toDefine: "To be decided together",
      yourMessage: "Your message",
      consent: "I agree to be contacted by the marocatlastour team within 48 working hours regarding my quote request. My data remains confidential and is never shared. No obligation to purchase.",
      edit: "Edit",
    },
    successStep: {
      greeting: (name: string) => `Request received, ${name}.`,
      fallbackName: "traveller",
      body1: "One of our designers is reviewing your trip and will get back to you at",
      body2: "within 48 working hours with a priced itinerary.",
      back: "Back to home",
    },
    nav: {
      ariaLabel: "Navigation between steps",
      prevDisabled: "Previous (unavailable — first step)",
      prevTo: (n: number, label: string) => `Previous: go back to step ${n} — ${label}`,
      prev: "Previous",
      next: "Next",
      nextTo: (n: number, label: string) => `Next: go to step ${n} — ${label}`,
      review: "Review my request",
      reviewAria: "Review my request: go to the summary before sending",
      submitAria: "Send my personalised quote request",
      sending: "Sending…",
      submit: "Send my request",
      sendErrorGeneric: "Sending failed. Try again or contact us directly.",
      sendErrorNetwork: "Sending failed. Check your connection and try again.",
    },
    recap: {
      eyebrow: "Your notebook",
      title: "Trip in progress",
      period: "Dates",
      travelers: "Travellers",
      pace: "Pace",
      cities: "Cities",
      places: "Places",
      lodging: "Accommodation",
      selected: (n: number) => `${n} selected`,
      note: "Estimate refined by our designers within 48 hours.",
    },
    travelersValue: (adults: number, children: number) =>
      `${adults} adult${adults > 1 ? "s" : ""}${children ? ` · ${children} child${children > 1 ? "ren" : ""}` : ""}`,
    dash: "—",
    confirmEmail: {
      same: "The two emails are identical.",
      emptyFirst: "First enter your email in the field above.",
      incomplete: "The confirmation email is incomplete.",
      tooLong: "The confirmation email has extra characters.",
      domainDiffers: (got: string, expected: string) => `The domain differs: “${got}” instead of “${expected}”.`,
      localDiffers: "The part before @ is different (check the spelling).",
      caseDiffers: "A difference in case or a special character prevents a match.",
      match: "The emails match.",
      matchAria: "The emails match. More information.",
      mismatchAria: "The emails do not match. More information.",
      closeTitle: "Close (Escape)",
    },
    closeMessage: (text: string) => `Close message "${text}" (Escape key)`,
  },
} as const;

function ConfigurerPage() {
  const { language } = useLanguage();
  const t = CFG_TEXT[language];
  const stepsList = STEPS[language];
  const lodgings = LODGINGS[language];
  const paces = PACES[language];
  const [step, setStep] = useState(1);
  const [state, setState] = useState<State>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const sendDevis = useServerFn(sendDevisRequest);
  // Garde-fou : on ne déclenche la persistance / le push d'URL qu'après
  // l'hydratation initiale, pour ne pas écraser un état restauré depuis
  // localStorage avec les valeurs par défaut du premier rendu.
  const hydrated = useRef(false);

  // ──────────────────────────────────────────────────────────────────
  // Reprise du parcours : restaure l'état et l'étape au montage.
  // Source de vérité de l'étape (par ordre de priorité) :
  //   1. URL (`?etape=N`) — permet de partager un lien direct ou de
  //      réagir au back/forward du navigateur.
  //   2. localStorage (`amanta:config:step`) — reprise après reload.
  //   3. défaut = 1.
  // L'étape est clampée à [1, REVIEW_STEP] : on ne restaure jamais le
  // SUCCESS_STEP (la demande déjà envoyée doit repartir d'un parcours
  // neuf si l'utilisateur revient sur l'URL).
  // ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState((s) => ({ ...s, ...JSON.parse(saved) }));

      // Dates depuis l'URL — prioritaires sur le localStorage pour rendre
      // les liens partagés strictement reproductibles.
      const urlDates = readDatesFromUrl();
      if (urlDates.departureDate || urlDates.returnDate) {
        setState((s) => ({
          ...s,
          ...(urlDates.departureDate ? { departureDate: urlDates.departureDate } : {}),
          ...(urlDates.returnDate ? { returnDate: urlDates.returnDate } : {}),
        }));
      }

      const seedRaw = sessionStorage.getItem("marocatlastour:seed");
      if (seedRaw) {
        const seed = JSON.parse(seedRaw);
        setState((s) => ({
          ...s,
          destinations: seed.destination
            ? [seed.destination, ...s.destinations.filter((d: string) => d !== seed.destination)]
            : s.destinations,
        }));
        sessionStorage.removeItem("marocatlastour:seed");
      }

      const REVIEW = STEP_COUNT + 1;
      const fromUrl = readStepFromUrl();
      const fromStorage = Number.parseInt(localStorage.getItem(STEP_STORAGE_KEY) ?? "", 10);
      const candidate = fromUrl ?? (Number.isFinite(fromStorage) ? fromStorage : 1);
      const clamped = Math.max(1, Math.min(candidate, REVIEW));
      if (clamped !== 1) setStep(clamped);

      // Si l'URL ne contient pas encore l'étape restaurée, on la pose
      // (replaceState pour ne pas créer d'entrée d'historique parasite).
      if (typeof window !== "undefined" && fromUrl !== clamped) {
        const url = new URL(window.location.href);
        url.searchParams.set(URL_STEP_PARAM, String(clamped));
        window.history.replaceState({ marocatlastourStep: clamped }, "", url);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  // Persiste l'état (champs) à chaque changement.
  useEffect(() => {
    if (!hydrated.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  // Persiste l'étape + synchronise l'URL (back/forward natif).
  useEffect(() => {
    if (!hydrated.current) return;
    const REVIEW = STEP_COUNT + 1;
    const SUCCESS = STEP_COUNT + 2;
    try {
      // On efface la persistance après envoi : un reload doit alors
      // reprendre un parcours vierge.
      if (step === SUCCESS) {
        localStorage.removeItem(STEP_STORAGE_KEY);
      } else if (step <= REVIEW) {
        localStorage.setItem(STEP_STORAGE_KEY, String(step));
      }
    } catch {}

    if (typeof window === "undefined" || step > REVIEW) return;
    const url = new URL(window.location.href);
    const current = readStepFromUrl();
    if (current === step) return;
    url.searchParams.set(URL_STEP_PARAM, String(step));
    window.history.pushState({ marocatlastourStep: step }, "", url);
  }, [step]);

  // Synchronise les dates aller/retour dans l'URL (replaceState : on ne crée
  // pas d'entrée d'historique à chaque saisie). Permet de partager un lien
  // qui rejoue exactement le même parcours, étape comprise.
  useEffect(() => {
    if (!hydrated.current || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const setOrDelete = (key: string, value: string) => {
      if (value && isValidIsoDate(value)) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    };
    const beforeDep = url.searchParams.get(URL_DEPARTURE_PARAM) ?? "";
    const beforeRet = url.searchParams.get(URL_RETURN_PARAM) ?? "";
    setOrDelete(URL_DEPARTURE_PARAM, state.departureDate);
    setOrDelete(URL_RETURN_PARAM, state.returnDate);
    const afterDep = url.searchParams.get(URL_DEPARTURE_PARAM) ?? "";
    const afterRet = url.searchParams.get(URL_RETURN_PARAM) ?? "";
    if (beforeDep !== afterDep || beforeRet !== afterRet) {
      window.history.replaceState(window.history.state, "", url);
    }
  }, [state.departureDate, state.returnDate]);

  // Back/forward navigateur → on resynchronise l'étape ET les dates sur l'URL.
  useEffect(() => {
    const onPop = () => {
      const REVIEW = STEP_COUNT + 1;
      const fromUrl = readStepFromUrl();
      const next = fromUrl == null ? 1 : Math.max(1, Math.min(fromUrl, REVIEW));
      setStep(next);
      const urlDates = readDatesFromUrl();
      setState((s) => ({
        ...s,
        departureDate: urlDates.departureDate ?? "",
        returnDate: urlDates.returnDate ?? "",
      }));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const update = <K extends keyof State>(k: K, v: State[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const toggle = (k: "destinations" | "places", v: string) =>
    setState((s) => ({
      ...s,
      [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v],
    }));

  // Quand une ville est désélectionnée, on retire automatiquement ses lieux.
  useEffect(() => {
    setState((s) => {
      const allowed = new Set(s.destinations.flatMap((c) => PLACES_BY_CITY[c] ?? []));
      const filtered = s.places.filter((p) => allowed.has(p));
      return filtered.length === s.places.length ? s : { ...s, places: filtered };
    });
  }, [state.destinations]);

  const REVIEW_STEP = STEP_COUNT + 1; // 8
  const SUCCESS_STEP = STEP_COUNT + 2; // 9


  const [showError, setShowError] = useState(false);
  const [dateTouched, setDateTouched] = useState<{ dep: boolean; ret: boolean }>({ dep: false, ret: false });
  const [highlightSource, setHighlightSource] = useState<DaySource | null>(null);
  const [toggleHint, setToggleHint] = useState<{ id: number; text: string; on: boolean } | null>(null);
  // Annonce dédiée aux lecteurs d'écran : on/off + fermeture explicite.
  // Stockée séparément pour pouvoir annoncer "fermé" même quand toggleHint devient null.
  const [srAnnouncement, setSrAnnouncement] = useState<string>("");
  const toggleHintCloseRef = useRef<HTMLButtonElement | null>(null);
  const lastTileFocusRef = useRef<HTMLElement | null>(null);
  const lastTileSourceRef = useRef<DaySource | null>(null);
  const toggleHintWrapperRef = useRef<HTMLDivElement | null>(null);

  // Helper: ferme le message, annonce la fermeture, redonne le focus à la tuile.
  const closeToggleHint = () => {
    const previous = toggleHint;
    setToggleHint(null);
    if (previous) {
      // Reset puis re-set au tick suivant pour forcer l'annonce même si le texte
      // est identique à un précédent message de fermeture.
      setSrAnnouncement("");
      requestAnimationFrame(() => {
        setSrAnnouncement(t.helpClosed(previous.text));
      });
    }
    requestAnimationFrame(() => lastTileFocusRef.current?.focus());
  };

  // Annonce d'ouverture / changement on↔off à chaque nouvelle bascule.
  useEffect(() => {
    if (!toggleHint) return;
    setSrAnnouncement("");
    const id = requestAnimationFrame(() => {
      setSrAnnouncement(t.helpAnnounce(toggleHint.text));
    });
    return () => cancelAnimationFrame(id);
  }, [toggleHint?.id]);

  // Clic en dehors du message ET d'une tuile → ferme + restaure focus tuile.
  useEffect(() => {
    if (!toggleHint) return;
    const onPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (toggleHintWrapperRef.current?.contains(target)) return;
      if (target.closest('[data-stat-tile="true"]')) return;
      closeToggleHint();
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [toggleHint]);

  // Focus auto sur le bouton « OK » du message d'aide à chaque apparition/changement.
  // On capture aussi la tuile d'origine pour pouvoir y ramener le focus à la fermeture
  // (avec repli sur data-stat-source si activeElement n'est pas la tuile cliquée — ex.
  // Safari macOS qui ne focus pas un <button> au clic souris).
  useEffect(() => {
    if (!toggleHint) return;
    if (typeof document !== "undefined") {
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.dataset.statTile === "true") {
        lastTileFocusRef.current = active;
      } else if (lastTileSourceRef.current) {
        const tile = document.querySelector<HTMLButtonElement>(
          `[data-stat-tile="true"][data-stat-source="${lastTileSourceRef.current}"]`,
        );
        if (tile) lastTileFocusRef.current = tile;
      }
    }
    const id = requestAnimationFrame(() => {
      toggleHintCloseRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [toggleHint?.id]);

  // Echap : ferme le message d'aide du toggle (navigation clavier).
  useEffect(() => {
    if (!toggleHint) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeToggleHint();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleHint]);

  // Le message d'aide reste affiché jusqu'au prochain clic sur une tuile.

  const focusSource = (src: DaySource) => {
    const labels = t.sourceLabels;
    lastTileSourceRef.current = src;
    if (highlightSource === src) {
      setHighlightSource(null);
      setToggleHint({ id: Date.now(), text: t.toggleOff(labels[src]), on: false });
      return;
    }
    setHighlightSource(src);
    setToggleHint({ id: Date.now(), text: t.toggleOn(labels[src]), on: true });
    // Scroll vers le premier jour correspondant
    requestAnimationFrame(() => {
      const first = itinerary.find((d) => d.source === src);
      if (!first) return;
      const el = document.getElementById(`itinerary-day-${first.day}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  // Quand on arrive (ou revient) sur l'étape récap, redonner le focus à la dernière
  // tuile utilisée si une source de surlignage est active.
  useEffect(() => {
    if (step !== REVIEW_STEP) return;
    const src = lastTileSourceRef.current;
    if (!src) return;
    requestAnimationFrame(() => {
      const tile = document.querySelector<HTMLButtonElement>(
        `[data-stat-tile="true"][data-stat-source="${src}"]`,
      );
      tile?.focus();
      if (tile) lastTileFocusRef.current = tile;
    });
  }, [step, REVIEW_STEP]);

  const validation = useMemo<{ ok: boolean; message?: string }>(() => {
    const v = t.validation;
    switch (step) {
      case 1: {
        if (!state.departureDate) return { ok: false, message: v.depRequired };
        if (!state.returnDate) return { ok: false, message: v.retRequired };
        const dep = new Date(state.departureDate);
        const ret = new Date(state.returnDate);
        if (Number.isNaN(dep.getTime()) || Number.isNaN(ret.getTime()))
          return { ok: false, message: v.invalidDates };
        const today = new Date(); today.setHours(0, 0, 0, 0);
        if (dep < today) return { ok: false, message: v.depFuture };
        if (ret <= dep) return { ok: false, message: v.retAfterDep };
        return { ok: true };
      }
      case 2:
        return state.adults >= 1
          ? { ok: true }
          : { ok: false, message: v.adultRequired };
      case 3:
        return state.pace
          ? { ok: true }
          : { ok: false, message: v.paceRequired };
      case 4:
        return state.destinations.length > 0
          ? { ok: true }
          : { ok: false, message: v.cityRequired };
      case 5:
        // Lieux à visiter — entièrement optionnel.
        return { ok: true };
      case 6:
        return state.lodging
          ? { ok: true }
          : { ok: false, message: v.lodgingRequired };
      case 7: {
        if (!state.name.trim()) return { ok: false, message: v.nameRequired };
        const email = state.email.trim();
        if (!email) return { ok: false, message: v.emailRequired };
        if (email.length > 254) return { ok: false, message: v.emailTooLong };
        if (/\s/.test(email)) return { ok: false, message: v.emailNoSpace };
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email) || email.includes(".."))
          return { ok: false, message: v.emailInvalid };
        if (!state.emailConfirm.trim())
          return { ok: false, message: v.emailConfirmRequired };
        if (state.emailConfirm.trim().toLowerCase() !== email.toLowerCase())
          return { ok: false, message: v.emailMismatch };
        const phone = state.phone.trim();
        if (!phone) return { ok: false, message: v.phoneRequired };
        if (!/^\+?[0-9\s().-]{7,20}$/.test(phone))
          return { ok: false, message: v.phoneInvalid };
        return { ok: true };
      }
      case REVIEW_STEP:
        return state.consent
          ? { ok: true }
          : { ok: false, message: v.consentRequired };
      default:
        return { ok: true };
    }
  }, [step, state, t]);

  const itinerary = useMemo(
    () => buildItinerary(state.destinations, state.places, state.pace, language),
    [state.destinations, state.places, state.pace, language],
  );

  const next = () => {
    if (!validation.ok) { setShowError(true); return; }
    setShowError(false);
    setStep((s) => Math.min(s + 1, REVIEW_STEP));
  };
  const prev = () => { setShowError(false); setStep((s) => Math.max(s - 1, 1)); };

  // Reset error indicator when step or relevant state changes (so it disappears once fixed)
  useEffect(() => { if (validation.ok) setShowError(false); }, [validation.ok]);

  // ──────────────────────────────────────────────────────────────────
  // A11y — focus management : à chaque changement d'étape, on déplace
  // le focus sur le titre <h2 id="current-step-heading"> (tabIndex=-1).
  // Bénéfices :
  //   - les lecteurs d'écran annoncent immédiatement le titre de la
  //     nouvelle étape (sinon le focus reste sur « Suivant » ou
  //     « Précédent » et l'utilisateur ne sait pas qu'il a avancé) ;
  //   - le scroll est ramené près du titre, évitant que l'utilisateur
  //     reste perdu en bas de la page après la transition.
  // On respecte `prefers-reduced-motion` côté CSS (animation déjà gérée
  // par animate-fade-up), ici on ne touche qu'au focus.
  // ──────────────────────────────────────────────────────────────────
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const id = requestAnimationFrame(() => {
      const heading = document.getElementById("current-step-heading");
      heading?.focus({ preventScroll: false });
    });
    return () => cancelAnimationFrame(id);
  }, [step]);

  // Identifiant stable du message d'erreur, pour `aria-describedby` du CTA.
  const errorMessageId = useId();


  const submit = async () => {
    if (!validation.ok) { setShowError(true); return; }
    if (sending) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await sendDevis({
        data: {
          destinations: state.destinations,
          places: state.places,
          departureDate: state.departureDate,
          returnDate: state.returnDate,
          adults: state.adults,
          children: state.children,
          pace: state.pace,
          lodging: state.lodging,
          name: state.name,
          email: state.email,
          phone: state.phone,
          message: state.message,
        },
      });
      if (!res?.ok) {
        setSendError(res?.error || t.nav.sendErrorGeneric);
        setSending(false);
        return;
      }
    } catch (e) {
      console.error(e);
      setSendError(t.nav.sendErrorNetwork);
      setSending(false);
      return;
    }
    try {
      localStorage.setItem("amanta:lastQuote", JSON.stringify({ ...state, at: new Date().toISOString() }));
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete(URL_STEP_PARAM);
        url.searchParams.delete(URL_DEPARTURE_PARAM);
        url.searchParams.delete(URL_RETURN_PARAM);
        window.history.replaceState({}, "", url);
      }
    } catch {}
    setSending(false);
    setSubmitted(true);
    setStep(SUCCESS_STEP);
  };

  return (
    <div className="min-h-screen bg-sand text-night">
      <SiteHeader />
      <main className="pt-28 pb-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <p className="label-eyebrow mb-3">
                  {step <= STEP_COUNT
                    ? t.stepLabel(String(step).padStart(2, "0"), String(STEP_COUNT).padStart(2, "0"))
                    : step === REVIEW_STEP
                      ? t.review
                      : t.sent}
                </p>
                <h1 className="font-serif text-3xl">
                  {step <= STEP_COUNT
                    ? stepsList[step - 1]
                    : step === REVIEW_STEP
                      ? t.verification
                      : t.thanks}
                </h1>
              </div>
              {/* Barre de progression a11y : un role="progressbar" annonce
                  l'avancement (« étape X sur 7 ») aux lecteurs d'écran. */}
              <div
                className="h-px bg-night/10 relative overflow-hidden"
                role="progressbar"
                aria-label={t.progressAria}
                aria-valuemin={1}
                aria-valuemax={STEP_COUNT}
                aria-valuenow={Math.min(step, STEP_COUNT)}
                aria-valuetext={
                  step <= STEP_COUNT
                    ? t.stepValueText(step, STEP_COUNT, stepsList[step - 1])
                    : step === REVIEW_STEP
                      ? t.reviewValueText(STEP_COUNT)
                      : t.sentValueText
                }
              >
                <div
                  className="absolute inset-y-0 left-0 bg-clay transition-all duration-500"
                  style={{ width: `${Math.min(step, STEP_COUNT) / STEP_COUNT * 100}%` }}
                />
              </div>
              {/* Stepper navigable au clavier : chaque bouton porte un
                  aria-label explicite (numéro + libellé + statut) ; l'étape
                  active reçoit aria-current="step". Les étapes futures sont
                  désactivées (disabled) — elles ne sont annoncées qu'à
                  titre informatif. */}
              <nav aria-label={t.stepsNavAria}>
                <ol className="space-y-3 text-[13px] md:text-sm uppercase tracking-[0.14em]">
                  {stepsList.map((label, i) => {
                    const n = i + 1;
                    const done = n < step;
                    const active = n === step;
                    const status = active ? t.statusCurrent : done ? t.statusDone : t.statusUpcoming;
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => done && setStep(n)}
                          aria-current={active ? "step" : undefined}
                          aria-label={t.stepButtonAria(n, STEP_COUNT, label, status, done)}
                          className={`flex justify-between items-center w-full text-left py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 ${
                            active ? "text-night" : done ? "text-night/60 hover:text-clay" : "text-night/30"
                          }`}
                          disabled={!done && !active}
                        >
                          <span aria-hidden="true">{String(n).padStart(2, "0")}. {label}</span>
                          {done && <span className="text-clay" aria-hidden="true">✓</span>}
                          {active && <span aria-hidden="true">•</span>}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Form area */}
          <section className="lg:col-span-6">
            <div className="bg-white p-8 md:p-12 shadow-card min-h-[520px] flex flex-col">
              <div className="flex-1 animate-fade-up" key={step}>
                {step === 1 && (() => {
                  const todayIso = new Date().toISOString().slice(0, 10);
                  const depErr = (() => {
                    if (!state.departureDate) {
                      return (dateTouched.dep || showError) ? t.step1.depRequired : "";
                    }
                    return state.departureDate < todayIso ? t.validation.depFuture : "";
                  })();
                  const retErr = (() => {
                    if (!state.returnDate) {
                      return (dateTouched.ret || showError) ? t.step1.retRequired : "";
                    }
                    if (state.departureDate && state.returnDate <= state.departureDate) {
                      return t.step1.retAfterDep;
                    }
                    return "";
                  })();
                  return (
                  <StepShell title={t.step1.title} subtitle={t.step1.subtitle}>
                    <div className="space-y-3">
                      <label htmlFor="trip-dates" className="label-eyebrow text-clay">{t.step1.datesLabel}</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            id="trip-dates"
                            type="button"
                            aria-invalid={depErr || retErr ? true : undefined}
                            aria-describedby={depErr ? "departure-date-error" : retErr ? "return-date-error" : undefined}
                            onBlur={() => setDateTouched({ dep: true, ret: true })}
                            className={cn(
                              "w-full flex items-center justify-between gap-3 rounded-md border border-night/15 bg-white px-4 py-4 text-left text-night transition hover:border-clay/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40",
                              (depErr || retErr) && "border-red-600/60",
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <CalendarIcon className="h-5 w-5 text-clay" aria-hidden="true" />
                              {state.departureDate && state.returnDate ? (
                                <span className="text-base">
                                  {formatDate(state.departureDate, language)} <span className="text-night/40">→</span> {formatDate(state.returnDate, language)}
                                </span>
                              ) : state.departureDate ? (
                                <span className="text-base">
                                  {formatDate(state.departureDate, language)} <span className="text-night/40">→</span> <span className="text-night/50">{t.step1.chooseReturn}</span>
                                </span>
                              ) : (
                                <span className="text-base text-night/50">{t.step1.selectDates}</span>
                              )}
                            </span>
                            {state.departureDate && state.returnDate && (
                              <span className="text-sm text-night/60">
                                {t.step1.night(nightsBetween(state.departureDate, state.returnDate))}
                              </span>
                            )}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            locale={language === "fr" ? fr : enGB}
                            numberOfMonths={2}
                            defaultMonth={state.departureDate ? new Date(state.departureDate) : new Date()}
                            selected={{
                              from: state.departureDate ? new Date(state.departureDate) : undefined,
                              to: state.returnDate ? new Date(state.returnDate) : undefined,
                            } as DateRange}
                            onSelect={(range: DateRange | undefined) => {
                              const toIso = (d?: Date) => {
                                if (!d) return "";
                                const tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
                                return tz.toISOString().slice(0, 10);
                              };
                              const from = toIso(range?.from);
                              const to = toIso(range?.to);
                              update("departureDate", from);
                              update("returnDate", to && from && to > from ? to : "");
                              setDateTouched({ dep: true, ret: !!from });
                            }}
                            disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      {depErr && (
                        <p id="departure-date-error" role="alert" className="text-xs text-red-700">
                          {depErr}
                        </p>
                      )}
                      {!depErr && retErr && (
                        <p id="return-date-error" role="alert" className="text-xs text-red-700">
                          {retErr}
                        </p>
                      )}
                      {!depErr && !retErr && (
                        <p className="text-xs text-night/50">
                          {t.step1.bothRequired}
                        </p>
                      )}
                    </div>
                  </StepShell>
                  );
                })()}
                {step === 2 && (
                  <StepShell title={t.step2.title} subtitle={t.step2.subtitle}>
                    <div className="grid grid-cols-2 gap-8 pt-4">
                      <Counter label={t.step2.adults} value={state.adults} min={1} onChange={(v) => update("adults", v)} />
                      <Counter label={t.step2.children} value={state.children} min={0} onChange={(v) => update("children", v)} />
                    </div>
                  </StepShell>
                )}
                {step === 3 && (
                  <StepShell title={t.step3.title} subtitle={t.step3.subtitle}>
                    <div className="grid gap-4 md:grid-cols-3">
                      {paces.map(p => (
                        <button key={p.id} type="button" onClick={() => update("pace", p.id)}
                          className={`text-left p-6 border transition-all ${
                            state.pace === p.id ? "border-clay bg-sand-soft" : "border-night/10 hover:border-night/30"
                          }`}>
                          <h3 className="font-serif text-lg mb-2">{p.title}</h3>
                          <p className="text-xs text-night/60 leading-relaxed">{p.desc}</p>
                        </button>
                      ))}
                    </div>
                  </StepShell>
                )}
                {step === 4 && (
                  <StepShell title={t.step4.title} subtitle={t.step4.subtitle}>
                    <ChipGrid items={DESTINATIONS} selected={state.destinations} onToggle={(v) => toggle("destinations", v)} />
                  </StepShell>
                )}
                {step === 5 && (
                  <StepShell title={t.step5.title} subtitle={t.step5.subtitle}>
                    {state.destinations.length === 0 ? (
                      <p className="text-sm text-night/60 italic">
                        {t.step5.needCity}
                      </p>
                    ) : (
                      <div className="space-y-8">
                        {state.destinations.map((city) => {
                          const places = PLACES_BY_CITY[city] ?? [];
                          if (places.length === 0) return null;
                          return (
                            <div key={city} className="space-y-3">
                              <h3 className="font-serif text-lg text-night">{city}</h3>
                              <ChipGrid
                                items={places}
                                selected={state.places}
                                onToggle={(v) => toggle("places", v)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </StepShell>
                )}
                {step === 6 && (
                  <StepShell title={t.step6.title} subtitle={t.step6.subtitle}>
                    <div className="space-y-3">
                      {lodgings.map(l => (
                        <button key={l.id} type="button" onClick={() => update("lodging", l.id)}
                          className={`w-full text-left p-5 border flex items-baseline gap-4 transition-all ${
                            state.lodging === l.id ? "border-clay bg-sand-soft" : "border-night/10 hover:border-night/30"
                          }`}>
                          <h3 className="font-serif text-lg whitespace-nowrap">{l.title}</h3>
                          <p className="text-xs text-night/60">{l.desc}</p>
                        </button>
                      ))}
                    </div>
                  </StepShell>
                )}
                {step === 7 && (
                  <StepShell title={t.step7.title} subtitle={t.step7.subtitle}>
                    <div className="space-y-6">
                      <Field label={t.step7.name}>
                        <input type="text" value={state.name} onChange={(e) => update("name", e.target.value)} className="field-underline" placeholder={t.step7.namePlaceholder} />
                      </Field>
                      <Field label={t.step7.email}>
                        <input type="email" value={state.email} onChange={(e) => update("email", e.target.value)} className="field-underline" placeholder={t.step7.emailPlaceholder} />
                      </Field>
                      <ConfirmEmailField
                        email={state.email}
                        value={state.emailConfirm}
                        onChange={(v) => update("emailConfirm", v)}
                        language={language}
                      />
                      <Field label={t.step7.phone}>
                        <input type="tel" required value={state.phone} onChange={(e) => update("phone", e.target.value)} className="field-underline" placeholder={t.step7.phonePlaceholder} />
                      </Field>
                      <Field label={t.step7.message}>
                        <textarea value={state.message} onChange={(e) => update("message", e.target.value)} rows={3}
                          className="field-underline resize-none" placeholder={t.step7.messagePlaceholder} />
                      </Field>
                    </div>
                  </StepShell>
                )}

                {step === REVIEW_STEP && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h2
                        id="current-step-heading"
                        tabIndex={-1}
                        className="font-serif text-3xl text-balance focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
                      >
                        {t.reviewStep.title}
                      </h2>
                      <p className="text-sm text-night/60 max-w-lg leading-relaxed">
                        {t.reviewStep.subtitle}
                      </p>
                    </div>

                    {itinerary.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-baseline justify-between gap-4">
                          <div>
                            <p className="label-eyebrow text-clay">{t.reviewStep.previewEyebrow}</p>
                            <h3 className="font-serif text-2xl mt-1">{t.reviewStep.previewTitle}</h3>
                          </div>
                          <p className="text-[11px] italic text-night/50 max-w-[16rem] text-right">
                            {t.reviewStep.previewNote}
                          </p>
                        </div>
                        {(() => {
                          const total = itinerary.length;
                          const main = itinerary.filter((d) => d.source === "main").length;
                          const alt = itinerary.filter((d) => d.source === "alternate").length;
                          const free = itinerary.filter((d) => d.source === "free").length;
                          const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);
                          return (
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-3">
                                <StatTile source="main" label={t.sourceLabels.main} count={main} total={total} percent={pct(main)} tone="clay" active={highlightSource === "main"} disabled={main === 0} onClick={() => focusSource("main")} language={language} />
                                <StatTile source="alternate" label={t.sourceLabels.alternate} count={alt} total={total} percent={pct(alt)} tone="amber" active={highlightSource === "alternate"} disabled={alt === 0} onClick={() => focusSource("alternate")} language={language} />
                                <StatTile source="free" label={t.sourceLabels.free} count={free} total={total} percent={pct(free)} tone="muted" active={highlightSource === "free"} disabled={free === 0} onClick={() => focusSource("free")} language={language} />
                              </div>
                              {/* Message d'aide au toggle (a11y: aria-live).
                                  - wrapper : transition opacity + translate sur entrée/sortie globale
                                  - inner span : remonté via key={id} → animation fade-in à chaque
                                    bascule, ce qui donne un swap fluide entre on/off. */}
                              <div
                                ref={toggleHintWrapperRef}
                                id="toggle-hint-region"
                                role="group"
                                aria-label={t.reviewStep.helpRegionAria}
                                aria-hidden={!toggleHint}
                                className={`flex items-center justify-center overflow-hidden transition-[max-height,opacity,transform,margin] motion-safe:duration-300 motion-reduce:duration-100 ease-out motion-reduce:transition-[max-height,opacity,margin] ${
                                  toggleHint
                                    ? "max-h-12 opacity-100 translate-y-0 my-1"
                                    : "max-h-0 opacity-0 motion-safe:-translate-y-1 motion-reduce:translate-y-0 my-0 pointer-events-none"
                                }`}
                              >
                                {toggleHint && (
                                  <span
                                    key={toggleHint.id}
                                    className={`motion-safe:animate-fade-in motion-reduce:animate-none inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 border shadow-sm transition-colors motion-safe:duration-300 motion-reduce:duration-75 ${
                                      toggleHint.on
                                        ? "bg-night text-sand border-night"
                                        : "bg-white text-night/70 border-night/20"
                                    }`}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="inline-flex items-center justify-center w-3.5 h-3.5 motion-safe:animate-scale-in motion-reduce:animate-none"
                                    >
                                      {toggleHint.on ? "✓" : "✕"}
                                    </span>
                                    <span id="toggle-hint-text">{toggleHint.text}</span>
                                    <button
                                      ref={toggleHintCloseRef}
                                      type="button"
                                      onClick={closeToggleHint}
                                      aria-label={t.closeMessage(toggleHint.text)}
                                      aria-describedby="toggle-hint-text"
                                      aria-controls="toggle-hint-region"
                                      aria-expanded={true}
                                      title={t.confirmEmail.closeTitle}
                                      className={`ml-1 inline-flex items-center px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay ${
                                        toggleHint.on
                                          ? "border-sand/40 text-sand hover:bg-sand hover:text-night"
                                          : "border-night/25 text-night/70 hover:bg-night hover:text-sand"
                                      }`}
                                    >
                                      {t.reviewStep.ok}
                                    </button>
                                  </span>
                                )}
                              </div>
                              {/* Région live dédiée aux lecteurs d'écran : annonce
                                  systématiquement les ouvertures, basculements on/off
                                  et fermetures avec le texte exact du message. */}
                              <div
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                                className="sr-only"
                              >
                                {srAnnouncement}
                              </div>
                              <div className="flex h-1.5 overflow-hidden bg-night/10" aria-hidden>
                                {main > 0 && <div className="bg-clay" style={{ width: `${pct(main)}%` }} />}
                                {alt > 0 && <div className="bg-amber-500" style={{ width: `${pct(alt)}%` }} />}
                                {free > 0 && <div className="bg-night/40" style={{ width: `${pct(free)}%` }} />}
                              </div>
                              {highlightSource && (() => {
                                const labelMap = t.sourceLabels;
                                const toneMap = {
                                  main: { dot: "bg-clay", border: "border-clay/50", text: "text-clay" },
                                  alternate: { dot: "bg-amber-500", border: "border-amber-500/50", text: "text-amber-700" },
                                  free: { dot: "bg-night/50", border: "border-night/30", text: "text-night/70" },
                                }[highlightSource];
                                const matching = itinerary.filter((d) => d.source === highlightSource).length;
                                return (
                                  <div
                                    role="status"
                                    className={`flex items-center justify-between gap-3 px-3 py-2 bg-white border ${toneMap.border}`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${toneMap.dot}`} aria-hidden />
                                      <p className="text-[11px] uppercase tracking-[0.18em] text-night/60 truncate">
                                        {t.reviewStep.activeFilter}{" "}
                                        <span className={`font-medium ${toneMap.text} normal-case tracking-normal`}>
                                          {labelMap[highlightSource]}
                                        </span>
                                        <span className="text-night/40 normal-case tracking-normal"> · {t.reviewStep.day(matching)}</span>
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setHighlightSource(null)}
                                      className="shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-night/60 hover:text-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded px-2 py-1"
                                      aria-label={t.reviewStep.disableFilterAria}
                                    >
                                      <span aria-hidden>✕</span> {t.reviewStep.disable}
                                    </button>
                                  </div>
                                );
                              })()}
                              {alt + free > 0 && (
                                <p className="text-[11px] text-night/55 leading-snug">
                                  {t.reviewStep.switchNote(itinerary.findIndex((d) => d.source !== "main") + 1, free > 0)}
                                </p>
                              )}
                            </div>
                          );
                        })()}
                        <ol className="space-y-3">
                          {itinerary.map((d) => {
                            const isAlt = d.source === "alternate";
                            const isFree = d.source === "free";
                            const accent = isFree
                              ? "border-night/30"
                              : isAlt
                                ? "border-amber-500"
                                : "border-clay";
                            return (
                              <li
                                id={`itinerary-day-${d.day}`}
                                key={d.day}
                                className={`flex gap-4 p-4 bg-sand-soft border-l-2 transition-all duration-300 ${accent} ${
                                  highlightSource
                                    ? d.source === highlightSource
                                      ? "ring-2 ring-offset-2 ring-offset-white " + (d.source === "alternate" ? "ring-amber-500" : d.source === "free" ? "ring-night/40" : "ring-clay")
                                      : "opacity-40"
                                    : ""
                                }`}
                              >
                                <div className="shrink-0 w-12">
                                  <p className="text-[10px] uppercase tracking-[0.2em] text-night/50">{t.reviewStep.dayLabel}</p>
                                  <p className={`font-serif text-2xl leading-none ${isFree ? "text-night/60" : isAlt ? "text-amber-600" : "text-clay"}`}>
                                    {String(d.day).padStart(2, "0")}
                                  </p>
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-night/50">{d.city}</p>
                                    {isAlt && (
                                      <span
                                        title={t.reviewStep.alternateTooltip}
                                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 border border-amber-500 text-amber-700 bg-amber-50"
                                      >
                                        <span aria-hidden>↻</span> {t.reviewStep.alternateBadge}
                                      </span>
                                    )}
                                    {isFree && (
                                      <span
                                        title={t.reviewStep.freeTooltip}
                                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 border border-night/30 text-night/60 bg-white"
                                      >
                                        <span aria-hidden>○</span> {t.reviewStep.freeBadge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-night/85 leading-snug">
                                    {d.places.join(" · ")}
                                  </p>
                                  {d.note && (
                                    <p className="text-xs text-night/55 italic">+ {d.note}</p>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ol>
                        {itinerary.some((d) => d.source !== "main") && (
                          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-night/50 pt-1">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="inline-block w-3 h-px bg-clay" /> {t.reviewStep.legendMain}
                            </span>
                            {itinerary.some((d) => d.source === "alternate") && (
                              <span className="inline-flex items-center gap-1.5">
                                <span className="inline-block w-3 h-px bg-amber-500" /> {t.reviewStep.legendAlternate}
                              </span>
                            )}
                            {itinerary.some((d) => d.source === "free") && (
                              <span className="inline-flex items-center gap-1.5">
                                <span className="inline-block w-3 h-px bg-night/40" /> {t.reviewStep.legendFree}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="divide-y divide-night/10 border-y border-night/10">
                      <ReviewRow label={t.reviewStep.period} value={formatDateRange(state.departureDate, state.returnDate, language)} onEdit={() => setStep(1)} />
                      <ReviewRow label={t.reviewStep.travelers} value={t.travelersValue(state.adults, state.children)} onEdit={() => setStep(2)} />
                      <ReviewRow label={t.reviewStep.pace} value={paces.find(p => p.id === state.pace)?.title || t.dash} onEdit={() => setStep(3)} />
                      <ReviewRow label={t.reviewStep.cities} value={state.destinations.join(" · ") || t.dash} onEdit={() => setStep(4)} />
                      <ReviewRow label={t.reviewStep.places} value={state.places.length ? state.places.join(" · ") : t.reviewStep.toDefine} onEdit={() => setStep(5)} />
                      <ReviewRow label={t.reviewStep.lodging} value={lodgings.find(l => l.id === state.lodging)?.title || t.dash} onEdit={() => setStep(6)} />
                      <ReviewRow
                        label={t.reviewStep.contact}
                        value={`${state.name} · ${state.email}${state.phone ? ` · ${state.phone}` : ""}`}
                        onEdit={() => setStep(7)}
                      />
                    </div>
                    {state.message && (
                      <div className="bg-sand-soft p-5">
                        <p className="label-eyebrow text-clay mb-2">{t.reviewStep.yourMessage}</p>
                        <p className="text-sm text-night/80 italic leading-relaxed">« {state.message} »</p>
                      </div>
                    )}
                    <label className="flex gap-3 items-start cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={state.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        className="mt-1 h-4 w-4 accent-clay shrink-0"
                        aria-required="true"
                      />
                      <span className="text-xs text-night/70 leading-relaxed">
                        {t.reviewStep.consent}
                      </span>
                    </label>
                  </div>
                )}
                {step === SUCCESS_STEP && submitted && (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-6">
                    <div className="w-14 h-14 rounded-full border border-clay flex items-center justify-center text-clay text-2xl">✓</div>
                    <h2
                      id="current-step-heading"
                      tabIndex={-1}
                      className="font-serif text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
                    >
                      {t.successStep.greeting(state.name.split(" ")[0] || t.successStep.fallbackName)}
                    </h2>
                    <p className="text-night/60 max-w-md leading-relaxed">
                      {t.successStep.body1}
                      <span className="text-night"> {state.email} </span>
                      {t.successStep.body2}
                    </p>
                    <Link to="/" className="btn-primary mt-4">{t.successStep.back}</Link>
                  </div>
                )}
              </div>

              {/* Footer nav — accessibilité :
                  - le wrapper est <nav aria-label="Navigation entre les étapes">
                    pour permettre une navigation directe via les landmarks ;
                  - le message d'erreur reçoit un id stable (errorMessageId) et
                    role="alert" : il est annoncé immédiatement et référencé
                    par le CTA via aria-describedby ;
                  - le CTA principal porte un aria-label explicite indiquant
                    la destination ("Suivant : aller à l'étape 2 — Voyageurs")
                    et passe en aria-disabled="true" quand la validation
                    échoue (sans utiliser `disabled` natif, pour conserver
                    l'annonce du message d'erreur au clic). */}
              {step <= REVIEW_STEP && (
                <nav
                  aria-label={t.nav.ariaLabel}
                  className="mt-12 pt-6 border-t border-night/10 space-y-4"
                >
                  {showError && !validation.ok && validation.message && (
                    <p
                      id={errorMessageId}
                      className="text-xs text-destructive"
                      role="alert"
                    >
                      {validation.message}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={prev}
                      disabled={step === 1}
                      aria-label={
                        step === 1
                          ? t.nav.prevDisabled
                          : step === REVIEW_STEP
                            ? t.nav.prevTo(STEP_COUNT, stepsList[STEP_COUNT - 1])
                            : t.nav.prevTo(step - 1, stepsList[step - 2])
                      }
                      className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
                    >
                      <span aria-hidden="true">←</span> {t.nav.prev}
                    </button>
                    {step < STEP_COUNT && (
                      <button
                        onClick={next}
                        aria-disabled={!validation.ok}
                        aria-describedby={showError && !validation.ok ? errorMessageId : undefined}
                        aria-label={t.nav.nextTo(step + 1, stepsList[step])}
                        className={`btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 ${!validation.ok ? "opacity-60" : ""}`}
                      >
                        {t.nav.next} <span aria-hidden="true">→</span>
                      </button>
                    )}
                    {step === STEP_COUNT && (
                      <button
                        onClick={next}
                        aria-disabled={!validation.ok}
                        aria-describedby={showError && !validation.ok ? errorMessageId : undefined}
                        aria-label={t.nav.reviewAria}
                        className={`btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 ${!validation.ok ? "opacity-60" : ""}`}
                      >
                        {t.nav.review} <span aria-hidden="true">→</span>
                      </button>
                    )}
                    {step === REVIEW_STEP && (
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={submit}
                          disabled={!validation.ok || sending}
                          aria-describedby={showError && !validation.ok ? errorMessageId : undefined}
                          aria-label={t.nav.submitAria}
                          className={`btn-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 ${!validation.ok || sending ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          {sending ? t.nav.sending : t.nav.submit}
                        </button>
                        {sendError && (
                          <p role="alert" className="text-sm text-red-700">{sendError}</p>
                        )}
                      </div>
                    )}
                  </div>
                </nav>
              )}
            </div>
          </section>

          {/* Recap */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28 bg-sand-soft p-7 space-y-5">
              <div className="pb-4 border-b border-night/10">
                <p className="label-eyebrow text-clay">{t.recap.eyebrow}</p>
                <h3 className="font-serif text-xl mt-1">{t.recap.title}</h3>
              </div>
              <RecapItem label={t.recap.period} value={formatDateRange(state.departureDate, state.returnDate, language)} />
              <RecapItem label={t.recap.travelers} value={t.travelersValue(state.adults, state.children)} />
              <RecapItem label={t.recap.pace} value={paces.find(p => p.id === state.pace)?.title || t.dash} />
              <RecapItem label={t.recap.cities} value={state.destinations.join(" · ") || t.dash} />
              <RecapItem label={t.recap.places} value={state.places.length ? t.recap.selected(state.places.length) : t.dash} />
              <RecapItem label={t.recap.lodging} value={lodgings.find(l => l.id === state.lodging)?.title || t.dash} />
              <p className="text-[11px] italic text-night/50 pt-3 border-t border-night/10">
                {t.recap.note}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        {/* tabIndex={-1} + id partagé : permet au focus programmatique
            de se poser sur le titre à chaque changement d'étape, sans
            l'inclure dans l'ordre de tabulation naturel. */}
        <h2
          id="current-step-heading"
          tabIndex={-1}
          className="font-serif text-3xl text-balance focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2"
        >
          {title}
        </h2>
        <p className="text-sm text-night/60 max-w-lg leading-relaxed">{subtitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ChipGrid({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = selected.includes(item);
        return (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`px-4 py-2.5 text-sm border transition-colors ${
              active ? "border-clay text-clay bg-sand-soft" : "border-night/15 text-night/70 hover:border-night/40"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function Counter({ label, value, min, onChange }: { label: string; value: number; min: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-3 text-center">
      <p className="label-eyebrow text-clay">{label}</p>
      <div className="flex items-center justify-center gap-6">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          className="w-10 h-10 border border-night/15 hover:border-clay hover:text-clay transition-colors">−</button>
        <span className="font-serif text-4xl w-12">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}
          className="w-10 h-10 border border-night/15 hover:border-clay hover:text-clay transition-colors">+</button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="label-eyebrow text-clay">{label}</label>
      {children}
    </div>
  );
}

function StatTile({
  source,
  label,
  count,
  total,
  percent,
  tone,
  active = false,
  disabled = false,
  onClick,
  language = "fr",
}: {
  source: DaySource;
  label: string;
  count: number;
  total: number;
  percent: number;
  tone: "clay" | "amber" | "muted";
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  language?: Language;
}) {
  const statTileText = language === "fr"
    ? { empty: "Aucun jour de cette catégorie", disable: "Cliquer pour désactiver le surlignage", enable: (l: string) => `Surligner les jours « ${l} »`, ofDays: "j" }
    : { empty: "No days in this category", disable: "Click to disable the highlight", enable: (l: string) => `Highlight “${l}” days`, ofDays: "d" };
  // Couleurs : neutres au repos, saturées et inversées (fond plein) à l'état actif
  // pour un contraste fort et un toggle on/off évident.
  const palette = {
    clay: {
      numIdle: "text-clay",
      numActive: "text-white",
      borderIdle: "border-clay/40",
      borderActive: "border-clay",
      bgActive: "bg-clay",
      ring: "ring-clay/40",
      labelActive: "text-white/85",
      subActive: "text-white/75",
    },
    amber: {
      numIdle: "text-amber-600",
      numActive: "text-white",
      borderIdle: "border-amber-500/50",
      borderActive: "border-amber-500",
      bgActive: "bg-amber-500",
      ring: "ring-amber-500/40",
      labelActive: "text-white/90",
      subActive: "text-white/80",
    },
    muted: {
      numIdle: "text-night/60",
      numActive: "text-sand",
      borderIdle: "border-night/20",
      borderActive: "border-night",
      bgActive: "bg-night",
      ring: "ring-night/30",
      labelActive: "text-sand/85",
      subActive: "text-sand/70",
    },
  }[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      data-stat-tile="true"
      data-stat-source={source}
      title={
        disabled
          ? statTileText.empty
          : active
            ? statTileText.disable
            : statTileText.enable(label)
      }
      className={`relative text-left p-3 border transition-all ${
        active
          ? `${palette.borderActive} ${palette.bgActive} ring-2 ${palette.ring} shadow-sm scale-[1.02]`
          : `${palette.borderIdle} bg-white`
      } ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "cursor-pointer hover:border-night/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
      }`}
    >
      {/* Pastille d'état dans le coin supérieur droit */}
      <span
        aria-hidden
        className={`absolute top-1.5 right-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full border transition-all ${
          active
            ? "bg-white/95 border-white text-night shadow"
            : "bg-white border-night/15 text-night/30"
        }`}
      >
        {active ? <Check size={12} strokeWidth={3} /> : <Filter size={11} />}
      </span>

      <p className={`text-[9px] uppercase tracking-[0.2em] pr-6 ${active ? palette.labelActive : "text-night/50"}`}>
        {label}
      </p>
      <p className="mt-1 flex items-baseline gap-1">
        <span className={`font-serif text-2xl leading-none ${active ? palette.numActive : palette.numIdle}`}>
          {count}
        </span>
        <span className={`text-[10px] ${active ? palette.subActive : "text-night/50"}`}>
          / {total} {statTileText.ofDays}
        </span>
      </p>
      <p className={`text-[10px] mt-0.5 ${active ? palette.subActive : "text-night/50"}`}>
        {percent}%{active && <span className="ml-1 font-medium">· {language === "fr" ? "filtre actif" : "active filter"}</span>}
      </p>
    </button>
  );
}

function RecapItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-night/40 mb-1">{label}</p>
      <p className="text-sm text-night/80 leading-snug">{value}</p>
    </div>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="py-4 flex items-baseline justify-between gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.22em] text-night/40 mb-1">{label}</p>
        <p className="text-sm text-night/85 leading-snug break-words">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-[10px] uppercase tracking-[0.22em] text-clay hover:text-night transition-colors shrink-0"
      >
        Modifier
      </button>
    </div>
  );
}

function ConfirmEmailField({
  email,
  value,
  onChange,
  language = "fr",
}: {
  email: string;
  value: string;
  onChange: (v: string) => void;
  language?: Language;
}) {
  const t = CFG_TEXT[language].confirmEmail;
  const step7 = CFG_TEXT[language].step7;
  const inputId = useId();
  const tooltipId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);

  const a = email.trim().toLowerCase();
  const b = value.trim().toLowerCase();
  const hasInput = value.length > 0;
  const match = hasInput && a.length > 0 && a === b;
  const mismatch = hasInput && !match;

  let reason: string = t.same;
  if (mismatch) {
    if (a.length === 0) reason = t.emptyFirst;
    else if (b.length < a.length) reason = t.incomplete;
    else if (b.length > a.length) reason = t.tooLong;
    else {
      const atA = a.split("@");
      const atB = b.split("@");
      if (atA[1] && atB[1] && atA[1] !== atB[1]) reason = t.domainDiffers(atB[1], atA[1]);
      else if (atA[0] !== atB[0]) reason = t.localDiffers;
      else reason = t.caseDiffers;
    }
  }

  // Describe input via tooltip + visible error message for SR
  const describedBy = hasInput
    ? mismatch
      ? `${tooltipId} ${errorId}`
      : tooltipId
    : undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="label-eyebrow text-clay">
        {step7.confirmEmail}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === "Escape" && open) setOpen(false);
          }}
          className="field-underline pr-8 w-full"
          placeholder={step7.emailPlaceholder}
          autoComplete="off"
          aria-invalid={mismatch}
          aria-describedby={describedBy}
        />
        {hasInput && (
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              aria-describedby={tooltipId}
              aria-expanded={open}
              aria-label={match ? t.matchAria : t.mismatchAria}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onKeyDown={(e) => {
                // Échap : ferme le tooltip et retire le focus pour éviter sa réouverture immédiate
                if (e.key === "Escape") {
                  setOpen(false);
                  e.currentTarget.blur();
                }
              }}
              className={`text-sm cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-clay rounded ${
                match ? "text-clay" : "text-destructive"
              }`}
            >
              {match ? "✓" : "✗"}
            </button>
            <span
              id={tooltipId}
              role="tooltip"
              className={`pointer-events-none absolute right-0 top-full mt-2 w-60 z-10 bg-night text-sand text-[11px] leading-snug px-3 py-2 shadow-lg transition-all duration-150 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              {match ? t.match : reason}
            </span>
          </span>
        )}
      </div>
      {mismatch && (
        <p id={errorId} role="alert" className="text-[11px] text-destructive mt-1">
          {reason}
        </p>
      )}
    </div>
  );
}
