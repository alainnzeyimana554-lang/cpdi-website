"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

export default function Hero() {
  const { t } = useLang();

  return (
    /*
      Scroll-curtain effect:
      • This outer div is exactly 100dvh tall — it defines how far the user scrolls
        before the Hero is fully "consumed" and Mission takes over.
      • The inner <section> is sticky so it stays pinned while the user scrolls through
        the wrapper. Mission (z-10 + opaque bg) comes right after and slides up over it.
      • Once Mission fills the viewport, the sticky hero is released and gone.
    */
    <div className="relative h-[100dvh]">
    <section
      id="accueil"
      className="sticky top-0 z-0 h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Section héro"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{
          backgroundImage: "url('/images/hero-cpdi.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 60%, rgba(13,59,111,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Full official name — styled as subtitle, not a tag */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white/90 text-sm sm:text-base font-semibold tracking-wide uppercase mb-5"
        >
          {t.hero.label}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          {t.hero.headline1}{" "}
          <span className="text-[#8BB617]">{t.hero.headline2}</span>
          <br className="hidden sm:block" />
          <span className="block mt-1">{t.hero.headline3}</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#programmes"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#1565C0] text-white font-semibold text-base hover:bg-[#0D3B6F] transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto"
          >
            {t.hero.cta1}
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border-2 border-white/70 text-white font-semibold text-base hover:bg-white/10 transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">{t.hero.scroll}</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
    </div>
  );
}
