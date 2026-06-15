"use client";
import { useRef }                   from "react";
import Image                        from "next/image";
import { motion, useInView }        from "framer-motion";
import { Shield, Heart, Cloud, TreePine } from "lucide-react";
import { useLang }                  from "@/lib/i18n/context";

/* Icon and accent colour per challenge (matches spec order) */
const CHALLENGE_ICONS  = [Shield, Heart, Cloud, TreePine] as const;
const CHALLENGE_COLORS = ["#1565C0", "#1B7A3D", "#1565C0", "#1B7A3D"] as const;

export default function AboutMission() {
  const { t } = useLang();
  const at    = t.about;

  /* Statement section */
  const stmtRef    = useRef(null);
  const stmtInView = useInView(stmtRef, { once: true, amount: 0.3 });

  /* Challenges section */
  const challRef    = useRef(null);
  const challInView = useInView(challRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Part A — Mission statement ── */}
      <section className="py-20 md:py-28 bg-[#F5F5F3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            ref={stmtRef}
            initial={{ opacity: 0, y: 20 }}
            animate={stmtInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[#2C2C2A]"
            style={{
              fontFamily: "'Merriweather', serif",
              fontSize:   "clamp(17px, 2vw, 20px)",
              lineHeight: "1.9",
              fontStyle:  "italic",
            }}
          >
            {at.mission.statement}
          </motion.p>
        </div>
      </section>

      {/* ── Part B — Challenges ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative h-[340px] md:h-[480px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/about-mission.jpg"
                alt="Membres d'une communauté au Burundi"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Right — challenges text */}
            <div ref={challRef}>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={challInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1B7A3D] mb-4"
              >
                {at.mission.challengesLabel}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={challInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-bold text-[#0D3B6F] tracking-tight mb-5"
              >
                {at.mission.challengesTitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={challInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                className="text-[#2C2C2A]/70 text-base leading-relaxed mb-10"
              >
                {at.mission.challengesSub}
              </motion.p>

              {/* 2×2 challenge grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {at.mission.challenges.map((challenge, i) => {
                  const Icon  = CHALLENGE_ICONS[i];
                  const color = CHALLENGE_COLORS[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={challInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.18 + i * 0.1, ease: "easeOut" }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: `${color}18` }}
                      >
                        <Icon size={18} style={{ color }} strokeWidth={1.8} />
                      </div>
                      <p className="text-sm md:text-base text-[#2C2C2A] leading-snug pt-1.5">
                        {challenge.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
