// app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Camera, Code, Coffee, Gamepad2, Heart, Music, Zap, Grid3X3 } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate random icon for categories
  const getRandomIcon = (index: number) => {
    const icons = [BookOpen, Camera, Code, Coffee, Gamepad2, Heart, Music, Zap];
    return icons[index % icons.length];
  };

  // Generate random image URL from Picsum
  const getRandomImage = (id: string) => {
    const seed = id.replace(/[^a-zA-Z0-9]/g, '');
    return `https://picsum.photos/seed/${seed}/400/250`;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Categories</h1>
            <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
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

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">No categories found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Grid3X3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              All Categories
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore articles organized by topics and interests. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = getRandomIcon(index);
            return (
              <Link
                key={category._id}
                href={`/categories/${category.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                {/* Category Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={getRandomImage(category._id)}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

                  {/* Icon Overlay */}
                  <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md">
                    <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    {category.articleCount !== undefined && (
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                        {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Latest updates in {category.name.toLowerCase()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 bg-white dark:bg-gray-800 rounded-xl px-8 py-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {categories.reduce((sum, cat) => sum + (cat.articleCount || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Articles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
