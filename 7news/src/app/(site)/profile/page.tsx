"use client";

import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { User, Mail, Calendar, Shield, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your profile
          </h1>
          <Link
            href={ROUTES.LOGIN}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Name:</strong> {user.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> {user.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Role:</strong> {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Member since:</strong> {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {(isAdmin || isEditor) && (
                  <Link
                    href={ROUTES.ADMIN}
                    className="flex items-center space-x-3 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Go to Admin Dashboard</span>
                  </Link>
                )}

                <Link
                  href={ROUTES.ARTICLES}
                  className="flex items-center space-x-3 w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>View My Articles</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {(isAdmin || isEditor) && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Administrative Access
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                As a {user.role}, you have access to the administrative dashboard where you can manage content, users, and settings.
              </p>
              <Link
                href={ROUTES.ADMIN}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Settings className="w-4 h-4" />
                <span>Access Admin Dashboard</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}