import { motion } from 'motion/react';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
            <Shield className="h-4 w-4" />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            How we collect, use, and protect your personal information.
          </p>
        </motion.div>

        <div className="prose prose-blue dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl">
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-600" />
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and payment information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
              <li>Provide, maintain, and improve our services;</li>
              <li>Process transactions and send related information;</li>
              <li>Send you technical notices, updates, and security alerts;</li>
              <li>Respond to your comments, questions, and requests.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Data Security</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">4. Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
