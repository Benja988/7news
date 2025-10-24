// app/admin/categories/CategoryForm.tsx


"use client";

import { useState, useEffect } from "react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  parent?: string | null;
};

type CategoryFormProps = {
  initialData?: { _id?: string; name?: string; slug?: string; parent?: string | null };
  onSubmit: (data: { name: string; slug: string; parent?: string | null }) => void;
};

export default function CategoryForm({ initialData = {}, onSubmit }: CategoryFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [parent, setParent] = useState<string | null>(initialData.parent || null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        const categoryArray = Array.isArray(data) ? data : data.data || data.categories || [];
        // Filter out the current category being edited to prevent self-reference
        const filteredCategories = categoryArray.filter((cat: Category) => cat._id !== initialData._id);
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [initialData._id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, slug, parent });
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

      {/* Parent Category */}
      <div>
        <label htmlFor="parent" className="block text-sm font-medium mb-1">
          Parent Category (Optional)
        </label>
        <select
          id="parent"
          className="input"
          value={parent || ""}
          onChange={(e) => setParent(e.target.value || null)}
          disabled={loading}
        >
          <option value="">No Parent (Top Level)</option>
          {!loading && categories
            .filter(cat => !cat.parent) // Only show top-level categories as potential parents
            .map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        {loading && <p className="text-sm text-gray-500 mt-1">Loading categories...</p>}
      </div>

      <button type="submit" className="btn-primary w-full">
        {initialData?.name ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}
