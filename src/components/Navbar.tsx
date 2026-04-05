import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, GraduationCap, FileText, ClipboardList, Zap, LayoutGrid, Search, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Paid Courses', href: '#courses', icon: GraduationCap },
  { name: 'Free Test Series', href: '#', icon: ClipboardList },
  { name: 'Free Quiz', href: '#', icon: Zap },
  { name: 'Class Notes', href: '#study-materials', icon: FileText },
  { name: 'Test Series', href: '#', icon: ClipboardList },
  { name: 'Current Affairs', href: '#', icon: Zap },
  { name: 'Quick Links', href: '#', icon: LayoutGrid },
  { name: 'Previous Year', href: '#study-materials', icon: BookOpen },
];

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="bg-blue-600 p-1 rounded-xl group-hover:rotate-12 transition-transform overflow-hidden">
              <img src="/logo.png" alt="Nursing Odyssey Logo" className="h-10 w-10 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase">Nursing Odyssey</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-4" />
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all active:scale-90"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              
              <button className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all">
                <Search className="h-5 w-5" />
              </button>
              
              <button className="ml-2 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg active:scale-95">
                <User className="h-4 w-4" />
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 pt-4 pb-8 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                    }
                    handleNavClick(link.href);
                  }}
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    {link.icon ? <link.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" /> : <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  {link.name}
                </a>
              ))}
              <div className="pt-6 px-2">
                <button className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl text-base font-black shadow-xl">
                  <User className="h-5 w-5" />
                  Login / Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
