// app/(site)/about/page.tsx
import { Users, Target, Globe, Award } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { number: '50K+', label: 'Daily Readers' },
    { number: '100+', label: 'Countries' },
    { number: '500+', label: 'Journalists' },
    { number: '24/7', label: 'Coverage' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver accurate, timely, and comprehensive news that empowers our readers to make informed decisions.'
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'A diverse group of experienced journalists, editors, and technologists committed to journalistic excellence.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'With correspondents worldwide, we bring you stories that matter from every corner of the globe.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Multiple award-winning journalism recognized for integrity, depth, and impact.'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-blue-600">HintFlow</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are a leading digital news platform committed to delivering trustworthy journalism 
            and innovative storytelling since 2015.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
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
              <p>
                Today, we serve millions of readers worldwide, constantly evolving to meet 
                the changing needs of our audience while staying true to our core mission 
                of truth, transparency, and trust.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Sarah Chen', role: 'Editor-in-Chief', bio: '20+ years in journalism' },
              { name: 'Marcus Johnson', role: 'Managing Editor', bio: 'Former foreign correspondent' },
              { name: 'Elena Rodriguez', role: 'CTO', bio: 'Digital media innovation' },
            ].map((member, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}