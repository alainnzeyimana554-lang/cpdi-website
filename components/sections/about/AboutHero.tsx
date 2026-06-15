"use client";
import { useRef, useEffect }      from "react";
import Image                      from "next/image";
import Link                       from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { useLang }                from "@/lib/i18n/context";

/* ── Animated counter for hero stats ─────────────────────── */
function HeroCountUp({ value }: { value: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // Strip everything that isn't a digit to get the raw number
  const num    = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  // Suffix: characters that are not digits, spaces, commas, or NBSP variants
  const suffix = value.replace(/[\d\s,  ]/g, "");
  // Detect thousands-separator style: space → NBSP, comma → comma
  const rawDigitArea = value.replace(/[^\d\s,]/g, "");
  const sep: string | null = /\s/.test(rawDigitArea)
    ? " "
    : rawDigitArea.includes(",")
    ? ","
    : null;

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el   = ref.current;
    const ctrl = animate(0, num, {
      duration: 2,
      ease: [0, 0, 0.2, 1],
      onUpdate(v) {
        const s = Math.round(v).toString();
        el.textContent = sep
          ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep)
          : s;
      },
    });
    return () => ctrl.stop();
  }, [inView, num, sep]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix && <span className="text-[#8BB617]">{suffix}</span>}
    </>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function AboutHero() {
  const { t } = useLang();
  const at    = t.about;

  return (
    <section className="pt-20 md:pt-24 pb-16 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left — text ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="order-last lg:order-first"
          >
            {/* Label pill */}
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#1565C0] text-[#1565C0] text-xs font-semibold tracking-widest uppercase mb-7">
              {at.hero.label}
            </span>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0D3B6F] leading-tight tracking-tight mb-6">
              {at.hero.headline}
            </h1>

            {/* Sub */}
            <p className="text-base md:text-lg text-[#2C2C2A]/75 leading-relaxed max-w-lg mb-10">
              {at.hero.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                href="/#programmes"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#1565C0] text-white font-semibold text-base hover:bg-[#0D3B6F] transition-colors duration-200 active:scale-[0.98]"
              >
                {at.hero.cta1}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border-2 border-[#1565C0] text-[#1565C0] font-semibold text-base hover:bg-[#E8F0FE] transition-colors duration-200 active:scale-[0.98]"
              >
                {at.hero.cta2}
              </Link>
            </div>

            {/* Stats row — animated CountUp */}
            <div className="flex flex-wrap gap-10 pt-6 border-t border-gray-100">
              {at.hero.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-[#1565C0] leading-none tabular-nums">
                    <HeroCountUp value={stat.value} />
                  </span>
                  <span className="text-sm text-[#2C2C2A]/65 leading-snug max-w-[130px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative h-[280px] sm:h-[400px] lg:h-[580px] rounded-2xl overflow-hidden order-first lg:order-last"
          >
            <Image
              src="/images/about-hero.jpg"
              alt="Communauté C.P.D.I. au Burundi"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle brand gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 55%, rgba(13,59,111,0.25) 100%)",
              }}
              aria-hidden="true"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
