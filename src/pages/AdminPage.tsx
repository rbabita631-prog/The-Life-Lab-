import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Youtube, 
  LogOut, 
  LogIn, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Plus,
  Edit,
  Save,
  X,
  ChevronRight,
  FileText,
  Clock,
  Star,
  Users,
  Sun,
  Moon,
  BarChart,
  Sparkles
} from 'lucide-react';
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AdminAnalyticsPage from './AdminAnalyticsPage';
import AdminAIChat from '../components/admin/AdminAIChat';
import AdminCourseForm from '../components/admin/AdminCourseForm';
import AdminNoteForm from '../components/admin/AdminNoteForm';
import AdminQuizForm from '../components/admin/AdminQuizForm';
import AdminTestSeriesForm from '../components/admin/AdminTestSeriesForm';
import AdminQuestionForm from '../components/admin/AdminQuestionForm';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  setDoc,
  addDoc,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';

const ADMIN_EMAIL = "rbabita631@gmail.com";

type Tab = 'dashboard' | 'courses' | 'notes' | 'quizzes' | 'testSeries' | 'analytics' | 'ai' | 'settings' | 'questions' | 'enrollments' | 'users';

export default function AdminPage({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // Data states
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [testSeries, setTestSeries] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  
  // UI states
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [editingItem, setEditingItem] = useState<{ type: Tab; data: any } | null>(null);
  const [showAddModal, setShowAddModal] = useState<Tab | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
        navigate('/admin/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Real-time listeners
  useEffect(() => {
    if (!user) return;

    const unsubInquiries = onSnapshot(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')), 
      (s) => setInquiries(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => {
        console.error('Inquiries permission error:', e);
        setStatus({ type: 'error', message: 'Permission Denied: You do not have access to view inquiries.' });
      }
    );

    const unsubUsers = onSnapshot(collection(db, 'users'), 
      (s) => setUsers(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Users error:', e)
    );

    const unsubCourses = onSnapshot(query(collection(db, 'courses'), orderBy('createdAt', 'desc')), 
      (s) => setCourses(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Courses error:', e)
    );

    const unsubNotes = onSnapshot(query(collection(db, 'notes'), orderBy('createdAt', 'desc')), 
      (s) => setNotes(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Notes error:', e)
    );

    const unsubQuizzes = onSnapshot(query(collection(db, 'quizzes'), orderBy('createdAt', 'desc')), 
      (s) => setQuizzes(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Quizzes error:', e)
    );

    const unsubTestSeries = onSnapshot(query(collection(db, 'testSeries'), orderBy('createdAt', 'desc')), 
      (s) => setTestSeries(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Test Series error:', e)
    );

    const unsubQuestions = onSnapshot(query(collection(db, 'questions'), orderBy('createdAt', 'desc')), 
      (s) => setQuestions(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Questions error:', e)
    );

    const unsubEnrollments = onSnapshot(query(collection(db, 'enrollments'), orderBy('enrolledAt', 'desc')), 
      (s) => setEnrollments(s.docs.map(d => ({ id: d.id, ...d.data() }))),
      (e) => console.error('Enrollments error:', e)
    );

    const unsubSettings = onSnapshot(doc(db, 'settings', 'visibility'), 
      (s) => setSettings(s.data()),
      (e) => console.error('Settings error:', e)
    );

    return () => {
      unsubInquiries();
      unsubUsers();
      unsubCourses();
      unsubNotes();
      unsubQuizzes();
      unsubTestSeries();
      unsubQuestions();
      unsubEnrollments();
      unsubSettings();
    };
  }, [user]);

  const handleSyncVideos = async () => {
    setSyncing(true);
    setStatus(null);
    try {
      const response = await fetch('/api/latest-videos');
      if (!response.ok) throw new Error('Failed to fetch from YouTube API');
      const videos = await response.json();

      for (const video of videos) {
        await setDoc(doc(db, 'videos', video.id), {
          ...video,
          updatedAt: serverTimestamp()
        });
      }
      setStatus({ type: 'success', message: `Successfully synced ${videos.length} videos to Firebase!` });
    } catch (error: any) {
      console.error('Sync error:', error);
      setStatus({ type: 'error', message: 'Failed to sync videos. Check console for details.' });
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${coll.slice(0, -1)}?`)) return;
    try {
      await deleteDoc(doc(db, coll, id));
      setStatus({ type: 'success', message: 'Deleted successfully' });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${coll}/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`min-h-screen bg-[#f8fafc] dark:bg-[#020817] transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 dark:bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Admin Header */}
      <header className="bg-white/70 dark:bg-[#020817]/70 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">Command Center</h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin Node 01</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-2xl border border-gray-200/20 dark:border-gray-700/20">
            {[
              { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
              { id: 'courses', label: 'Courses', icon: GraduationCap },
              { id: 'notes', label: 'Notes', icon: BookOpen },
              { id: 'quizzes', label: 'Quizzes', icon: ClipboardList },
              { id: 'questions', label: 'Bank', icon: Plus },
              { id: 'testSeries', label: 'Series', icon: FileText },
              { id: 'enrollments', label: 'Sales', icon: Users },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Stats', icon: BarChart },
              { id: 'ai', label: 'AI', icon: Sparkles },
              { id: 'settings', label: 'Config', icon: Sun },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all relative group ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm border border-gray-200/50 dark:border-gray-700/50' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden xl:flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-black text-xs">
                {user.displayName?.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-gray-900 dark:text-white leading-none">{user.displayName?.split(' ')[0]}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme}
                className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <button
                onClick={logout}
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all group border border-transparent hover:border-red-100 dark:hover:border-red-900/50"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Messages */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-2xl flex items-center gap-4 border backdrop-blur-xl shadow-lg ${
              status.type === 'success' 
                ? 'bg-green-50/80 dark:bg-green-900/30 border-green-200/50 dark:border-green-800/50 text-green-700 dark:text-green-400' 
                : 'bg-red-50/80 dark:bg-red-900/30 border-red-200/50 dark:border-red-800/50 text-red-700 dark:text-red-400'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            <p className="font-bold">{status.message}</p>
            <button onClick={() => setStatus(null)} className="ml-auto"><X className="h-4 w-4" /></button>
          </motion.div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome back, {user.displayName?.split(' ')[0]}! 👋</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Here's what's happening with your platform today.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white dark:bg-gray-900 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">System Online</span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { label: 'Total Students', value: users.length, icon: Users, color: 'blue', trend: '+12%' },
                { label: 'Study Papers', value: notes.filter(n => n.type === 'paper').length, icon: FileText, color: 'purple', trend: '+5%' },
                { label: 'Active Quizzes', value: quizzes.length, icon: ClipboardList, color: 'orange', trend: '+8%' },
                { label: 'Test Series', value: testSeries.length, icon: BookOpen, color: 'pink', trend: '+3%' },
                { label: 'Courses', value: courses.length, icon: GraduationCap, color: 'green', trend: '+2%' },
              ].map((metric, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }} 
                  className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-[2rem] shadow-sm border border-white/50 dark:border-gray-800/50 group hover:border-blue-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-${metric.color}-500/10 text-${metric.color}-600 dark:text-${metric.color}-400`}>
                      <metric.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded-lg">{metric.trend}</span>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white font-mono tracking-tighter">{metric.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Quick Actions & Sync */}
              <div className="lg:col-span-1 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-sm border border-white/50 dark:border-gray-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-500/10 rounded-xl">
                      <Youtube className="h-5 w-5 text-red-600" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Content Sync</h2>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8 leading-relaxed">
                    Automatically pull the latest educational content from your YouTube channel.
                  </p>
                  <button
                    disabled={syncing}
                    onClick={handleSyncVideos}
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                  >
                    {syncing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
                    Sync YouTube Channel
                  </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-sm border border-white/50 dark:border-gray-800/50">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Add Course', icon: Plus, tab: 'courses' },
                      { label: 'New Quiz', icon: ClipboardList, tab: 'quizzes' },
                      { label: 'Upload Note', icon: FileText, tab: 'notes' },
                      { label: 'AI Chat', icon: Sparkles, tab: 'ai' },
                    ].map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(action.tab as Tab)}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-500/30 hover:bg-white dark:hover:bg-gray-800 transition-all group"
                      >
                        <action.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 mb-2 transition-colors" />
                        <span className="text-[10px] font-black text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white uppercase tracking-widest">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Inquiries Section */}
              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/50 dark:border-gray-800/50 overflow-hidden h-full flex flex-col">
                  <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/30 dark:bg-gray-900/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-xl">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-black text-gray-900 dark:text-white">Recent Inquiries</h2>
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {inquiries.length} Pending
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-gray-100 dark:divide-gray-800">
                    {inquiries.length === 0 ? (
                      <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No inquiries found.</p>
                      </div>
                    ) : (
                      inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-8 hover:bg-white dark:hover:bg-gray-800/50 transition-all group relative">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-black text-xs">
                                {inquiry.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-sm font-black text-gray-900 dark:text-white mb-0.5">{inquiry.name}</h4>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{inquiry.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                {inquiry.createdAt?.toDate().toLocaleDateString()}
                              </span>
                              <button 
                                onClick={() => handleDelete('inquiries', inquiry.id)} 
                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{inquiry.message}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Manage Courses</h2>
              <button 
                onClick={() => setShowAddModal('courses')}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
              >
                <Plus className="h-5 w-5" />
                Add New Course
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} key={course.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] group hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => setEditingItem({ type: 'courses', data: course })}
                        className="bg-white/90 p-2 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete('courses', course.id)} className="bg-white/90 p-2 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 block">{course.category}</span>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-1">{course.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-gray-900 dark:text-white">{course.price}</span>
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Notes & Papers</h2>
              <button 
                onClick={() => setShowAddModal('notes')}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
              >
                <Plus className="h-5 w-5" />
                Add Document
              </button>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {notes.map((note) => (
                  <div key={note.id} className="p-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1">{note.title}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{note.type}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{note.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setEditingItem({ type: 'notes', data: note })}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <a href={note.pdfUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                        <ChevronRight className="h-6 w-6" />
                      </a>
                      <button onClick={() => handleDelete('notes', note.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Quiz Engine</h2>
              <button 
                onClick={() => setShowAddModal('quizzes')}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
              >
                <Plus className="h-5 w-5" />
                Create Quiz
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {quizzes.map((quiz) => (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={quiz.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                      <ClipboardList className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingItem({ type: 'quizzes', data: quiz })}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete('quizzes', quiz.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6 line-clamp-2">{quiz.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{quiz.questions.length} Questions</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{quiz.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Question Bank Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Question Bank</h2>
              <button 
                onClick={() => setShowAddModal('questions')}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
              >
                <Plus className="h-5 w-5" />
                Add Question
              </button>
            </div>
            
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {questions.map((q) => (
                  <div key={q.id} className="p-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                        <Plus className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1">{q.question}</h4>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{q.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleDelete('questions', q.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === 'enrollments' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Course Enrollments</h2>
            
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {enrollments.map((e) => (
                  <div key={e.id} className="p-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1">User: {e.userId}</h4>
                        <p className="text-sm font-bold text-gray-500">Course: {e.courseId}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {e.enrolledAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">User Management</h2>
            
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50 overflow-hidden">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((u) => (
                  <div key={u.id} className="p-8 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1">{u.name || 'Anonymous'}</h4>
                        <p className="text-sm font-bold text-gray-500">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{u.role || 'User'}</span>
                      <button onClick={() => handleDelete('users', u.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Test Series Tab */}
        {activeTab === 'testSeries' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Test Series</h2>
              <button 
                onClick={() => setShowAddModal('testSeries')}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
              >
                <Plus className="h-5 w-5" />
                Create Test Series
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testSeries.map((ts) => (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={ts.id} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-2xl">
                      <FileText className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingItem({ type: 'testSeries', data: ts })}
                        className="text-gray-400 hover:text-pink-600 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete('testSeries', ts.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{ts.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6 line-clamp-2">{ts.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                    <span className="text-xs font-black text-pink-600 uppercase tracking-widest">{ts.price}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{ts.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AdminAnalyticsPage 
            users={users} 
            courses={courses} 
            quizzes={quizzes} 
            testSeries={testSeries} 
            notes={notes} 
            inquiries={inquiries} 
          />
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && <AdminAIChat />}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Visibility Settings</h2>
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
              {settings?.visibility ? (
                Object.entries(settings.visibility).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="text-lg font-bold text-gray-900 dark:text-white capitalize">{key}</span>
                    <button
                      onClick={async () => {
                        await updateDoc(doc(db, 'settings', 'visibility'), {
                          [`visibility.${key}`]: !value
                        });
                      }}
                      className={`w-14 h-8 rounded-full transition-all ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-all ${value ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading settings...</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add Modals */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(null)} className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", bounce: 0.3, duration: 0.6 }} className="relative w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20 dark:border-gray-800/50">
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Add {showAddModal.slice(0, -1)}</h3>
                <button onClick={() => setShowAddModal(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"><X className="h-6 w-6 text-gray-400" /></button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar">
                {showAddModal === 'courses' && <AdminCourseForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Course created successfully!' }); }} />}
                {showAddModal === 'notes' && <AdminNoteForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Document added successfully!' }); }} />}
                {showAddModal === 'quizzes' && <AdminQuizForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Quiz created successfully!' }); }} />}
                {showAddModal === 'questions' && <AdminQuestionForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Question added successfully!' }); }} />}
                {showAddModal === 'testSeries' && <AdminTestSeriesForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Test Series created successfully!' }); }} />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Modals */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingItem(null)} className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", bounce: 0.3, duration: 0.6 }} className="relative w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/20 dark:border-gray-800/50">
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Edit {editingItem.type.slice(0, -1)}</h3>
                <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"><X className="h-6 w-6 text-gray-400" /></button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar">
                {editingItem.type === 'courses' && <AdminCourseForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Course updated successfully!' }); }} />}
                {editingItem.type === 'notes' && <AdminNoteForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Document updated successfully!' }); }} />}
                {editingItem.type === 'quizzes' && <AdminQuizForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Quiz updated successfully!' }); }} />}
                {editingItem.type === 'testSeries' && <AdminTestSeriesForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Test Series updated successfully!' }); }} />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Form Components







