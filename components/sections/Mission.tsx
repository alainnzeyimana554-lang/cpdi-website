"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

/* ── CountUp ─────────────────────────────────────────── */
function CountUp({ to, duration = 2.2 }: { to: number; duration?: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.0, 0.0, 0.2, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.round(value).toLocaleString();
        }
      },
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return <span ref={ref}>0</span>;
}

/* ── Animated paragraph lines ────────────────────────── */
function AnimatedParagraph({ text }: { text: string }) {
  // Split on ". " to create phrase groups for staggered reveal
  const sentences = text.split(/(?<=\.) /).filter(Boolean);
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true, amount: 0.3 });

  return (
    <p ref={ref} className="text-base md:text-lg text-[#2C2C2A] leading-relaxed max-w-3xl mx-auto text-center mb-16">
      {sentences.map((sentence, i) => (
        <motion.span
          key={i}
          className="inline"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.18, ease: "easeOut" }}
        >
          {sentence}{i < sentences.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}

/* ── Main section ─────────────────────────────────────── */
export default function Mission() {
  const { t }       = useLang();
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const statsRef    = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section
      id="mission"
      /* z-10 + opaque bg: Mission slides up over the sticky Hero naturally.
         Rounded top + shadow give the "card rising from below" visual. */
      className="relative z-10 bg-[#F5F5F3] rounded-t-[2.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.12)] py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1B7A3D] mb-3">
            {t.mission.overline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B6F] tracking-tight">
            {t.mission.title}
          </h2>
        </motion.div>

        {/* Animated paragraph */}
        <AnimatedParagraph text={t.mission.paragraph} />

        {/* ── Animated counting stats ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6"
        >
          {t.mission.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 text-center"
            >
              {/* Large animated number */}
              <div className="text-4xl md:text-5xl font-bold text-[#1565C0] leading-none tabular-nums">
                {statsInView ? <CountUp to={stat.number} /> : <span>0</span>}
                {stat.suffix && (
                  <span className="text-[#8BB617]">{stat.suffix}</span>
                )}
              </div>
              {/* Label */}
              <p className="text-sm md:text-base text-[#2C2C2A] leading-snug max-w-[140px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
