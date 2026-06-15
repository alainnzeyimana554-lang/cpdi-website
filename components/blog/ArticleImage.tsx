"use client";
import { useState }                  from "react";
import Image                          from "next/image";
import { ShieldCheck, Sprout, TreePine } from "lucide-react";
import type { ArticleCategory }       from "@/lib/articles";
import { CATEGORY_META }              from "@/lib/articles";

const ICON_MAP = { ShieldCheck, Sprout, TreePine } as const;

/* Article image with category-coloured gradient fallback.
   If the JPG referenced by `src` doesn't exist on disk yet, the
   fallback layer stays visible (gradient + faded category icon). */
export default function ArticleImage({
  src,
  alt,
  category,
  className   = "",
  rounded     = 6,
  sizes,
}: {
  src:        string;
  alt:        string;
  category:   ArticleCategory;
  className?: string;
  rounded?:   number;
  sizes?:     string;
}) {
  const meta = CATEGORY_META[category];
  const Icon = ICON_MAP[meta.iconName];
  const [loadFailed, setLoadFailed] = useState(false);

  /* Soft 135° gradient using the category's light bg blended into its accent.
     Keeps things on-palette even when a real photo is missing. */
  const gradient = `linear-gradient(135deg, ${meta.lightBg} 0%, ${meta.accent}33 100%)`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: gradient, borderRadius: rounded }}
    >
      {/* Faded category icon as scaffolding */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Icon
          size={56}
          strokeWidth={1}
          style={{ color: meta.accent, opacity: 0.28 }}
        />
      </div>

      {/* Real photo overlay; vanishes if the asset 404s */}
      {!loadFailed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 600px"}
          className="object-cover"
          onError={() => setLoadFailed(true)}
        />
      )}
    </div>
  );
}
