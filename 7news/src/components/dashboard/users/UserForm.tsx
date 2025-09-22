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
    <form onSubmit={handleSubmit} className="card space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="input"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="input"
      />
      {!initialData._id && (
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="input"
        />
      )}
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="input"
      >
        <option value="user">User</option>
        <option value="writer">Writer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>

      <label className="flex items-center gap-2 text-sm text-light-text dark:text-dark-text">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      <button type="submit" className="btn-primary w-full">Save</button>
    </form>
  );
}
