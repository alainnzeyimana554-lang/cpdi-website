/* The site root layout (app/layout.tsx) already provides <html>/<body>.
   Next.js App Router allows only one root layout, so this segment layout
   must NOT emit its own <html>/<body>. The Studio renders full-screen and
   the site Navbar/Footer are added per-page (not in the root layout), so
   the studio route stays clean of site chrome. */
export const metadata = {
  title: "C.P.D.I. — Administration",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
