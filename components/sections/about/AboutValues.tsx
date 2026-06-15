"use client";
import { useState }                                          from "react";
import { motion, AnimatePresence }                           from "framer-motion";
import { Wrench, Heart, Scale, HandHeart, Users, ChevronRight } from "lucide-react";
import { useLang }                                           from "@/lib/i18n/context";

const PILLAR_CONFIG = [
  { Icon: Wrench,    bg: "#E8F0FE", color: "#1565C0" },
  { Icon: Heart,     bg: "#EAF5E4", color: "#1B7A3D" },
  { Icon: Scale,     bg: "#E8F0FE", color: "#1565C0" },
  { Icon: HandHeart, bg: "#EAF5E4", color: "#1B7A3D" },
  { Icon: Users,     bg: "#E8F0FE", color: "#1565C0" },
] as const;

export default function AboutValues() {
  const { t }   = useLang();
  const at      = t.about;
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Title block ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-2 mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#1B7A3D]">
            {at.values.overline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B6F] tracking-tight">
            {at.values.title}
          </h2>
        </motion.div>

        {/* ── Desktop: expanding flex pillars (lg+) ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="hidden lg:flex gap-3"
          style={{ height: 340 }}
        >
          {at.values.items.map((value, i) => {
            const { Icon, bg, color } = PILLAR_CONFIG[i];
            const isActive            = active === i;

            return (
              <div
                key={value.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  flex:            isActive ? 3 : 1,
                  backgroundColor: bg,
                  transition:      "flex 0.35s cubic-bezier(0.4,0,0.2,1)",
                  borderRadius:    16,
                  overflow:        "hidden",
                  position:        "relative",
                  cursor:          "default",
                }}
              >
                {/* ─ Collapsed view ─ */}
                <div
                  style={{
                    position:       "absolute",
                    inset:          0,
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            16,
                    padding:        "1.25rem",
                    opacity:        isActive ? 0 : 1,
                    transition:     "opacity 0.15s ease",
                    pointerEvents:  isActive ? "none" : "auto",
                  }}
                >
                  <div
                    style={{
                      width:           48,
                      height:          48,
                      borderRadius:    12,
                      backgroundColor: `${color}22`,
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      flexShrink:      0,
                    }}
                  >
                    <Icon size={22} style={{ color }} strokeWidth={1.8} />
                  </div>
                  <p
                    style={{
                      color,
                      fontSize:    "0.8125rem",
                      fontWeight:  700,
                      writingMode: "vertical-rl",
                      transform:   "rotate(180deg)",
                      whiteSpace:  "nowrap",
                      lineHeight:  1.3,
                    }}
                  >
                    {value.name}
                  </p>
                </div>

                {/* ─ Expanded view ─ */}
                <div
                  style={{
                    position:       "absolute",
                    inset:          0,
                    display:        "flex",
                    flexDirection:  "column",
                    alignItems:     "center",
                    justifyContent: "center",
                    gap:            18,
                    padding:        "2rem 1.5rem",
                    textAlign:      "center",
                    opacity:        isActive ? 1 : 0,
                    transition:     `opacity 0.22s ease ${isActive ? "0.18s" : "0s"}`,
                    pointerEvents:  isActive ? "auto" : "none",
                  }}
                >
                  <div
                    style={{
                      width:           64,
                      height:          64,
                      borderRadius:    16,
                      backgroundColor: `${color}22`,
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      flexShrink:      0,
                    }}
                  >
                    <Icon size={30} style={{ color }} strokeWidth={1.5} />
                  </div>
                  <p
                    style={{
                      color:      "#0D3B6F",
                      fontSize:   "1.125rem",
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    {value.name}
                  </p>
                  <p
                    style={{
                      color:      "#2C2C2A",
                      opacity:    0.72,
                      fontSize:   "0.875rem",
                      lineHeight: 1.7,
                      fontStyle:  "italic",
                      fontFamily: "'Merriweather', Georgia, serif",
                      maxWidth:   220,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── Mobile: tap accordion (< lg) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="lg:hidden space-y-3"
        >
          {at.values.items.map((value, i) => {
            const { Icon, bg, color } = PILLAR_CONFIG[i];
            const isOpen              = active === i;

            return (
              <div
                key={value.name}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: bg }}
              >
                {/* Header button */}
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width:           40,
                      height:          40,
                      backgroundColor: `${color}22`,
                    }}
                  >
                    <Icon size={20} style={{ color }} strokeWidth={1.8} />
                  </div>
                  <span
                    className="flex-1 font-bold text-base"
                    style={{ color: "#0D3B6F" }}
                  >
                    {value.name}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex-shrink-0"
                  >
                    <ChevronRight size={18} style={{ color }} />
                  </motion.div>
                </button>

                {/* Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="px-5 pb-5 text-sm leading-relaxed"
                        style={{
                          color:      "#2C2C2A",
                          opacity:    0.78,
                          fontStyle:  "italic",
                          fontFamily: "'Merriweather', Georgia, serif",
                        }}
                      >
                        {value.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
