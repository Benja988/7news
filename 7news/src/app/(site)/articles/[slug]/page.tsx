"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommentList from "@/components/ui/CommentList";
import CommentForm from "@/components/ui/CommentForm";
import { Comment } from "@/types/comment";

type Article = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  author: { name: string };
};


export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // Fetch article
  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/articles/slug/${slug}`, { cache: "no-store" });
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Failed to load article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  // Fetch comments
  const fetchComments = async () => {
  if (!article?._id) return;
  try {
    setCommentsLoading(true);
    const res = await fetch(`/api/comments?articleId=${article._id}`);
    const data = await res.json();
    setComments(data.comments); // ✅ only set the array
  } catch (err) {
    console.error("Failed to load comments:", err);
  } finally {
    setCommentsLoading(false);
  }
};

  // Load comments whenever article changes
  useEffect(() => {
    if (article?._id) fetchComments();
  }, [article?._id]);

  // Called after new comment is successfully posted
  const handleCommentPosted = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) return <p className="text-center mt-10">Loading article...</p>;
  if (!article) return <p className="text-center mt-10">Article not found.</p>;

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-2">
        {new Date(article.publishedAt).toLocaleDateString()} · By{" "}
        {article.author?.name || "Unknown"}
      </p>

      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}

      <div
        className="prose max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <CommentForm articleId={article._id} onCommentPosted={handleCommentPosted} />
        <CommentList articleId={article._id} />
      </section>
    </article>
  );
}
