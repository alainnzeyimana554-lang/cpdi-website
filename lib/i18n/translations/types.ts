/* ── About page interfaces ─────────────────────────────── */

export interface AboutHeroStat {
  value: string;
  label: string;
}

export interface AboutChallenge {
  text: string;
}

export interface AboutValue {
  name:        string;
  description: string;
}

export interface AboutCareerItem {
  period: string;
  role:   string;
  org:    string;
}

export interface AboutFeaturedMember {
  name:         string;
  role:         string;
  bio:          string;
  career:       AboutCareerItem[];
  tags:         string[];
  profileStats?: AboutTeamStat[];
}

/** Kept for backwards compat — team now uses AboutFeaturedMember for all members */
export interface AboutTeamMember {
  name: string;
  role: string;
  bio:  string;
}

export interface AboutTeamStat {
  value: string;
  label: string;
}

export interface AboutHistoryMilestone {
  year:  string;
  label: string;
}

export interface AboutBadge {
  title: string;
  sub:   string;
}

export interface AboutTranslations {
  hero: {
    label:    string;
    headline: string;
    sub:      string;
    cta1:     string;
    cta2:     string;
    stats:    AboutHeroStat[];
  };
  mission: {
    statement:       string;
    challengesLabel: string;
    challengesTitle: string;
    challengesSub:   string;
    challenges:      AboutChallenge[];
  };
  values: {
    overline: string;
    title:    string;
    items:    AboutValue[];
  };
  quote: {
    text:   string;
    author: string;
    role:   string;
  };
  team: {
    title:     string;
    subtitle:  string;
    featured:  AboutFeaturedMember;
    member2:   AboutFeaturedMember;
    staffNote: string;
    stats:     AboutTeamStat[];
  };
  history: {
    overline:  string;
    title:     string;
    paragraph: string;
    timeline:  AboutHistoryMilestone[];
    badges:    AboutBadge[];
  };
  offices: {
    title:          string;
    siegeTitle:     string;
    siegeAddress:   string[];
    liaisonTitle:   string;
    liaisonAddress: string[];
    contactEmail:   string;
    contactTel:     string;
  };
  cta: {
    title:    string;
    subtitle: string;
    btn1:     string;
    btn2:     string;
  };
}

/* ── Landing page interfaces ───────────────────────────── */

export interface CtaWord {
  text:    string;
  accent?: boolean;
}

export interface StatItem {
  number: number;
  suffix: string;
  label:  string;
}

export interface ProgramCard {
  title:       string;
  category:    string;
  tags:        readonly string[];
  description: string;
}

export interface TestimonialItem {
  quote:       string;
  name:        string;
  designation: string;
  src:         string;
}

export interface NewsArticle {
  image:   string;
  date:    string;
  title:   string;
  excerpt: string;
}

export interface PartnerItem {
  name: string;
  type: string;
}

/* ── Programmes hub interfaces ─────────────────────────── */

export interface ProgrammesHubCard {
  title:       string;
  subtitle?:   string;
  description: string;
  tags:        string[];
  cta:         string;
}

export interface ProgrammesHubTranslations {
  heroLabel:       string;
  heroTitle:       string;
  heroSub:         string;
  scrollHint?:     string;
  approachTitle:   string;
  approachText:    string;
  cards:           ProgrammesHubCard[];   // 3 programme cards (order: paix, dev, env)
  researchTitle:   string;
  researchText:    string;
  ctaTitle:        string;
  ctaSubtitle:     string;
  ctaBtn1:         string;
  ctaBtn2:         string;
}

/* ── Individual programme page interfaces ──────────────── */

export interface ProgrammeAxisText {
  label:       string;
  description: string;
  pills:       string[];
}

export interface ProgrammeCrossLinkText {
  name:     string;
  subtitle: string;
}

export interface ProgrammePageText {
  heroLabel:          string;
  heroTitle:          string;
  heroSubtitle?:      string;
  quote:              string;
  overviewParagraphs: string[];
  axes:               ProgrammeAxisText[];
  ctaHeadline:        string;
  crossLinks:         ProgrammeCrossLinkText[];
}

export interface ProgrammeCommonText {
  axesLabel:    string;   // "Axes d'intervention"
  axisWord:     string;   // "Axe" -> counter "Axe 01 / 06"
  prev:         string;   // "Précédent"
  next:         string;   // "Suivant"
  crossLabel:   string;   // "Continuer l'exploration"
  ctaSubtitle:  string;
  ctaBtn1:      string;   // "Devenir partenaire"
  ctaBtn2:      string;   // "Nous contacter"
}

