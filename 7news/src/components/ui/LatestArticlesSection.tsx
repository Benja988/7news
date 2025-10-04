// components/home/LatestArticlesSection.tsx
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { NewsCard } from "@/components/ui/NewsCard";
import { Article } from "@/types/article";
import { EmptyState } from "./EmptyState";
import { Grid3X3, ChevronRight, FolderOpen, Hash } from "lucide-react";

interface LatestArticlesSectionProps {
  articles: Article[];
  loading: boolean;
  hasMoreArticles: boolean;
  categories?: Array<{
    _id: string;
    name: string;
    slug: string;
    articleCount?: number;
  }>;
}

type GroupedArticles = {
  category: {
    _id: string;
    name: string;
    slug: string;
    articleCount?: number;
  } | null;
  articles: Article[];
}[];

export default function LatestArticlesSection({ 
  articles, 
  loading, 
  hasMoreArticles,
  categories = [] // Default to empty array
}: LatestArticlesSectionProps) {
  // Group articles by category with safe handling
  const groupedArticles: GroupedArticles = [];
  
  if (articles.length > 0 && Array.isArray(categories)) {
    // Group articles with categories
    categories.forEach(category => {
      const categoryArticles = articles.filter(
        article => article.category?._id === category._id
      );
      
      if (categoryArticles.length > 0) {
        groupedArticles.push({
          category,
          articles: categoryArticles
        });
      }
    });

    // Add uncategorized articles
    const uncategorizedArticles = articles.filter(
      article => !article.category
    );
    
    if (uncategorizedArticles.length > 0) {
      groupedArticles.push({
        category: null,
        articles: uncategorizedArticles
      });
    }
  }

  // If no categories available or grouping didn't work, show all articles in one group
  const shouldGroupByCategory = categories && categories.length > 0 && groupedArticles.length > 0;
  const displayArticles = shouldGroupByCategory ? groupedArticles : [{
    category: null,
    articles: articles
  }];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionHeader 
          articleCount={articles.length} 
          categoryCount={shouldGroupByCategory ? groupedArticles.length : 1}
          isGrouped={shouldGroupByCategory}
        />
        
        <ArticlesByCategory 
          groupedArticles={displayArticles}
          loading={loading}
          totalArticles={articles.length}
          isGrouped={shouldGroupByCategory}
        />

        {/* Load More Button */}
        {!loading && hasMoreArticles && <LoadMoreButton />}
      </div>
    </section>
  );
}

// Sub-component for section header
function SectionHeader({ 
  articleCount, 
  categoryCount,
  isGrouped
}: { 
  articleCount: number; 
  categoryCount: number;
  isGrouped: boolean;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
      <div>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Latest News
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          {isGrouped 
            ? "Organized by categories for easy browsing. Discover stories across different topics and interests."
            : "Latest stories and updates from our news collection."
          }
        </p>
      </div>
      
      <div className="flex items-center space-x-6 mt-4 lg:mt-0">
        <div className="text-right">
          {isGrouped && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Grid3X3 className="w-4 h-4" />
              <span>{categoryCount} categories</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Hash className="w-4 h-4" />
            <span>{articleCount} articles</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for articles grouped by category
function ArticlesByCategory({ 
  groupedArticles, 
  loading, 
  totalArticles,
  isGrouped
}: { 
  groupedArticles: GroupedArticles;
  loading: boolean;
  totalArticles: number;
  isGrouped: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-12">
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="space-y-6">
            {/* Category Skeleton Header */}
            {isGrouped && (
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            )}
            
            {/* Articles Grid Skeleton */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (totalArticles === 0) {
    return (
      <EmptyState 
        message="No articles found. Try a different search or category."
        icon="📰"
      />
    );
  }

  return (
    <div className="space-y-12">
      {groupedArticles.map((group, groupIndex) => (
        <CategorySection 
          key={group.category?._id || `group-${groupIndex}`} 
          group={group}
          isFirst={groupIndex === 0}
          isLast={groupIndex === groupedArticles.length - 1}
          isGrouped={isGrouped}
        />
      ))}
    </div>
  );
}

// Sub-component for individual category section
function CategorySection({ 
  group, 
  isFirst, 
  isLast,
  isGrouped
}: { 
  group: GroupedArticles[0];
  isFirst: boolean;
  isLast: boolean;
  isGrouped: boolean;
}) {
  return (
    <section className={`scroll-mt-8 ${!isFirst ? 'pt-8' : ''}`}>
      {/* Category Header with Square Border - Only show if grouped */}
      {isGrouped && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-8 bg-blue-500 rounded-sm"></div>
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {group.category?.name || 'Uncategorized'}
                  </h3>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {group.articles.length} {group.articles.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>
                {group.category?.slug && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Latest updates in {group.category.name.toLowerCase()}
                  </p>
                )}
              </div>
            </div>
            
            {group.category?.slug && (
              <a
                href={`/category/${group.category.slug}`}
                className="hidden lg:flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
          
          {/* Square Border Separator */}
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full"></div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {group.articles.map((article) => (
          <NewsCard 
            key={article._id} 
            article={article}// Show category badge only if not grouped
          />
        ))}
      </div>

      {/* Mobile View All Button - Only show if grouped */}
      {isGrouped && group.category?.slug && (
        <div className="flex lg:hidden justify-center mt-8">
          <a
            href={`/category/${group.category.slug}`}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <FolderOpen className="w-4 h-4" />
            <span>View All {group.category.name} Articles</span>
          </a>
        </div>
      )}

      {/* Square Border Separator between categories (except last) */}
      {isGrouped && !isLast && (
        <div className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-800 border-dashed rounded-lg"></div>
      )}
    </section>
  );
}

// Sub-component for load more button
function LoadMoreButton() {
  return (
    <div className="text-center mt-16">
      <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
        <span className="relative z-10 flex items-center space-x-2">
          <span>Load More Articles</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
        Discover more stories across all categories
      </p>
    </div>
  );
}