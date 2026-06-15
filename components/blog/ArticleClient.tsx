"use client";
import Link              from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Article } from "@/lib/articles";
import { formatDate, localizeArticle } from "@/lib/articles";
import { useLang }       from "@/lib/i18n/context";
import CategoryBadge    from "./CategoryBadge";
import ArticleImage     from "./ArticleImage";
import RelatedArticles  from "./RelatedArticles";
import NewsletterCTA    from "./NewsletterCTA";

/* Portable Text renderers — mirror the plain-string paragraph typography
   so Sanity-authored articles look identical to the fallback ones. */
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] text-[#2C2C2A]" style={{ lineHeight: 1.8, marginBottom: 24 }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="pl-5 italic text-[#0D3B6F]"
        style={{
          fontFamily:   "'Merriweather', Georgia, serif",
          borderLeft:   "3px solid #1565C0",
          fontSize:     18,
          lineHeight:   1.75,
          marginBottom: 24,
        }}
      >
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-[#2C2C2A]" style={{ marginTop: 32, marginBottom: 16 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-[#2C2C2A]" style={{ marginTop: 24, marginBottom: 12 }}>
        {children}
      </h3>
    ),
  },
};

export default function ArticleClient({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const { t, lang } = useLang();
  const b           = t.blog;
  const a           = localizeArticle(article, lang);

  /* Sanity sends Portable Text (array of blocks); fallback data is a plain
     string split on blank lines. Detect at runtime and render accordingly. */
  const rawContent = a.content as unknown;
  const isPortable = Array.isArray(rawContent);
  const paragraphs = isPortable
    ? []
    : String(rawContent ?? "")
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

  return (
    <main className="bg-white">
      {/* ══ A — HEADER ════════════════════════════════════ */}
      <header
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "calc(64px + 32px)" }}
      >
        <Link
          href="/actualites"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1565C0] hover:text-[#0D3B6F] transition-colors duration-150"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          {b.backToNews}
        </Link>

        <div className="mt-6 mb-3">
          <CategoryBadge category={article.category} size="md" />
        </div>

        <h1
          className="text-[#2C2C2A] mb-3"
          style={{
            fontFamily: "'Merriweather', Georgia, serif",
            fontSize:   "clamp(24px, 3vw + 12px, 32px)",
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {a.title}
        </h1>

        <p className="text-[13px] text-[#2C2C2A]/55">
          {formatDate(article.date, lang)} · {article.readTime} {b.readingSuffix}
        </p>

        <div
          className="my-5"
          style={{ height: 1, backgroundColor: "rgba(0,0,0,0.08)" }}
        />
      </header>

      {/* ══ B — FEATURED IMAGE ════════════════════════════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <ArticleImage
          src={article.image}
          alt={a.title}
          category={article.category}
          className="w-full h-[240px] md:h-[400px]"
          rounded={8}
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>

      {/* ══ C — BODY ═══════════════════════════════════════ */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {isPortable ? (
          <PortableText
            value={rawContent as React.ComponentProps<typeof PortableText>["value"]}
            components={portableTextComponents}
          />
        ) : (
          paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[17px] text-[#2C2C2A]"
              style={{ lineHeight: 1.8, marginBottom: 24 }}
            >
              {p}
            </p>
          ))
        )}
      </article>

      {/* ══ D — SHARE / BACK ══════════════════════════════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div style={{ height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
        <div className="flex items-center justify-between py-6">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1565C0] hover:text-[#0D3B6F] transition-colors duration-150"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            {b.backToNews}
          </Link>
          <span className="inline-flex items-center gap-1.5 text-[13px] text-[#2C2C2A]/55">
            <Share2 size={14} strokeWidth={1.75} aria-hidden="true" />
            {b.share}
          </span>
        </div>
      </div>

      {/* ══ E — RELATED ═══════════════════════════════════ */}
      <RelatedArticles articles={related} />

      {/* ══ F — NEWSLETTER ════════════════════════════════ */}
      <NewsletterCTA />
    </main>
  );
}
