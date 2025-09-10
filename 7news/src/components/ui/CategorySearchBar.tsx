"use client";
import { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
  slug: string;
};

type Props = {
  onSearch: (query: string, page?: number) => void;
  onCategorySelect: (slug: string, page?: number) => void;
};

export default function CategorySearchBar({ onSearch, onCategorySelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();

        // ✅ Normalize based on API response
        const categoryArray = Array.isArray(data)
          ? data
          : data.data || data.categories || [];

        setCategories(categoryArray);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed) {
      // 🔍 Call search API
      onSearch(trimmed, 1);
    } else {
      // 🧹 Reset to default articles
      onSearch("", 1);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategorySelect(e.target.value, 1);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      {/* 🔍 Search */}
      <form onSubmit={handleSearch} className="flex-1 flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="flex-1 border rounded-l px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* 📂 Categories */}
      <select
        onChange={handleCategoryChange}
        className="border rounded px-3 py-2"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
