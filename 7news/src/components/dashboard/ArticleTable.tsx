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
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
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
            <tr key={article._id} className="border-t">
              <td className="p-3 font-medium">{article.title}</td>
              <td className="p-3">{article.category?.name || "-"}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    article.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
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
              <td className="p-3 text-right space-x-2">
                <Link
                  href={`/articles/${article._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() =>
                    fetch(`/api/articles/${article._id}`, { method: "DELETE" })
                      .then(() => location.reload())
                  }
                  className="text-red-600 hover:underline"
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
