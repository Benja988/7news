import Link from "next/link";
import { Clock, User, ArrowRight } from "lucide-react";

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


// Enhanced NewsCard
export function NewsCard({ article }: { article: Article }) {
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
    {article.author.avatar ? (
      <img
        src={article.author.avatar}
        alt={article.author.name}
        className="w-8 h-8 rounded-full object-cover"
      />
    ) : (
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
        <User className="w-4 h-4" />
      </div>
    )}
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

