import { useState, useEffect, FormEvent } from 'react';
import { Menu, X, BookOpen, GraduationCap, FileText, ClipboardList, Zap, LayoutGrid, Search, User, Sun, Moon, LogIn, Mail, Lock, UserPlus, AlertCircle, RefreshCw, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth, loginWithGoogle, loginWithEmail, signupWithEmail, logout, resetPassword } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses', icon: GraduationCap },
  { name: 'Demo', href: '/demo', icon: Youtube },
  { name: 'Test', href: '/test', icon: ClipboardList },
  { name: 'Daily Quiz', href: '/quiz', icon: Zap },
  { name: 'Notes', href: '/notes', icon: FileText },
  { name: 'Previous Paper', href: '/previous-paper', icon: BookOpen },
  { name: 'About Us', href: '/about', icon: LayoutGrid },
];

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery);
    }
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (isSignup) {
        await signupWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      setIsLoginOpen(false);
      navigate('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      setAuthError(error.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setAuthError('Please enter your email address to reset password.');
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    try {
      await resetPassword(email);
      setResetEmailSent(true);
    } catch (error: any) {
      console.error('Reset password error:', error);
      setAuthError(error.message || 'Failed to send reset email');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await loginWithGoogle();
      setIsLoginOpen(false);
      navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        console.warn('Google login popup blocked (expected in iframe).');
        setAuthError('Popup blocked by browser. Please allow popups or open the app in a new tab to login.');
      } else {
        console.error('Google login error:', error);
        setAuthError(error.message || 'Google login failed');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const mockSearchResults = [
    { title: 'NORCET 6.0 Crash Course', type: 'Course', href: '/courses' },
    { title: 'Pharmacology Notes', type: 'Note', href: '/notes' },
    { title: 'Daily Anatomy Quiz', type: 'Quiz', href: '/quiz' },
  ].filter(item => item.title.toLowerCase().includes(submittedQuery.toLowerCase()));

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-blue-600 p-1 rounded-xl group-hover:rotate-12 transition-transform overflow-hidden">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png" 
                  alt="Nursing Odyssey Logo" 
                  className="h-10 w-10 object-contain brightness-0 invert" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase">Nursing Odyssey</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all"
                >
                  {link.name}
                </button>
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
                
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {user ? (
                  <button 
                    onClick={() => navigate('/profile')}
                    className="ml-2 flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg active:scale-95"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsSignup(false);
                      setIsLoginOpen(true);
                    }}
                    className="ml-2 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg active:scale-95"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 pt-4 pb-8 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-base font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    {link.icon ? <link.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" /> : <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  {link.name}
                </button>
              ))}
              <div className="pt-6 px-2">
                {user ? (
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-2xl text-base font-black shadow-xl"
                  >
                    <User className="h-5 w-5" />
                    My Profile
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-4 rounded-2xl text-base font-black shadow-xl"
                  >
                    <User className="h-5 w-5" />
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search courses, tests, notes..."
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white pl-14 pr-12 py-4 rounded-2xl text-lg font-medium outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value === '') {
                        setSubmittedQuery('');
                      }
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <p className="w-full text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Popular Searches</p>
                  {['NORCET 6.0', 'Pharmacology', 'Anatomy', 'NCLEX Prep', 'Daily Quiz'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setSubmittedQuery(tag);
                      }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {submittedQuery && (
                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Results</p>
                    <div className="space-y-2">
                      {mockSearchResults.length > 0 ? (
                        mockSearchResults.map((result, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(result.href);
                              setIsSearchOpen(false);
                            }}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{result.title}</p>
                                <p className="text-xs font-medium text-gray-500">{result.type}</p>
                              </div>
                            </div>
                            <Zap className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                          </button>
                        ))
                      ) : (
                        <p className="text-sm font-medium text-gray-500 py-4 text-center">No results found for "{submittedQuery}"</p>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login / Signup Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 lg:p-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    {isForgotPassword ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}
                  </h2>
                  <button 
                    onClick={() => {
                      setIsLoginOpen(false);
                      setIsForgotPassword(false);
                      setResetEmailSent(false);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
                  >
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </div>

                {authError && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-xs font-bold">{authError}</p>
                  </div>
                )}
                
                {resetEmailSent ? (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      We've sent a password reset link to <span className="font-bold text-gray-900 dark:text-white">{email}</span>.
                    </p>
                    <button
                      onClick={() => {
                        setIsForgotPassword(false);
                        setResetEmailSent(false);
                      }}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                    >
                      Back to Login
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={isForgotPassword ? handleResetPassword : handleAuth}>
                    {!isForgotPassword && isSignup && (
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            required
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-blue-500 text-gray-900 dark:text-white pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          required
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-blue-500 text-gray-900 dark:text-white pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    {!isForgotPassword && (
                      <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                          {!isSignup && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsForgotPassword(true);
                                setAuthError(null);
                              }}
                              className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              Forgot Password?
                            </button>
                          )}
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            required
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 focus:border-blue-500 text-gray-900 dark:text-white pl-14 pr-6 py-4 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}
                    <button 
                      disabled={authLoading}
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {authLoading ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        isForgotPassword ? <Mail className="h-5 w-5" /> : isSignup ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />
                      )}
                      {isForgotPassword ? 'Send Reset Link' : isSignup ? 'Create Account' : 'Sign In'}
                    </button>
                  </form>
                )}

                {!isForgotPassword && !resetEmailSent && (
                  <>
                    <div className="mt-6">
                      <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                        </div>
                        <span className="relative px-4 bg-white dark:bg-gray-900 text-[10px] font-black text-gray-400 uppercase tracking-widest">Or continue with</span>
                      </div>
                      
                      <button 
                        onClick={handleGoogleLogin}
                        disabled={authLoading}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white py-4 rounded-2xl text-sm font-black hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                        Google
                      </button>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                        {isSignup ? 'Already have an account?' : "Don't have an account?"} 
                        <button 
                          onClick={() => {
                            setIsSignup(!isSignup);
                            setAuthError(null);
                          }}
                          className="text-blue-600 hover:underline ml-1"
                        >
                          {isSignup ? 'Login' : 'Sign Up'}
                        </button>
                      </p>
                    </div>
                  </>
                )}
                
                {isForgotPassword && !resetEmailSent && (
                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-center text-sm font-bold text-gray-500 dark:text-gray-400">
                      Remember your password? 
                      <button 
                        onClick={() => {
                          setIsForgotPassword(false);
                          setAuthError(null);
                        }}
                        className="text-blue-600 hover:underline ml-1"
                      >
                        Back to Login
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
