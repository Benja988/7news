// app/admin/page.tsx

"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalCategories: number;
  totalUsers: number;
  activeUsers: number;
  totalComments: number;
  totalViews: number;
  totalLikes: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="card hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Total Articles
          </h2>
          <p className="text-3xl font-bold mt-2 text-primary">{stats?.totalArticles || 0}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stats?.publishedArticles || 0} published, {stats?.draftArticles || 0} drafts
          </p>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Categories
          </h2>
          <p className="text-3xl font-bold mt-2 text-secondary">{stats?.totalCategories || 0}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Organized topics
          </p>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Users
          </h2>
          <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">
            {stats?.totalUsers || 0}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stats?.activeUsers || 0} active members
          </p>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Comments
          </h2>
          <p className="text-3xl font-bold mt-2 text-purple-600 dark:text-purple-400">
            {stats?.totalComments || 0}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total interactions
          </p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-light-heading dark:text-dark-heading">
            Engagement Metrics
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Views</span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {stats?.totalViews?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Likes</span>
              <span className="font-bold text-lg text-red-600 dark:text-red-400">
                {stats?.totalLikes?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Avg. Views per Article</span>
              <span className="font-bold text-lg text-green-600 dark:text-green-400">
                {stats?.totalArticles ? Math.round((stats.totalViews || 0) / stats.totalArticles) : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-light-heading dark:text-dark-heading">
            Content Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Published Articles</span>
              <span className="font-bold text-lg text-primary">
                {stats?.publishedArticles || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Draft Articles</span>
              <span className="font-bold text-lg text-yellow-600 dark:text-yellow-400">
                {stats?.draftArticles || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Categories Used</span>
              <span className="font-bold text-lg text-secondary">
                {stats?.totalCategories || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 text-light-heading dark:text-dark-heading">
          Recent Activity
        </h2>
        <div className="text-gray-500 dark:text-gray-400">
          <p>Recent user registrations, article publications, and comments will appear here.</p>
          <p className="mt-2">This section can be expanded with real-time data feeds.</p>
        </div>
      </div>
    </section>
  );
}
