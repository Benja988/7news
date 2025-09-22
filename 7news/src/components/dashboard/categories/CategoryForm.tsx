// app/admin/categories/CategoryForm.tsx


"use client";

import { useState } from "react";

type CategoryFormProps = {
  initialData?: { name?: string; slug?: string };
  onSubmit: (data: { name: string; slug: string }) => void;
};

export default function CategoryForm({ initialData = {}, onSubmit }: CategoryFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [slug, setSlug] = useState(initialData.slug || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, slug });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 card">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-1">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          className="input"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        {initialData?.name ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}
