"use client";
import { useState }                              from "react";
import Image                                      from "next/image";
import Link                                       from "next/link";
import { motion }                                 from "framer-motion";
import {
  ChevronRight,
  HeartHandshake, Sprout, Trees,
  ShieldCheck, BookOpen, Users, Heart, Landmark, ShieldAlert,
  Wheat, Scale, PiggyBank, Briefcase, GraduationCap, Zap, Monitor,
  Map, TreePine, Mountain, Wind, Droplets, GlassWater, CloudSun,
} from "lucide-react";
import { useLang }                                from "@/lib/i18n/context";
import type { ProgrammeAxisText, ProgrammeCommonText } from "@/lib/i18n/translations/types";

/* ── Icon registry ──────────────────────────────────────── */
export type ProgrammeIconName =
  | "HeartHandshake" | "Sprout" | "Trees"
  | "ShieldCheck" | "BookOpen" | "Users" | "Heart" | "Landmark" | "ShieldAlert"
  | "Wheat" | "Scale" | "PiggyBank" | "Briefcase" | "GraduationCap" | "Zap" | "Monitor"
  | "Map" | "TreePine" | "Mountain" | "Wind" | "Droplets" | "GlassWater" | "CloudSun";

const ICON_MAP = {
  HeartHandshake, Sprout, Trees,
  ShieldCheck, BookOpen, Users, Heart, Landmark, ShieldAlert,
  Wheat, Scale, PiggyBank, Briefcase, GraduationCap, Zap, Monitor,
  Map, TreePine, Mountain, Wind, Droplets, GlassWater, CloudSun,
} as const;

function ProgrammeIcon({
  name,
  size,
  strokeWidth,
  style,
}: {
  name:         ProgrammeIconName;
  size?:        number;
  strokeWidth?: number;
  style?:       React.CSSProperties;
}) {
  const Icon = ICON_MAP[name];
  return <Icon size={size} strokeWidth={strokeWidth} style={style} />;
}

/* ── Types (visual config only — text comes from i18n) ──── */
export type ProgrammeKey = "paix" | "developpement" | "environnement";

export interface CrossLinkConfig {
  slug:            string;
  iconName:        ProgrammeIconName;
  accentColor:     string;
  accentColorText: string;
  lightFill:       string;
}

export interface ProgrammeLayoutProps {
  programmeKey:    ProgrammeKey;
  gradient:        string;
  accentColor:     string;
  accentColorText: string;
  lightFill:       string;
  pillBg:          string;
  pillText:        string;
  imageSrc:        string;
  iconName:        ProgrammeIconName;
  axisIcons:       ProgrammeIconName[];
  crossLinks:      CrossLinkConfig[];
}

/* Axis with its icon merged in (icon from config, text from i18n). */
type MergedAxis = ProgrammeAxisText & { iconName: ProgrammeIconName };

/* ── Shared fade settings ───────────────────────────────── */
const FADE_INITIAL    = { opacity: 0 };
const FADE_WHILE      = { opacity: 1 };
const FADE_VIEWPORT   = { once: true, amount: 0.15 } as const;
const FADE_TRANSITION = { duration: 0.5, ease: "easeOut" } as const;

