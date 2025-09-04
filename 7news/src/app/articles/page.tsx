"use client";
import { useEffect, useState } from "react";
import NewsCard from "@/components/ui/NewsCard";
import Pagination from "@/components/ui/Pagination";

type Article = {
  _id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/articles?page=${page}&limit=6`, {
          cache: "no-store",
        });
        const data = await res.json();
        setArticles(data.articles || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page]);

  if (loading) return <p className="text-center mt-10">Loading articles...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard
                key={article._id}
                id={article._id}
                slug={article.slug}
                title={article.title}
                coverImage={article.coverImage}
                publishedAt={article.publishedAt}
                excerpt={article.excerpt}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </>
      )}
    </section>
  );
}
