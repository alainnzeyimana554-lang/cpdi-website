"use client";

import { useState, type FormEvent } from "react";
import Link                          from "next/link";
import { motion }                    from "framer-motion";
import { Mail, Phone, Building2, MapPin } from "lucide-react";
import { useLang }                   from "@/lib/i18n/context";

/* ── Shared fade-in (per project rules) ─────────────────── */
const FADE_INITIAL    = { opacity: 0 };
const FADE_WHILE      = { opacity: 1 };
const FADE_VIEWPORT   = { once: true, amount: 0.15 } as const;
const FADE_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

/* ── Contact form (state-driven, no backend) ────────────── */
function ContactForm() {
  const { t } = useLang();
  const c     = t.contact;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl p-6"
        style={{ backgroundColor: "#EAF5E4", color: "#1B7A3D" }}
      >
        <p className="text-[15px] leading-relaxed">
          {c.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1: name + email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-[13px] font-medium text-[#2C2C2A] mb-1.5"
          >
            {c.fieldName}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={c.fieldNamePh}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-[15px] text-[#2C2C2A] placeholder:text-gray-400 focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 transition-colors duration-150"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-[13px] font-medium text-[#2C2C2A] mb-1.5"
          >
            {c.fieldEmail}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={c.fieldEmailPh}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-[15px] text-[#2C2C2A] placeholder:text-gray-400 focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 transition-colors duration-150"
          />
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-[13px] font-medium text-[#2C2C2A] mb-1.5"
        >
          {c.fieldSubject}
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-[15px] text-[#2C2C2A] focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 transition-colors duration-150"
        >
          <option value="" disabled>{c.subjectPlaceholder}</option>
          <option value="partenariat">{c.subjectPartnership}</option>
          <option value="soutien">{c.subjectSupport}</option>
          <option value="info">{c.subjectInfo}</option>
          <option value="autre">{c.subjectOther}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-[13px] font-medium text-[#2C2C2A] mb-1.5"
        >
          {c.fieldMessage}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={c.fieldMessagePh}
          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-[15px] text-[#2C2C2A] placeholder:text-gray-400 focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-[#1565C0]/15 transition-colors duration-150 resize-y"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#1565C0] text-white font-semibold text-[15px] hover:bg-[#0D3B6F] transition-colors duration-200 active:scale-[0.98]"
      >
        {c.submit}
      </button>
    </form>
  );
}

/* ── Contact info row (icon + label + value) ────────────── */
function InfoRow({
  iconBg,
  iconColor,
  icon,
  label,
  value,
  href,
}: {
  iconBg:    string;
  iconColor: string;
  icon:      React.ReactNode;
  label:     string;
  value:     string;
  href?:     string;
}) {
  const valueEl = href ? (
    <a
      href={href}
      className="text-[14px] text-[#2C2C2A] hover:text-[#1565C0] transition-colors duration-150 break-words"
    >
      {value}
    </a>
  ) : (
    <span className="text-[14px] text-[#2C2C2A] break-words">{value}</span>
  );

  return (
    <div className="flex items-start gap-3">
      <span
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg, color: iconColor }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 flex flex-col">
        <span className="text-[12px] text-[#2C2C2A]/55">{label}</span>
        {valueEl}
      </div>
    </div>
  );
}

/* ── Office row ─────────────────────────────────────────── */
function OfficeRow({
  city,
  badge,
  badgeBg,
  badgeText,
  address,
}: {
  city:      string;
  badge:     string;
  badgeBg:   string;
  badgeText: string;
  address:   string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#EAF5E4", color: "#1B7A3D" }}
        aria-hidden="true"
      >
        <Building2 size={18} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-medium text-[#0D3B6F]">{city}</span>
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-medium"
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            {badge}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] text-[#2C2C2A]/65 leading-relaxed">{address}</p>
      </div>
    </div>
  );
}

/* ── Main client component ──────────────────────────────── */
export default function ContactClient() {
  const { t } = useLang();
  const c     = t.contact;
  return (
    <>
      {/* ══ SECTION 1 — HERO ════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundColor: "#0D3B6F",
          minHeight:       "clamp(200px, 28vh, 240px)",
        }}
      >
        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10"
        >
          <span
            className="block text-[14px] font-semibold uppercase mb-3"
            style={{ letterSpacing: "2px", color: "#8BB617" }}
          >
            {c.heroLabel}
          </span>
          <h1 className="text-3xl md:text-[42px] font-semibold text-white leading-tight tracking-tight">
            {c.heroTitle}
          </h1>
          <p className="mt-3 text-[16px] text-white/80 leading-relaxed max-w-[500px] mx-auto">
            {c.heroSubtitle}
          </p>
        </motion.div>
      </section>

      {/* ══ SECTION 2 — FORM + CONTACT INFO ═════════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">

            {/* Left column — Form (60%) */}
            <motion.div
              initial={FADE_INITIAL}
              whileInView={FADE_WHILE}
              viewport={FADE_VIEWPORT}
              transition={FADE_TRANSITION}
              className="md:col-span-3"
            >
              <span
                className="block text-[14px] font-semibold uppercase mb-6"
                style={{ letterSpacing: "1px", color: "#1565C0" }}
              >
                {c.formLabel}
              </span>
              <ContactForm />
            </motion.div>

            {/* Right column — Info (40%) */}
            <motion.div
              initial={FADE_INITIAL}
              whileInView={FADE_WHILE}
              viewport={FADE_VIEWPORT}
              transition={FADE_TRANSITION}
              className="md:col-span-2"
            >
              {/* Coordonnées */}
              <span
                className="block text-[14px] font-semibold uppercase mb-6"
                style={{ letterSpacing: "1px", color: "#1565C0" }}
              >
                {c.coordsLabel}
              </span>
              <div className="space-y-4">
                <InfoRow
                  iconBg="#E8F0FE"
                  iconColor="#1565C0"
                  icon={<Mail size={18} strokeWidth={1.75} />}
                  label={c.emailLabel}
                  value="Cpdi64454@gmail.com"
                  href="mailto:Cpdi64454@gmail.com"
                />
                <InfoRow
                  iconBg="#E8F0FE"
                  iconColor="#1565C0"
                  icon={<Phone size={18} strokeWidth={1.75} />}
                  label={c.phoneLabel}
                  value="+257 69 255 276"
                  href="tel:+25769255276"
                />
              </div>

              {/* Divider */}
              <div className="my-6" style={{ height: 1, backgroundColor: "#E8F0FE" }} />

              {/* Bureaux */}
              <span
                className="block text-[14px] font-semibold uppercase mb-6"
                style={{ letterSpacing: "1px", color: "#1B7A3D" }}
              >
                {c.officesLabel}
              </span>
              <div className="space-y-5">
                <OfficeRow
                  city={c.gitega}
                  badge={c.gitegaBadge}
                  badgeBg="#E8F0FE"
                  badgeText="#0D3B6F"
                  address={c.gitegaAddress}
                />
                <OfficeRow
                  city={c.bujumbura}
                  badge={c.bujumburaBadge}
                  badgeBg="#EAF5E4"
                  badgeText="#1B7A3D"
                  address={c.bujumburaAddress}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — MAP ═════════════════════════════════ */}
      <section className="py-10 md:py-12" style={{ backgroundColor: "#F5F5F3" }}>
        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-sm bg-white"
            style={{ height: "var(--cpdi-map-h, 350px)" }}
          >
            {/* Responsive map height (mobile vs desktop) via inline style block */}
            <style>{`
              @media (max-width: 767px) {
                .cpdi-map-frame { height: 250px !important; }
              }
            `}</style>
            <iframe
              title="Carte des bureaux C.P.D.I. au Burundi"
              src="https://maps.google.com/maps?q=Burundi&z=8&ie=UTF8&iwloc=&output=embed"
              className="cpdi-map-frame w-full"
              style={{ height: 350, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* City markers row */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <span className="inline-flex items-center gap-2 text-[13px] text-[#2C2C2A]/75">
              <MapPin size={14} strokeWidth={1.75} style={{ color: "#1B7A3D" }} />
              {c.mapGitega}
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] text-[#2C2C2A]/75">
              <MapPin size={14} strokeWidth={1.75} style={{ color: "#1565C0" }} />
              {c.mapBujumbura}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ══ SECTION 4 — CTA BAND ════════════════════════════ */}
      <section
        className="py-12 md:py-14"
        style={{ backgroundColor: "#1B7A3D" }}
      >
        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            {c.ctaTitle}
          </h2>
          <p className="text-[15px] text-white/80 mb-8 leading-relaxed">
            {c.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/programmes"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-7 py-3 rounded-lg bg-[#1565C0] text-white font-semibold text-[15px] hover:bg-[#0D3B6F] transition-colors duration-200"
            >
              {c.ctaBtn1}
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-7 py-3 rounded-lg border border-white/70 text-white font-semibold text-[15px] hover:bg-white/10 transition-colors duration-200"
            >
              {c.ctaBtn2}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
