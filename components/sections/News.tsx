"use client";
import { useRef } from "react";
import Link       from "next/link";
import Image      from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/context";

/* Per-index slug map for the 3 landing-page Actualités cards
   (kept in this file so the i18n payload doesn't need to know about routes). */
const CARD_SLUGS = [
  "dialogue-intercommunautaire-gitega",
  "cooperatives-agricoles-bilan-saison",
  "reboisement-collines-gitega",
];

function NewsCard({
  article,
  readMore,
  delay,
  slug,
}: {
  article: { image: string; date: string; title: string; excerpt: string };
  readMore: string;
  delay: number;
  slug: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const href   = `/actualites/${slug}`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
    >
      <Link href={href} aria-label={article.title} className="block relative overflow-hidden aspect-video">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded bg-[#1565C0] text-white text-xs font-semibold z-10">
          {article.date}
        </span>
      </Link>
      <div className="p-5 md:p-6">
        <h3 className="text-[#0D3B6F] font-bold text-base md:text-[17px] leading-snug mb-3 line-clamp-3">
          <Link href={href} className="hover:text-[#1565C0] transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-[#2C2C2A]/70 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1565C0] hover:text-[#0D3B6F] transition-colors"
        >
          {readMore}
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function News() {
  const { t }       = useLang();
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  /* Hidden until real news is added (auto-reappears when populated). */
  if (t.news.articles.length === 0) return null;

  return (
    <section id="actualites" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#1B7A3D] mb-3">
            {t.news.overline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B6F] tracking-tight">
            {t.news.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.news.articles.map((article, i) => (
            <NewsCard
              key={article.title}
              article={article}
              readMore={t.news.readMore}
              delay={0.1 + i * 0.12}
              slug={CARD_SLUGS[i] ?? CARD_SLUGS[0]}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-[#1565C0] font-semibold hover:text-[#0D3B6F] transition-colors"
          >
            {t.news.viewAll}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
