import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Youtube, Instagram, Send, Mail, Bell, Loader2 } from 'lucide-react';
import { useState, useEffect, FormEvent, ReactNode, lazy, Suspense } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebase';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for performance optimization
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotesPage = lazy(() => import('./pages/NotesPage'));
const PreviousPaperPage = lazy(() => import('./pages/PreviousPaperPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const PersonalizedLearningPage = lazy(() => import('./pages/PersonalizedLearningPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const RefundPage = lazy(() => import('./pages/RefundPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

import FeaturedCourses from './components/FeaturedCourses';
import StudyMaterials from './components/StudyMaterials';
import CategoryGrid from './components/CategoryGrid';
import ContactForm from './components/ContactForm';
import AnnouncementBar from './components/AnnouncementBar';

interface ThemeProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  visibility: any;
}

interface LayoutProps extends ThemeProps {
  children: ReactNode;
  visibility: any;
  heroSettings: any;
}

function Layout({ children, theme, toggleTheme, visibility, heroSettings }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      {/* Global Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 z-[100] origin-left shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        style={{ scaleX }}
      />
      <AnnouncementBar heroSettings={heroSettings} />
      <Navbar theme={theme} toggleTheme={toggleTheme} visibility={visibility} />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      }>
        {children}
      </Suspense>
      <Footer visibility={visibility} />
    </div>
  );
}

function HomePage({ theme, toggleTheme, visibility, heroSettings }: ThemeProps & { heroSettings: any }) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <>
      <main>
        <Hero visibility={visibility} heroSettings={heroSettings} />
        
        {visibility?.courses && <FeaturedCourses />}
        {visibility?.notes && <StudyMaterials />}
        <CategoryGrid visibility={visibility} />
        
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gray-900 dark:bg-blue-900/20 rounded-[3rem] p-8 lg:p-20 overflow-hidden border border-gray-800 dark:border-blue-500/20">
                    {/* Abstract Background Elements */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                      <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/20">
                        <Bell className="h-4 w-4" />
                        Join 8,000+ Students
                      </div>
                      <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                        Ready to Start Your <span className="text-blue-500">Professional</span> Journey?
                      </h2>
                      <p className="text-lg text-gray-400 mb-10 font-medium leading-relaxed">
                        Get the latest study materials, exam notifications, and expert tips directly in your social feeds.
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-6">
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
                            className={`${social.color} text-white p-5 rounded-2xl hover:scale-110 transition-all shadow-lg active:scale-95 flex items-center gap-3 font-black uppercase tracking-widest text-xs`}
                          >
                            <social.icon className="h-6 w-6" />
                            {social.name}
                          </a>
                        ))}
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
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [visibility, setVisibility] = useState<any>(null);
  const [heroSettings, setHeroSettings] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'visibility'), (s) => {
      setVisibility(s.data()?.visibility);
    });
    
    const unsubHero = onSnapshot(doc(db, 'settings', 'hero'), (s) => {
      if (s.exists()) {
        setHeroSettings(s.data());
      }
    });

    return () => {
      unsub();
      unsubHero();
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <HomePage theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings} />
            </Layout>
          } />
          <Route path="/courses" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <CoursesPage />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <AboutPage />
            </Layout>
          } />
          <Route path="/notes" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <NotesPage />
            </Layout>
          } />
          <Route path="/previous-paper" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <PreviousPaperPage />
            </Layout>
          } />
          <Route path="/test" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <TestPage />
            </Layout>
          } />
          <Route path="/quiz" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <QuizPage />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <ProfilePage />
            </Layout>
          } />
          <Route path="/demo" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <DemoPage />
            </Layout>
          } />
          <Route path="/personalized-learning" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <PersonalizedLearningPage />
            </Layout>
          } />
          <Route path="/legal" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <LegalPage />
            </Layout>
          } />
          <Route path="/terms" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <TermsPage />
            </Layout>
          } />
          <Route path="/privacy" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <PrivacyPage />
            </Layout>
          } />
          <Route path="/refund" element={
            <Layout theme={theme} toggleTheme={toggleTheme} visibility={visibility} heroSettings={heroSettings}>
              <RefundPage />
            </Layout>
          } />
          <Route path="/admin" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>}>
              <AdminPage theme={theme} toggleTheme={toggleTheme} />
            </Suspense>
          } />
          <Route path="/admin/login" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>}>
              <AdminLoginPage />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
