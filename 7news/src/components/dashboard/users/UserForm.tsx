// componenets/dashboard/users/UserForm.tsx
'use client';

import { useState } from 'react';

export default function UserForm({ onSubmit, initialData = {} }: any) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    password: '',
    role: initialData.role || 'user',
    isActive: initialData.isActive ?? true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
      {!initialData._id && (
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="border p-2 w-full" />
      )}
      <select name="role" value={form.role} onChange={handleChange} className="border p-2 w-full">
        <option value="user">User</option>
        <option value="writer">Writer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
        Active
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
