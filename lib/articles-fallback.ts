/* Fallback article data used when Sanity is empty or unreachable.
   Intentionally empty: the live site shows no placeholder/generic articles.
   Real articles are added via the Sanity Studio (/studio) and render
   automatically. The Article shape + i18n helpers live in ./articles. */
import type { Article } from "./articles";

export const articles: Article[] = [];
