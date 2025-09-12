// app/admin/categories/CategoryTable.tsx
"use client";

import Link from "next/link";

export default function CategoryTable({ categories, onDeleted, onEdited }: any) {
  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    onDeleted?.();
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Slug</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat: any) => (
            <tr key={cat._id} className="border-t">
              <td className="p-3">{cat.name}</td>
              <td className="p-3 text-gray-600">{cat.slug}</td>
              <td className="p-3 text-right space-x-2">
                <Link
                  href={`/admin/categories/${cat._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
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
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

