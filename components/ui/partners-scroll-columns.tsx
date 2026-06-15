"use client";
import React from "react";
import { motion } from "framer-motion";

export interface PartnerItem {
  name: string;
  type: string;
  icon: React.ReactNode;
}

export const PartnersColumn = ({
  partners,
  duration = 12,
  className,
}: {
  partners: PartnerItem[];
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease:       "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-8 pb-8"
      >
        {[...Array(2)].map((_, copyIndex) => (
          <React.Fragment key={copyIndex}>
            {partners.map((partner, i) => (
              /* No card — just icon + name + type floating cleanly */
              <div
                key={`${copyIndex}-${i}`}
                className="flex flex-col items-center gap-2 py-2 group"
              >
                {/* Icon — grayscale by default, full color on hover */}
                <div className="text-gray-300 group-hover:text-[#1565C0] transition-colors duration-300">
                  {partner.icon}
                </div>
                <span className="text-sm font-semibold text-[#0D3B6F] text-center leading-snug">
                  {partner.name}
                </span>
                <span className="text-xs text-[#2C2C2A]/40 text-center leading-snug">
                  {partner.type}
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
