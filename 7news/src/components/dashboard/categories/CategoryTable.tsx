// app/admin/categories/CategoryTable.tsx

"use client";

import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
  onDeleted?: () => void;
  onEdited?: () => void; 
};

export default function CategoryTable({ categories, onDeleted }: Props) {
  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) onDeleted?.();
  }

  return (
    <div className="overflow-x-auto card">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-dark-surface text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Slug</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr
                key={cat._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-bg transition"
              >
                <td className="p-3 font-medium">{cat.name}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400">{cat.slug}</td>
                <td className="p-3 text-right space-x-3">
                  <Link href={`/admin/categories/${cat._id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
