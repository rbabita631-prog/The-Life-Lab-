import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Star, Users, Award, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Hero({ visibility, heroSettings }: { visibility?: any, heroSettings?: any }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredAnnouncements = heroSettings?.announcements?.filter((a: any) => a.isActive);
  const announcements = (filteredAnnouncements && filteredAnnouncements.length > 0) ? filteredAnnouncements : [
    {
      badge: 'Admissions Open',
      title: 'Your Nursing Odyssey',
      subtitle: 'Your Voyage from Aspirant to Officer. Join the most comprehensive platform for NORCET, NCLEX, and Nursing Officer exams.',
      launchDate: '2026-05-01',
      price: '₹4999'
    }
  ];

  useEffect(() => {
    if (announcements.length <= 1) {
      setCurrentSlide(0);
      return;
    }
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const currentAnnouncement = announcements[currentSlide] || announcements[0];

  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/courses');
    }
  };

  const showCourses = !visibility || visibility.courses;

  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  {currentAnnouncement.badge}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                  {currentAnnouncement.title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    {currentAnnouncement.title.split(' ').slice(-1)}
                  </span>
                </h1>
                
                <p className="text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-medium max-w-lg">
                  {currentAnnouncement.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  {showCourses && (
                    <button 
                      onClick={scrollToCourses}
                      className="group bg-blue-600 text-white px-8 py-4 rounded-2xl text-base font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none hover:-translate-y-1 flex items-center gap-3 active:scale-95"
                    >
                      Explore Courses
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                  
                  {(currentAnnouncement.launchDate || currentAnnouncement.price) && (
                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                      {currentAnnouncement.launchDate && (
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Starts</p>
                          <p className="text-sm font-black text-blue-600 dark:text-blue-400">{currentAnnouncement.launchDate}</p>
                        </div>
                      )}
                      {currentAnnouncement.launchDate && currentAnnouncement.price && (
                        <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
                      )}
                      {currentAnnouncement.price && (
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Price</p>
                          <p className="text-sm font-black text-gray-900 dark:text-white">{currentAnnouncement.price}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Indicators */}
            {announcements.length > 1 && (
              <div className="absolute bottom-0 left-0 flex gap-2">
                {announcements.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200 dark:bg-gray-800'}`}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070"
                alt="Nursing Education"
                className="w-full h-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating elements - More Compact */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50 dark:border-gray-800"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Success Rate</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">95% Guaranteed</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-50 dark:border-gray-800"
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Community</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">Join 10K+ Peers</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
