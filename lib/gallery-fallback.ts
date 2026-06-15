/* Fallback gallery data used when Sanity is empty or unreachable.
   Intentionally empty: the live site shows no placeholder/generic photos.
   Real photos are added via the Sanity Studio (/studio) and render
   automatically. The GalleryItem shape + helpers live in ./gallery. */
import type { GalleryItem } from "./gallery";

export const galleryItems: GalleryItem[] = [];
