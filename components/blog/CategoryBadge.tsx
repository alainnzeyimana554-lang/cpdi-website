"use client";
import { ShieldCheck, Sprout, TreePine } from "lucide-react";
import type { ArticleCategory }          from "@/lib/articles";
import { CATEGORY_META, articleCategoryLabel } from "@/lib/articles";
import { useLang }                       from "@/lib/i18n/context";

const ICON_MAP = { ShieldCheck, Sprout, TreePine } as const;

export default function CategoryBadge({
  category,
  size = "sm",
}: {
  category: ArticleCategory;
  size?:    "sm" | "md";
}) {
  const { t } = useLang();
  const meta  = CATEGORY_META[category];
  const Icon  = ICON_MAP[meta.iconName];
  const label = articleCategoryLabel(category, {
    paix: t.blog.filterPaix, dev: t.blog.filterDev, env: t.blog.filterEnv,
  });

  const fontSize    = size === "md" ? 12 : 11;
  const iconSize    = size === "md" ? 13 : 12;
  const tracking    = size === "md" ? "1px"   : "1.2px";

  return (
    <span
      className="inline-flex items-center gap-1.5 font-medium uppercase"
      style={{
        fontSize,
        letterSpacing: tracking,
        color:         meta.accent,
      }}
    >
      <Icon size={iconSize} strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  );
}
