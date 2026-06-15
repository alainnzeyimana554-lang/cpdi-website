"use client";
import { useState, type FormEvent } from "react";
import { motion }                    from "framer-motion";
import { Mail }                      from "lucide-react";
import { useLang }                   from "@/lib/i18n/context";

export default function NewsletterCTA() {
  const { t }   = useLang();
  const b       = t.blog;
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      setEmail("");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: "#EAF5E4",
        borderTop:       "0.5px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-9 md:py-12 text-center">
        <Mail
          size={24}
          strokeWidth={1.75}
          aria-hidden="true"
          className="mx-auto mb-2.5"
          style={{ color: "#1B7A3D" }}
        />
        <h2 className="text-[18px] font-medium mb-2" style={{ color: "#1B7A3D" }}>
          {b.newsletterTitle}
        </h2>
        <p className="text-[13px] text-[#2C2C2A]/70 leading-relaxed mb-4 max-w-md mx-auto">
          {b.newsletterDesc}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col sm:flex-row gap-2 sm:gap-2.5"
          style={{ maxWidth: 400 }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {b.newsletterPlaceholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={b.newsletterPlaceholder}
            className="flex-1 px-3.5 text-[13px] text-[#2C2C2A] placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B7A3D]/20"
            style={{
              height:       40,
              border:       "0.5px solid rgba(0,0,0,0.18)",
              borderRadius: 6,
            }}
          />
          <button
            type="submit"
            className="text-white font-medium hover:opacity-95 transition-opacity duration-200 active:scale-[0.98]"
            style={{
              height:          40,
              padding:         "0 24px",
              backgroundColor: "#1B7A3D",
              borderRadius:    6,
              fontSize:        13,
            }}
          >
            {b.newsletterBtn}
          </button>
        </form>
      </div>
    </motion.section>
  );
}
