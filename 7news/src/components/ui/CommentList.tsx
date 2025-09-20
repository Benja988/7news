"use client";
import { Comment } from "@/types/comment";
import { useEffect, useState } from "react";

type CommentListProps = {
  articleId: string;
  initialComments?: Comment[];
};

export default function CommentList({ articleId, initialComments = [] }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/comments?articleId=${articleId}`);
        const data = await res.json();
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } catch (err) {
        console.error("Failed to load comments:", err);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [articleId]);

  if (loading) return <p>Loading comments...</p>;
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="border-b pb-2">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-500">
            By {comment.author?.name || "Anonymous"} ·{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
