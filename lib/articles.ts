/* ── Articles data + helpers ─────────────────────────────
   Source of truth for the /actualites blog section.
   All dates are ISO (YYYY-MM-DD); formatDateFr() turns them
   into the French "12 mai 2026" form at render time.
─────────────────────────────────────────────────────────── */

export type ArticleCategory = "paix" | "developpement" | "environnement";

export interface Article {
  slug:      string;
  title:     string;
  excerpt:   string;
  category:  ArticleCategory;
  date:      string;   // ISO YYYY-MM-DD
  readTime:  string;   // e.g. "5 min"
  image:     string;   // public path; gracefully falls back to gradient if missing
  content:   string;   // body, paragraphs separated by blank lines
  featured?: boolean;
}

/* ── Display data for categories ────────────────────────── */
export const CATEGORY_META: Record<
  ArticleCategory,
  { label: string; accent: string; lightBg: string; iconName: "ShieldCheck" | "Sprout" | "TreePine" }
> = {
  paix: {
    label:    "Paix",
    accent:   "#1565C0",
    lightBg:  "#E8F0FE",
    iconName: "ShieldCheck",
  },
  developpement: {
    label:    "Développement",
    accent:   "#1B7A3D",
    lightBg:  "#EAF5E4",
    iconName: "Sprout",
  },
  environnement: {
    label:    "Environnement",
    accent:   "#8BB617",
    lightBg:  "#EAF5E4",
    iconName: "TreePine",
  },
};

/* ── French date formatter ──────────────────────────────── */
const FR_MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${FR_MONTHS[m - 1]} ${y}`;
}

/* ── English date formatter ─────────────────────────────── */
const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDateEn(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${EN_MONTHS[m - 1]} ${d}, ${y}`;
}

export function formatDate(iso: string, lang: "fr" | "en"): string {
  return lang === "en" ? formatDateEn(iso) : formatDateFr(iso);
}

