"use client";
import Image      from "next/image";
import Link       from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown, ChevronRight, ArrowRight,
  HeartHandshake, Sprout, Trees, Microscope,
} from "lucide-react";
import { useLang } from "@/lib/i18n/context";

/* ── Shared fade settings ───────────────────────────────── */
const FADE_INITIAL    = { opacity: 0 };
const FADE_WHILE      = { opacity: 1 };
const FADE_VIEWPORT   = { once: true, amount: 0.15 } as const;
const FADE_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

/* ── Cycle pill ─────────────────────────────────────────── */
function Pill({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      className="px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}

/* ── Timeline node wrapper (static dot, fading content) ─── */
function TimelineNode({
  dotColor,
  dotSize = 14,
  className = "",
  children,
}: {
  dotColor:  string;
  dotSize?:  number;
  className?: string;
  children:  React.ReactNode;
}) {
  // Line sits at left-4 (16px). Dot centered on line: left = 16 - dotSize/2.
  const dotLeft = 16 - dotSize / 2;

  return (
    <div className={`relative pl-12 md:pl-16 ${className}`}>
      <div
        className="absolute top-6 border-white"
        style={{
          left:            dotLeft,
          width:           dotSize,
          height:          dotSize,
          borderRadius:    "50%",
          backgroundColor: dotColor,
          borderWidth:     dotSize >= 18 ? 3 : 2,
          borderStyle:     "solid",
          borderColor:     "white",
          zIndex:          1,
        }}
        aria-hidden="true"
      />
      <motion.div
        initial={FADE_INITIAL}
        whileInView={FADE_WHILE}
        viewport={FADE_VIEWPORT}
        transition={FADE_TRANSITION}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Hub programme card (static) ────────────────────────── */
interface HubCardProps {
  num:           number;
  imageSrc:      string;
  imageGradient: string;
  badgeBg:       string;
  Icon:          React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  iconColor:     string;
  titleColor:    string;
  title:         string;
  subtitle?:     string;
  description:   string;
  tags:          { label: string; bg: string; color: string }[];
  ctaColor:      string;
  ctaHref:       string;
  ctaLabel:      string;
}

function HubCard({
  num, imageSrc, imageGradient, badgeBg, Icon, iconColor,
  titleColor, title, subtitle, description, tags, ctaColor, ctaHref, ctaLabel,
}: HubCardProps) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
    >
      {/* Image area */}
      <div className="relative h-[180px] md:h-[200px]" style={{ background: imageGradient }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Icon size={80} strokeWidth={1} style={{ color: iconColor, opacity: 0.35 }} />
        </div>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 560px"
        />
        <span
          className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs text-white font-medium z-10"
          style={{ backgroundColor: badgeBg }}
        >
          Programme {num}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2
          className="text-xl md:text-[22px] font-semibold leading-snug mb-1"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#2C2C2A]/50 mb-3">{subtitle}</p>
        )}
        <p className="text-[15px] text-[#2C2C2A] leading-relaxed mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: tag.bg, color: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1.5 text-[15px] font-medium transition-all duration-200 group"
          style={{ color: ctaColor }}
        >
          {ctaLabel}
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/* ── Main hub component ─────────────────────────────────── */
export default function ProgrammesHub() {
  const { t } = useLang();
  const hub   = t.programmesHub;
  return (
    <>
      {/* ══ SECTION 1 — HERO ════════════════════════════════ */}
      <section
        className="relative min-h-[58vh] flex flex-col items-center justify-between text-center py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: "#0D3B6F" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 90%, rgba(255,255,255,0.035) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="relative z-10 flex flex-col items-center justify-center flex-1 max-w-2xl mx-auto px-4 gap-5"
        >
          <span className="text-xs font-semibold tracking-[3px] uppercase text-white/40">
            {hub.heroLabel}
          </span>

          <h1 className="text-3xl md:text-[48px] font-semibold text-white leading-tight tracking-tight">
            {hub.heroTitle}
          </h1>

          <p className="text-base text-white/55 max-w-[440px] leading-relaxed">
            {hub.heroSub}
          </p>
        </motion.div>

        {/* Scroll indicator (static) */}
        <div
          className="relative z-10 flex flex-col items-center gap-1 pb-2"
          aria-hidden="true"
        >
          <div className="w-px h-8 bg-white/25" />
          <ChevronDown size={16} className="text-white/30" />
        </div>
      </section>

      {/* ══ SECTIONS 2-6 — TIMELINE ═════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#F5F5F3]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="relative">

            {/* Static gradient vertical line */}
            <div
              className="absolute left-4 top-6 bottom-6 w-0.5 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, #1565C0, #1B7A3D 50%, #8BB617)",
              }}
              aria-hidden="true"
            />

            {/* ── Node: Notre approche ── */}
            <TimelineNode dotColor="#1565C0" dotSize={14} className="mb-20">
              <h3 className="text-lg font-semibold text-[#0D3B6F] mb-3">
                {hub.approachTitle}
              </h3>
              <p className="text-[15px] text-[#2C2C2A] leading-relaxed mb-5">
                {hub.approachText}
              </p>

              {/* Cycle pills */}
              <div className="rounded-xl border border-gray-200/70 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill label={t.blog.filterPaix} bg="#E8F0FE"               color="#0D3B6F" />
                  <ChevronRight size={14} className="text-gray-400 shrink-0" />
                  <Pill label={t.blog.filterDev}  bg="#EAF5E4"               color="#1B7A3D" />
                  <ChevronRight size={14} className="text-gray-400 shrink-0" />
                  <Pill label={t.blog.filterEnv}  bg="rgba(139,182,23,0.15)" color="#3d6b00" />
                  <ChevronRight size={14} className="text-gray-400 shrink-0" />
                  <Pill label={t.blog.filterPaix} bg="#E8F0FE"               color="#0D3B6F" />
                </div>
              </div>
            </TimelineNode>

            {/* ── Node: Programme 1 — Paix ── */}
            <TimelineNode dotColor="#1565C0" dotSize={18} className="mb-20">
              <HubCard
                num={1}
                imageSrc="/images/programme-paix-hub.jpg"
                imageGradient="linear-gradient(135deg, #E8F0FE, #d0e3f7)"
                badgeBg="rgba(21,101,192,0.9)"
                Icon={HeartHandshake}
                iconColor="#1565C0"
                titleColor="#0D3B6F"
                title={hub.cards[0].title}
                description={hub.cards[0].description}
                tags={hub.cards[0].tags.map((label, i) => ({
                  label,
                  bg:    "#E8F0FE",
                  color: i === hub.cards[0].tags.length - 1 ? "#1565C0" : "#0D3B6F",
                }))}
                ctaColor="#1565C0"
                ctaHref="/programmes/paix"
                ctaLabel={hub.cards[0].cta}
              />
            </TimelineNode>

            {/* ── Node: Programme 2 — Développement ── */}
            <TimelineNode dotColor="#1B7A3D" dotSize={18} className="mb-20">
              <HubCard
                num={2}
                imageSrc="/images/programme-developpement-hub.jpg"
                imageGradient="linear-gradient(135deg, #EAF5E4, #c8e6b4)"
                badgeBg="rgba(27,122,61,0.9)"
                Icon={Sprout}
                iconColor="#1B7A3D"
                titleColor="#1B7A3D"
                title={hub.cards[1].title}
                description={hub.cards[1].description}
                tags={hub.cards[1].tags.map((label) => ({
                  label,
                  bg:    "#EAF5E4",
                  color: "#1B7A3D",
                }))}
                ctaColor="#1B7A3D"
                ctaHref="/programmes/developpement"
                ctaLabel={hub.cards[1].cta}
              />
            </TimelineNode>

            {/* ── Node: Programme 3 — Environnement ── */}
            <TimelineNode dotColor="#8BB617" dotSize={18} className="mb-20">
              <HubCard
                num={3}
                imageSrc="/images/programme-environnement-hub.jpg"
                imageGradient="linear-gradient(135deg, rgba(139,182,23,0.15), rgba(139,182,23,0.28))"
                badgeBg="rgba(109,148,0,0.9)"
                Icon={Trees}
                iconColor="#8BB617"
                titleColor="#3d6b00"
                title={hub.cards[2].title}
                subtitle={hub.cards[2].subtitle}
                description={hub.cards[2].description}
                tags={hub.cards[2].tags.map((label) => ({
                  label,
                  bg:    "rgba(139,182,23,0.12)",
                  color: "#3d6b00",
                }))}
                ctaColor="#3d6b00"
                ctaHref="/programmes/environnement"
                ctaLabel={hub.cards[2].cta}
              />
            </TimelineNode>

            {/* ── Node: Volet Recherche ── */}
            <TimelineNode dotColor="#8BB617" dotSize={14} className="mb-4">
              <div
                className="bg-white rounded-lg p-5"
                style={{ borderLeft: "2px solid #8BB617" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Microscope size={16} strokeWidth={1.8} style={{ color: "#8BB617" }} />
                  <h3 className="text-[15px] font-semibold text-[#0D3B6F]">
                    {hub.researchTitle}
                  </h3>
                </div>
                <p className="text-sm text-[#2C2C2A]/70 leading-relaxed">
                  {hub.researchText}
                </p>
              </div>
            </TimelineNode>

          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — CTA ═════════════════════════════════ */}
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#0D3B6F" }}
      >
        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="max-w-xl mx-auto px-4 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            {hub.ctaTitle}
          </h2>
          <p className="text-base text-white/55 mb-8 leading-relaxed">
            {hub.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-lg text-white font-semibold text-base transition-opacity duration-200 hover:opacity-90 text-center"
              style={{ backgroundColor: "#1B7A3D" }}
            >
              {hub.ctaBtn1}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-lg text-white/80 font-semibold text-base border transition-colors duration-200 hover:text-white hover:border-white/50 text-center"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              {hub.ctaBtn2}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
