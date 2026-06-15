import type { Metadata } from "next";
import Navbar             from "@/components/sections/Navbar";
import Footer             from "@/components/sections/Footer";
import ProgrammeLayout, { type ProgrammeLayoutProps } from "@/components/sections/programmes/ProgrammeLayout";

export const metadata: Metadata = {
  title:       "Programme Développement | C.P.D.I. Burundi",
  description: "Appui aux moyens d'existence et développement durable — 7 axes d'intervention du C.P.D.I. pour renforcer l'autonomie économique des communautés rurales du Burundi.",
};

const config: ProgrammeLayoutProps = {
  programmeKey:    "developpement",
  gradient:        "linear-gradient(135deg, #0D3B6F 0%, #1B7A3D 60%, #8BB617 100%)",
  accentColor:     "#1B7A3D",
  accentColorText: "#1B7A3D",
  lightFill:       "#EAF5E4",
  pillBg:          "#EAF5E4",
  pillText:        "#27500A",
  imageSrc:        "/images/programme-developpement-hub.jpg",
  iconName:        "Sprout",
  axisIcons:       ["Wheat", "Scale", "PiggyBank", "Briefcase", "GraduationCap", "Zap", "Monitor"],
  crossLinks: [
    { slug: "paix",          iconName: "HeartHandshake", accentColor: "#1565C0", accentColorText: "#1565C0", lightFill: "#E8F0FE" },
    { slug: "environnement", iconName: "Trees",          accentColor: "#8BB617", accentColorText: "#3d6b00", lightFill: "rgba(139,182,23,0.12)" },
  ],
};

export default function DeveloppementPage() {
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
