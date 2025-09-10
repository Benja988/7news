"use client";
import { useEffect, useState } from "react";
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

  const fetchArticles = async (url: string) => {
    try {
      setLoading(true);
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial load
  useEffect(() => {
    fetchArticles("/api/articles?page=1&limit=6");
  }, []);

  // 🔍 Handle search
  const handleSearch = (query: string) => {
    if (query.trim()) {
      fetchArticles(`/api/articles/search?q=${encodeURIComponent(query)}&page=1&limit=6`);
    } else {
      fetchArticles("/api/articles?page=1&limit=6");
    }
  };

  // 📂 Handle category filter
  const handleCategorySelect = (slug: string) => {
    if (slug) {
      fetchArticles(`/api/articles/category/${slug}?page=1&limit=6`);
    } else {
      fetchArticles("/api/articles?page=1&limit=6");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading latest news...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      {/* 🔹 Category + Search Component */}
      <CategorySearchBar onSearch={handleSearch} onCategorySelect={handleCategorySelect} />

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
