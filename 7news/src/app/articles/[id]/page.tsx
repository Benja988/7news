"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Article = {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  author?: { name: string };
};

export default function ArticleDetailPage() {
  const { id } = useParams(); // dynamic id from URL
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/articles/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load article");
        setArticle(data.article);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete.");
      return;
    }
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");
      router.push("/articles");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading article...</p>;
  if (error) return <p className="mt-10 text-center text-red-600">{error}</p>;
  if (!article) return <p className="mt-10 text-center">Article not found</p>;

  return (
    <article className="max-w-3xl mx-auto mt-10">
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        Published {new Date(article.publishedAt).toLocaleDateString()}{" "}
        {article.author && `by ${article.author.name}`}
      </p>
      <div className="prose max-w-none mb-8">{article.content}</div>

      {/* Actions for author (only show if logged in) */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/articles/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
