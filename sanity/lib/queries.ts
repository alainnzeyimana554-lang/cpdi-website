import { groq } from "next-sanity";

// ===== ARTICLES =====

export const allArticlesQuery = groq`
  *[_type == "article"] | order(date desc) {
    _id,
    slug,
    title,
    excerpt,
    category,
    date,
    readTime,
    image,
    content
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    excerpt,
    category,
    date,
    readTime,
    image,
    content
  }
`;

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(date desc) [0...3] {
    _id,
    slug,
    title,
    excerpt,
    category,
    date,
    readTime,
    image
  }
`;

// ===== GALLERY =====

export const allGalleryItemsQuery = groq`
  *[_type == "galleryItem"] | order(date desc) {
    _id,
    itemId,
    category,
    title,
    description,
    location,
    date,
    image
  }
`;
