// app/privacy/page.tsx
import { Shield, Eye, Lock, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include:
      
• Personal identification information (name, email address)
• Account credentials
• Payment information for subscriptions
• Content you submit or post on our services
• Communications with us`
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
      
• Provide, maintain, and improve our services
• Process your transactions and send related information
• Send you technical notices and support messages
• Respond to your comments and questions
• Develop new products and services
• Monitor and analyze trends and usage
• Personalize your experience`
    },
    {
      icon: Lock,
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information in the following circumstances:
      
• With service providers who need access to perform work on our behalf
• To comply with legal obligations or protect rights
• In connection with a business transfer or merger
• With your consent or at your direction`
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational security measures designed to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-12">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            At NewsFlow, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our website and services.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index} className="scroll-mt-20">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="mt-12 space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Depending on your location, you may have certain rights regarding your personal information, 
              including the right to access, correct, delete, or restrict processing of your data. You may 
              also have the right to data portability and to object to certain processing activities.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage 
              you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@newsflow.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                privacy@newsflow.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}