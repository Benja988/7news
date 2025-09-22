// components/dashboard/users/UsersTable.tsx
'use client';

import Link from 'next/link';

export default function UsersTable({ users }: { users: any[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-light-bg dark:bg-dark-surface text-light-heading dark:text-dark-heading">
            <th className="p-3 text-left border-b">Name</th>
            <th className="p-3 text-left border-b">Email</th>
            <th className="p-3 text-left border-b">Role</th>
            <th className="p-3 text-left border-b">Status</th>
            <th className="p-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr
              key={u._id}
              className="hover:bg-light-bg/50 dark:hover:bg-dark-bg/50 transition"
            >
              <td className="p-3 border-b">{u.name}</td>
              <td className="p-3 border-b">{u.email}</td>
              <td className="p-3 border-b capitalize">{u.role}</td>
              <td className="p-3 border-b">
                <span className={`tag ${u.isActive ? '' : 'bg-secondary/10 text-secondary dark:bg-secondary-light/10 dark:text-secondary-light'}`}>
                  {u.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-3 border-b space-x-2">
                <Link href={`/admin/users/${u._id}`} className="btn-outline px-2 py-1">View</Link>
                <Link href={`/admin/users/edit/${u._id}`} className="btn-primary px-2 py-1">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
