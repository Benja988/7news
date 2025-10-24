// app/gdpr/page.tsx
import { Shield, Download, Eye, Trash2, Settings, Mail } from 'lucide-react';

export default function GDPR() {
  const rights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'You have the right to request copies of your personal data.'
    },
    {
      icon: Settings,
      title: 'Right to Rectification',
      description: 'You have the right to request correction of inaccurate information.'
    },
    {
      icon: Trash2,
      title: 'Right to Erasure',
      description: 'You have the right to request deletion of your personal data.'
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'You have the right to request transfer of your data to another organization.'
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
            GDPR Compliance
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            General Data Protection Regulation Information
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-12">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            HintFlow is fully committed to complying with the General Data Protection Regulation (GDPR). 
            This page outlines our approach to data protection and your rights under GDPR.
          </p>
        </div>

        {/* GDPR Rights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Your Rights Under GDPR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <right.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {right.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {right.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Protection Principles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Data Protection Principles
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                We process personal data in accordance with the following GDPR principles:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Lawfulness, fairness, and transparency</li>
                <li>Purpose limitation</li>
                <li>Data minimization</li>
                <li>Accuracy</li>
                <li>Storage limitation</li>
                <li>Integrity and confidentiality</li>
                <li>Accountability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Processing Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Data Processing Details
          </h2>
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Legal Basis for Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We process personal data based on one or more of the following legal bases:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                <li>Your consent</li>
                <li>Performance of a contract</li>
                <li>Legal obligation</li>
                <li>Legitimate interests</li>
              </ul>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                International Data Transfers
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                When we transfer your personal data outside the European Economic Area (EEA), 
                we ensure a similar degree of protection is afforded to it by implementing appropriate safeguards.
              </p>
            </div>
          </div>
        </section>

        {/* Contact DPO */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Contact Our Data Protection Officer
            </h2>
            <p className="mb-6 opacity-90">
              For any questions regarding your personal data or to exercise your GDPR rights, 
              please contact our Data Protection Officer.
            </p>
            <a
              href="mailto:dpo@hintflow.site"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              dpo@hintflow.site
            </a>
          </div>
        </section>

        {/* Supervisory Authority */}
        <div className="text-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <p className="text-gray-600 dark:text-gray-300">
            You have the right to lodge a complaint with a supervisory authority in the EU member state 
            of your habitual residence, place of work, or place of the alleged infringement.
          </p>
        </div>
      </div>
    </div>
  );
}