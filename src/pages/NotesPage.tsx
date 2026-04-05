import { motion } from 'motion/react';
import StudyMaterials from '../components/StudyMaterials';
import { BookOpen, FileText, Download, Shield, Zap, Search } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-12 pb-16 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-black mb-6 border border-blue-100 dark:border-blue-800 uppercase tracking-widest">
              <BookOpen className="h-4 w-4" />
              Knowledge Hub
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Study <span className="text-blue-600">Notes</span> & Resources
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Access our curated repository of high-yield nursing notes, previous year papers, and essential study guides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <StudyMaterials />

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Content",
                desc: "All notes are reviewed by senior nursing officers to ensure accuracy and relevance."
              },
              {
                icon: Zap,
                title: "Quick Revision",
                desc: "Designed for rapid review before exams, focusing on high-probability topics."
              },
              {
                icon: Search,
                title: "Easy Navigation",
                desc: "Find exactly what you need with our organized subject-wise repository."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
              >
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
