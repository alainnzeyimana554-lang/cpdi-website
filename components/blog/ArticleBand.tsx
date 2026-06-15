"use client";
import Link              from "next/link";
import { motion }        from "framer-motion";
import { ArrowRight }    from "lucide-react";
import type { Article } from "@/lib/articles";
import { formatDate, localizeArticle } from "@/lib/articles";
import { useLang }       from "@/lib/i18n/context";
import CategoryBadge    from "./CategoryBadge";
import ArticleImage     from "./ArticleImage";

/* Band background alternates white → blue-light → white → green-light → ...
   Index is the position of this band in the *visible* list (0-based). */
function bandBg(i: number): string {
  switch (i % 4) {
    case 0: return "#FFFFFF";
    case 1: return "#E8F0FE";
    case 2: return "#FFFFFF";
    default: return "#EAF5E4";   // case 3
  }
}

export default function ArticleBand({
  article,
  index,
}: {
  article: Article;
  index:   number;
}) {
  const { t, lang } = useLang();
  const a           = localizeArticle(article, lang);
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: bandBg(index) }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">

          {/* Thumbnail */}
          <Link
            href={`/actualites/${article.slug}`}
            className="block md:shrink-0"
            aria-label={a.title}
          >
            <ArticleImage
              src={article.image}
              alt={a.title}
              category={article.category}
              className="w-full md:w-[200px] h-[160px] md:h-[130px]"
              rounded={6}
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </Link>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="mb-1.5">
              <CategoryBadge category={article.category} size="sm" />
            </div>

            <h3
              className="text-[#2C2C2A] font-medium leading-[1.35] mb-2"
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize:   17,
              }}
            >
              <Link
                href={`/actualites/${article.slug}`}
                className="hover:text-[#1565C0] transition-colors duration-150"
              >
                {a.title}
              </Link>
            </h3>

            <p
              className="text-[13px] text-[#2C2C2A]/70 leading-[1.55] mb-2.5"
              style={{
                display:         "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow:        "hidden",
              }}
            >
              {a.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[11px] text-[#2C2C2A]/50">
                {formatDate(article.date, lang)} · {article.readTime} {t.blog.readingSuffix}
              </span>
              <Link
                href={`/actualites/${article.slug}`}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-[#1565C0] hover:text-[#0D3B6F] transition-colors duration-150"
              >
                {t.blog.readArticle}
                <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider between bands */}
        <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
      </div>
    </motion.article>
  );
}
