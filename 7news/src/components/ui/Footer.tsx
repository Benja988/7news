export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 items-center">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white">My News App</h2>
          <p className="text-sm mt-1">
            Stay informed with the latest articles and updates.
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center md:justify-center gap-6 text-sm">
          <a href="/about" className="hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </a>
          <a href="/privacy" className="hover:text-blue-400 transition-colors">
            Privacy
          </a>
        </div>

        {/* Credits */}
        <div className="text-right text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} My News App</p>
          <p>
            Built with <span className="text-blue-400">Next.js</span> & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
}
