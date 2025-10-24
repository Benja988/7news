// app/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Grid3X3 } from "lucide-react";
import { getCategoryIcon } from "@/lib/categoryIcons";

type Category = {
  _id: string;
  name: string;
  slug: string;
  parent?: string | null;
  articleCount?: number;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);


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
        <div className="space-y-12">
          {(() => {
            // Group categories by parent
            const groupedCategories = categories.reduce((acc, cat) => {
              const parentId = cat.parent || 'root';
              if (!acc[parentId]) acc[parentId] = [];
              acc[parentId].push(cat);
              return acc;
            }, {} as Record<string, Category[]>);

            // Get parent categories (those with null parent)
            const parentCategories = categories.filter(cat => !cat.parent);

            return parentCategories.map(parentCat => {
              const childCategories = groupedCategories[parentCat._id] || [];
              const IconComponent = getCategoryIcon(parentCat.name);

              return (
                <div key={parentCat._id} className="space-y-6">
                  {/* Parent Category Header */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {parentCat.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {childCategories.length} subcategories • {parentCat.articleCount || 0} articles
                      </p>
                    </div>
                  </div>

                  {/* Child Categories Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Parent category card */}
                    <Link
                      href={`/categories/${parentCat.slug}`}
                      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getRandomImage(parentCat._id)}
                          alt={parentCat.name}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

                        {/* Icon Overlay */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md">
                          <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                          All {parentCat.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          Browse all topics
                        </p>
                      </div>
                    </Link>

                    {/* Child categories */}
                    {childCategories.map((childCat) => {
                      const ChildIconComponent = getCategoryIcon(childCat.name);
                      return (
                        <Link
                          key={childCat._id}
                          href={`/categories/${childCat.slug}`}
                          className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={getRandomImage(childCat._id)}
                              alt={childCat.name}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />

                            {/* Icon Overlay */}
                            <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md">
                              <ChildIconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                              {childCat.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                              {childCat.articleCount || 0} articles
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}
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
