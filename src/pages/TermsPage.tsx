import { motion } from 'motion/react';
import { FileText, Shield, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
            <Scale className="h-4 w-4" />
            Legal Information
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Terms & <span className="text-blue-600">Conditions</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Please read these terms and conditions carefully before using our services.
          </p>
        </motion.div>

        <div className="prose prose-blue dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl">
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              By accessing and using Nursing Odyssey, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Permission is granted to temporarily download one copy of the materials (information or software) on Nursing Odyssey's website for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software;</li>
              <li>Remove any copyright or other proprietary notations.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              The materials on Nursing Odyssey's website are provided on an 'as is' basis. Nursing Odyssey makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">4. Limitations</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              In no event shall Nursing Odyssey or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nursing Odyssey's website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
