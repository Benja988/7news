"use client";

import Link from "next/link";
import { useState } from "react";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  author?: { name: string };
  category?: { name: string };
  tags?: string[];
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  scheduledPublishAt?: string;
  views: number;
  likes: number;
  commentsCount: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function ArticleTable({ articles }: { articles: Article[] }) {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArticles(articles.map(a => a._id));
    } else {
      setSelectedArticles([]);
    }
  };

  const handleSelectArticle = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedArticles(prev => [...prev, id]);
    } else {
      setSelectedArticles(prev => prev.filter(i => i !== id));
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedArticles = [...articles].sort((a, b) => {
    let aVal: any = a[sortField as keyof Article];
    let bVal: any = b[sortField as keyof Article];

    if (sortField === "author") {
      aVal = a.author?.name || "";
      bVal = b.author?.name || "";
    } else if (sortField === "category") {
      aVal = a.category?.name || "";
      bVal = b.category?.name || "";
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedArticles.length} selected articles?`)) return;

    try {
      await Promise.all(
        selectedArticles.map(id =>
          fetch(`/api/articles/${id}`, { method: "DELETE" })
        )
      );
      location.reload();
    } catch (error) {
      alert("Error deleting articles");
    }
  };

  return (
    <div className="card">
      {/* Bulk Actions */}
      {selectedArticles.length > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedArticles.length} article{selectedArticles.length > 1 ? 's' : ''} selected
            </span>
            <div className="space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedArticles([])}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-light-bg dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="p-3 w-12">
                <input
                  type="checkbox"
                  checked={selectedArticles.length === articles.length && articles.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
              </th>
              <th className="p-3 w-20">Cover</th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Title
                  {sortField === "title" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("author")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Author
                  {sortField === "author" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Category
                  {sortField === "category" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3">Tags</th>
              <th className="p-3">Status</th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("views")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Views
                  {sortField === "views" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("likes")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Likes
                  {sortField === "likes" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3">Featured</th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Created
                  {sortField === "createdAt" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles.map((article) => (
              <tr
                key={article._id}
                className={`border-t border-gray-200 dark:border-gray-700 hover:bg-light-bg/50 dark:hover:bg-dark-bg/50 transition-colors ${
                  selectedArticles.includes(article._id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article._id)}
                    onChange={(e) => handleSelectArticle(article._id, e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </td>
                <td className="p-3">
                  {article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-12 h-12 object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="max-w-xs">
                    <div className="font-medium truncate" title={article.title}>
                      {article.title}
                    </div>
                    {article.excerpt && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1" title={article.excerpt}>
                        {article.excerpt}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">{article.author?.name || "-"}</td>
                <td className="p-3">{article.category?.name || "-"}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {article.tags?.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {article.tags && article.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                        +{article.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                        : article.status === "draft"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="font-medium">{article.views.toLocaleString()}</span>
                </td>
                <td className="p-3 text-center">
                  <span className="font-medium">{article.likes.toLocaleString()}</span>
                </td>
                <td className="p-3 text-center">
                  {article.isFeatured ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      <span className="w-2 h-2 bg-primary rounded-full mr-1"></span>
                      Featured
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/admin/articles/${article._id}/edit`}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        fetch(`/api/articles/${article._id}`, { method: "DELETE" })
                          .then(() => location.reload())
                      }
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {articles.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No articles found.
        </div>
      )}
    </div>
  );
}