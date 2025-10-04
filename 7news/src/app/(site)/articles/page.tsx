// app/articles/page.tsx
"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import { NewsCard } from "@/components/ui/NewsCard";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Filter, Grid, List, Search } from "lucide-react";

type Article = {
  _id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
};

type GroupedArticles = {
  category: Category | null;
  articles: Article[];
}[];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [groupedArticles, setGroupedArticles] = useState<GroupedArticles>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch articles and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch(`/api/articles?page=${page}&limit=12`, { cache: "no-store" }),
          fetch('/api/categories', { cache: "no-store" })
        ]);

        const articlesData = await articlesRes.json();
        const categoriesData = await categoriesRes.json();

        setArticles(articlesData.articles || []);
        setTotalPages(articlesData.totalPages || 1);
        setCategories(categoriesData.categories || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  // Group articles by category
  useEffect(() => {
    if (articles.length === 0) {
      setGroupedArticles([]);
      return;
    }

    const filteredArticles = articles.filter(article => {
      const matchesSearch = searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' ||
        article.category?.slug === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const grouped: GroupedArticles = [];

    // Group articles with categories
    categories.forEach(category => {
      const categoryArticles = filteredArticles.filter(
        article => article.category?._id === category._id
      );

      if (categoryArticles.length > 0) {
        grouped.push({
          category,
          articles: categoryArticles
        });
      }
    });

    // Add uncategorized articles
    const uncategorizedArticles = filteredArticles.filter(
      article => !article.category
    );

    if (uncategorizedArticles.length > 0) {
      grouped.push({
        category: null,
        articles: uncategorizedArticles
      });
    }

    setGroupedArticles(grouped);
  }, [articles, categories, searchQuery, selectedCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPage(1);
  };

  const totalArticles = groupedArticles.reduce(
    (total, group) => total + group.articles.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                All Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover stories across all categories
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.slug}>
                      {category.name} ({category.articleCount || 0})
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {totalArticles} article{totalArticles !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className={viewMode === 'grid'
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
          }>
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} type={viewMode === 'list' ? 'list' : 'normal'} />
            ))}
          </div>
        ) : groupedArticles.length === 0 ? (
          // Empty State
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No articles available at the moment'
              }
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          // Articles by Category
          <div className="space-y-12">
            {groupedArticles.map((group, groupIndex) => (
              <section key={group.category?._id || 'uncategorized'} className="scroll-mt-8">
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {group.category?.name || 'Uncategorized'}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {group.articles.length} article{group.articles.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Articles Grid/List */}
                <div className={
                  viewMode === 'grid'
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }>
                  {group.articles.map((article) => (
                    <NewsCard
                      key={article._id}
                      article={article}
                      variant={viewMode === 'list' ? 'list' : 'default'}
                    />
                  ))}
                </div>

                {/* Separator (except for last group) */}
                {groupIndex < groupedArticles.length - 1 && (
                  <div className="mt-12 border-t border-gray-200 dark:border-gray-700"></div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && groupedArticles.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}