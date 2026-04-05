import { motion } from 'motion/react';
import FeaturedCourses from '../components/FeaturedCourses';
import { BookOpen, GraduationCap, Star, Users, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <main className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm border border-blue-100 dark:border-blue-800">
              <GraduationCap className="h-4 w-4" />
              <span>Premium Learning</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Our Paid <span className="text-blue-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
              Invest in your future with our comprehensive, expert-led nursing programs. Designed to help you clear NORCET, NCLEX, and State Nursing Exams.
            </p>
          </motion.div>

          <FeaturedCourses />

          {/* Additional Info Section */}
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Expert Faculty",
                desc: "Learn from top-rated professionals with years of clinical and teaching experience."
              },
              {
                icon: Users,
                title: "Community Support",
                desc: "Join a vibrant community of thousands of nursing aspirants and officers."
              },
              {
                icon: BookOpen,
                title: "Updated Content",
                desc: "Our curriculum is constantly updated to reflect the latest exam patterns and clinical practices."
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
      </main>
    </div>
  );
}
