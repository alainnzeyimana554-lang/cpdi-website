import { Shield, Sprout, Leaf, Calendar } from "lucide-react";
import type { GalleryCategory } from "@/lib/gallery";
import { categoryIconNames }    from "@/lib/gallery";

const ICONS = { Shield, Sprout, Leaf, Calendar } as const;

export function CategoryIcon({
  category,
  size,
  style,
  strokeWidth = 1.5,
}: {
  category:     GalleryCategory;
  size:         number;
  style?:       React.CSSProperties;
  strokeWidth?: number;
}) {
  const Icon = ICONS[categoryIconNames[category]];
  return <Icon size={size} strokeWidth={strokeWidth} style={style} aria-hidden="true" />;
}
