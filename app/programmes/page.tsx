import type { Metadata } from "next";
import Navbar         from "@/components/sections/Navbar";
import Footer         from "@/components/sections/Footer";
import ProgrammesHub  from "@/components/sections/programmes/ProgrammesHub";

export const metadata: Metadata = {
  title:       "Nos Programmes | C.P.D.I. Burundi",
  description: "Découvrez les trois programmes du C.P.D.I. : construction de la paix, développement durable et gestion des ressources naturelles au Burundi.",
};

export default function ProgrammesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProgrammesHub />
      </main>
      <Footer />
    </>
  );
}
