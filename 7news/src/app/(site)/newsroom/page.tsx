// app/newsroom/page.tsx
import { Newspaper, Download, Users, Award, FileText, Calendar } from 'lucide-react';

export default function Newsroom() {
  const pressReleases = [
    {
      title: 'NewsFlow Reaches 1 Million Subscribers',
      date: '2024-01-15',
      category: 'Milestone',
      excerpt: 'NewsFlow celebrates reaching one million paid subscribers worldwide.'
    },
    {
      title: 'Launch of New Mobile App Experience',
      date: '2024-01-08',
      category: 'Product',
      excerpt: 'Completely redesigned mobile app with enhanced personalization features.'
    },
    {
      title: 'Partnership with Global News Network',
      date: '2023-12-20',
      category: 'Partnership',
      excerpt: 'New content sharing agreement expands international coverage.'
    },
  ];

  const mediaAssets = [
    { name: 'Company Logo Pack', type: 'Brand Assets', size: '45 MB' },
    { name: 'Executive Headshots', type: 'Photos', size: '120 MB' },
    { name: 'Brand Guidelines', type: 'PDF', size: '15 MB' },
    { name: 'Office Photos', type: 'Photos', size: '85 MB' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Newsroom
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Press releases, media resources, and company information for journalists and media professionals.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, number: '50+', label: 'Journalists' },
            { icon: Newspaper, number: '100K+', label: 'Stories Published' },
            { icon: Award, number: '25+', label: 'Awards' },
            { icon: Calendar, number: '2015', label: 'Founded' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Press Releases */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Press Releases
              </h2>
              <div className="space-y-6">
                {pressReleases.map((release, index) => (
                  <article key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <time className="text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(release.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {release.excerpt}
                    </p>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                      Read Full Release →
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {/* Media Contact */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Media Contact
              </h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><strong>Press Inquiries:</strong> press@newsflow.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Response Time:</strong> Within 2 business hours</p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Media Assets */}
            <section>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Media Assets
              </h3>
              <div className="space-y-3">
                {mediaAssets.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {asset.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {asset.type} • {asset.size}
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Fast Facts */}
            <section className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Fast Facts
              </h3>
              <dl className="space-y-3">
                {[
                  { term: 'Founded', definition: '2015' },
                  { term: 'Headquarters', definition: 'San Francisco, CA' },
                  { term: 'Employees', definition: '200+' },
                  { term: 'Countries', definition: '25+' },
                  { term: 'CEO', definition: 'Sarah Chen' },
                ].map((fact, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-gray-600 dark:text-gray-300 font-medium">{fact.term}</dt>
                    <dd className="text-gray-900 dark:text-white">{fact.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}