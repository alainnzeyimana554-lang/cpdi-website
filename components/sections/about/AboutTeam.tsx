"use client";
import { useRef, useEffect }               from "react";
import Image                                from "next/image";
import { motion, useInView, animate }      from "framer-motion";
import { Briefcase, Tag }                  from "lucide-react";
import { useLang }                         from "@/lib/i18n/context";
import type { AboutFeaturedMember }        from "@/lib/i18n/translations/types";

/* ── CountUp ──────────────────────────────────────────────── */
function CountUp({ to, duration = 2.0 }: { to: number; duration?: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.0, 0.0, 0.2, 1],
      onUpdate(value) {
        if (ref.current) ref.current.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>0</span>;
}

/* ── Parse a stat value string like "20+" or "4" ─────────── */
function parseStat(value: string): { num: number; suffix: string } {
  const num    = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  return { num: isNaN(num) ? 0 : num, suffix };
}

/* ── Shared TeamMemberCard ────────────────────────────────── */
interface TeamMemberCardProps {
  member:    AboutFeaturedMember;
  imageSrc:  string;
  reversed?: boolean;
}

function TeamMemberCard({ member, imageSrc, reversed = false }: TeamMemberCardProps) {
  const { lang } = useLang();
  const cardRef    = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  const careerLabel    = lang === "fr" ? "Parcours"   : "Career";
  const expertiseLabel = lang === "fr" ? "Expertises" : "Expertise";

  /* ── Photo column ── */
  const photoBlock = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={cardInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative"
    >
      <div
        className={`absolute -top-4 ${reversed ? "-right-4" : "-left-4"} w-full h-full rounded-2xl bg-[#E8F0FE]`}
        aria-hidden="true"
      />
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-[#EAF5E4]">
        <Image
          src={imageSrc}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      </div>
    </motion.div>
  );

  /* ── Text column ── */
  const textBlock = (
    <div>
      {/* Name + role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-[#0D3B6F] mb-1">
          {member.name}
        </h3>
        <p className="text-[#1B7A3D] font-semibold text-base mb-5">
          {member.role}
        </p>
      </motion.div>

      {/* Profile stats mini-row */}
      {member.profileStats && member.profileStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          className="grid grid-cols-3 gap-3 mb-7 p-4 bg-[#E8F0FE] rounded-xl"
        >
          {member.profileStats.map((stat, i) => {
            const { num, suffix } = parseStat(stat.value);
            return (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <div className="text-2xl font-bold text-[#1565C0] leading-none tabular-nums">
                  <CountUp to={num} />
                  {suffix && (
                    <span className="text-[#8BB617]">{suffix}</span>
                  )}
                </div>
                <p className="text-xs text-[#2C2C2A]/60 leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
        className="text-[#2C2C2A]/75 text-base leading-relaxed mb-8"
      >
        {member.bio}
      </motion.p>

      {/* Career timeline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-5">
          <Briefcase size={14} className="text-[#1565C0]" strokeWidth={2} />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#1565C0]">
            {careerLabel}
          </span>
        </div>

        <div className="relative pl-5 border-l-2 border-[#E8F0FE] space-y-5">
          {member.career.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.38 + i * 0.07, ease: "easeOut" }}
              className="relative"
            >
              <div
                className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full border-2 border-[#1565C0] bg-white"
                aria-hidden="true"
              />
              <p className="text-xs text-[#1565C0] font-semibold mb-0.5">
                {item.period}
              </p>
              <p className="text-sm text-[#0D3B6F] font-semibold leading-snug">
                {item.role}
              </p>
              <p className="text-xs text-[#2C2C2A]/50 mt-0.5">
                {item.org}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Expertise tags */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Tag size={13} className="text-[#1B7A3D]" strokeWidth={2} />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#1B7A3D]">
            {expertiseLabel}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium text-[#1565C0] bg-[#E8F0FE] border border-[#1565C0]/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={`grid gap-10 lg:gap-16 items-start ${
        reversed ? "lg:grid-cols-[7fr_5fr]" : "lg:grid-cols-[5fr_7fr]"
      }`}
    >
      {reversed ? (
        <>
          {textBlock}
          {photoBlock}
        </>
      ) : (
        <>
          {photoBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function AboutTeam() {
  const { t }  = useLang();
  const at     = t.about;
  const { featured, member2 } = at.team;

  const statsRef    = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3B6F] tracking-tight">
            {at.team.title}
          </h2>
          <p className="text-[#2C2C2A]/55 text-lg mt-2">
            {at.team.subtitle}
          </p>
        </motion.div>

        {/* ── Emmanuel ── */}
        <div className="mb-24">
          <TeamMemberCard member={featured} imageSrc="/images/about-team-emmanuel.jpg" reversed={false} />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-24" />

        {/* ── Rénovat ── */}
        <div className="mb-20">
          <TeamMemberCard member={member2} imageSrc="/images/about-team-renovat.jpg" reversed={true} />
        </div>

        {/* ── Staff note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-sm text-[#2C2C2A]/50 text-center italic mb-16 pt-8 border-t border-gray-100"
        >
          {at.team.staffNote}
        </motion.p>

        {/* ── Team stats row ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {at.team.stats.map((stat, i) => {
            const { num, suffix } = parseStat(stat.value);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#1565C0] leading-none tabular-nums">
                  {statsInView ? <CountUp to={num} /> : <span>0</span>}
                  {suffix && (
                    <span className="text-[#8BB617]">{suffix}</span>
                  )}
                </div>
                <p className="text-sm text-[#2C2C2A]/65 leading-snug max-w-[140px]">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
