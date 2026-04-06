import { motion } from 'motion/react';
import { Bell, ArrowRight } from 'lucide-react';

export default function AnnouncementBar({ heroSettings }: { heroSettings: any }) {
  if (!heroSettings?.badge) return null;

  return (
    <motion.div 
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-blue-600 dark:bg-blue-700 text-white py-2.5 px-4 relative z-[60] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
            {heroSettings.badge}
          </span>
        </div>
        <p className="text-sm font-bold tracking-tight hidden sm:block">
          {heroSettings.launchDate ? `New batch starting on ${heroSettings.launchDate}!` : 'Special announcement from Nursing Odyssey!'}
        </p>
        <button 
          onClick={() => {
            const element = document.getElementById('courses');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1 text-xs font-black uppercase tracking-widest hover:underline"
        >
          Details <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
      </div>
    </motion.div>
  );
}
