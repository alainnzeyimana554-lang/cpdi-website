"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  CardHoverReveal,
  CardHoverRevealMain,
  CardHoverRevealContent,
} from "@/components/ui/reveal-on-hover";
import { useLang } from "@/lib/i18n/context";

const CARD_IMAGES = [
  "/images/programme-paix.jpg",
  "/images/programme-developpement.jpg",
  "/images/programme-environnement.jpg",
];

const CARD_TAG_COLORS = ["#1565C0", "#1B7A3D", "#1B7A3D"];

const CARD_HREFS = [
  "/programmes/paix",
  "/programmes/developpement",
  "/programmes/environnement",
];

function ProgramCard({
  card,
  image,
  tagColor,
  href,
  delay,
}: {
  card: { title: string; category: string; tags: readonly string[]; description: string };
  image: string;
  tagColor: string;
  href:  string;
  delay: number;
}) {
  const { t }  = useLang();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="h-[480px] md:h-[512px] rounded-xl overflow-hidden"
    >
      <CardHoverReveal className="w-full h-full rounded-xl">
        <CardHoverRevealMain className="w-full h-full">
          <Image
            src={image}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B6F]/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: tagColor }}
            >
              {card.category}
            </span>
          </div>
        </CardHoverRevealMain>

        <CardHoverRevealContent className="rounded-xl bg-[#0D3B6F]/85">
          <h3 className="text-white font-bold text-lg leading-snug mb-3">{card.title}</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-white border border-white/30"
                style={{ backgroundColor: `${tagColor}99` }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-white/85 text-sm leading-relaxed mb-4">{card.description}</p>
          <Link
            href={href}
            className="text-[#8BB617] text-sm font-semibold hover:text-white transition-colors"
          >
            {t.programs.readMore} &rarr;
          </Link>
        </CardHoverRevealContent>
      </CardHoverReveal>
    </motion.div>
  );
}

export default function Programs() {
  const { t }       = useLang();
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="programmes" className="py-20 md:py-28 bg-[#E8F0FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section title ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#1B7A3D]">
            {t.programs.overline}
          </span>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0D3B6F] tracking-tight">
              {t.programs.title}
            </h2>
            <span
              aria-hidden="true"
              className="block h-1 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, #1565C0, #1B7A3D)" }}
            />
          </div>
          <p className="text-[#2C2C2A]/70 max-w-xl text-base leading-relaxed">
            {t.programs.subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.programs.cards.map((card, i) => (
            <ProgramCard
              key={card.title}
              card={card}
              image={CARD_IMAGES[i]}
              tagColor={CARD_TAG_COLORS[i]}
              href={CARD_HREFS[i]}
              delay={0.1 + i * 0.12}
            />
          ))}
        </div>

        {/* Hub page link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border-2 border-[#1565C0] text-[#1565C0] font-semibold text-base hover:bg-[#E8F0FE]/70 hover:border-[#0D3B6F] hover:text-[#0D3B6F] transition-colors duration-200"
          >
            Découvrir tous nos programmes
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
