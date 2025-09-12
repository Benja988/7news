// app/admin/categories/CategoryModal.tsx
"use client";

import CategoryForm from "./CategoryForm";

export default function CategoryModal({ onClose, onSuccess }: any) {
  async function handleSubmit(data: any) {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) onSuccess();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <CategoryForm onSubmit={handleSubmit} />
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
