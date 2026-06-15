import Navbar       from "@/components/sections/Navbar";
import Hero         from "@/components/sections/Hero";
import Mission      from "@/components/sections/Mission";
import Programs     from "@/components/sections/Programs";
import Testimonials from "@/components/sections/Testimonials";
import News         from "@/components/sections/News";
import CtaBand      from "@/components/sections/CtaBand";
import Partners     from "@/components/sections/Partners";
import Footer       from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero is sticky so Mission "rises" over it on scroll */}
        <Hero />
        <Mission />
        <Programs />
        {/* Testimonials & News self-hide until real content is added (see components). */}
        <Testimonials />
        <News />
        <CtaBand />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
