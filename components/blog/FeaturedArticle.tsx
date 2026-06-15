"use client";
import Link              from "next/link";
import { motion }        from "framer-motion";
import { ArrowRight }    from "lucide-react";
import type { Article } from "@/lib/articles";
import { formatDate, localizeArticle } from "@/lib/articles";
import { useLang }       from "@/lib/i18n/context";
import CategoryBadge    from "./CategoryBadge";
import ArticleImage     from "./ArticleImage";

export default function FeaturedArticle({ article }: { article: Article }) {
  const { t, lang } = useLang();
  const a           = localizeArticle(article, lang);
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">

          {/* Image (≈58% on desktop) */}
          <Link
            href={`/actualites/${article.slug}`}
            className="md:basis-[58%] md:shrink-0 block"
            aria-label={a.title}
          >
            <ArticleImage
              src={article.image}
              alt={a.title}
              category={article.category}
              className="w-full h-[200px] md:h-[280px]"
              rounded={6}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </Link>

          {/* Text (≈42% on desktop) */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-3">
              <CategoryBadge category={article.category} size="md" />
            </div>

            <h2
              className="text-[#2C2C2A] font-medium leading-snug mb-3"
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize:   "clamp(18px, 2vw + 8px, 22px)",
              }}
            >
              <Link
                href={`/actualites/${article.slug}`}
                className="hover:text-[#1565C0] transition-colors duration-150"
              >
                {a.title}
              </Link>
            </h2>

            <p
              className="text-[14px] text-[#2C2C2A]/70 leading-[1.6] mb-4"
              style={{
                display:           "-webkit-box",
                WebkitLineClamp:   3,
                WebkitBoxOrient:   "vertical",
                overflow:          "hidden",
              }}
            >
              {a.excerpt}
            </p>

            <p className="text-[12px] text-[#2C2C2A]/50 mb-4">
              {formatDate(article.date, lang)} · {article.readTime} {t.blog.readingSuffix}
            </p>

            <Link
              href={`/actualites/${article.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1565C0] hover:text-[#0D3B6F] transition-colors duration-150"
            >
              {t.blog.readArticle}
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
      </div>
    </motion.article>
  );
}
