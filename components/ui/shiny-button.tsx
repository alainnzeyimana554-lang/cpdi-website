"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  onClick,
  type = "button",
  disabled,
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 5,
        mass: 0.5,
      }}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow",
        className
      )}
    >
      {/* Shimmer overlay — purely CSS animated */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.2s linear infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <span className="relative block size-full text-sm uppercase tracking-wide font-semibold">
        {children}
      </span>
    </motion.button>
  );
};

export default ShinyButton;
