// app/categories/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NewsCard } from "@/components/ui/NewsCard";
import { ArrowLeft, Grid3X3, List, LayoutGrid } from "lucide-react";
import Link from "next/link";

type Article = {
  _id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
  category?: { _id: string; name: string };
  author?: { _id: string; name: string; avatar?: string };
  readTime?: number;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryData = async () => {
      try {
        // Fetch category info
        const categoryRes = await fetch("/api/categories", { cache: "no-store" });
        const categoryData = await categoryRes.json();
        const categories = Array.isArray(categoryData) ? categoryData : categoryData.data || [];
        const currentCategory = categories.find((cat: Category) => cat.slug === slug);
        setCategory(currentCategory || null);

        // Fetch articles using the slug directly
        const articlesRes = await fetch(`/api/articles/category/${slug}?page=1&limit=20`, {
          cache: "no-store",
        });
        const articlesData = await articlesRes.json();
        setArticles(articlesData.articles || []);
      } catch (err) {
        console.error("Failed to load category data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/categories"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </Link>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-pulse">
                <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link
              href="/categories"
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </Link>
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
              {category?.name || slug} News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">No articles found in this category yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                {category?.name || slug} News
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {category?.name ? `Latest updates and stories in ${category.name.toLowerCase()}` : 'Latest articles in this category'}
              </p>
            </div>

            <div className="flex items-center space-x-6 mt-4 lg:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Grid3X3 className="w-4 h-4" />
                  <span>{articles.length} articles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className={viewMode === 'grid'
          ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {articles.map((article) => (
            <NewsCard
              key={article._id}
              article={article}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
