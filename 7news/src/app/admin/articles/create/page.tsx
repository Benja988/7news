// app/(admin)/articles/create/page.tsx

"use client";

import ArticleForm from "@/components/dashboard/ArticleForm";


export default function CreateArticlePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <ArticleForm />
    </section>
  );
}
