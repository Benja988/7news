// app/admin/users/page.tsx
'use client';

import UsersTable from '@/components/dashboard/users/UsersTable';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <UsersTable users={users} />
    </div>
  );
}
