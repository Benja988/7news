"use client";

import { useState } from "react";

type ArticleFormProps = {
  onSubmit: (formData: {
    title: string;
    content: string;
    coverImage?: string;
    category?: string;
    tags?: string[];
    status?: "draft" | "published";
  }) => Promise<void>;
  initialData?: {
    title: string;
    content: string;
    coverImage?: string;
    category?: string;
    tags?: string[];
    status?: "draft" | "published";
  };
  categories?: { _id: string; name: string }[]; // ✅ pass categories from parent
  disabled?: boolean;
};

export default function ArticleForm({
  onSubmit,
  initialData,
  categories = [],
  disabled = false,
}: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await onSubmit({
        title,
        content,
        coverImage,
        category,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        status,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
        disabled={disabled || loading}
      />

      <input
        type="text"
        placeholder="Cover Image URL (optional)"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full border p-2 rounded"
        disabled={disabled || loading}
      />

      {categories.length > 0 && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
          disabled={disabled || loading}
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border p-2 rounded"
        disabled={disabled || loading}
      />

      <textarea
        placeholder="Write your article here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full border p-2 rounded"
        required
        disabled={disabled || loading}
      />

      {/* Status selection */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="draft"
            checked={status === "draft"}
            onChange={() => setStatus("draft")}
            disabled={disabled || loading}
          />
          Draft
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="published"
            checked={status === "published"}
            onChange={() => setStatus("published")}
            disabled={disabled || loading}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={disabled || loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Article"}
      </button>
    </form>
  );
}
