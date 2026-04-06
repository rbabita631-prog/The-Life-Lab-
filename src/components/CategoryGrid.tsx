import { GraduationCap, ClipboardList, Zap, LayoutGrid, FileText, Award, Star } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { name: 'Nursing Officer', icon: GraduationCap, color: 'blue', count: '12 Courses' },
  { name: 'NORCET Special', icon: Award, color: 'indigo', count: '8 Courses' },
  { name: 'NCLEX Prep', icon: Star, color: 'purple', count: '5 Courses' },
  { name: 'Test Series', icon: ClipboardList, color: 'green', count: '50+ Tests' },
  { name: 'Free Quiz', icon: Zap, color: 'orange', count: 'Daily Live' },
  { name: 'Class Notes', icon: FileText, color: 'red', count: 'PDFs' },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Explore Our <span className="text-blue-600">Categories</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
              Choose from a wide range of specialized courses designed to help you excel in your nursing career.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
            View All Categories
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`bg-${category.color}-100 dark:bg-${category.color}-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <category.icon className={`h-6 w-6 text-${category.color}-600 dark:text-${category.color}-400`} />
              </div>
              <h3 className="font-black text-gray-900 dark:text-white mb-1 tracking-tight">{category.name}</h3>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{category.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
