// app/newsroom/page.tsx
"use client";

import { useState } from 'react';
import { Newspaper, Download, Users, Award, FileText, Calendar, Mail, Phone, Clock, X } from 'lucide-react';

export default function Newsroom() {
  const [selectedRelease, setSelectedRelease] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [downloadingAsset, setDownloadingAsset] = useState<string | null>(null);

  const pressReleases = [
    {
      title: 'HintFlow Reaches 1 Million Subscribers',
      date: '2024-01-15',
      category: 'Milestone',
      excerpt: 'HintFlow celebrates reaching one million paid subscribers worldwide.',
      fullContent: 'HintFlow, the leading AI-powered productivity platform, today announced it has reached one million paid subscribers worldwide. This milestone comes after three years of rapid growth and expansion into new markets. The company continues to innovate with new features designed to enhance team collaboration and individual productivity.'
    },
    {
      title: 'Launch of New Mobile App Experience',
      date: '2024-01-08',
      category: 'Product',
      excerpt: 'Completely redesigned mobile app with enhanced personalization features.',
      fullContent: 'HintFlow unveiled its completely redesigned mobile application, featuring a new intuitive interface, enhanced personalization capabilities, and offline functionality. The update includes advanced AI features that adapt to user workflows and provide intelligent suggestions in real-time.'
    },
    {
      title: 'Partnership with Global News Network',
      date: '2023-12-20',
      category: 'Partnership',
      excerpt: 'New content sharing agreement expands international coverage.',
      fullContent: 'HintFlow announced a strategic partnership with Global News Network to integrate real-time news content directly into the platform. This collaboration will provide users with contextual information and breaking news alerts related to their projects and interests.'
    },
  ];

  const mediaAssets = [
    { name: 'Company Logo Pack', type: 'Brand Assets', size: '45 MB' },
    { name: 'Executive Headshots', type: 'Photos', size: '120 MB' },
    { name: 'Brand Guidelines', type: 'PDF', size: '15 MB' },
    { name: 'Office Photos', type: 'Photos', size: '85 MB' },
  ];

  const handleDownloadAsset = (assetName: string) => {
    setDownloadingAsset(assetName);
    
    // Simulate download process
    setTimeout(() => {
      alert(`Download started: ${assetName}`);
      setDownloadingAsset(null);
    }, 1500);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleReadRelease = (release: any) => {
    setSelectedRelease(release);
  };

  const Modal = ({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Newsroom
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Press releases, media resources, and company information
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Users, number: '50+', label: 'Journalists' },
            { icon: Newspaper, number: '100K+', label: 'Stories' },
            { icon: Award, number: '25+', label: 'Awards' },
            { icon: Calendar, number: '2015', label: 'Founded' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              onClick={() => alert(`Learn more about our ${stat.label.toLowerCase()}`)}
            >
              <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Press Releases */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Press Releases
              </h2>
              <div className="space-y-4">
                {pressReleases.map((release, index) => (
                  <article key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                        {release.category}
                      </span>
                      <time className="text-gray-500 dark:text-gray-400 text-sm">
                        {new Date(release.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {release.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                      {release.excerpt}
                    </p>
                    <button 
                      onClick={() => handleReadRelease(release)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      Read Full Release →
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {/* Media Contact */}
            <section 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              onClick={handleContactClick}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Media Contact
              </h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span><strong>Press Inquiries:</strong> press@hintflow.site</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  <span><strong>Phone:</strong> +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span><strong>Response Time:</strong> Within 2 business hours</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Media Assets */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Media Assets
              </h3>
              <div className="space-y-2">
                {mediaAssets.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {asset.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {asset.type} • {asset.size}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDownloadAsset(asset.name)}
                      disabled={downloadingAsset === asset.name}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors disabled:opacity-50"
                    >
                      {downloadingAsset === asset.name ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Fast Facts */}
            <section 
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              onClick={() => alert('View our company timeline and history')}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Fast Facts
              </h3>
              <dl className="space-y-2">
                {[
                  { term: 'Founded', definition: '2015' },
                  { term: 'Headquarters', definition: 'San Francisco, CA' },
                  { term: 'Employees', definition: '200+' },
                  { term: 'Countries', definition: '25+' },
                  { term: 'CEO', definition: 'Sarah Chen' },
                ].map((fact, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                    <dt className="text-gray-600 dark:text-gray-300 text-sm">{fact.term}</dt>
                    <dd className="text-gray-900 dark:text-white text-sm font-medium">{fact.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>

      {/* Press Release Modal */}
      {selectedRelease && (
        <Modal onClose={() => setSelectedRelease(null)} title={selectedRelease.title}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                {selectedRelease.category}
              </span>
              <time>
                {new Date(selectedRelease.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedRelease.fullContent}
            </p>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => alert('Press release shared!')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share Release
              </button>
              <button 
                onClick={() => alert('PDF download started!')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Download PDF
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <Modal onClose={() => setShowContactModal(false)} title="Media Contact">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Email</div>
                  <div className="text-gray-600 dark:text-gray-300">press@hintflow.site</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Phone</div>
                  <div className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Response Time</div>
                  <div className="text-gray-600 dark:text-gray-300">Within 2 business hours</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  window.location.href = 'mailto:press@hintflow.site';
                  setShowContactModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Email
              </button>
              <button 
                onClick={() => {
                  alert('Phone number copied to clipboard!');
                  navigator.clipboard.writeText('+1 (555) 123-4567');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Copy Number
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}