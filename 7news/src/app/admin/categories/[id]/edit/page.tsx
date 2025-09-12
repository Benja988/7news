// app/admin/categories/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CategoryForm from "@/components/dashboard/categories/CategoryForm";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [cat, setCat] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCat(data.data));
  }, [id]);

  async function handleSubmit(data: any) {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/admin/categories");
  }

  if (!cat) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Category</h1>
      <CategoryForm initialData={cat} onSubmit={handleSubmit} />
    </div>
  );
}
