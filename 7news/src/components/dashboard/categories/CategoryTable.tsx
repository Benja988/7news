// app/admin/categories/CategoryTable.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import toast from 'react-hot-toast';

type Category = {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number; // Add this if available from API
};

type Props = {
  categories: Category[];
  onDeleted?: () => void;
  onEdited?: () => void;
};

export default function CategoryTable({ categories, onDeleted }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Category deleted successfully");
        onDeleted?.();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(categories.map(c => c._id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, id]);
    } else {
      setSelectedCategories(prev => prev.filter(i => i !== id));
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    let aVal: any = a[sortField as keyof Category];
    let bVal: any = b[sortField as keyof Category];

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedCategories.length} selected categories?`)) return;

    try {
      const deletePromises = selectedCategories.map(id =>
        fetch(`/api/categories/${id}`, { method: "DELETE" })
      );

      const results = await Promise.allSettled(deletePromises);
      const failed = results.filter(result => result.status === 'rejected').length;

      if (failed > 0) {
        toast.error(`Failed to delete ${failed} categor${failed > 1 ? 'ies' : 'y'}`);
      } else {
        toast.success(`Successfully deleted ${selectedCategories.length} categor${selectedCategories.length > 1 ? 'ies' : 'y'}`);
      }

      onDeleted?.();
      setSelectedCategories([]);
    } catch (error) {
      toast.error("Error deleting categories");
    }
  };

  return (
    <div className="card">
      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedCategories.length} categor{selectedCategories.length > 1 ? 'ies' : 'y'} selected
            </span>
            <div className="space-x-2">
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedCategories([])}
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
                  checked={selectedCategories.length === categories.length && categories.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Name
                  {sortField === "name" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3">
                <button
                  onClick={() => handleSort("slug")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Slug
                  {sortField === "slug" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3 text-center">Articles</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.length > 0 ? (
              sortedCategories.map((cat) => (
                <tr
                  key={cat._id}
                  className={`border-t border-gray-200 dark:border-gray-700 hover:bg-light-bg/50 dark:hover:bg-dark-bg/50 transition-colors ${
                    selectedCategories.includes(cat._id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={(e) => handleSelectCategory(cat._id, e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{cat.name}</div>
                  </td>
                  <td className="p-3">
                    <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded font-mono">
                      {cat.slug}
                    </code>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {cat.articleCount || 0}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/categories/${cat._id}/edit`}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
