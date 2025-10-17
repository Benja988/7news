"use client";
import { useState, useEffect, useRef } from "react";

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
          seo: initialData.seo || { metaTitle: "", metaDescription: "", keywords: [] },
          scheduledPublishAt: initialData.scheduledPublishAt
            ? new Date(initialData.scheduledPublishAt).toISOString().slice(0, 16)
            : "",
        }
      : {
          title: "",
          excerpt: "",
          content: "",
          coverImage: "",
          category: "",
          tags: "",
          status: "draft",
          scheduledPublishAt: "",
          isFeatured: false,
          seo: { metaTitle: "", metaDescription: "", keywords: [] },
        }
  );

  const [categories, setCategories] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setForm({ ...form, coverImage: data.url });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = Array.isArray(form.tags)
      ? form.tags
      : form.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);

    const keywordsArray = Array.isArray(form.seo.keywords)
      ? form.seo.keywords
      : form.seo.keywords
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean);

    const submitData = {
      ...form,
      tags: tagsArray,
      seo: {
        ...form.seo,
        keywords: keywordsArray,
      },
      scheduledPublishAt: form.scheduledPublishAt ? new Date(form.scheduledPublishAt) : undefined,
    };

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `/api/articles/${initialData._id}`
      : "/api/articles";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
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
      <div className="space-y-2">
        <label className="block text-sm font-medium">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="input"
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
        {form.coverImage && (
          <div className="mt-2">
            <img src={form.coverImage} alt="Cover" className="w-32 h-32 object-cover rounded" />
          </div>
        )}
        <input
          name="coverImage"
          value={form.coverImage}
          onChange={handleChange}
          placeholder="Or enter Cover Image URL"
          className="input"
        />
      </div>
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
        <option value="archived">Archived</option>
      </select>
      <input
        type="datetime-local"
        name="scheduledPublishAt"
        value={form.scheduledPublishAt}
        onChange={handleChange}
        className="input"
        placeholder="Schedule Publish Date"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={form.isFeatured}
          onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
        />
        <label htmlFor="isFeatured" className="text-sm">Featured Article</label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">SEO Settings</label>
        <input
          name="seo.metaTitle"
          value={form.seo.metaTitle}
          onChange={(e) => setForm({
            ...form,
            seo: { ...form.seo, metaTitle: e.target.value }
          })}
          placeholder="Meta Title"
          className="input"
        />
        <textarea
          name="seo.metaDescription"
          value={form.seo.metaDescription}
          onChange={(e) => setForm({
            ...form,
            seo: { ...form.seo, metaDescription: e.target.value }
          })}
          placeholder="Meta Description"
          className="input"
          rows={2}
        />
        <input
          name="seo.keywords"
          value={Array.isArray(form.seo.keywords) ? form.seo.keywords.join(", ") : form.seo.keywords}
          onChange={(e) => setForm({
            ...form,
            seo: { ...form.seo, keywords: e.target.value }
          })}
          placeholder="Keywords (comma separated)"
          className="input"
        />
      </div>
      <button type="submit" className="btn-primary">
        {initialData ? "Update Article" : "Create Article"}
      </button>
    </form>
  );
}
