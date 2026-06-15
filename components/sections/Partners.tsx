"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe, Building2, Heart, Landmark, Users, BookOpen,
  Sprout, Shield, Network,
} from "lucide-react";
import { PartnersColumn, type PartnerItem } from "@/components/ui/partners-scroll-columns";
import { useLang } from "@/lib/i18n/context";

const ICONS = [Globe, Building2, Heart, Landmark, Users, BookOpen, Sprout, Shield, Network];

export default function Partners() {
  const { t }       = useLang();
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  /* Hidden until real partners are added (auto-reappears when populated). */
  if (t.partners.items.length === 0) return null;

  const partners: PartnerItem[] = t.partners.items.map((item, i) => ({
    name: item.name,
    type: item.type,
    icon: (() => {
      const Icon = ICONS[i % ICONS.length];
      return <Icon size={26} strokeWidth={1.5} />;
    })(),
  }));

  // Split into 3 columns
  const col1 = partners.filter((_, i) => i % 3 === 0);
  const col2 = partners.filter((_, i) => i % 3 === 1);
  const col3 = partners.filter((_, i) => i % 3 === 2);

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1B7A3D] mb-3">
            {t.partners.overline}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0D3B6F] tracking-tight">
            {t.partners.title}
          </h2>
        </motion.div>

        {/* Scrolling columns with gradient mask */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[480px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Column 1 — speed: slow */}
            <PartnersColumn partners={col1.length ? col1 : partners.slice(0, 3)} duration={14} />
            {/* Column 2 — speed: medium (hidden on mobile) */}
            <PartnersColumn
              partners={col2.length ? col2 : partners.slice(3, 6)}
              duration={10}
              className="hidden sm:block"
            />
            {/* Column 3 — speed: fast (desktop only) */}
            <PartnersColumn
              partners={col3.length ? col3 : partners.slice(6, 9)}
              duration={18}
              className="hidden lg:block"
            />
          </div>
        </motion.div>

        {/* Legal note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-gray-400 tracking-wide mt-8"
        >
          {t.partners.legal}
        </motion.p>
      </div>
    </section>
  );
}
