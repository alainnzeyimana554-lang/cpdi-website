import type { Metadata }    from "next";
import Navbar                 from "@/components/sections/Navbar";
import Footer                 from "@/components/sections/Footer";
import BlogListingClient      from "@/components/blog/BlogListingClient";
import { getAllArticles }     from "@/lib/sanity-articles";

export const metadata: Metadata = {
  title:       "Actualités | C.P.D.I. Burundi",
  description:
    "Chroniques, analyses et reportages du Centre pour la Paix et le Développement Intégré (C.P.D.I.) au Burundi. Suivez nos actions sur le terrain en matière de paix, développement et environnement.",
};

export default async function ActualitesPage() {
  const articles = await getAllArticles();
  return (
    <>
      <Navbar />
      <main>
        <BlogListingClient articles={articles} />
      </main>
      <Footer />
    </>
  );
}
