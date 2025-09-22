import Link from "next/link";

type Article = {
  _id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt?: string;
  category?: { name: string };
};

export default function ArticleTable({ articles }: { articles: Article[] }) {
  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full text-sm">
        <thead className="bg-light-bg dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Published</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr
              key={article._id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-light-bg/50 dark:hover:bg-dark-bg/50 transition-colors"
            >
              <td className="p-3 font-medium">{article.title}</td>
              <td className="p-3">{article.category?.name || "-"}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    article.status === "published"
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100"
                  }`}
                >
                  {article.status}
                </span>
              </td>
              <td className="p-3">
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : "-"}
              </td>
              <td className="p-3 text-right space-x-3">
                <Link
                  href={`/admin/articles/${article._id}/edit`}
                  className="text-primary hover:underline dark:text-primary-light"
                >
                  Edit
                </Link>
                <button
                  onClick={() =>
                    fetch(`/api/articles/${article._id}`, { method: "DELETE" })
                      .then(() => location.reload())
                  }
                  className="text-red-600 hover:underline dark:text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
