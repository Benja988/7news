export default function AdminFooter() {
  return (
    <footer className="bg-light-bg dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-sm text-light-text dark:text-dark-text">
            © 2024 HintFlow Admin Panel. All rights reserved.
          </div>
          <div className="text-sm text-light-text dark:text-dark-text">
            Version 1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
}