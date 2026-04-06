import { Shield, FileText, CheckCircle } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Legal <span className="text-blue-600">Information</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Please review our policies and terms of service.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Terms of Service</h2>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-4">Last updated: April 2026</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Nursing Odyssey, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Nursing Odyssey's website for personal, non-commercial transitory viewing only.
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Disclaimer</h3>
            <p>
              The materials on Nursing Odyssey's website are provided on an 'as is' basis. Nursing Odyssey makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-2xl">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Privacy Policy</h2>
          </div>
          
          <div className="prose prose-green dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-4">Last updated: April 2026</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Information Collection</h3>
            <p>
              We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Information Usage</h3>
            <p>
              Any of the information we collect from you may be used in one of the following ways:
            </p>
            <ul className="list-none space-y-3 mt-4">
              {[
                'To personalize your experience',
                'To improve our website',
                'To improve customer service',
                'To process transactions'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Data Protection</h3>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
