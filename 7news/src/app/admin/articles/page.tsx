"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleTable from "@/components/dashboard/ArticleTable";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/articles?limit=50", { cache: "no-store" });
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Articles</h1>
        <Link
          href="/articles/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Article
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ArticleTable articles={articles} />
      )}
    </section>
  );
}
