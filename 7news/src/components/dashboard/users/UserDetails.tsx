// components/dashboard/users/UserDetails.tsx
export default function UserDetails({ user }: { user: any }) {
  return (
    <div className="card space-y-3">
      <p>
        <span className="font-semibold text-light-heading dark:text-dark-heading">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold text-light-heading dark:text-dark-heading">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-semibold text-light-heading dark:text-dark-heading">Role:</span> {user.role}
      </p>
      <p>
        <span className="font-semibold text-light-heading dark:text-dark-heading">Status:</span>{' '}
        <span className={`tag ${user.isActive ? '' : 'bg-secondary/10 text-secondary dark:bg-secondary-light/10 dark:text-secondary-light'}`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </p>
      <p>
        <span className="font-semibold text-light-heading dark:text-dark-heading">Created:</span>{' '}
        {new Date(user.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

