"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleForm from "@/components/ArticleForm";
import { useAuth } from "@/context/AuthContext";

export default function CreateArticlePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect if not logged in (after auth check is done)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (formData: {
    title: string;
    content: string;
    coverImage?: string;
    category?: string;
    tags?: string[];
    status?: "draft" | "published";
  }) => {
    if (!user) {
      setError("You must be logged in to create an article.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create article");

      // ✅ Redirect using slug (cleaner)
      router.push(`/articles/${data.article.slug}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <p className="text-center mt-10">Checking authentication...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 border p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ArticleForm onSubmit={handleSubmit} disabled={submitting} />
    </div>
  );
}
