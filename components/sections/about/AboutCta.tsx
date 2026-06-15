"use client";
import { useRef }            from "react";
import Link                  from "next/link";
import { motion, useInView } from "framer-motion";
import { useLang }           from "@/lib/i18n/context";

export default function AboutCta() {
  const { t } = useLang();
  const at    = t.about;

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background:
          "linear-gradient(135deg, #1B7A3D 0%, #1565C0 55%, #0D3B6F 100%)",
      }}
      aria-label="Appel à l'action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
          >
            {at.cta.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {at.cta.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-[#0D3B6F] font-bold text-sm hover:bg-[#E8F0FE] transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto shadow-sm"
            >
              {at.cta.btn1}
            </Link>
            <Link
              href="/#programmes"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white/70 text-white font-bold text-sm hover:bg-white/10 transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto"
            >
              {at.cta.btn2}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
