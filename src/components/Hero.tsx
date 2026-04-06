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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] left-[10%] w-24 h-24 bg-blue-200/30 dark:bg-blue-800/10 rounded-3xl rotate-12 blur-xl animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-indigo-200/30 dark:bg-indigo-800/10 rounded-[3rem] -rotate-12 blur-xl animate-bounce" style={{ animationDuration: '8s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative min-h-[450px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800 shadow-sm w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  {currentAnnouncement.badge}
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] mb-8 tracking-tight">
                  {currentAnnouncement.title.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 bg-[length:200%_auto] animate-gradient">
                    {currentAnnouncement.title.split(' ').slice(-1)}
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed font-medium max-w-xl">
                  {currentAnnouncement.subtitle}
                </p>

                <div className="flex flex-wrap gap-6 items-center">
                  {showCourses && (
                    <button 
                      onClick={scrollToCourses}
                      className="group bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 dark:shadow-none hover:-translate-y-1 flex items-center gap-3 active:scale-95"
                    >
                      Explore Courses
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                  
                  {(currentAnnouncement.launchDate || currentAnnouncement.price) && (
                    <div className="flex items-center gap-6 px-8 py-5 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                      {currentAnnouncement.launchDate && (
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Starts</p>
                          <p className="text-base font-black text-blue-600 dark:text-blue-400">{currentAnnouncement.launchDate}</p>
                        </div>
                      )}
                      {currentAnnouncement.launchDate && currentAnnouncement.price && (
                        <div className="h-10 w-px bg-gray-100 dark:bg-gray-800" />
                      )}
                      {currentAnnouncement.price && (
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Price</p>
                          <p className="text-base font-black text-gray-900 dark:text-white">{currentAnnouncement.price}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            {announcements.length > 1 && (
              <div className="absolute bottom-0 left-0 flex gap-2">
                {announcements.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentSlide === idx ? 'w-12 bg-blue-600' : 'w-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-white dark:bg-gray-900 p-4 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 group">
              <div className="relative overflow-hidden rounded-[2.5rem]">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
                  alt="Nursing Professionals" 
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                
                {/* Floating Stats Card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-black text-blue-600">8K+</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Students</p>
                    </div>
                    <div className="text-center border-x border-gray-100 dark:border-gray-800">
                      <p className="text-2xl font-black text-blue-600">50+</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-blue-600">98%</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Success</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
