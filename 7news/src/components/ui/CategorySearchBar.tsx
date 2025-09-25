"use client";
import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
};

type Props = {
  onSearch: (query: string, page?: number) => void;
  onCategorySelect: (slug: string, page?: number) => void;
  activeCategory?: string;
};

export default function CategorySearchBar({ onSearch, onCategorySelect, activeCategory }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories?includeCount=true", { cache: "no-store" });
        const data = await res.json();

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
    onSearch(trimmed, 1);
  };

  const handleCategoryChange = (slug: string) => {
    onCategorySelect(slug, 1);
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-200 ${
          isSearchFocused ? 'ring-2 ring-blue-400 shadow-lg' : 'shadow-md'
        } rounded-xl overflow-hidden`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search articles, topics, or keywords..."
            className="w-full px-6 py-4 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none text-lg"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>
      </form>

      {/* Categories Filter */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter by:</span>
        </div>
        
        {/* All Categories Button */}
        <button
          onClick={() => handleCategoryChange("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !activeCategory || activeCategory === "all"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>

        {/* Category Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.slug
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              {cat.name}
              {cat.articleCount !== undefined && (
                <span className="ml-2 text-xs opacity-75">({cat.articleCount})</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}