// app/(site)/about/page.tsx
"use client";

import { useState } from 'react';
import { Users, Target, Globe, Award, ChevronRight, Play, Twitter, Linkedin, Mail, X } from 'lucide-react';

export default function AboutUs() {
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  const stats = [
    { number: '50K+', label: 'Daily Readers', description: 'Engaged users worldwide' },
    { number: '100+', label: 'Countries', description: 'Global presence' },
    { number: '500+', label: 'Journalists', description: 'Expert contributors' },
    { number: '24/7', label: 'Coverage', description: 'News never stops' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver accurate, timely, and comprehensive news that empowers our readers to make informed decisions.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse group of experienced journalists, editors, and technologists committed to journalistic excellence.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'With correspondents worldwide, we bring you stories that matter from every corner of the globe.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Multiple award-winning journalism recognized for integrity, depth, and impact.',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const leaders = [
    { 
      name: 'Sarah Chen', 
      role: 'Editor-in-Chief', 
      bio: '20+ years in journalism, Pulitzer Prize winner',
      fullBio: 'Sarah Chen brings over two decades of journalism experience, having worked with major international publications. She was awarded the Pulitzer Prize for Investigative Reporting in 2018 and leads our editorial vision with unwavering commitment to truth and accuracy.',
      avatar: 'SC'
    },
    { 
      name: 'Marcus Johnson', 
      role: 'Managing Editor', 
      bio: 'Former foreign correspondent',
      fullBio: 'Marcus Johnson spent 15 years as a foreign correspondent across Europe and the Middle East. His expertise in international affairs and crisis reporting has been instrumental in building our global news network and maintaining editorial standards.',
      avatar: 'MJ'
    },
    { 
      name: 'Elena Rodriguez', 
      role: 'CTO', 
      bio: 'Digital media innovation',
      fullBio: 'Elena Rodriguez is a technology visionary who has pioneered digital storytelling platforms. With a background in computer science and media studies, she leads our tech innovation efforts to create immersive and accessible news experiences.',
      avatar: 'ER'
    },
  ];

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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-6">
            <span>Trusted since 2015</span>
            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
            <span>Global news platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">HintFlow</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leading digital news platform committed to delivering trustworthy journalism 
            and innovative storytelling to millions worldwide.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group"
              onClick={() => alert(`Learn more about our ${stat.label.toLowerCase()}`)}
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-105 transition-transform">
                {stat.number}
              </div>
              <div className="text-gray-900 dark:text-white font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div 
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setPlayingVideo(true)}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Our Story in Motion</h3>
                <p className="text-white/80">Watch how we're revolutionizing digital journalism</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => alert(`Learn more about our ${value.title.toLowerCase()}`)}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 md:p-12 mb-16 border border-blue-100 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Journey
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { year: '2015', event: 'Founded with a vision for transparent journalism' },
                { year: '2018', event: 'Reached 1 million monthly readers' },
                { year: '2023', event: 'Expanded to 100+ countries worldwide' },
              ].map((milestone, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{milestone.year}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{milestone.event}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <p>
                Founded in 2015, HintFlow emerged from a simple belief: everyone deserves access 
                to reliable, unbiased news. In an era of information overload, we saw the need 
                for a platform that cuts through the noise and delivers what truly matters.
              </p>
              <p>
                What started as a small team of passionate journalists has grown into a global 
                news organization with bureaus across five continents. Our commitment remains 
                unchanged: to uphold the highest standards of journalistic integrity while 
                embracing innovation in digital storytelling.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Leadership Team
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Meet the visionary leaders driving our mission forward and shaping the future of digital journalism.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {leaders.map((member, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer group"
                onClick={() => setSelectedLeader(member)}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3 font-medium">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Be part of the movement towards transparent, innovative journalism that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => alert('Explore career opportunities at HintFlow')}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Careers
            </button>
            <button 
              onClick={() => alert('Learn about our subscription plans')}
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Leader Modal */}
      {selectedLeader && (
        <Modal onClose={() => setSelectedLeader(null)} title={selectedLeader.name}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {selectedLeader.avatar}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedLeader.role}</h4>
                <p className="text-blue-600 dark:text-blue-400">{selectedLeader.bio}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedLeader.fullBio}
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact {selectedLeader.name.split(' ')[0]}
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Video Modal */}
      {playingVideo && (
        <Modal onClose={() => setPlayingVideo(false)} title="Our Story">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p>Video player would be embedded here</p>
              <p className="text-sm text-gray-400 mt-2">Company overview and mission story</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}