import type { Metadata }   from "next";
import Navbar               from "@/components/sections/Navbar";
import Footer               from "@/components/sections/Footer";
import ContactClient        from "@/components/sections/contact/ContactClient";

export const metadata: Metadata = {
  title:       "Contact | C.P.D.I. Burundi",
  description: "Contactez le Centre pour la Paix et le Développement Intégré (C.P.D.I.) au Burundi. Bureaux à Gitega (siège) et Bujumbura (liaison). Email, téléphone et formulaire de contact.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactClient />
      </main>
      <Footer />
    </>
  );
}
