// app/(admin)/page.tsx

export default function AdminDashboardPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick stats (placeholder for now) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Articles</h2>
          <p className="text-2xl font-bold mt-2">120</p>
          <p className="text-sm text-gray-500">Total published</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Categories</h2>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-sm text-gray-500">Organized topics</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold mt-2">450</p>
          <p className="text-sm text-gray-500">Registered members</p>
        </div>
      </div>
    </section>
  );
}
