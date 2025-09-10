// app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();

        const categoryArray = Array.isArray(data)
          ? data
          : data.data || data.categories || [];

        setCategories(categoryArray);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;
  if (categories.length === 0) return <p className="text-center mt-10">No categories found.</p>;

  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat._id}>
            <Link
              href={`/categories/${cat.slug}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
