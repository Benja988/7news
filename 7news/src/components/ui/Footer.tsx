export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} MyNewsApp. All rights reserved.</p>
        <p className="text-sm">
          Built with <span className="text-blue-400">Next.js</span> & MongoDB
        </p>
      </div>
    </footer>
  );
}
