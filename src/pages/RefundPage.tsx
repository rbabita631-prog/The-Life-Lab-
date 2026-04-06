import { motion } from 'motion/react';
import { RefreshCw, CreditCard, AlertCircle } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
            <CreditCard className="h-4 w-4" />
            Transparent Policies
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Refunds & <span className="text-blue-600">Cancellation</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Our policy regarding course cancellations and refund requests.
          </p>
        </motion.div>

        <div className="prose prose-blue dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900 p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl">
          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-blue-600" />
              1. Refund Eligibility
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              We offer a 7-day money-back guarantee for most of our courses. If you are not satisfied with your purchase, you may request a refund within 7 days of the purchase date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              2. Non-Refundable Items
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Certain items are non-refundable, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-400 font-medium">
              <li>Courses where more than 20% of the content has been viewed;</li>
              <li>Downloadable resources that have already been accessed;</li>
              <li>Promotional offers or discounted bundles specifically marked as non-refundable.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Cancellation Process</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              To cancel your subscription or request a refund, please contact our support team at support@nursingodyssey.com with your order details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">4. Processing Time</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Refunds are typically processed within 5-10 business days after approval. The time it takes for the funds to appear in your account depends on your financial institution.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
