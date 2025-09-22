// app/admin/articles/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleTable from "@/components/dashboard/ArticleTable";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/articles?limit=50", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to load articles:", err);
      setError("Could not load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <section>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-light-heading dark:text-dark-heading">
          Manage Articles
        </h1>
        <Link href="/admin/articles/create" className="btn-primary">
          + New Article
        </Link>
      </div>

      {/* Content */}
      {loading && (
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading articles...
        </p>
      )}

      {error && (
        <p className="text-red-600 dark:text-red-400">{error}</p>
      )}

      {!loading && !error && (
        <div className="card">
          <ArticleTable articles={articles} />
        </div>
      )}
    </section>
  );
}
