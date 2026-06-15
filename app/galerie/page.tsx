import type { Metadata } from "next";
import fs                 from "fs";
import path               from "path";
import Navbar             from "@/components/sections/Navbar";
import Footer             from "@/components/sections/Footer";
import MasonryGrid        from "@/components/gallery/MasonryGrid";
import GalleryCTA         from "@/components/gallery/GalleryCTA";
import { getAllGalleryItems } from "@/lib/sanity-gallery";

export const metadata: Metadata = {
  title:       "Galerie | C.P.D.I. Burundi",
  description:
    "Retour en images sur les actions du Centre pour la Paix et le Developpement Integre (C.P.D.I.) au Burundi : paix, developpement, environnement et evenements.",
};

/* Returns the public paths of gallery images that actually exist on disk.
   Lets cards render a gradient placeholder (no failed request) until the
   client drops real photos into /public/images/gallery/. */
function getAvailableImages(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "gallery");
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
      .map((f) => `/images/gallery/${f}`);
  } catch {
    return [];
  }
}

export default async function GaleriePage() {
  const availableImages = getAvailableImages();
  const items           = await getAllGalleryItems();

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F5F5F3" }}>
        <MasonryGrid items={items} availableImages={availableImages} />
      </main>
      <GalleryCTA />
      <Footer />
    </>
  );
}
