import type { Metadata } from "next";
import Navbar       from "@/components/sections/Navbar";
import Footer       from "@/components/sections/Footer";
import AboutHero    from "@/components/sections/about/AboutHero";
import AboutMission from "@/components/sections/about/AboutMission";
import AboutValues  from "@/components/sections/about/AboutValues";
import AboutTeam    from "@/components/sections/about/AboutTeam";
import AboutHistory from "@/components/sections/about/AboutHistory";
import AboutOffices from "@/components/sections/about/AboutOffices";
import AboutCta     from "@/components/sections/about/AboutCta";

export const metadata: Metadata = {
  title:       "À Propos | C.P.D.I. Burundi",
  description: "Découvrez le Centre pour la Paix et le Développement Intégré : mission, équipe, histoire et bureaux.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero    />
        <AboutMission />
        <AboutValues  />
        <AboutTeam    />
        <AboutHistory />
        <AboutOffices />
        <AboutCta     />
      </main>
      <Footer />
    </>
  );
}
