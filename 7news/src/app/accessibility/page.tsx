import Link from "next/link";

export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      title: "Keyboard Navigation",
      description: "All interactive elements can be accessed using keyboard navigation (Tab, Enter, Space, Arrow keys)."
    },
    {
      title: "Screen Reader Support",
      description: "Content is structured with proper semantic HTML and ARIA labels for screen reader compatibility."
    },
    {
      title: "Color Contrast",
      description: "Text meets WCAG 2.1 AA contrast requirements for readability."
    },
    {
      title: "Responsive Design",
      description: "Website adapts to different screen sizes and zoom levels up to 200%."
    },
    {
      title: "Focus Indicators",
      description: "Clear visual focus indicators for keyboard navigation."
    },
    {
      title: "Alternative Text",
      description: "All images include descriptive alt text for screen readers."
    }
  ];

  const contactInfo = {
    email: "accessibility@hintflow.site",
    phone: "+1 (555) 123-4567"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Accessibility Statement
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              At NewsFlow, we are committed to making our website accessible to everyone, including people with disabilities.
              We strive to provide an inclusive experience that meets or exceeds the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Accessibility Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {accessibilityFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Feedback and Support
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> <Link href={`mailto:${contactInfo.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {contactInfo.email}
                </Link>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Browser Compatibility
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our website is compatible with modern browsers and assistive technologies including:
            </p>

            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
              <li>Chrome, Firefox, Safari, and Edge browsers</li>
              <li>NVDA, JAWS, and VoiceOver screen readers</li>
              <li>Keyboard-only navigation</li>
              <li>High contrast mode</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Continuous Improvement
            </h2>

            <p className="text-gray-700 dark:text-gray-300">
              We regularly audit our website for accessibility issues and are committed to continuous improvement.
              This accessibility statement was last updated on {new Date().toLocaleDateString()}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}