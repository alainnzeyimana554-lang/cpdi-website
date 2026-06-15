import type { Metadata } from "next";
import Navbar             from "@/components/sections/Navbar";
import Footer             from "@/components/sections/Footer";
import ProgrammeLayout, { type ProgrammeLayoutProps } from "@/components/sections/programmes/ProgrammeLayout";

export const metadata: Metadata = {
  title:       "Programme Paix | C.P.D.I. Burundi",
  description: "Construction et consolidation de la paix — 6 axes d'intervention du C.P.D.I. pour prévenir les conflits et promouvoir la coexistence pacifique au Burundi.",
};

const config: ProgrammeLayoutProps = {
  programmeKey:    "paix",
  gradient:        "linear-gradient(135deg, #0D3B6F 0%, #1565C0 60%, #1B7A3D 100%)",
  accentColor:     "#1565C0",
  accentColorText: "#1565C0",
  lightFill:       "#E8F0FE",
  pillBg:          "#E8F0FE",
  pillText:        "#0D3B6F",
  imageSrc:        "/images/programme-paix-hub.jpg",
  iconName:        "HeartHandshake",
  axisIcons:       ["ShieldCheck", "BookOpen", "Users", "Heart", "Landmark", "ShieldAlert"],
  crossLinks: [
    { slug: "developpement", iconName: "Sprout", accentColor: "#1B7A3D", accentColorText: "#1B7A3D", lightFill: "#EAF5E4" },
    { slug: "environnement", iconName: "Trees",  accentColor: "#8BB617", accentColorText: "#3d6b00", lightFill: "rgba(139,182,23,0.12)" },
  ],
};

export default function PaixPage() {
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
