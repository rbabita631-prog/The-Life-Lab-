import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, ArrowRight } from 'lucide-react';

export default function AnnouncementBar({ heroSettings }: { heroSettings: any }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const announcements = heroSettings?.announcements?.filter((a: any) => a.isActive) || [];

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  const current = announcements[currentIdx];

  return (
    <motion.div 
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-blue-600 dark:bg-blue-700 text-white py-2.5 px-4 relative z-[60] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-4 text-center"
          >
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                {current.badge}
              </span>
            </div>
            <p className="text-sm font-bold tracking-tight hidden sm:block truncate max-w-md">
              {current.launchDate ? `${current.title}: Starting on ${current.launchDate}!` : current.title}
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('courses');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-xs font-black uppercase tracking-widest hover:underline whitespace-nowrap"
            >
              Details <ArrowRight className="h-3 w-3" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
      </div>
    </motion.div>
  );
}
