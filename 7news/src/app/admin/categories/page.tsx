// app/admin/categories/page.tsx
"use client";

import CategoryTable from "@/components/dashboard/categories/CategoryTable";
import CategoryModal from "@/components/dashboard/categories/CetegoryModal";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.data || []);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onDeleted={fetchCategories}
        onEdited={fetchCategories}
      />

      {showModal && (
        <CategoryModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
}
