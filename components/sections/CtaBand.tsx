"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

/*
  Word-by-word fade-in using Framer Motion staggerChildren.
  Each word: opacity 0→1, translateY 8px→0, 400ms ease-out.
  Stagger: 90ms between words.
  Triggers once when section enters the viewport.
*/
const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function CtaBand() {
  const { t }  = useLang();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: "linear-gradient(135deg, #0D3B6F 0%, #1565C0 60%, #1B7A3D 100%)",
      }}
      aria-label="Appel à l'action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* ── Headline: word-by-word fade-in ── */}
          <motion.h2
            variants={headlineContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
          >
            {t.cta.words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className={`inline-block mr-[0.3em] ${
                  word.accent ? "text-[#8BB617]" : "text-white"
                }`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h2>

          {/* ── Subtitle ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-10"
          >
            {t.cta.subtitle}
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-[#0D3B6F] font-bold text-sm hover:bg-[#E8F0FE] transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto shadow-sm"
            >
              {t.cta.btn1}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white/70 text-white font-bold text-sm hover:bg-white/10 transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto"
            >
              {t.cta.btn2}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
