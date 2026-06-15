"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { useLang } from "@/lib/i18n/context";

export default function Testimonials() {
  const { t }  = useLang();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /* Hidden until real testimonials are added (auto-reappears when populated). */
  if (t.testimonials.items.length === 0) return null;

  return (
    <section id="temoignages" className="pt-16 md:pt-20 pb-20 md:pb-28 bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-2 mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1B7A3D] mb-3">
            {t.testimonials.overline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B6F] tracking-tight">
            {t.testimonials.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex justify-center"
        >
          <CircularTestimonials
            testimonials={t.testimonials.items.map((item) => ({ ...item }))}
            autoplay
            colors={{
              name:                "#0D3B6F",
              designation:         "#1B7A3D",
              testimony:           "#2C2C2A",
              arrowBackground:     "#1565C0",
              arrowForeground:     "#FFFFFF",
              arrowHoverBackground:"#0D3B6F",
            }}
            fontSizes={{ name: "24px", designation: "16px", quote: "18px" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
