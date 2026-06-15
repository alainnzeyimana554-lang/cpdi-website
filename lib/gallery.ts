/* ── Gallery data + types + colour maps ──────────────────
   Source of truth for the /galerie page (v2 — Masonry Wall).
─────────────────────────────────────────────────────────── */

export type GalleryCategory =
  | "paix"
  | "developpement"
  | "environnement"
  | "evenements";

export interface GalleryItem {
  id:            string;
  category:      GalleryCategory;
  title:         string;
  description:   string;
  location:      string;
  date:          string;
  image:         string;
  programme:     string;   // display name for the programme link
  programmeSlug: string;   // URL path
}

export const categoryColors: Record<GalleryCategory, string> = {
  paix:          "#1565C0",
  developpement: "#1B7A3D",
  environnement: "#8BB617",
  evenements:    "#0D3B6F",
};

export const categoryLabels: Record<GalleryCategory, string> = {
  paix:          "Paix",
  developpement: "Developpement",
  environnement: "Environnement",
  evenements:    "Evenements",
};

export const categoryGradients: Record<GalleryCategory, string> = {
  paix:          "linear-gradient(135deg, #1565C0, #0D3B6F)",
  developpement: "linear-gradient(135deg, #1B7A3D, #0D3B6F)",
  environnement: "linear-gradient(135deg, #8BB617, #1B7A3D)",
  evenements:    "linear-gradient(135deg, #0D3B6F, #1565C0)",
};

/* Light accent used for the lightbox info-panel pill text. */
export const categoryAccents: Record<GalleryCategory, string> = {
  paix:          "#85B7EB",
  developpement: "#5DCAA5",
  environnement: "#C0DD97",
  evenements:    "#85B7EB",
};

/* Lucide icon name per category (resolved in components). */
export const categoryIconNames: Record<
  GalleryCategory,
  "Shield" | "Sprout" | "Leaf" | "Calendar"
> = {
  paix:          "Shield",
  developpement: "Sprout",
  environnement: "Leaf",
  evenements:    "Calendar",
};

/* Deterministic masonry aspect ratios (stable layout, not random). */
export function getAspectRatio(index: number): string {
  const ratios = [
    "3/4", "1/1", "4/5", "1/1", "4/5", "3/4", "1/1", "3/4",
    "4/5", "3/4", "1/1", "4/5", "3/4", "1/1", "4/5", "1/1",
  ];
  return ratios[index % ratios.length];
}

