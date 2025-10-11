// app/careers/page.tsx
import { Briefcase, Users, Trophy, Heart, ArrowRight } from 'lucide-react';

export default function Careers() {
  const benefits = [
    { icon: Trophy, title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
    { icon: Users, title: 'Great Team', description: 'Work with talented, passionate people' },
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health benefits' },
    { icon: Briefcase, title: 'Flexible Work', description: 'Remote and hybrid options available' },
  ];

  const openPositions = [
    {
      title: 'Senior Journalist',
      department: 'Editorial',
      type: 'Full-time',
      location: 'Remote',
      description: 'Join our core editorial team to break major stories and conduct in-depth investigations.'
    },
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Hybrid',
      description: 'Build beautiful, responsive news experiences for millions of readers worldwide.'
    },
    {
      title: 'News Editor',
      department: 'Editorial',
      type: 'Full-time',
      location: 'New York',
      description: 'Oversee news coverage and manage a team of reporters and correspondents.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Remote',
      description: 'Design intuitive user experiences that make news accessible to everyone.'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Join Our <span className="text-blue-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Help us shape the future of journalism. Work with passionate people on meaningful projects 
            that inform and empower millions worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View Open Positions
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors">
              Learn About Culture
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '200+', label: 'Team Members' },
            { number: '25+', label: 'Countries' },
            { number: '98%', label: 'Employee Satisfaction' },
            { number: '4.8', label: 'Glassdoor Rating' },
          ].map((stat, index) => (
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

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Open Positions
          </h2>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {position.department}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        {position.type}
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {position.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Don't See the Perfect Role?
            </h3>
            <p className="mb-6 opacity-90">
              We're always looking for talented people. Send us your resume and we'll contact you 
              when a matching position opens up.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
              Submit Your Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}