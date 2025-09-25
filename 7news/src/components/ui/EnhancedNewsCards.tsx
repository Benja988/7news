import Link from "next/link";
import { Clock, User, ArrowRight } from "lucide-react";
import { Article } from "@/types/article";


// Featured NewsCard
export function FeaturedNewsCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <Link href={`/articles/${article.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              loading={priority ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 flex items-center justify-center">
              <span className="text-6xl">🌟</span>
            </div>
          )}
          
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
              {article.category?.name || "General"}
            </span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>

          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between">
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {article.author.name}
                </span>
              </div>
            )}
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {article.readTime || 5} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Trending NewsCard
export function TrendingNewsCard({ article }: { article: Article }) {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link href={`/articles/${article.slug}`} className="flex gap-3 p-3">
        {/* Image */}
        <div className="flex-shrink-0 w-20 h-20 relative">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center rounded">
              <span className="text-lg">🔥</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-1">
          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.readTime || 3} min</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

// Enhanced NewsCard (if you want to replace the existing one)
export function EnhancedNewsCard({ article }: { article: Article }) {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Image */}
      <div className="relative overflow-hidden">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
        
        {/* Category Badge */}
        {article.category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {article.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime || 5} min read
          </span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
        )}

        {/* Author */}
        {article.author && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {article.author.name}
            </span>
          </div>
        )}

        {/* Read More */}
        <Link 
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium mt-4 group-hover:gap-2 transition-all"
        >
          Read more <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}