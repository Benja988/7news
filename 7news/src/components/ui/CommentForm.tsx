"use client";
import { useState } from "react";
import type { Comment } from "@/types/comment";

type CommentFormProps = {
  articleId: string;
  onCommentPosted?: (newComment: Comment) => void;
};

export default function CommentForm({ articleId, onCommentPosted }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ include cookies/session
        body: JSON.stringify({ articleId, content }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("You must be logged in to comment.");
        }
        throw new Error("Failed to post comment.");
      }

      const data = await res.json();
      setContent("");

      // Call parent to update comment list
      if (onCommentPosted) onCommentPosted(data.comment as Comment);
    } catch (err: any) {
      console.error("Failed to post comment:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Write your comment..."
        rows={3}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
