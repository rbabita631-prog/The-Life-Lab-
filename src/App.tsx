import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCourses from './components/FeaturedCourses';
import StudyMaterials from './components/StudyMaterials';
import Footer from './components/Footer';
import DemoPage from './pages/DemoPage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import NotesPage from './pages/NotesPage';
import PreviousPaperPage from './pages/PreviousPaperPage';
import TestPage from './pages/TestPage';
import QuizPage from './pages/QuizPage';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Youtube, Instagram, Send, Mail, Bell } from 'lucide-react';
import { useState, useEffect, FormEvent, ReactNode } from 'react';

interface ThemeProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface LayoutProps extends ThemeProps {
  children: ReactNode;
}

function Layout({ children, theme, toggleTheme }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300 ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {children}
      <Footer />
    </div>
  );
}

function HomePage({ theme, toggleTheme }: ThemeProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <main>
        <Hero />
        
        {/* Combined Community & Newsletter - More Aesthetic & Compact */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gray-900 dark:bg-blue-900/20 rounded-[3rem] p-8 lg:p-20 overflow-hidden border border-gray-800 dark:border-blue-500/20">
              {/* Abstract Background Elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/20">
                    <Bell className="h-4 w-4" />
                    Join 8,000+ Students
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                    Ready to Start Your <span className="text-blue-500">Professional</span> Journey?
                  </h2>
                  <p className="text-lg text-gray-400 mb-10 font-medium leading-relaxed">
                    Get the latest study materials, exam notifications, and expert tips directly in your inbox and social feeds.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {[
                      { name: 'YouTube', icon: Youtube, color: 'bg-red-600', href: 'https://www.youtube.com/@NursingOdyssey' },
                      { name: 'Telegram', icon: Send, color: 'bg-blue-500', href: 'https://t.me/Nursing_Odyssey' },
                      { name: 'Instagram', icon: Instagram, color: 'bg-pink-600', href: 'https://www.instagram.com/nursing_odyssey?igsh=MTBpZWh2OHFweTRpbw%3D%3D&utm_source=qr' }
                    ].map((social) => (
                      <a 
                        key={social.name}
                        href={social.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${social.color} text-white p-4 rounded-2xl hover:scale-110 transition-all shadow-lg active:scale-95`}
                        title={social.name}
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-[2.5rem] border border-white/10">
                  <h3 className="text-xl font-black text-white mb-6">Subscribe to Newsletter</h3>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-gray-900/50 border border-gray-800 focus:border-blue-500 text-white pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  
                  <AnimatePresence>
                    {isSubscribed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl"
                      >
                        <p className="text-green-400 font-bold text-xs text-center">
                          🎉 Awesome! You're on the list.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 hover:bg-green-600 transition-all group"
        onClick={() => window.open('https://wa.me/919876543210', '_blank')}
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.button>
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <HomePage theme={theme} toggleTheme={toggleTheme} />
          </Layout>
        } />
        <Route path="/courses" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <CoursesPage />
          </Layout>
        } />
        <Route path="/demo" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <DemoPage />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <AboutPage />
          </Layout>
        } />
        <Route path="/notes" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <NotesPage />
          </Layout>
        } />
        <Route path="/previous-paper" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <PreviousPaperPage />
          </Layout>
        } />
        <Route path="/test" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <TestPage />
          </Layout>
        } />
        <Route path="/quiz" element={
          <Layout theme={theme} toggleTheme={toggleTheme}>
            <QuizPage />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
