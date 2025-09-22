// app/admin/page.tsx

export default function AdminDashboardPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick stats (use .card for consistency) */}
        <div className="card">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Articles
          </h2>
          <p className="text-2xl font-bold mt-2 text-primary">120</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total published
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Categories
          </h2>
          <p className="text-2xl font-bold mt-2 text-secondary">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Organized topics
          </p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-light-heading dark:text-dark-heading">
            Users
          </h2>
          <p className="text-2xl font-bold mt-2 text-green-600 dark:text-green-400">
            450
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Registered members
          </p>
        </div>
      </div>
    </section>
  );
}
