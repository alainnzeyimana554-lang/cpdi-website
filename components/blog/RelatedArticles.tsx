"use client";
import Link              from "next/link";
import { motion }        from "framer-motion";
import type { Article } from "@/lib/articles";
import { formatDate, localizeArticle } from "@/lib/articles";
import { useLang }       from "@/lib/i18n/context";
import CategoryBadge    from "./CategoryBadge";
import ArticleImage     from "./ArticleImage";

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  const { t, lang } = useLang();
  if (articles.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ backgroundColor: "#F5F5F3" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <h2 className="text-[20px] font-medium text-[#2C2C2A] mb-5">
          {t.blog.relatedTitle}
        </h2>

        <div className="space-y-3">
          {articles.map((art) => {
            const la = localizeArticle(art, lang);
            return (
              <Link
                key={art.slug}
                href={`/actualites/${art.slug}`}
                className="flex items-stretch gap-4 rounded-lg bg-white p-3 hover:shadow-sm transition-shadow duration-200 group"
                style={{ border: "0.5px solid rgba(0,0,0,0.08)" }}
              >
                <ArticleImage
                  src={art.image}
                  alt={la.title}
                  category={art.category}
                  className="shrink-0 w-[120px] h-[80px]"
                  rounded={6}
                  sizes="120px"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="mb-1">
                    <CategoryBadge category={art.category} size="sm" />
                  </div>
                  <h3
                    className="text-[14px] text-[#2C2C2A] font-medium leading-snug mb-1 group-hover:text-[#1565C0] transition-colors duration-150"
                    style={{
                      display:         "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow:        "hidden",
                    }}
                  >
                    {la.title}
                  </h3>
                  <p className="text-[11px] text-[#2C2C2A]/55">
                    {formatDate(art.date, lang)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
