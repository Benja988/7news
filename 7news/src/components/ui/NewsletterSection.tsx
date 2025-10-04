// components/home/NewsletterSection.tsx
export default function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Get the latest news delivered directly to your inbox. No spam, just quality content.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}

// Sub-component for newsletter form
function NewsletterForm() {
  return (
    <div className="max-w-md mx-auto flex gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button className="bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
        Subscribe
      </button>
    </div>
  );
}