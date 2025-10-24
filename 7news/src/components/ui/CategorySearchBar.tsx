"use client";
import { useEffect, useState, useRef } from "react";
import { Search, Filter, X, ChevronDown, Grid3X3, Sparkles } from "lucide-react";

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
  compact?: boolean;
};

export default function CategorySearchBar({ 
  onSearch, 
  onCategorySelect, 
  activeCategory,
  compact = false 
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/categories?includeCount=true", { 
          cache: "no-store",
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await res.json();

        const categoryArray = Array.isArray(data)
          ? data
          : data.data || data.categories || [];

        setCategories(categoryArray);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    onSearch(trimmed, 1);
    setIsSearchFocused(false);
  };

  const handleCategoryChange = (slug: string) => {
    onCategorySelect(slug, 1);
    setShowCategoryDropdown(false);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("", 1);
    searchInputRef.current?.focus();
  };

  const popularCategories = categories
    .filter(cat => (cat.articleCount || 0) > 10)
    .slice(0, 4);

  const displayedCategories = categories.slice(0, 10);

  return (
    <div className={`w-full space-y-4 ${compact ? 'max-w-2xl mx-auto' : ''}`}>
      {/* Enhanced Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-300 ${
          isSearchFocused 
            ? 'ring-3 ring-blue-500/30 shadow-2xl transform scale-[1.02]' 
            : 'shadow-lg hover:shadow-xl'
        } rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search className={`w-5 h-5 transition-colors ${
              isSearchFocused ? 'text-blue-600' : 'text-gray-400'
            }`} />
          </div>
          
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
            placeholder="Search articles, topics, or keywords..."
            className="w-full pl-12 pr-20 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-base md:text-lg border-none"
          />
          
          {/* Clear and Submit Buttons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium text-sm shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        {isSearchFocused && query.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in duration-200">
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Press Enter to search for <span className="font-semibold text-gray-700 dark:text-gray-300">"{query}"</span>
              </p>
            </div>
          </div>
        )}
      </form>

      {/* Enhanced Categories Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Filter Label */}
        {/* <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-semibold text-sm uppercase tracking-wide">Browse Categories</span>
        </div> */}
        
        {/* Mobile Category Dropdown */}
        <div className="sm:hidden relative" ref={dropdownRef}>
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium"
          >
            <span>
              {activeCategory 
                ? categories.find(cat => cat.slug === activeCategory)?.name || "Select Category"
                : "All Categories"
              }
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
              <button
                onClick={() => handleCategoryChange("")}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-700 ${
                  !activeCategory 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All Categories</span>
                  <Grid3X3 className="w-4 h-4" />
                </div>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                    activeCategory === cat.slug
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{cat.name}</span>
                    {cat.articleCount !== undefined && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {cat.articleCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Category Buttons */}
        <div className="hidden sm:flex flex-col gap-4 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 overflow-y-auto max-h-80">
  {/* All Categories Button */}
  <button
    onClick={() => handleCategoryChange("")}
    className={`group flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
      !activeCategory || activeCategory === "all"
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-transparent"
        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md"
    }`}
  >
    <div className="flex items-center gap-2">
      <Grid3X3 className="w-4 h-4" />
      <span>All</span>
    </div>
    <span className="text-xs font-medium opacity-80">All Posts</span>
  </button>

  {/* Popular Categories */}
  {!isLoading && popularCategories.length > 0 && (
    <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-3">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
          Trending Categories
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {popularCategories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`group flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              activeCategory === cat.slug
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md border-transparent"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm"
            }`}
          >
            <span>{cat.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === cat.slug
                  ? "bg-white/20 text-white/90"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              {cat.articleCount ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  )}

  {/* All Categories */}
  <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-3">
    <div className="flex items-center gap-2 mb-2">
      <Grid3X3 className="w-4 h-4 text-blue-500" />
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-semibold">
        All Categories
      </span>
    </div>

    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
      {displayedCategories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => handleCategoryChange(cat.slug)}
          className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
            activeCategory === cat.slug
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm"
              : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm"
          }`}
        >
          <span>{cat.name}</span>
          {cat.articleCount !== undefined && (
            <span className="text-xs opacity-70">({cat.articleCount})</span>
          )}
        </button>
      ))}
      {categories.length > 4 && (
        <div className="text-center py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-2">
          +{categories.length - 10} more categories
        </div>
      )}
    </div>
  </div>

  {/* Loading / Empty States */}
  {isLoading && (
    <div className="flex justify-center items-center py-6 text-gray-400 dark:text-gray-500 text-sm">
      Loading categories...
    </div>
  )}
  {!isLoading && (!categories || categories.length === 0) && (
    <div className="flex justify-center items-center py-6 text-gray-400 dark:text-gray-500 text-sm">
      No categories available.
    </div>
  )}
</div>

      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex-shrink-0"
              style={{ width: `${Math.random() * 80 + 60}px` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}