"use client";
import { useEffect, useState, useCallback } from "react";
import NewsCard from "@/components/ui/NewsCard";
import CategorySearchBar from "@/components/ui/CategorySearchBar";

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

  const fetchArticles = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to load articles:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchArticles("/api/articles?page=1&limit=6");
  }, [fetchArticles]);

  // Search
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        fetchArticles(
          `/api/articles/search?q=${encodeURIComponent(query)}&page=1&limit=6`
        );
      } else {
        fetchArticles("/api/articles?page=1&limit=6");
      }
    },
    [fetchArticles]
  );

  // Category
  const handleCategorySelect = useCallback(
    (slug: string) => {
      if (slug) {
        fetchArticles(`/api/articles/category/${slug}?page=1&limit=6`);
      } else {
        fetchArticles("/api/articles?page=1&limit=6");
      }
    },
    [fetchArticles]
  );

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        📰 Latest News
      </h1>

      {/* Category + Search */}
      <CategorySearchBar
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 animate-pulse">Loading latest news...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center mt-16 text-gray-500">
          <p>No articles found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
