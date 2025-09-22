// app/(admin)/articles/create/page.tsx
"use client";

import ArticleForm from "@/components/dashboard/ArticleForm";

export default function CreateArticlePage() {
  return (
    <section className="card max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-light-heading dark:text-dark-heading">
        Create New Article
      </h1>
      <ArticleForm />
    </section>
  );
}
