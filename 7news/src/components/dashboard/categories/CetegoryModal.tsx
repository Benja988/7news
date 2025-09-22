// app/admin/categories/CategoryModal.tsx
"use client";

import CategoryForm from "./CategoryForm";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CategoryModal({ onClose, onSuccess }: Props) {
  async function handleSubmit(data: { name: string; slug: string }) {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      onSuccess();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="card w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <CategoryForm onSubmit={handleSubmit} />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="btn-outline text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