/* ── Contact page interfaces ───────────────────────────── */

export interface ContactTranslations {
  heroLabel:     string;
  heroTitle:     string;
  heroSubtitle:  string;
  formLabel:     string;
  fieldName:     string;
  fieldNamePh:   string;
  fieldEmail:    string;
  fieldEmailPh:  string;
  fieldSubject:  string;
  subjectPlaceholder: string;
  subjectPartnership: string;
  subjectSupport:     string;
  subjectInfo:        string;
  subjectOther:       string;
  fieldMessage:   string;
  fieldMessagePh: string;
  submit:         string;
  successMessage: string;
  coordsLabel:    string;
  emailLabel:     string;
  phoneLabel:     string;
  officesLabel:   string;
  gitega:         string;
  gitegaBadge:    string;
  gitegaAddress:  string;
  bujumbura:      string;
  bujumburaBadge: string;
  bujumburaAddress: string;
  mapGitega:      string;
  mapBujumbura:   string;
  ctaTitle:       string;
  ctaSubtitle:    string;
  ctaBtn1:        string;
  ctaBtn2:        string;
}

/* ── Blog / Actualites interfaces ──────────────────────── */

export interface BlogTranslations {
  heroLabel:       string;
  heroTitle:       string;
  heroSubtitle:    string;
  filterAll:       string;
  filterPaix:      string;
  filterDev:       string;
  filterEnv:       string;
  readArticle:     string;
  readingSuffix:   string;   // "de lecture" -> "12 mai 2026 · 5 min de lecture"
  emptyCategory:   string;
  crossLabel:      string;   // listing has none; reused
  newsletterTitle: string;
  newsletterDesc:  string;
  newsletterPlaceholder: string;
  newsletterBtn:   string;
  finalCtaTitle:   string;
  finalCtaSubtitle:string;
  finalCtaBtn1:    string;
  finalCtaBtn2:    string;
  backToNews:      string;
  share:           string;
  relatedTitle:    string;
}

/* ── Galerie interfaces ────────────────────────────────── */

export interface GalleryTranslations {
  title:        string;
  countSuffix:  string;   // "photos · C.P.D.I. Burundi"
  filterAll:    string;
  filterPaix:   string;
  filterDev:    string;
  filterEnv:    string;
  filterEvents: string;
  close:        string;
  prev:         string;
  next:         string;
  brand:        string;   // "C.P.D.I. Galerie"
  programmeLabel: string; // "Programme"
  placeholder:  string;   // "Photo placeholder"
  download:     string;
  shareLabel:   string;
  ctaText:      string;
  ctaBtn1:      string;
  ctaBtn2:      string;
}

export interface Translations {
  nav: {
    home:     string;
    about:    string;
    programs: string;
    news:     string;
    gallery:  string;
    contact:  string;
    cta:      string;
  };
  hero: {
    label:     string;
    headline1: string;
    headline2: string;
    headline3: string;
    sub:       string;
    cta1:      string;
    cta2:      string;
    scroll:    string;
  };
  mission: {
    overline:  string;
    title:     string;
    paragraph: string;
    stats:     StatItem[];
  };
  programs: {
    overline: string;
    title:    string;
    subtitle: string;
    readMore: string;
    cards:    ProgramCard[];
  };
  testimonials: {
    overline: string;
    title:    string;
    items:    TestimonialItem[];
  };
  news: {
    overline: string;
    title:    string;
    viewAll:  string;
    readMore: string;
    articles: NewsArticle[];
  };
  cta: {
    words:    CtaWord[];
    subtitle: string;
    btn1:     string;
    btn2:     string;
  };
  partners: {
    overline: string;
    title:    string;
    legal:    string;
    items:    PartnerItem[];
  };
  footer: {
    tagline:               string;
    navTitle:              string;
    contactTitle:          string;
    siege:                 string;
    liaison:               string;
    newsletterTitle:       string;
    newsletterDesc:        string;
    newsletterPlaceholder: string;
    newsletterBtn:         string;
    rights:                string;
    creditPrefix:          string;
    creditName:            string;
  };
  about: AboutTranslations;

  programmesHub:   ProgrammesHubTranslations;
  programmeCommon: ProgrammeCommonText;
  programmes: {
    paix:          ProgrammePageText;
    developpement: ProgrammePageText;
    environnement: ProgrammePageText;
  };
  contact: ContactTranslations;
  blog:    BlogTranslations;
  gallery: GalleryTranslations;
}