/* ── Articles ───────────────────────────────────────────── */
export const ARTICLES: Article[] = [
  {
    slug:     "dialogue-intercommunautaire-gitega",
    category: "paix",
    title:    "Dialogue intercommunautaire : 200 leaders formés à Gitega",
    excerpt:
      "Le C.P.D.I. a réuni plus de 200 leaders communautaires venus de cinq provinces pour un atelier de trois jours sur la prévention des conflits et le renforcement du dialogue social.",
    date:     "2026-05-12",
    readTime: "5 min",
    image:    "/images/actu-atelier-paix.jpg",
    featured: true,
    content: `Le Centre pour la Paix et le Développement Intégré (C.P.D.I.) a organisé du 10 au 12 mai 2026 un atelier de renforcement des capacités en dialogue intercommunautaire à Gitega, rassemblant plus de 200 leaders communautaires issus de cinq provinces du Burundi.

Cet atelier s'inscrit dans le cadre du Programme de Construction et Consolidation de la Paix du C.P.D.I., qui vise à renforcer les capacités locales en matière de prévention et de transformation des conflits.

Les participants, composés de chefs collinaires, de représentants d'associations de femmes et de jeunes, ainsi que de médiateurs communautaires, ont été formés sur les techniques de médiation, la communication non violente et les approches communautaires de résolution des différends.

"La paix ne se décrète pas, elle se construit au quotidien, à travers le dialogue et la compréhension mutuelle", a souligné M. Emmanuel Nibayubahe, Président du C.P.D.I., lors de la cérémonie d'ouverture.

Les sessions de travail ont couvert plusieurs thématiques, notamment la gestion des conflits fonciers, la cohabitation pacifique entre communautés et le rôle des leaders locaux dans la prévention de la violence.

À l'issue de l'atelier, les participants ont élaboré des plans d'action communautaires pour la consolidation de la paix dans leurs localités respectives, avec un suivi prévu sur les six prochains mois.`,
  },
  {
    slug:     "cooperatives-agricoles-bilan-saison",
    category: "developpement",
    title:    "Coopératives agricoles : bilan d'une saison record",
    excerpt:
      "Les coopératives féminines accompagnées par le C.P.D.I. affichent une hausse de production de 35% cette saison, grâce aux formations techniques et à l'accès aux semences améliorées.",
    date:     "2026-04-28",
    readTime: "4 min",
    image:    "/images/actu-formation-agricole.jpg",
    content: `Le programme d'Appui aux Moyens d'Existence et au Développement Durable du C.P.D.I. enregistre des résultats encourageants pour la saison agricole 2025-2026, avec une augmentation moyenne de 35% de la production au sein des coopératives féminines accompagnées.

Cette progression est le fruit d'un accompagnement technique soutenu, comprenant des formations sur les pratiques agricoles améliorées, la gestion des sols et l'utilisation raisonnée des intrants, ainsi que la distribution de semences certifiées à haut rendement.

Au total, douze coopératives regroupant plus de 300 femmes dans les provinces de Gitega et Mwaro ont bénéficié de ce programme. Les cultures principales concernées sont le haricot, le maïs et les légumes maraîchers.

Les bénéficiaires témoignent d'une amélioration significative de leurs revenus et de la sécurité alimentaire de leurs ménages. "Avant, je ne produisais que pour nourrir ma famille. Aujourd'hui, je vends une partie de ma récolte et j'ai pu payer les frais scolaires de mes enfants", confie Béatrice, membre de la coopérative Terimbere de Gitega.

Le C.P.D.I. prévoit d'étendre ce programme à trois nouvelles provinces au cours de la prochaine saison, avec un accent particulier sur l'éducation à l'épargne et au crédit pour renforcer la résilience économique des ménages.`,
  },
  {
    slug:     "reboisement-collines-gitega",
    category: "environnement",
    title:    "5 000 arbres plantés sur les collines de Gitega",
    excerpt:
      "Une campagne de reboisement mobilisant jeunes et familles pour protéger les sols et restaurer la biodiversité locale sur les collines menacées par l'érosion.",
    date:     "2026-04-15",
    readTime: "3 min",
    image:    "/images/actu-reboisement.jpg",
    content: `Le C.P.D.I. a mené une vaste campagne de reboisement sur les collines de la commune de Gitega, aboutissant à la plantation de 5 000 arbres en une semaine, avec la participation active de plus de 400 jeunes et familles de la zone.

Cette initiative s'inscrit dans le Programme de Gestion des Ressources Naturelles du C.P.D.I., qui œuvre pour la protection de l'environnement, la conservation des sols et la lutte contre les effets des changements climatiques.

Les espèces plantées ont été soigneusement sélectionnées pour leur adaptation au climat local et leur utilité multiple : des arbres fruitiers pour améliorer la nutrition des ménages, des espèces de couverture pour lutter contre l'érosion, et des essences forestières pour le reboisement durable.

La campagne a également été l'occasion de sensibiliser les communautés riveraines sur les enjeux de la déforestation, la gestion durable des ressources en eau et la protection de la biodiversité.

Le C.P.D.I. assure un suivi régulier des plantations et organise des sessions de formation pour les communautés locales sur l'entretien des jeunes plants et la gestion durable des espaces reboisés.`,
  },
  {
    slug:     "formation-jeunes-mediateurs-bujumbura",
    category: "paix",
    title:    "Formation des jeunes médiateurs à Bujumbura",
    excerpt:
      "Un nouveau cycle de formation pour renforcer les capacités de 50 jeunes en médiation communautaire et résolution pacifique des conflits dans les quartiers urbains.",
    date:     "2026-04-02",
    readTime: "4 min",
    image:    "/images/actu-mediateurs-bujumbura.jpg",
    content: `Le C.P.D.I. a lancé un nouveau cycle de formation à la médiation communautaire à Bujumbura, destiné à 50 jeunes issus de différents quartiers de la capitale. Ce programme de deux semaines vise à former une nouvelle génération de médiateurs capables d'intervenir dans la résolution pacifique des conflits au niveau local.

Les participants suivent des modules couvrant les techniques de médiation, la communication non violente, l'analyse des conflits et les approches restauratives de la justice. Des mises en situation et des jeux de rôle complètent la formation théorique.

"Les jeunes sont souvent les premiers touchés par les conflits, mais ils sont aussi les mieux placés pour construire la paix dans leurs communautés", explique M. Emmanuel Nibayubahe, Président du C.P.D.I.

Ce programme s'inscrit dans la stratégie du C.P.D.I. de renforcement de la jeunesse comme acteur central de la consolidation de la paix, en complément des actions menées en milieu rural.

À l'issue de la formation, les jeunes médiateurs seront déployés dans leurs quartiers respectifs et bénéficieront d'un accompagnement régulier du C.P.D.I. pendant une année.`,
  },
  {
    slug:     "remise-diplomes-metiers-techniques",
    category: "developpement",
    title:    "Remise de diplômes : 30 jeunes formés aux métiers techniques",
    excerpt:
      "Le programme de formation professionnelle du C.P.D.I. a permis à 30 jeunes de Gitega d'obtenir leurs certificats en menuiserie, couture et maçonnerie.",
    date:     "2026-03-18",
    readTime: "3 min",
    image:    "/images/actu-diplomes-metiers.jpg",
    content: `Le C.P.D.I. a célébré la remise de diplômes de la première promotion de son programme de formation professionnelle, avec 30 jeunes de Gitega ayant obtenu leurs certificats en menuiserie, couture et maçonnerie.

Cette cérémonie marque l'aboutissement de six mois de formation intensive, combinant enseignements théoriques et pratique en atelier. Le programme vise à lutter contre le chômage des jeunes en leur offrant des compétences techniques directement employables.

Les lauréats ont reçu, en plus de leurs certificats, des kits de démarrage comprenant les outils de base de leur métier, pour faciliter leur insertion professionnelle immédiate.

"Notre objectif n'est pas seulement de former, mais de créer les conditions pour que ces jeunes deviennent autonomes et contribuent au développement économique de leurs communautés", souligne M. Rénovat RLS, Responsable administratif et technique du C.P.D.I.

Le C.P.D.I. prévoit d'ouvrir les inscriptions pour une deuxième promotion dès le mois prochain, avec l'ajout de nouvelles filières dont l'électricité et la plomberie.`,
  },
];

