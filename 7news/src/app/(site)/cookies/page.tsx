// app/cookies/page.tsx
import { Cookie, Settings, Shield, Info } from 'lucide-react';

export default function CookiePolicy() {
  const lastUpdated = 'January 1, 2024';

  const cookieTypes = [
    {
      category: 'Essential Cookies',
      icon: Shield,
      description: 'Required for basic site functionality',
      examples: ['Authentication', 'Security', 'Site preferences'],
      necessary: true
    },
    {
      category: 'Analytics Cookies',
      icon: Settings,
      description: 'Help us understand how visitors interact',
      examples: ['Page visits', 'Traffic sources', 'User behavior'],
      necessary: false
    },
    {
      category: 'Marketing Cookies',
      icon: Info,
      description: 'Used to track visitors across websites',
      examples: ['Advertising', 'Retargeting', 'Campaign tracking'],
      necessary: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-12">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            This Cookie Policy explains how NewsFlow uses cookies and similar technologies to recognize 
            you when you visit our website. It explains what these technologies are and why we use them, 
            as well as your rights to control our use of them.
          </p>
        </div>

        {/* What are Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            What are Cookies?
          </h2>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you 
              visit a website. Cookies are widely used by website owners to make their websites work, 
              or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner are called "first-party cookies". Cookies set by parties 
              other than the website owner are called "third-party cookies". Third-party cookies enable 
              third-party features or functionality to be provided on or through the website.
            </p>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Types of Cookies We Use
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((type, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {type.category}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  {type.necessary && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                      Necessary
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cookie Management */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Managing Cookies
          </h2>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              Most browsers allow you to control cookies through their settings preferences. However, 
              limiting or disabling cookies may affect the functionality of our website.
            </p>
            <p>
              You can usually find these settings in the "Options" or "Preferences" menu of your browser. 
              To understand these settings, the following links may be helpful:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Chrome</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Firefox</a></li>
              <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie settings in Safari</a></li>
            </ul>
          </div>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Updates to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, 
            legislation, or our data practices. We encourage you to check this page periodically 
            for the latest information on our use of cookies.
          </p>
        </section>

        {/* Contact */}
        <div className="text-center mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <p className="text-gray-600 dark:text-gray-300">
            Questions about our Cookie Policy? Contact us at{' '}
            <a href="mailto:privacy@hintflow.site" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              privacy@hintflow.site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}