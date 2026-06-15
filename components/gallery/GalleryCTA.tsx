"use client";
import Link       from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

export default function GalleryCTA() {
  const { t } = useLang();
  const g     = t.gallery;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "#0D3B6F" }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 px-5 sm:px-8 py-4 sm:py-5">
        <p
          className="text-[13px] text-center sm:text-left"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {g.ctaText}
        </p>

        <div className="flex items-center justify-center gap-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[#1565C0] text-white font-medium hover:opacity-90 transition-opacity"
            style={{ fontSize: 12, padding: "8px 18px" }}
          >
            {g.ctaBtn1}
          </Link>
          <Link
            href="/programmes"
            className="inline-flex items-center justify-center rounded-md text-white font-medium hover:bg-white/10 transition-colors"
            style={{ fontSize: 12, padding: "8px 18px", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            {g.ctaBtn2}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
