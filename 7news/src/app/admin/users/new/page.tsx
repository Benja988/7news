// app/admin/users/new/page.tsx
'use client';

import UserForm from '@/components/dashboard/users/UserForm';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/admin/users');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New User</h1>
      <UserForm onSubmit={handleCreate} />
    </div>
  );
}
