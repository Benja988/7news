"use client";
import { useState, useEffect } from "react";

type Props = {
  initialData?: any;
};

export default function ArticleForm({ initialData }: Props) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(", ")
            : initialData.tags || "",
        }
      : {
          title: "",
          excerpt: "",
          content: "",
          coverImage: "",
          category: "",
          tags: "",
          status: "draft",
        }
  );

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const cats = Array.isArray(data) ? data : data.data || [];
        setCategories(cats);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = Array.isArray(form.tags)
      ? form.tags
      : form.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `/api/articles/${initialData._id}`
      : "/api/articles";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags: tagsArray }),
    });

    window.location.href = "/admin/articles";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="input"
      />
      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Excerpt"
        className="input"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        rows={6}
        className="input"
      />
      <input
        name="coverImage"
        value={form.coverImage}
        onChange={handleChange}
        placeholder="Cover Image URL"
        className="input"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="input"
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
        className="input"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button type="submit" className="btn-primary">
        {initialData ? "Update Article" : "Create Article"}
      </button>
    </form>
  );
}
