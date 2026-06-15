"use client";
import { useState }              from "react";
import Image                      from "next/image";
import type { GalleryItem }       from "@/lib/gallery";
import { categoryColors, categoryGradients, localizeGalleryItem, categoryLabelFor } from "@/lib/gallery";
import { useLang }                from "@/lib/i18n/context";

/* A single masonry card. When the JPG isn't present on disk we render the
   category gradient only (no network request, no console errors). */
export default function GalleryCard({
  item,
  aspectRatio,
  hasImage,
  onClick,
}: {
  item:        GalleryItem;
  aspectRatio: string;
  hasImage:    boolean;
  onClick:     () => void;
}) {
  const { t, lang } = useLang();
  const g           = t.gallery;
  const loc         = localizeGalleryItem(item, lang);
  const catLabel    = categoryLabelFor(item.category, {
    all: g.filterAll, paix: g.filterPaix, dev: g.filterDev, env: g.filterEnv, events: g.filterEvents,
  });

  const [imgFailed, setImgFailed] = useState(false);
  const showImage = hasImage && !imgFailed;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={loc.title}
      className="relative group cursor-pointer overflow-hidden rounded-lg w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1565C0] focus-visible:ring-offset-2"
    >
      {/* Image / gradient area */}
      <div
        className="relative w-full"
        style={{ aspectRatio, background: categoryGradients[item.category] }}
      >
        {showImage && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImgFailed(true)}
          />
        )}

        {/* Category pill (hover) */}
        <span
          className="absolute top-3 left-3 uppercase text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            fontSize:        9,
            letterSpacing:   "0.5px",
            backgroundColor: categoryColors[item.category],
            padding:         "3px 8px",
            borderRadius:    4,
          }}
        >
          {catLabel}
        </span>

        {/* Bottom info bar (hover) */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
        >
          <p className="text-white text-[12px] font-medium leading-snug">
            {loc.title}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
            {loc.location} · {loc.date}
          </p>
        </div>
      </div>
    </button>
  );
}
