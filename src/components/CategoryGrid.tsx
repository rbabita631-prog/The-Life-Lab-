import { GraduationCap, ClipboardList, Zap, FileText, LayoutGrid, BookOpen, Newspaper, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { name: 'Paid Courses', icon: GraduationCap, color: 'bg-blue-500', textColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { name: 'Free Test Series', icon: ClipboardList, color: 'bg-green-500', textColor: 'text-green-500', bgColor: 'bg-green-50' },
  { name: 'Free Quiz', icon: Zap, color: 'bg-yellow-500', textColor: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  { name: 'Class Notes', icon: FileText, color: 'bg-purple-500', textColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { name: 'Test Series', icon: ClipboardList, color: 'bg-red-500', textColor: 'text-red-500', bgColor: 'bg-red-50' },
  { name: 'Current Affairs', icon: Newspaper, color: 'bg-indigo-500', textColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { name: 'Quick Links', icon: LayoutGrid, color: 'bg-pink-500', textColor: 'text-pink-500', bgColor: 'bg-pink-50' },
  { name: 'Previous Year', icon: BookOpen, color: 'bg-orange-500', textColor: 'text-orange-500', bgColor: 'bg-orange-50' },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Browse Our Resources</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Access everything you need to excel in your professional journey. From premium courses to free study materials.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, translateY: -5 }}
              className={`group relative p-8 rounded-3xl ${cat.bgColor} border border-transparent hover:border-gray-100 transition-all cursor-pointer shadow-sm hover:shadow-xl`}
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                <cat.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500 group-hover:text-blue-600 transition-colors">
                <span>Explore Now</span>
                <Zap className="h-3 w-3 fill-current" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
