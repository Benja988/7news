// components/dashboard/users/UsersTable.tsx
'use client';

import Link from 'next/link';

export default function UsersTable({ users }: { users: any[] }) {
  return (
    <table className="min-w-full border">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u._id}>
            <td className="p-2 border">{u.name}</td>
            <td className="p-2 border">{u.email}</td>
            <td className="p-2 border">{u.role}</td>
            <td className="p-2 border">{u.isActive ? 'Active' : 'Inactive'}</td>
            <td className="p-2 border">
              <Link href={`/admin/users/${u._id}`} className="text-blue-600 hover:underline">View</Link> |{' '}
              <Link href={`/admin/users/edit/${u._id}`} className="text-green-600 hover:underline">Edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
