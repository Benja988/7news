"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleForm from "@/components/dashboard/ArticleForm";

export default function EditArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      const res = await fetch(`/api/articles/${id}`);
      const data = await res.json();
      setArticle(data);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <ArticleForm initialData={article} />
    </section>
  );
}
