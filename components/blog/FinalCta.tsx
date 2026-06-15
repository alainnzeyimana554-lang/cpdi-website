"use client";
import Link       from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

export default function FinalCta() {
  const { t } = useLang();
  const b     = t.blog;
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "#0D3B6F" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-9 md:py-12 text-center">
        <h2 className="text-[18px] font-medium text-white mb-2">
          {b.finalCtaTitle}
        </h2>
        <p className="text-[13px] text-white/60 leading-relaxed mb-4">
          {b.finalCtaSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-[#1565C0] text-white text-[13px] font-medium hover:bg-[#0D3B6F] hover:ring-1 hover:ring-white/30 transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
          >
            {b.finalCtaBtn1}
          </Link>
          <Link
            href="/programmes"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md text-white text-[13px] font-medium hover:bg-white/10 transition-colors duration-200 active:scale-[0.98] w-full sm:w-auto"
            style={{ border: "1px solid rgba(255,255,255,0.4)" }}
          >
            {b.finalCtaBtn2}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
