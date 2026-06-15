"use client";
import { useRef }            from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLang }           from "@/lib/i18n/context";

export default function AboutOffices() {
  const { t } = useLang();
  const at    = t.about;

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 bg-[#0D3B6F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >

          {/* ── Left — stylised map visual ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#0B2E5A" }}
          >
            {/* Dot-grid background suggesting a map */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
              aria-hidden="true"
            />

            {/* Rough Burundi outline shape */}
            <svg
              viewBox="0 0 300 360"
              className="absolute inset-0 w-full h-full opacity-[0.08]"
              aria-hidden="true"
            >
              <path
                d="M130 40 L185 28 L232 68 L252 122 L242 182 L222 234 L192 272 L162 302 L128 282 L98 252 L78 198 L68 148 L88 98 Z"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              />
            </svg>

            {/* Bujumbura — northwest */}
            <div className="absolute top-[26%] left-[20%] flex flex-col items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: "#8BB617",
                  boxShadow: "0 0 10px 2px rgba(139,182,23,0.5)",
                }}
              />
              <span className="text-white/65 text-[11px] font-medium tracking-wide whitespace-nowrap">
                Bujumbura
              </span>
            </div>

            {/* Gitega — centre (siège) */}
            <div className="absolute top-[50%] left-[54%] flex flex-col items-center gap-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{
                  backgroundColor: "#1565C0",
                  boxShadow: "0 0 10px 2px rgba(21,101,192,0.6)",
                }}
              />
              <span className="text-white/65 text-[11px] font-medium tracking-wide whitespace-nowrap">
                Gitega ★
              </span>
            </div>

            {/* Dashed connector line between the two cities */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <line
                x1="25%" y1="30%"
                x2="57%" y2="53%"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1.5"
                strokeDasharray="5,4"
              />
            </svg>

            {/* Country label */}
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <span className="text-white/30 text-xs tracking-widest uppercase">
                Burundi
              </span>
            </div>
          </motion.div>

          {/* ── Right — addresses ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
              {at.offices.title}
            </h2>

            {/* Siège social */}
            <div className="mb-9">
              <div className="flex items-center gap-2.5 mb-3">
                <MapPin size={17} className="text-[#8BB617]" strokeWidth={2} />
                <span className="text-[#8BB617] font-semibold text-xs tracking-widest uppercase">
                  {at.offices.siegeTitle}
                </span>
              </div>
              <div className="pl-[26px] space-y-0.5">
                {at.offices.siegeAddress.map((line, i) => (
                  <p key={i} className="text-white/75 text-base leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Bureau de liaison */}
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-3">
                <MapPin size={17} className="text-[#1565C0]" strokeWidth={2} />
                <span className="text-[#6FA8DC] font-semibold text-xs tracking-widest uppercase">
                  {at.offices.liaisonTitle}
                </span>
              </div>
              <div className="pl-[26px] space-y-0.5">
                {at.offices.liaisonAddress.map((line, i) => (
                  <p key={i} className="text-white/75 text-base leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/10 mb-8" />

            {/* Contact info */}
            <div className="space-y-4">
              <a
                href={`mailto:${at.offices.contactEmail}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <Mail size={16} className="text-[#8BB617] flex-shrink-0" strokeWidth={2} />
                <span className="text-base group-hover:underline underline-offset-2">
                  {at.offices.contactEmail}
                </span>
              </a>
              <a
                href={`tel:${at.offices.contactTel.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200"
              >
                <Phone size={16} className="text-[#8BB617] flex-shrink-0" strokeWidth={2} />
                <span className="text-base">{at.offices.contactTel}</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