/* ── English overrides (keyed by slug) ───────────────────
   Title / excerpt / full body in English. Falls back to the
   French field when an entry (or any field) is missing. */
export interface ArticleEn {
  title:   string;
  excerpt: string;
  content: string;
}

export const ARTICLES_EN: Record<string, ArticleEn> = {
  "dialogue-intercommunautaire-gitega": {
    title:   "Intercommunity dialogue: 200 leaders trained in Gitega",
    excerpt: "The C.P.D.I. brought together more than 200 community leaders from five provinces for a three-day workshop on conflict prevention and the strengthening of social dialogue.",
    content: `From May 10 to 12, 2026, the Centre for Peace and Integrated Development (C.P.D.I.) held a capacity-building workshop on intercommunity dialogue in Gitega, bringing together more than 200 community leaders from five provinces of Burundi.

This workshop is part of the C.P.D.I.'s Peace Building and Consolidation Program, which aims to strengthen local capacities in conflict prevention and transformation.

The participants, made up of hill chiefs, representatives of women's and youth associations, and community mediators, were trained in mediation techniques, non-violent communication and community-based approaches to dispute resolution.

"Peace is not decreed; it is built every day, through dialogue and mutual understanding," emphasized Mr. Emmanuel Nibayubahe, President of the C.P.D.I., at the opening ceremony.

The working sessions covered several themes, including the management of land conflicts, peaceful coexistence between communities and the role of local leaders in preventing violence.

At the end of the workshop, participants developed community action plans for peace consolidation in their respective areas, with follow-up planned over the next six months.`,
  },
  "cooperatives-agricoles-bilan-saison": {
    title:   "Agricultural cooperatives: review of a record season",
    excerpt: "The women's cooperatives supported by the C.P.D.I. show a 35% increase in production this season, thanks to technical training and access to improved seeds.",
    content: `The C.P.D.I.'s Livelihood Support and Sustainable Development Program is recording encouraging results for the 2025-2026 agricultural season, with an average 35% increase in production within the supported women's cooperatives.

This progress is the result of sustained technical support, including training on improved farming practices, soil management and the careful use of inputs, as well as the distribution of certified high-yield seeds.

In total, twelve cooperatives bringing together more than 300 women in the provinces of Gitega and Mwaro benefited from this program. The main crops involved are beans, maize and market-garden vegetables.

The beneficiaries report a significant improvement in their income and the food security of their households. "Before, I only produced enough to feed my family. Today, I sell part of my harvest and I have been able to pay my children's school fees," says Béatrice, a member of the Terimbere cooperative in Gitega.

The C.P.D.I. plans to extend this program to three new provinces during the next season, with particular emphasis on savings and credit education to strengthen the economic resilience of households.`,
  },
  "reboisement-collines-gitega": {
    title:   "5,000 trees planted on the hills of Gitega",
    excerpt: "A reforestation campaign mobilizing young people and families to protect soils and restore local biodiversity on hills threatened by erosion.",
    content: `The C.P.D.I. carried out a large reforestation campaign on the hills of the Gitega commune, resulting in the planting of 5,000 trees in one week, with the active participation of more than 400 young people and families from the area.

This initiative is part of the C.P.D.I.'s Natural Resource Management Program, which works to protect the environment, conserve soils and fight the effects of climate change.

The species planted were carefully selected for their adaptation to the local climate and their multiple uses: fruit trees to improve household nutrition, cover species to fight erosion, and forest species for sustainable reforestation.

The campaign was also an opportunity to raise awareness among neighboring communities about the challenges of deforestation, the sustainable management of water resources and the protection of biodiversity.

The C.P.D.I. provides regular monitoring of the plantings and organizes training sessions for local communities on the care of young seedlings and the sustainable management of reforested areas.`,
  },
  "formation-jeunes-mediateurs-bujumbura": {
    title:   "Training young mediators in Bujumbura",
    excerpt: "A new training cycle to strengthen the capacities of 50 young people in community mediation and the peaceful resolution of conflicts in urban neighborhoods.",
    content: `The C.P.D.I. has launched a new cycle of community mediation training in Bujumbura, aimed at 50 young people from various neighborhoods of the capital. This two-week program aims to train a new generation of mediators able to intervene in the peaceful resolution of conflicts at the local level.

Participants follow modules covering mediation techniques, non-violent communication, conflict analysis and restorative approaches to justice. Role-plays and simulations complement the theoretical training.

"Young people are often the first affected by conflicts, but they are also best placed to build peace in their communities," explains Mr. Emmanuel Nibayubahe, President of the C.P.D.I.

This program is part of the C.P.D.I.'s strategy to strengthen youth as a central actor in peace consolidation, complementing the actions carried out in rural areas.

At the end of the training, the young mediators will be deployed in their respective neighborhoods and will benefit from regular support from the C.P.D.I. for one year.`,
  },
  "remise-diplomes-metiers-techniques": {
    title:   "Graduation: 30 young people trained in technical trades",
    excerpt: "The C.P.D.I.'s vocational training program enabled 30 young people from Gitega to earn their certificates in carpentry, sewing and masonry.",
    content: `The C.P.D.I. celebrated the graduation of the first class of its vocational training program, with 30 young people from Gitega earning their certificates in carpentry, sewing and masonry.

This ceremony marks the culmination of six months of intensive training, combining theoretical teaching and hands-on workshop practice. The program aims to fight youth unemployment by offering directly employable technical skills.

The graduates received, in addition to their certificates, starter kits including the basic tools of their trade, to facilitate their immediate professional integration.

"Our goal is not only to train, but to create the conditions for these young people to become self-reliant and contribute to the economic development of their communities," emphasizes Mr. Rénovat RLS, Administrative and Technical Officer of the C.P.D.I.

The C.P.D.I. plans to open enrollment for a second class as early as next month, with the addition of new fields including electricity and plumbing.`,
  },
};

/* Returns an article with title/excerpt/content localized (FR fallback). */
export function localizeArticle(article: Article, lang: "fr" | "en"): Article {
  if (lang !== "en") return article;
  const e = ARTICLES_EN[article.slug];
  if (!e) return article;
  return {
    ...article,
    title:   e.title   || article.title,
    excerpt: e.excerpt || article.excerpt,
    content: e.content || article.content,
  };
}

/* Category label localized via the blog translation block. */
export function articleCategoryLabel(
  category: ArticleCategory,
  labels: { paix: string; dev: string; env: string },
): string {
  switch (category) {
    case "paix":          return labels.paix;
    case "developpement": return labels.dev;
    case "environnement": return labels.env;
  }
}

/* ── Lookup helpers ─────────────────────────────────────── */
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, max = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, max);
}