export const galleryItems: GalleryItem[] = [
  /* PAIX */
  {
    id:            "paix-01",
    category:      "paix",
    title:         "Atelier de dialogue intercommunautaire",
    description:   "Plus de 200 leaders communautaires reunis pour un atelier de trois jours sur la prevention des conflits et le renforcement du dialogue social a Gitega.",
    location:      "Gitega, Burundi",
    date:          "Mai 2026",
    image:         "/images/gallery/paix-01.jpg",
    programme:     "Construction de la paix",
    programmeSlug: "/programmes/paix",
  },
  {
    id:            "paix-02",
    category:      "paix",
    title:         "Formation des jeunes mediateurs",
    description:   "50 jeunes formes a la mediation communautaire et a la resolution pacifique des conflits dans les quartiers urbains de Bujumbura.",
    location:      "Bujumbura, Burundi",
    date:          "Avril 2026",
    image:         "/images/gallery/paix-02.jpg",
    programme:     "Construction de la paix",
    programmeSlug: "/programmes/paix",
  },
  {
    id:            "paix-03",
    category:      "paix",
    title:         "Sensibilisation a la non-violence en milieu scolaire",
    description:   "Campagne d'education a la paix dans les ecoles secondaires de la province de Gitega, touchant plus de 500 eleves.",
    location:      "Gitega, Burundi",
    date:          "Mars 2026",
    image:         "/images/gallery/paix-03.jpg",
    programme:     "Construction de la paix",
    programmeSlug: "/programmes/paix",
  },
  {
    id:            "paix-04",
    category:      "paix",
    title:         "Conference sur la consolidation de la paix",
    description:   "Conference regionale rassemblant des acteurs de la societe civile, des institutions publiques et des partenaires internationaux.",
    location:      "Bujumbura, Burundi",
    date:          "Fevrier 2026",
    image:         "/images/gallery/paix-04.jpg",
    programme:     "Construction de la paix",
    programmeSlug: "/programmes/paix",
  },

  /* DEVELOPPEMENT */
  {
    id:            "dev-01",
    category:      "developpement",
    title:         "Cooperatives agricoles feminines",
    description:   "Accompagnement technique des cooperatives de femmes pour l'amelioration de la production agricole et l'acces aux semences ameliorees.",
    location:      "Gitega, Burundi",
    date:          "Avril 2026",
    image:         "/images/gallery/dev-01.jpg",
    programme:     "Developpement communautaire",
    programmeSlug: "/programmes/developpement",
  },
  {
    id:            "dev-02",
    category:      "developpement",
    title:         "Formation en epargne et credit",
    description:   "Sessions de formation sur la gestion financiere et l'education a l'epargne pour les menages vulnerables des collines de Mwaro.",
    location:      "Mwaro, Burundi",
    date:          "Mars 2026",
    image:         "/images/gallery/dev-02.jpg",
    programme:     "Developpement communautaire",
    programmeSlug: "/programmes/developpement",
  },
  {
    id:            "dev-03",
    category:      "developpement",
    title:         "Remise de diplomes : metiers techniques",
    description:   "30 jeunes de Gitega obtiennent leurs certificats en menuiserie, couture et maconnerie apres six mois de formation intensive.",
    location:      "Gitega, Burundi",
    date:          "Mars 2026",
    image:         "/images/gallery/dev-03.jpg",
    programme:     "Developpement communautaire",
    programmeSlug: "/programmes/developpement",
  },
  {
    id:            "dev-04",
    category:      "developpement",
    title:         "Distribution de kits agricoles",
    description:   "Remise de kits de demarrage comprenant outils et semences aux beneficiaires du programme de developpement durable.",
    location:      "Gitega, Burundi",
    date:          "Fevrier 2026",
    image:         "/images/gallery/dev-04.jpg",
    programme:     "Developpement communautaire",
    programmeSlug: "/programmes/developpement",
  },

  /* ENVIRONNEMENT */
  {
    id:            "env-01",
    category:      "environnement",
    title:         "Campagne de reboisement communautaire",
    description:   "5 000 arbres plantes sur les collines de Gitega avec la participation de plus de 400 jeunes et familles de la zone.",
    location:      "Gitega, Burundi",
    date:          "Avril 2026",
    image:         "/images/gallery/env-01.jpg",
    programme:     "Protection de l'environnement",
    programmeSlug: "/programmes/environnement",
  },
  {
    id:            "env-02",
    category:      "environnement",
    title:         "Sensibilisation a la gestion des dechets",
    description:   "Campagne de sensibilisation communautaire sur l'hygiene, l'assainissement et la gestion durable des dechets menagers.",
    location:      "Bujumbura, Burundi",
    date:          "Mars 2026",
    image:         "/images/gallery/env-02.jpg",
    programme:     "Protection de l'environnement",
    programmeSlug: "/programmes/environnement",
  },
  {
    id:            "env-03",
    category:      "environnement",
    title:         "Protection des sources d'eau",
    description:   "Travaux communautaires de protection et d'amenagement des sources d'eau potable dans les collines rurales.",
    location:      "Mwaro, Burundi",
    date:          "Fevrier 2026",
    image:         "/images/gallery/env-03.jpg",
    programme:     "Protection de l'environnement",
    programmeSlug: "/programmes/environnement",
  },
  {
    id:            "env-04",
    category:      "environnement",
    title:         "Formation en conservation des sols",
    description:   "Formation pratique sur les techniques de lutte anti-erosive et de conservation des sols pour les agriculteurs.",
    location:      "Gitega, Burundi",
    date:          "Janvier 2026",
    image:         "/images/gallery/env-04.jpg",
    programme:     "Protection de l'environnement",
    programmeSlug: "/programmes/environnement",
  },

  /* EVENEMENTS */
  {
    id:            "evt-01",
    category:      "evenements",
    title:         "Journee internationale de la paix",
    description:   "Celebration de la Journee internationale de la paix avec des activites communautaires, des discours et des spectacles culturels.",
    location:      "Gitega, Burundi",
    date:          "Septembre 2025",
    image:         "/images/gallery/evt-01.jpg",
    programme:     "Evenements C.P.D.I.",
    programmeSlug: "/programmes",
  },
  {
    id:            "evt-02",
    category:      "evenements",
    title:         "Assemblee generale annuelle du C.P.D.I.",
    description:   "Reunion annuelle des membres, partenaires et beneficiaires pour faire le bilan des activites et planifier les orientations futures.",
    location:      "Bujumbura, Burundi",
    date:          "Decembre 2025",
    image:         "/images/gallery/evt-02.jpg",
    programme:     "Evenements C.P.D.I.",
    programmeSlug: "/programmes",
  },
  {
    id:            "evt-03",
    category:      "evenements",
    title:         "Visite de partenaires internationaux",
    description:   "Accueil d'une delegation de partenaires internationaux venue evaluer les projets en cours et discuter de nouvelles collaborations.",
    location:      "Gitega, Burundi",
    date:          "Novembre 2025",
    image:         "/images/gallery/evt-03.jpg",
    programme:     "Evenements C.P.D.I.",
    programmeSlug: "/programmes",
  },
  {
    id:            "evt-04",
    category:      "evenements",
    title:         "Lancement du programme de formation professionnelle",
    description:   "Ceremonie officielle de lancement du programme de formation aux metiers techniques pour les jeunes de Gitega.",
    location:      "Gitega, Burundi",
    date:          "Octobre 2025",
    image:         "/images/gallery/evt-04.jpg",
    programme:     "Evenements C.P.D.I.",
    programmeSlug: "/programmes",
  },
];

