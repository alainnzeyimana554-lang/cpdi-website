import { client }    from "@/sanity/lib/client";
import { urlFor }     from "@/sanity/lib/image";
import {
  allArticlesQuery,
  articleBySlugQuery,
  latestArticlesQuery,
}                     from "@/sanity/lib/queries";
import type { Article } from "@/lib/articles";

/* Transform a Sanity article document into the shape the existing
   components expect (the `Article` interface). Note: `content` from
   Sanity is Portable Text (an array of blocks); the fallback data uses
   a plain string. ArticleClient handles both at render time. */
function transformArticle(doc: Record<string, any>): Article {
  return {
    slug:     doc.slug?.current || doc.slug,
    title:    doc.title,
    excerpt:  doc.excerpt,
    category: doc.category,
    date:     doc.date,
    readTime: doc.readTime || "3 min",
    image:    doc.image
      ? urlFor(doc.image).width(800).url()
      : "/images/placeholder.jpg",
    // Portable Text array (Sanity) or undefined; cast through unknown.
    content:  doc.content as unknown as string,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const docs = await client.fetch(allArticlesQuery);
    if (docs && docs.length > 0) {
      return docs.map(transformArticle);
    }
  } catch (error) {
    console.error("Sanity fetch failed, using fallback data:", error);
  }
  const { articles } = await import("@/lib/articles-fallback");
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const doc = await client.fetch(articleBySlugQuery, { slug });
    if (doc) return transformArticle(doc);
  } catch (error) {
    console.error("Sanity fetch failed, using fallback data:", error);
  }
  const { articles } = await import("@/lib/articles-fallback");
  return articles.find((a) => a.slug === slug) ?? null;
}

export async function getLatestArticles(): Promise<Article[]> {
  try {
    const docs = await client.fetch(latestArticlesQuery);
    if (docs && docs.length > 0) {
      return docs.map(transformArticle);
    }
  } catch (error) {
    console.error("Sanity fetch failed, using fallback data:", error);
  }
  const { articles } = await import("@/lib/articles-fallback");
  return articles.slice(0, 3);
}
