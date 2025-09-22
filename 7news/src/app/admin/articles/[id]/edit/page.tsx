// app/admin/articles/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleForm from "@/components/dashboard/ArticleForm";

export default function EditArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch article", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 animate-pulse">
          Loading article...
        </p>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="flex items-center justify-center h-64">
        <p className="text-red-600 dark:text-red-400">
          Failed to load article.
        </p>
      </section>
    );
  }

  return (
    <section className="card max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-light-heading dark:text-dark-heading">
        Edit Article
      </h1>
      <ArticleForm initialData={article} />
    </section>
  );
}