export const TOTAL_PHOTOS = galleryItems.length;

/* ── English overrides (keyed by id) ─────────────────────
   Title / description / date / programme name in English.
   Falls back to the French field when an entry is missing. */
export interface GalleryItemEn {
  title:       string;
  description: string;
  date:        string;
  programme:   string;
}

export const galleryItemsEn: Record<string, GalleryItemEn> = {
  "paix-01": {
    title:       "Intercommunity dialogue workshop",
    description: "More than 200 community leaders gathered for a three-day workshop on conflict prevention and the strengthening of social dialogue in Gitega.",
    date:        "May 2026",
    programme:   "Peace building",
  },
  "paix-02": {
    title:       "Training young mediators",
    description: "50 young people trained in community mediation and the peaceful resolution of conflicts in the urban neighborhoods of Bujumbura.",
    date:        "April 2026",
    programme:   "Peace building",
  },
  "paix-03": {
    title:       "Non-violence awareness in schools",
    description: "Peace education campaign in the secondary schools of Gitega province, reaching more than 500 students.",
    date:        "March 2026",
    programme:   "Peace building",
  },
  "paix-04": {
    title:       "Conference on peace consolidation",
    description: "Regional conference bringing together civil society actors, public institutions and international partners.",
    date:        "February 2026",
    programme:   "Peace building",
  },
  "dev-01": {
    title:       "Women's agricultural cooperatives",
    description: "Technical support for women's cooperatives to improve agricultural production and access to improved seeds.",
    date:        "April 2026",
    programme:   "Community development",
  },
  "dev-02": {
    title:       "Savings and credit training",
    description: "Training sessions on financial management and savings education for vulnerable households in the hills of Mwaro.",
    date:        "March 2026",
    programme:   "Community development",
  },
  "dev-03": {
    title:       "Graduation: technical trades",
    description: "30 young people from Gitega earn their certificates in carpentry, sewing and masonry after six months of intensive training.",
    date:        "March 2026",
    programme:   "Community development",
  },
  "dev-04": {
    title:       "Distribution of farming kits",
    description: "Handover of starter kits including tools and seeds to beneficiaries of the sustainable development program.",
    date:        "February 2026",
    programme:   "Community development",
  },
  "env-01": {
    title:       "Community reforestation campaign",
    description: "5,000 trees planted on the hills of Gitega with the participation of more than 400 young people and families from the area.",
    date:        "April 2026",
    programme:   "Environmental protection",
  },
  "env-02": {
    title:       "Waste management awareness",
    description: "Community awareness campaign on hygiene, sanitation and the sustainable management of household waste.",
    date:        "March 2026",
    programme:   "Environmental protection",
  },
  "env-03": {
    title:       "Protecting water sources",
    description: "Community work to protect and develop sources of drinking water in the rural hills.",
    date:        "February 2026",
    programme:   "Environmental protection",
  },
  "env-04": {
    title:       "Soil conservation training",
    description: "Practical training on anti-erosion techniques and soil conservation for farmers.",
    date:        "January 2026",
    programme:   "Environmental protection",
  },
  "evt-01": {
    title:       "International Day of Peace",
    description: "Celebration of the International Day of Peace with community activities, speeches and cultural performances.",
    date:        "September 2025",
    programme:   "C.P.D.I. Events",
  },
  "evt-02": {
    title:       "C.P.D.I. annual general assembly",
    description: "Annual meeting of members, partners and beneficiaries to review activities and plan future directions.",
    date:        "December 2025",
    programme:   "C.P.D.I. Events",
  },
  "evt-03": {
    title:       "Visit from international partners",
    description: "Welcoming a delegation of international partners to assess ongoing projects and discuss new collaborations.",
    date:        "November 2025",
    programme:   "C.P.D.I. Events",
  },
  "evt-04": {
    title:       "Launch of the vocational training program",
    description: "Official launch ceremony of the technical trades training program for the young people of Gitega.",
    date:        "October 2025",
    programme:   "C.P.D.I. Events",
  },
};

/* Returns an item with text localized for the given language (FR fallback). */
export function localizeGalleryItem(item: GalleryItem, lang: "fr" | "en"): GalleryItem {
  if (lang !== "en") return item;
  const e = galleryItemsEn[item.id];
  if (!e) return item;
  return {
    ...item,
    title:       e.title       || item.title,
    description: e.description || item.description,
    date:        e.date        || item.date,
    programme:   e.programme   || item.programme,
  };
}

/* Category label localized via the gallery translation block. */
export function categoryLabelFor(
  category: GalleryCategory,
  labels: { all: string; paix: string; dev: string; env: string; events: string },
): string {
  switch (category) {
    case "paix":          return labels.paix;
    case "developpement": return labels.dev;
    case "environnement": return labels.env;
    case "evenements":    return labels.events;
  }
}
