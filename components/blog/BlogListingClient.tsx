"use client";
import { useState, useMemo } from "react";
import { motion }            from "framer-motion";
import type { Article, ArticleCategory } from "@/lib/articles";
import { useLang }           from "@/lib/i18n/context";
import FeaturedArticle        from "./FeaturedArticle";
import ArticleBand            from "./ArticleBand";
import NewsletterCTA          from "./NewsletterCTA";
import FinalCta               from "./FinalCta";

type Filter = "all" | ArticleCategory;

export default function BlogListingClient({ articles }: { articles: Article[] }) {
  const { t } = useLang();
  const b     = t.blog;
  const [filter, setFilter] = useState<Filter>("all");

  const FILTERS: { value: Filter; label: string }[] = [
    { value: "all",            label: b.filterAll },
    { value: "paix",           label: b.filterPaix },
    { value: "developpement",  label: b.filterDev },
    { value: "environnement",  label: b.filterEnv },
  ];

  /* Filter the article list. The featured = first match; the rest become bands.
     If nothing matches, both groups are empty. */
  const { featured, bands } = useMemo(() => {
    const visible: Article[] = filter === "all"
      ? articles
      : articles.filter((a) => a.category === filter);

    const featuredCandidate = visible.find((a) => a.featured) ?? visible[0];

    const rest = visible.filter((a) => a.slug !== featuredCandidate?.slug);

    return { featured: featuredCandidate, bands: rest };
  }, [filter, articles]);

  return (
    <>
      {/* ══ SECTION 1 — HERO ════════════════════════════════ */}
      <section style={{ backgroundColor: "#0D3B6F" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ paddingTop: "calc(64px + 24px)", paddingBottom: 48 }}
        >
          <span
            className="block uppercase font-medium"
            style={{
              color:         "rgba(255,255,255,0.45)",
              fontSize:      11,
              letterSpacing: "3px",
              marginBottom:  12,
            }}
          >
            {b.heroLabel}
          </span>
          <h1
            className="text-white"
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize:   "clamp(26px, 4vw + 10px, 36px)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {b.heroTitle}
          </h1>
          <p
            className="mt-3 mx-auto"
            style={{
              color:    "rgba(255,255,255,0.55)",
              fontSize: 14,
              maxWidth: 520,
            }}
          >
            {b.heroSubtitle}
          </p>
        </motion.div>
      </section>

      {/* ══ SECTION 2 — FILTER BAR ══════════════════════════ */}
      <section
        className="bg-white"
        style={{ borderBottom: "0.5px solid rgba(0,0,0,0.1)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <style>{`.cpdi-filter-scroll::-webkit-scrollbar{display:none}`}</style>
          <div
            className="cpdi-filter-scroll flex items-center justify-start sm:justify-center gap-2 overflow-x-auto whitespace-nowrap"
            style={{
              scrollbarWidth:           "none",
              msOverflowStyle:          "none",
              WebkitOverflowScrolling:  "touch",
            }}
            role="tablist"
            aria-label="Filtrer les articles par catégorie"
          >
            {FILTERS.map((f) => {
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f.value)}
                  className="shrink-0 transition-colors duration-150"
                  style={{
                    fontSize:        13,
                    padding:         "6px 18px",
                    borderRadius:    20,
                    backgroundColor: isActive ? "#1565C0" : "transparent",
                    color:           isActive ? "#FFFFFF" : "rgba(44,44,42,0.7)",
                    border:          `0.5px solid ${isActive ? "#1565C0" : "rgba(0,0,0,0.18)"}`,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — FEATURED ════════════════════════════ */}
      {featured ? (
        <FeaturedArticle article={featured} />
      ) : (
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <p className="text-[14px] text-[#2C2C2A]/55">
              {b.emptyCategory}
            </p>
          </div>
        </section>
      )}

      {/* ══ SECTION 4 — ARTICLE BANDS ═══════════════════════ */}
      {bands.length > 0 && (
        <div>
          {bands.map((a, i) => (
            <ArticleBand key={a.slug} article={a} index={i} />
          ))}
        </div>
      )}

      {/* ══ SECTION 5 — NEWSLETTER ══════════════════════════ */}
      <NewsletterCTA />

      {/* ══ SECTION 6 — FINAL CTA ═══════════════════════════ */}
      <FinalCta />
    </>
  );
}
