"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ArticleForm from "@/components/ArticleForm";

export default function CreateArticlePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (formData: {
    title: string;
    content: string;
    coverImage?: string;
  }) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in to create an article.");

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // assuming backend expects JWT
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create article");

    router.push(`/articles/${data.article._id}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  );
}
