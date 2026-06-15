"use client";
import { useEffect, useState, useCallback } from "react";
import Image                                  from "next/image";
import Link                                   from "next/link";
import { motion, AnimatePresence }            from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, MapPin, Calendar, ArrowRight, Download, Share2,
} from "lucide-react";
import type { GalleryItem }                   from "@/lib/gallery";
import {
  categoryColors, categoryGradients, categoryAccents, localizeGalleryItem, categoryLabelFor,
} from "@/lib/gallery";
import { useLang }                            from "@/lib/i18n/context";
import { CategoryIcon }                       from "./categoryIcon";

export default function GalleryTheater({
  items,
  activeIndex,
  setIndex,
  hasImage,
  onClose,
  onPrev,
  onNext,
}: {
  items:       GalleryItem[];
  activeIndex: number | null;
  setIndex:    (i: number) => void;
  hasImage:    (src: string) => boolean;
  onClose:     () => void;
  onPrev:      () => void;
  onNext:      () => void;
}) {
  const { t, lang } = useLang();
  const g           = t.gallery;
  const catLabels   = { all: g.filterAll, paix: g.filterPaix, dev: g.filterDev, env: g.filterEnv, events: g.filterEvents };

  const isOpen  = activeIndex !== null;
  const current = isOpen ? items[activeIndex] : null;
  const loc     = current ? localizeGalleryItem(current, lang) : null;

  /* Body scroll lock — compensate for scrollbar width to avoid layout shift. */
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingR = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingR;
    };
  }, [isOpen]);

  /* Keyboard nav */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")           onClose();
      else if (e.key === "ArrowLeft")   onPrev();
      else if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, onPrev, onNext]);

  const handleBackdrop = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleShare = useCallback(() => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && current && loc && (
        <motion.div
          key="theater"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
          role="dialog"
          aria-modal="true"
          aria-label={loc.title}
        >
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-5 py-3.5 shrink-0">
            <span
              className="text-[12px] font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
              aria-live="polite"
            >
              {activeIndex + 1} / {items.length}
            </span>
            <div className="flex items-center gap-3">
              <span
                className="hidden sm:inline uppercase"
                style={{ fontSize: 11, letterSpacing: "2px", color: "rgba(255,255,255,0.25)" }}
              >
                {g.brand}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={g.close}
                className="flex items-center justify-center rounded-full transition-colors w-10 h-10 sm:w-8 sm:h-8"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
              >
                <X size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
              </button>
            </div>
          </div>

          {/* ── Main content ── */}
          <div
            className="flex-1 min-h-0 flex flex-col md:flex-row px-4 sm:px-5 pb-2"
            onClick={handleBackdrop}
          >
            {/* Image area */}
            <div
              className="relative flex-1 min-h-0 flex items-center justify-center"
              onClick={handleBackdrop}
            >
              {/* Prev arrow */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onPrev(); }}
                  aria-label={g.prev}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-colors w-6 h-6 sm:w-7 sm:h-7"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <ChevronLeft size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                </button>
              )}

              {/* Image (crossfade) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center w-full h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TheaterImage
                    item={current}
                    hasImage={hasImage(current.image)}
                    alt={loc.title}
                    placeholderLabel={g.placeholder}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next arrow */}
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onNext(); }}
                  aria-label={g.next}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-colors w-6 h-6 sm:w-7 sm:h-7"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                </button>
              )}
            </div>

            {/* Info panel */}
            <div
              className="shrink-0 w-full md:w-[240px] flex flex-col justify-center overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:border-l md:pl-6 md:ml-6 py-2" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Category pill */}
                    <span
                      className="inline-block"
                      style={{
                        backgroundColor: `${categoryColors[current.category]}33`,
                        border:          `0.5px solid ${categoryColors[current.category]}4D`,
                        color:           categoryAccents[current.category],
                        padding:         "3px 10px",
                        borderRadius:    20,
                        fontSize:        11,
                        letterSpacing:   "0.5px",
                        marginBottom:    12,
                      }}
                    >
                      {categoryLabelFor(current.category, catLabels)}
                    </span>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily:   "'Merriweather', Georgia, serif",
                        fontSize:     16,
                        fontWeight:   500,
                        color:        "rgba(255,255,255,0.9)",
                        lineHeight:   1.4,
                        marginBottom: 10,
                      }}
                    >
                      {loc.title}
                    </h2>

                    {/* Description */}
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                      {loc.description}
                    </p>

                    {/* Divider + location/date */}
                    <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 14, marginTop: 20 }}>
                      <div className="flex items-center gap-1.5" style={{ marginBottom: 8 }}>
                        <MapPin size={13} style={{ color: "rgba(255,255,255,0.25)" }} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                          {loc.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} style={{ color: "rgba(255,255,255,0.25)" }} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                          {loc.date}
                        </span>
                      </div>
                    </div>

                    {/* Divider + programme link */}
                    <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 14, marginTop: 20 }}>
                      <p
                        className="uppercase"
                        style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "1px", marginBottom: 8 }}
                      >
                        {g.programmeLabel}
                      </p>
                      <Link
                        href={current.programmeSlug}
                        className="inline-flex items-center gap-2 transition-colors"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                      >
                        <span
                          style={{
                            width: 6, height: 6, borderRadius: "50%",
                            backgroundColor: categoryColors[current.category],
                            display: "inline-block",
                          }}
                        />
                        <span style={{ fontSize: 11 }}>{loc.programme}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Thumbnail strip (hidden on mobile) ── */}
          <div className="hidden md:flex items-center gap-1.5 px-5 pb-4 pt-1 shrink-0">
            <style>{`.cpdi-thumbs::-webkit-scrollbar{display:none}`}</style>
            <div
              className="cpdi-thumbs flex items-center gap-1.5 overflow-x-auto flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={it.title}
                  className="shrink-0 relative overflow-hidden rounded transition-opacity"
                  style={{
                    width:   48,
                    height:  36,
                    border:  i === activeIndex ? "1.5px solid rgba(255,255,255,0.4)" : "1.5px solid transparent",
                    opacity: i === activeIndex ? 1 : 0.4,
                  }}
                  onMouseEnter={(e) => { if (i !== activeIndex) e.currentTarget.style.opacity = "0.6"; }}
                  onMouseLeave={(e) => { if (i !== activeIndex) e.currentTarget.style.opacity = "0.4"; }}
                >
                  <Thumb item={it} hasImage={hasImage(it.image)} />
                </button>
              ))}
            </div>

            {/* Utility buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pl-2">
              {hasImage(current.image) ? (
                <a
                  href={current.image}
                  download
                  aria-label={g.download}
                  className="flex items-center justify-center rounded-full transition-colors"
                  style={{ width: 28, height: 28, backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={14} style={{ color: "rgba(255,255,255,0.35)" }} />
                </a>
              ) : (
                <button
                  type="button"
                  aria-label={g.download}
                  disabled
                  className="flex items-center justify-center rounded-full cursor-not-allowed"
                  style={{ width: 28, height: 28, backgroundColor: "rgba(255,255,255,0.06)", opacity: 0.5 }}
                >
                  <Download size={14} style={{ color: "rgba(255,255,255,0.35)" }} />
                </button>
              )}
              <button
                type="button"
                onClick={handleShare}
                aria-label={g.shareLabel}
                className="flex items-center justify-center rounded-full transition-colors"
                style={{ width: 28, height: 28, backgroundColor: "rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
              >
                <Share2 size={14} style={{ color: "rgba(255,255,255,0.35)" }} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main image with gradient + icon placeholder fallback ── */
function TheaterImage({
  item,
  hasImage,
  alt,
  placeholderLabel,
}: {
  item:             GalleryItem;
  hasImage:         boolean;
  alt:              string;
  placeholderLabel: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!hasImage || imgFailed) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-lg"
        style={{
          background:  categoryGradients[item.category],
          width:       "min(90vw, 900px)",
          aspectRatio: "4 / 3",
          maxHeight:   "100%",
        }}
      >
        <CategoryIcon category={item.category} size={48} style={{ color: "rgba(255,255,255,0.15)" }} />
        <span className="mt-2" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={alt}
        className="object-contain rounded-lg"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        onError={() => setImgFailed(true)}
      />
    </div>
  );
}

/* ── Thumbnail with gradient fallback ── */
function Thumb({ item, hasImage }: { item: GalleryItem; hasImage: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!hasImage || imgFailed) {
    return <div className="w-full h-full" style={{ background: categoryGradients[item.category] }} />;
  }
  return (
    <Image
      src={item.image}
      alt={item.title}
      fill
      sizes="48px"
      className="object-cover"
      onError={() => setImgFailed(true)}
    />
  );
}
