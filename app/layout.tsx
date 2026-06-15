import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title:       "C.P.D.I. — Centre pour la Paix et le Développement Intégré",
  description: "Association sans but lucratif basée au Burundi, œuvrant pour la paix durable, le développement économique et la gestion responsable des ressources naturelles depuis 2014.",
  keywords:    ["paix", "développement", "Burundi", "environnement", "CPDI"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
