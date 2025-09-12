// components/dashboard/users/UserDetails.tsx
export default function UserDetails({ user }: { user: any }) {
  return (
    <div className="space-y-2">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
      <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  );
}
