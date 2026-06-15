"use client";
import { useRef }            from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck, Globe } from "lucide-react";
import { useLang }           from "@/lib/i18n/context";

/* Dot colour per timeline milestone */
const DOT_COLORS = ["#1565C0", "#1B7A3D", "#8BB617"] as const;

export default function AboutHistory() {
  const { t } = useLang();
  const at    = t.about;

  const timelineRef    = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 bg-[#F5F5F3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Label + title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1B7A3D] mb-3">
            {at.history.overline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B6F] tracking-tight">
            {at.history.title}
          </h2>
        </motion.div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-[#2C2C2A]/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-16"
        >
          {at.history.paragraph}
        </motion.p>

        {/* ── Horizontal timeline ── */}
        <div ref={timelineRef} className="relative mb-16">

          {/* Connecting gradient line */}
          <div
            className="absolute top-[14px] left-[calc(16%+12px)] right-[calc(16%+12px)] h-px"
            style={{
              background: "linear-gradient(90deg, #1565C0 0%, #1B7A3D 50%, #8BB617 100%)",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-3 gap-4">
            {at.history.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2, ease: "easeOut" }}
                className="flex flex-col items-center gap-4"
              >
                {/* Animated dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : {}}
                  transition={{
                    duration:  0.4,
                    delay:     i * 0.2 + 0.12,
                    type:      "spring",
                    stiffness: 220,
                    damping:   14,
                  }}
                  className="w-7 h-7 rounded-full border-4 border-white shadow-md flex-shrink-0 relative z-10"
                  style={{ backgroundColor: DOT_COLORS[i] }}
                />

                <div>
                  <p
                    className="font-bold text-base md:text-lg mb-1.5 leading-tight"
                    style={{ color: DOT_COLORS[i] }}
                  >
                    {item.year}
                  </p>
                  <p className="text-xs md:text-sm text-[#2C2C2A]/65 leading-snug max-w-[160px] mx-auto">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Info badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4"
        >
          {at.history.badges.map((badge, i) => {
            const Icon  = i === 0 ? BadgeCheck : Globe;
            const color = i === 0 ? "#1565C0"  : "#1B7A3D";
            return (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl px-6 py-4 border border-gray-100 shadow-sm text-left"
              >
                <div
                  className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: `${color}12` }}
                >
                  <Icon size={18} style={{ color }} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-bold text-[#0D3B6F] text-sm">{badge.title}</p>
                  <p className="text-xs text-[#2C2C2A]/55 mt-0.5 leading-snug">
                    {badge.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
