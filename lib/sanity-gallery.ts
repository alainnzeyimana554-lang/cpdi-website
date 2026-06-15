import { client }              from "@/sanity/lib/client";
import { urlFor }               from "@/sanity/lib/image";
import { allGalleryItemsQuery } from "@/sanity/lib/queries";
import type { GalleryItem, GalleryCategory } from "@/lib/gallery";

/* Sanity's galleryItem schema does not carry programme / programmeSlug,
   but the lightbox links to a programme. Derive them from the category
   so Sanity-authored items get a working programme link. */
const PROGRAMME_BY_CATEGORY: Record<GalleryCategory, { programme: string; programmeSlug: string }> = {
  paix:          { programme: "Construction de la paix",       programmeSlug: "/programmes/paix" },
  developpement: { programme: "Developpement communautaire",   programmeSlug: "/programmes/developpement" },
  environnement: { programme: "Protection de l'environnement", programmeSlug: "/programmes/environnement" },
  evenements:    { programme: "Evenements C.P.D.I.",           programmeSlug: "/programmes" },
};

function transformGalleryItem(doc: Record<string, any>): GalleryItem {
  const category = doc.category as GalleryCategory;
  const prog     = PROGRAMME_BY_CATEGORY[category] ?? PROGRAMME_BY_CATEGORY.evenements;
  return {
    id:            doc.itemId || doc._id,
    category,
    title:         doc.title,
    description:   doc.description || "",
    location:      doc.location || "",
    date:          doc.date || "",
    image:         doc.image ? urlFor(doc.image).width(900).url() : "",
    programme:     prog.programme,
    programmeSlug: prog.programmeSlug,
  };
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  try {
    const docs = await client.fetch(allGalleryItemsQuery);
    if (docs && docs.length > 0) {
      return docs.map(transformGalleryItem);
    }
  } catch (error) {
    console.error("Sanity gallery fetch failed, using fallback:", error);
  }
  const { galleryItems } = await import("@/lib/gallery-fallback");
  return galleryItems;
}
