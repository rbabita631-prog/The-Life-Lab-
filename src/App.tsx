import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedCourses from './components/FeaturedCourses';
import About from './components/About';
import Footer from './components/Footer';
import DemoPage from './pages/DemoPage';
import { motion, useScroll, useSpring } from 'motion/react';
import { Youtube, Instagram } from 'lucide-react';

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        <div id="browse">
          <CategoryGrid />
        </div>

        <div id="courses">
          <FeaturedCourses />
        </div>

        <div id="about">
          <About />
        </div>

        {/* Social Media Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-red-600 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                    Join Our <span className="text-blue-600">Community</span>
                  </h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    Stay connected with us across all platforms. Get daily updates, study materials, and expert guidance directly on your favorite social media.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <a 
                    href="https://www.youtube.com/@TheLifeLab111?sub_confirmation=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100"
                  >
                    <div className="bg-red-100 p-4 rounded-2xl group-hover:bg-red-600 transition-colors">
                      <Youtube className="h-8 w-8 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-black text-gray-900">YouTube</span>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Subscribe</span>
                  </a>

                  <a 
                    href="https://t.me/thelifelab1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100"
                  >
                    <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-500 transition-colors">
                      <svg className="h-8 w-8 text-blue-500 group-hover:text-white transition-colors fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.526.26l.214-3.04 5.53-4.995c.24-.21-.054-.327-.37-.118l-6.84 4.305-2.94-.92c-.64-.2-.65-.64.134-.946l11.49-4.428c.53-.196.994.12.802.95z"/>
                      </svg>
                    </div>
                    <span className="font-black text-gray-900">Telegram</span>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Join Group</span>
                  </a>

                  <a 
                    href="https://instagram.com/thelife" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-gray-100"
                  >
                    <div className="bg-pink-100 p-4 rounded-2xl group-hover:bg-pink-600 transition-colors">
                      <Instagram className="h-8 w-8 text-pink-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-black text-gray-900">Instagram</span>
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Follow Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to Start Your Professional Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of students who are already learning from the best. Get the latest updates and study materials directly in your inbox.
            </p>
            
            <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 shadow-2xl">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white px-8 py-5 rounded-2xl text-lg font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Subscribe Now
              </button>
            </form>
            
            <p className="mt-8 text-blue-200 text-sm font-bold uppercase tracking-widest">
              No spam, only valuable content. Guaranteed.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl z-50 hover:bg-green-600 transition-all group"
        onClick={() => window.open('https://wa.me/919876543210', '_blank')}
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Chat with us on WhatsApp
        </span>
      </motion.button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
