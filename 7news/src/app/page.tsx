"use client";
import { useEffect, useState } from "react";
import NewsCard from "@/components/ui/NewsCard";

type Article = {
  _id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
};

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles?page=1&limit=6", {
          cache: "no-store", // always fetch fresh data
        });
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Failed to load articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading latest news...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article._id}
              id={article._id}
              slug={article.slug}
              title={article.title}
              coverImage={article.coverImage}
              publishedAt={article.publishedAt}
              excerpt={article.excerpt}
            />
          ))}
        </div>
      )}
    </section>
  );
}
