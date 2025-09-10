"use client";
import { useState, useEffect } from "react";

type Props = {
  initialData?: any;
};

export default function ArticleForm({ initialData }: Props) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      tags: "",
      status: "draft",
    }
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = initialData ? "PUT" : "POST";
    const url = initialData ? `/api/articles/${initialData._id}` : "/api/articles";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags: form.tags.split(",") }),
    });
    window.location.href = "/articles";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Excerpt"
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        rows={6}
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="coverImage"
        value={form.coverImage}
        onChange={handleChange}
        placeholder="Cover Image URL"
        className="w-full border rounded px-3 py-2"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Select Category</option>
        {categories.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full border rounded px-3 py-2"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Update Article" : "Create Article"}
      </button>
    </form>
  );
}
