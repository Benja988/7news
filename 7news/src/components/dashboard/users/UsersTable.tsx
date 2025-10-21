// components/dashboard/users/UsersTable.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UsersTable({ users }: { users: any[] }) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, id]);
    } else {
      setSelectedUsers(prev => prev.filter(i => i !== id));
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (sortField === "name") {
      aVal = a.name || "";
      bVal = b.name || "";
    } else if (sortField === "email") {
      aVal = a.email || "";
      bVal = b.email || "";
    } else if (sortField === "role") {
      aVal = a.role || "";
      bVal = b.role || "";
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) return;

    if (action === "activate") {
      try {
        await Promise.all(
          selectedUsers.map(id =>
            fetch(`/api/users/${id}/status`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isActive: true })
            })
          )
        );
        location.reload();
      } catch (error) {
        alert("Error activating users");
      }
    } else if (action === "deactivate") {
      try {
        await Promise.all(
          selectedUsers.map(id =>
            fetch(`/api/users/${id}/status`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isActive: false })
            })
          )
        );
        location.reload();
      } catch (error) {
        alert("Error deactivating users");
      }
    }
  };

  return (
    <div className="card">
      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleBulkAction("activate")}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-light-bg dark:bg-dark-surface text-light-heading dark:text-dark-heading border-b border-gray-200 dark:border-gray-700">
              <th className="p-3 w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Name
                  {sortField === "name" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Email
                  {sortField === "email" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort("role")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Role
                  {sortField === "role" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort("lastLogin")}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  Last Login
                  {sortField === "lastLogin" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </button>
              </th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(u => (
              <tr
                key={u.id}
                className={`hover:bg-light-bg/50 dark:hover:bg-dark-bg/50 transition-colors border-t border-gray-200 dark:border-gray-700 ${
                  selectedUsers.includes(u.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(u.id)}
                    onChange={(e) => handleSelectUser(u.id, e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </td>
                <td className="p-3">
                  <div className="font-medium">{u.name}</div>
                  {u.profile?.bio && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs" title={u.profile.bio}>
                      {u.profile.bio}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="font-medium">{u.email}</div>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    u.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100' :
                    u.role === 'editor' ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100' :
                    u.role === 'writer' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    u.isActive
                      ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                      : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-1 ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/users/edit/${u.id}`}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No users found.
        </div>
      )}
    </div>
  );
}
