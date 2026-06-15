"use client";
import { motion }                 from "framer-motion";
import type { GalleryCategory }   from "@/lib/gallery";
import { useLang }                from "@/lib/i18n/context";

export type Filter = "all" | GalleryCategory;

export default function GalleryHeader({
  filter,
  setFilter,
  count,
}: {
  filter:    Filter;
  setFilter: (f: Filter) => void;
  count:     number;
}) {
  const { t } = useLang();
  const g     = t.gallery;

  const FILTERS: { value: Filter; label: string }[] = [
    { value: "all",           label: g.filterAll },
    { value: "paix",          label: g.filterPaix },
    { value: "developpement", label: g.filterDev },
    { value: "environnement", label: g.filterEnv },
    { value: "evenements",    label: g.filterEvents },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-[1200px] mx-auto"
      style={{ paddingTop: "calc(64px + 16px)" }}
    >
      <div className="px-5 sm:px-8 pt-3 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        {/* Left — title + count */}
        <div>
          <h1
            className="text-[#0D3B6F]"
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize:   "clamp(22px, 1.5vw + 14px, 28px)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {g.title}
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: "#888" }}>
            {count} {g.countSuffix}
          </p>
        </div>

        {/* Right — filter pills */}
        <style>{`.cpdi-gal-filters::-webkit-scrollbar{display:none}`}</style>
        <div
          className="cpdi-gal-filters flex gap-1 overflow-x-auto whitespace-nowrap"
          style={{
            scrollbarWidth:          "none",
            msOverflowStyle:         "none",
            WebkitOverflowScrolling: "touch",
          }}
          role="tablist"
          aria-label="Filtrer par categorie"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f.value)}
                className="shrink-0 font-medium transition-colors duration-150"
                style={{
                  fontSize:        13,
                  padding:         "6px 14px",
                  borderRadius:    20,
                  backgroundColor: isActive ? "#1565C0" : "rgba(0,0,0,0.05)",
                  color:           isActive ? "#FFFFFF" : "#666",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}
