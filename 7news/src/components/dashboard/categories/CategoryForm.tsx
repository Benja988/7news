// app/admin/categories/CategoryForm.tsx
"use client";

import { useState } from "react";

export default function CategoryForm({ initialData = {}, onSubmit }: any) {
  const [name, setName] = useState(initialData.name || "");
  const [slug, setSlug] = useState(initialData.slug || "");

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit({ name, slug });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input
          type="text"
          className="mt-1 w-full border rounded p-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
