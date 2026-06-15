"use client";
import { useMemo, useState }              from "react";
import { motion, AnimatePresence }         from "framer-motion";
import { getAspectRatio }                  from "@/lib/gallery";
import type { GalleryItem }                from "@/lib/gallery";
import GalleryHeader, { type Filter }      from "./GalleryHeader";
import GalleryCard                         from "./GalleryCard";
import GalleryTheater                      from "./GalleryTheater";

export default function MasonryGrid({
  items,
  availableImages = [],
}: {
  items:            GalleryItem[];
  availableImages?: string[];
}) {
  const [filter,      setFilter]      = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* Which item images actually exist on disk (passed from the server page). */
  const imageSet = useMemo(() => new Set(availableImages), [availableImages]);

  /* True when an image will actually load: remote (Sanity CDN / http) URLs
     are always attempted; local paths must exist on disk. */
  const hasImage = (src: string) =>
    !!src && (/^https?:\/\//.test(src) || imageSet.has(src));

  /* Currently visible items — drives both the grid and the lightbox range. */
  const visible: GalleryItem[] = useMemo(() => {
    return filter === "all"
      ? items
      : items.filter((i) => i.category === filter);
  }, [filter, items]);

  /* Changing the filter closes any open lightbox to avoid index drift. */
  const changeFilter = (f: Filter) => {
    setActiveIndex(null);
    setFilter(f);
  };

  const close = () => setActiveIndex(null);
  const prev  = () => setActiveIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
  const next  = () => setActiveIndex((i) => (i === null ? null : (i + 1) % visible.length));

  return (
    <>
      <GalleryHeader filter={filter} setFilter={changeFilter} count={visible.length} />

      <section className="pb-10" style={{ backgroundColor: "#F5F5F3" }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="columns-2 lg:columns-3 [column-gap:8px] sm:[column-gap:10px] lg:[column-gap:12px]">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    opacity: { duration: 0.3, ease: "easeOut" },
                    scale:   { duration: 0.3, ease: "easeOut" },
                    layout:  { type: "spring", damping: 25, stiffness: 300 },
                  }}
                  className="mb-2 sm:mb-2.5 lg:mb-3 break-inside-avoid"
                >
                  <GalleryCard
                    item={item}
                    aspectRatio={getAspectRatio(i)}
                    hasImage={hasImage(item.image)}
                    onClick={() => setActiveIndex(i)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {visible.length === 0 && (
            <p className="text-center text-[14px] text-[#2C2C2A]/55 py-10">
              Aucune photo dans cette categorie pour le moment.
            </p>
          )}
        </div>
      </section>

      <GalleryTheater
        items={visible}
        activeIndex={activeIndex}
        setIndex={setActiveIndex}
        hasImage={hasImage}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}
