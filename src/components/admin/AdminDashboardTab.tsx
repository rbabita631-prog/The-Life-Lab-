import { motion } from 'motion/react';
import { Users, BookOpen, ClipboardList, FileText } from 'lucide-react';

export default function AdminDashboardTab({ stats }: { stats: any }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-500' },
        { label: 'Courses', value: stats.courses, icon: BookOpen, color: 'bg-purple-500' },
        { label: 'Quizzes', value: stats.quizzes, icon: ClipboardList, color: 'bg-amber-500' },
        { label: 'Test Series', value: stats.testSeries, icon: FileText, color: 'bg-pink-500' },
      ].map((stat, i) => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={stat.label} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl">
          <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
            <stat.icon className="text-white h-6 w-6" />
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
          <h3 className="text-4xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
