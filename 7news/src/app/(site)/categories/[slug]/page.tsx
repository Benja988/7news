// app/categories/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NewsCard } from "@/components/ui/NewsCard";

type Article = {
  _id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchArticles = async () => {
      try {
        const res = await fetch(`/api/articles/category/${slug}?page=1&limit=9`, {
          cache: "no-store",
        });
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to load category articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading articles...</p>;
  if (articles.length === 0)
    return <p className="text-center mt-10">No articles found for this category.</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug} News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