/* ── Tabbed panel for Axes ──────────────────────────────── */
function ProgrammeTabs({
  items,
  accentColor,
  pillBg,
  pillText,
  common,
  axesLabel,
}: {
  items:       MergedAxis[];
  accentColor: string;
  pillBg:      string;
  pillText:    string;
  common:      ProgrammeCommonText;
  axesLabel:   string;
}) {
  const [active, setActive] = useState(0);
  const total   = items.length;
  const current = items[active];

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      {/* Hide native scrollbar on tab bar (Webkit + Firefox) */}
      <style>{`.cpdi-tab-scroll::-webkit-scrollbar{display:none}`}</style>

      {/* Tab bar */}
      <div
        className="cpdi-tab-scroll flex overflow-x-auto whitespace-nowrap"
        style={{
          borderBottom:           "2px solid rgba(0,0,0,0.08)",
          scrollbarWidth:         "none",
          msOverflowStyle:        "none",
          WebkitOverflowScrolling:"touch",
        }}
        role="tablist"
        aria-label={axesLabel}
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className="shrink-0 px-4 py-3 text-[14px] transition-colors duration-150"
              style={{
                color:        isActive ? accentColor : "rgba(44,44,42,0.55)",
                fontWeight:   isActive ? 500 : 400,
                borderBottom: `2px solid ${isActive ? accentColor : "transparent"}`,
                marginBottom: -2,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Panel (key change triggers fade) */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="py-8 md:py-10"
        role="tabpanel"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          {/* Icon box */}
          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: pillBg }}
          >
            <ProgrammeIcon
              name={current.iconName}
              size={28}
              strokeWidth={1.5}
              style={{ color: accentColor }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span
              className="block text-[11px] uppercase font-semibold mb-2"
              style={{ letterSpacing: "1.5px", color: accentColor }}
            >
              {`${common.axisWord} ${pad2(active + 1)} / ${pad2(total)}`}
            </span>
            <h3 className="text-[18px] font-medium text-[#0D3B6F] leading-snug mb-3">
              {current.label}
            </h3>
            <p className="text-[14px] text-[#2C2C2A]/75 leading-[1.7] mb-4">
              {current.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {current.pills.map((pill, j) => (
                <span
                  key={j}
                  className="text-[12px] whitespace-nowrap"
                  style={{
                    backgroundColor: pillBg,
                    color:           pillText,
                    padding:         "4px 12px",
                    borderRadius:    20,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation footer */}
      <div
        className="flex items-center justify-between pt-4"
        style={{ borderTop: "0.5px solid rgba(0,0,0,0.1)" }}
      >
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          className="text-[13px] disabled:cursor-not-allowed transition-colors duration-150"
          style={{ color: active === 0 ? "rgba(44,44,42,0.3)" : "rgba(44,44,42,0.65)" }}
        >
          ← {common.prev}
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`${common.axisWord} ${i + 1}`}
                className="rounded-full transition-colors duration-150"
                style={{
                  width:           8,
                  height:          8,
                  backgroundColor: isActive ? accentColor : "rgba(0,0,0,0.18)",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => setActive((a) => Math.min(total - 1, a + 1))}
          disabled={active === total - 1}
          className="text-[13px] font-medium disabled:cursor-not-allowed transition-colors duration-150"
          style={{ color: active === total - 1 ? "rgba(44,44,42,0.3)" : accentColor }}
        >
          {common.next} →
        </button>
      </div>
    </div>
  );
}

/* ── Main layout ────────────────────────────────────────── */
export default function ProgrammeLayout({
  programmeKey, gradient,
  accentColor, accentColorText, lightFill, pillBg, pillText,
  imageSrc, iconName, axisIcons, crossLinks,
}: ProgrammeLayoutProps) {

  const { t }  = useLang();
  const txt    = t.programmes[programmeKey];
  const common = t.programmeCommon;

  /* Merge per-axis icon (config) with per-axis text (i18n). */
  const axes: MergedAxis[] = txt.axes.map((axis, i) => ({
    ...axis,
    iconName: axisIcons[i] ?? "ShieldCheck",
  }));

  return (
    <>
      {/* ══ SECTION A — HERO ════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-end overflow-hidden"
        style={{
          background: gradient,
          minHeight:  "clamp(240px, 30vh, 300px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 88% 12%, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 md:pb-14 pt-28 md:pt-32"
        >
          <span className="block text-xs font-semibold tracking-[2px] uppercase text-white/45 mb-3">
            {txt.heroLabel}
          </span>
          <h1 className="text-3xl md:text-[42px] font-semibold text-white leading-tight tracking-tight max-w-2xl">
            {txt.heroTitle}
          </h1>
          {txt.heroSubtitle && (
            <p className="mt-2 text-lg text-white/70">
              {txt.heroSubtitle}
            </p>
          )}
        </motion.div>
      </section>

      {/* ══ SECTION B — VUE D'ENSEMBLE ══════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <blockquote
            className="mb-8 pl-5 text-[17px] md:text-lg text-[#2C2C2A] leading-[1.75]"
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontStyle:  "italic",
              borderLeft: `3px solid ${accentColor}`,
            }}
          >
            {txt.quote}
          </blockquote>

          {txt.overviewParagraphs.map((para, i) => (
            <p
              key={i}
              className="text-base text-[#2C2C2A] leading-relaxed mb-5 last:mb-0"
            >
              {para}
            </p>
          ))}
        </motion.div>
      </section>

      {/* ══ SECTION C — AXES D'INTERVENTION (TABS) ═════════ */}
      <section className="py-14 md:py-20 bg-[#F5F5F3]">
        <motion.div
          initial={FADE_INITIAL}
          whileInView={FADE_WHILE}
          viewport={FADE_VIEWPORT}
          transition={FADE_TRANSITION}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <span
            className="block text-xs font-semibold tracking-[2px] uppercase mb-6"
            style={{ color: accentColorText }}
          >
            {common.axesLabel}
          </span>

          <ProgrammeTabs
            items={axes}
            accentColor={accentColor}
            pillBg={pillBg}
            pillText={pillText}
            common={common}
            axesLabel={common.axesLabel}
          />
        </motion.div>
      </section>

      {/* ══ SECTION D — IMAGE BREAK ═════════════════════════ */}
      <motion.div
        initial={FADE_INITIAL}
        whileInView={FADE_WHILE}
        viewport={FADE_VIEWPORT}
        transition={FADE_TRANSITION}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        <div
          className="relative h-36 md:h-44 rounded-2xl overflow-hidden"
          style={{ backgroundColor: lightFill }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ProgrammeIcon
              name={iconName}
              size={64}
              strokeWidth={1}
              style={{ opacity: 0.2 }}
            />
          </div>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      </motion.div>

      {/* ══ SECTION E — CROSS-LINKS ═════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="block text-xs font-semibold tracking-[2px] uppercase text-[#2C2C2A]/40 mb-6">
            {common.crossLabel}
          </span>

          <motion.div
            initial={FADE_INITIAL}
            whileInView={FADE_WHILE}
            viewport={FADE_VIEWPORT}
            transition={FADE_TRANSITION}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {crossLinks.map((cl, i) => {
              const clText = txt.crossLinks[i];
              return (
                <Link
                  key={cl.slug}
                  href={`/programmes/${cl.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  style={{ border: "0.5px solid rgba(0,0,0,0.1)" }}
                >
                  <div
                    className="h-14 flex items-center justify-center"
                    style={{ backgroundColor: cl.lightFill }}
                  >
                    <ProgrammeIcon
                      name={cl.iconName}
                      size={22}
                      strokeWidth={1.5}
                      style={{ color: cl.accentColor, opacity: 0.65 }}
                    />
                  </div>
                  <div className="p-4 flex items-center gap-2 bg-white">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-semibold leading-snug"
                        style={{ color: cl.accentColorText }}
                      >
                        {clText?.name}
                      </p>
                      <p className="text-[11px] text-[#2C2C2A]/45 mt-0.5">
                        {clText?.subtitle}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors"
                    />
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION F — CTA ═════════════════════════════════ */}
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
            {txt.ctaHeadline}
          </h2>
          <p className="text-base text-white/55 mb-8 leading-relaxed">
            {common.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-lg text-white font-semibold text-base transition-opacity duration-200 hover:opacity-90 text-center"
              style={{ backgroundColor: "#1B7A3D" }}
            >
              {common.ctaBtn1}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-lg text-white/80 font-semibold text-base border transition-colors duration-200 hover:text-white hover:border-white/50 text-center"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              {common.ctaBtn2}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
