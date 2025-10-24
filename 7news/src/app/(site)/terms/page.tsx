// app/terms/page.tsx
import { FileText, Scale, AlertTriangle, BookOpen } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = 'January 1, 2024';

  const sections = [
    {
      icon: BookOpen,
      title: 'Acceptance of Terms',
      content: `By accessing and using NewsFlow ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.`
    },
    {
      icon: AlertTriangle,
      title: 'User Responsibilities',
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.`
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: `The Service and its original content, features, and functionality are owned by NewsFlow and are protected by international copyright, trademark, and other intellectual property laws.`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-12">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-yellow-700 dark:text-yellow-400 text-sm leading-relaxed">
                Please read these terms carefully before using our services. By using NewsFlow, 
                you agree to be bound by these terms and conditions. If you disagree with any part 
                of the terms, you may not access our services.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <section key={index} className="scroll-mt-20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Additional Terms */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Additional Terms & Conditions
          </h3>
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Termination</h4>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h4>
              <p>In no event shall NewsFlow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Governing Law</h4>
              <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Changes to Terms</h4>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:legal@hintflow.site" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              legal@hintflow.site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}