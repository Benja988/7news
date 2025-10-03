// types/article.ts
export type Article = {
  _id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
  category?: { _id: string; name: string };
  author?: { _id: string; name: string; avatar?: string };
  readTime?: number;
};



