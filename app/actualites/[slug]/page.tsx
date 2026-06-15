import type { Metadata } from "next";
import { notFound }      from "next/navigation";

import Navbar           from "@/components/sections/Navbar";
import Footer           from "@/components/sections/Footer";
import ArticleClient    from "@/components/blog/ArticleClient";
import { getAllArticles, getArticleBySlug } from "@/lib/sanity-articles";

type Params = { slug: string };

/* Pre-render every known slug at build time (Sanity, or fallback if empty). */
export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

/* Per-article metadata. */
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug }  = await params;
  const article   = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Article introuvable | C.P.D.I. Burundi" };
  }
  return {
    title:       `${article.title} | C.P.D.I. Burundi`,
    description: article.excerpt,
  };
}

export default async function ArticlePage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const article  = await getArticleBySlug(slug);
  if (!article) notFound();

  const all     = await getAllArticles();
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <ArticleClient article={article} related={related} />
      <Footer />
    </>
  );
}
