import type { Metadata } from "next";
import Navbar             from "@/components/sections/Navbar";
import Footer             from "@/components/sections/Footer";
import ProgrammeLayout, { type ProgrammeLayoutProps } from "@/components/sections/programmes/ProgrammeLayout";

export const metadata: Metadata = {
  title:       "Programme Environnement | C.P.D.I. Burundi",
  description: "Gestion des ressources naturelles — 8 axes d'intervention du C.P.D.I. pour protéger l'environnement et gérer durablement les ressources en terre, eau et écosystèmes au Burundi.",
};

const config: ProgrammeLayoutProps = {
  programmeKey:    "environnement",
  gradient:        "linear-gradient(135deg, #0D3B6F 0%, #1B7A3D 40%, #8BB617 100%)",
  accentColor:     "#8BB617",
  accentColorText: "#3d6b00",
  lightFill:       "rgba(139,182,23,0.12)",
  pillBg:          "#EAF5E4",
  pillText:        "#27500A",
  imageSrc:        "/images/programme-environnement-hub.jpg",
  iconName:        "Trees",
  axisIcons:       ["Map", "TreePine", "Mountain", "Trees", "Wind", "Droplets", "GlassWater", "CloudSun"],
  crossLinks: [
    { slug: "paix",          iconName: "HeartHandshake", accentColor: "#1565C0", accentColorText: "#1565C0", lightFill: "#E8F0FE" },
    { slug: "developpement", iconName: "Sprout",         accentColor: "#1B7A3D", accentColorText: "#1B7A3D", lightFill: "#EAF5E4" },
  ],
};

export default function EnvironnementPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProgrammeLayout {...config} />
      </main>
      <Footer />
    </>
  );
}
