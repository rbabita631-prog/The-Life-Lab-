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
  BarChart
} from 'lucide-react';
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AdminAnalyticsPage from './AdminAnalyticsPage';
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

type Tab = 'dashboard' | 'courses' | 'notes' | 'quizzes' | 'testSeries' | 'analytics';

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

    return () => {
      unsubInquiries();
      unsubUsers();
      unsubCourses();
      unsubNotes();
      unsubQuizzes();
      unsubTestSeries();
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
      <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-xl">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          </div>
          
          {/* Desktop Tabs */}
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'courses', label: 'Courses', icon: GraduationCap },
              { id: 'notes', label: 'Notes & Papers', icon: BookOpen },
              { id: 'quizzes', label: 'Quizzes', icon: ClipboardList },
              { id: 'testSeries', label: 'Test Series', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
              <p className="text-sm font-black text-gray-900 dark:text-white">{user.displayName}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all group"
            >
              <LogOut className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
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
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-600' },
                { label: 'Previous Papers', value: notes.filter(n => n.type === 'paper').length, icon: FileText, color: 'text-purple-600' },
                { label: 'Tests/Quizzes', value: quizzes.length, icon: ClipboardList, color: 'text-orange-600' },
                { label: 'Test Series', value: testSeries.length, icon: BookOpen, color: 'text-pink-600' },
                { label: 'Total Courses', value: courses.length, icon: GraduationCap, color: 'text-green-600' },
              ].map((metric, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50">
                  <div className={`mb-4 ${metric.color}`}>
                    <metric.icon className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{metric.label}</p>
                  <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">{metric.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Youtube className="h-6 w-6 text-red-600" />
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Content Sync</h2>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8 leading-relaxed">
                    Sync the latest videos from your YouTube channel.
                  </p>
                  <button
                    disabled={syncing}
                    onClick={handleSyncVideos}
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-200 dark:shadow-none flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {syncing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
                    Sync YouTube
                  </button>
                </motion.div>
              </div>

              <div className="lg:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50 overflow-hidden">
                  <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-black text-gray-900 dark:text-white">User Inquiries</h2>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black">
                      {inquiries.length} Total
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {inquiries.length === 0 ? (
                      <div className="p-20 text-center text-gray-400 font-bold">No inquiries found.</div>
                    ) : (
                      inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-8 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-black text-gray-900 dark:text-white mb-1">{inquiry.name}</h4>
                              <p className="text-sm font-bold text-blue-600">{inquiry.email}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                {inquiry.createdAt?.toDate().toLocaleDateString()}
                              </span>
                              <button onClick={() => handleDelete('inquiries', inquiry.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{inquiry.message}</p>
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
        {activeTab === 'analytics' && <AdminAnalyticsPage />}
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
                {showAddModal === 'courses' && <AddCourseForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Course created successfully!' }); }} />}
                {showAddModal === 'notes' && <AddNoteForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Document added successfully!' }); }} />}
                {showAddModal === 'quizzes' && <AddQuizForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Quiz created successfully!' }); }} />}
                {showAddModal === 'testSeries' && <AddTestSeriesForm onComplete={() => { setShowAddModal(null); setStatus({ type: 'success', message: 'Test Series created successfully!' }); }} />}
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
                {editingItem.type === 'courses' && <AddCourseForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Course updated successfully!' }); }} />}
                {editingItem.type === 'notes' && <AddNoteForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Document updated successfully!' }); }} />}
                {editingItem.type === 'quizzes' && <AddQuizForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Quiz updated successfully!' }); }} />}
                {editingItem.type === 'testSeries' && <AddTestSeriesForm initialData={editingItem.data} onComplete={() => { setEditingItem(null); setStatus({ type: 'success', message: 'Test Series updated successfully!' }); }} />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Form Components
function AddCourseForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const courseData = {
      title: formData.get('title'),
      category: formData.get('category'),
      price: `₹${formData.get('price')}`,
      originalPrice: `₹${formData.get('originalPrice')}`,
      image: formData.get('image') || 'https://picsum.photos/seed/course/800/600',
      students: initialData?.students || '0',
      rating: initialData?.rating || 5.0,
      duration: formData.get('duration') || '10+ Hours',
      instructor: {
        name: formData.get('instructorName') || 'Expert Faculty',
        role: formData.get('instructorRole') || 'Nursing Specialist',
        image: 'https://picsum.photos/seed/instructor/200/200'
      },
      learningOutcomes: [
        formData.get('outcome1') || 'Comprehensive coverage of topics',
        formData.get('outcome2') || 'Practice questions and mock tests'
      ],
      curriculum: initialData?.curriculum || [{ title: 'Introduction', topics: ['Welcome to the course'] }],
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'courses', initialData.id), courseData);
      } else {
        await addDoc(collection(db, 'courses'), {
          ...courseData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save course');
      handleFirestoreError(err, OperationType.WRITE, 'courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-bold">{error}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Course Title</label>
          <input name="title" required defaultValue={initialData?.title} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" defaultValue={initialData?.category || 'NORCET'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option>NORCET</option>
            <option>NCLEX</option>
            <option>Foundation</option>
            <option>State Exams</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
          <input name="price" type="number" required defaultValue={initialData?.price?.replace('₹', '')} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Original Price (₹)</label>
          <input name="originalPrice" type="number" required defaultValue={initialData?.originalPrice?.replace('₹', '')} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Instructor Name</label>
          <input name="instructorName" defaultValue={initialData?.instructor?.name} placeholder="e.g. Dr. Smith" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Instructor Role</label>
          <input name="instructorRole" defaultValue={initialData?.instructor?.role} placeholder="e.g. Senior Faculty" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Duration</label>
          <input name="duration" defaultValue={initialData?.duration} placeholder="e.g. 45+ Hours" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Image URL (Optional)</label>
          <input name="image" defaultValue={initialData?.image} placeholder="https://picsum.photos/seed/course/800/600" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Learning Outcome 1</label>
          <input name="outcome1" defaultValue={initialData?.learningOutcomes?.[0]} placeholder="e.g. Master Anatomy" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Learning Outcome 2</label>
          <input name="outcome2" defaultValue={initialData?.learningOutcomes?.[1]} placeholder="e.g. Practice MCQs" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Course' : 'Create Course'}
      </button>
    </form>
  );
}

function AddNoteForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const noteData = {
      title: formData.get('title'),
      type: formData.get('type'),
      category: formData.get('category'),
      pdfUrl: formData.get('pdfUrl'),
      isPremium: formData.get('isPremium') === 'on',
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'notes', initialData.id), noteData);
      } else {
        await addDoc(collection(db, 'notes'), {
          ...noteData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save document');
      handleFirestoreError(err, OperationType.WRITE, 'notes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-bold">{error}</p>
        </div>
      )}
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Document Title</label>
        <input name="title" required defaultValue={initialData?.title} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Type</label>
          <select name="type" defaultValue={initialData?.type || 'note'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option value="note">Study Note</option>
            <option value="paper">Previous Paper</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" defaultValue={initialData?.category || 'NORCET'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option>NORCET</option>
            <option>DSSSB</option>
            <option>State Wise</option>
            <option>Pharmacology</option>
            <option>Anatomy</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">PDF URL</label>
        <input name="pdfUrl" required defaultValue={initialData?.pdfUrl} placeholder="https://example.com/file.pdf" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
      </div>
      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        <input type="checkbox" name="isPremium" id="isPremium" defaultChecked={initialData?.isPremium} className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
        <label htmlFor="isPremium" className="text-sm font-bold text-gray-700 dark:text-gray-300">Mark as Premium (Paid)</label>
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Document' : 'Add Document'}
      </button>
    </form>
  );
}

function AddQuizForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const quizData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      questions: [
        {
          question: formData.get('q1'),
          options: [formData.get('o1a'), formData.get('o1b'), formData.get('o1c'), formData.get('o1d')],
          correctAnswer: parseInt(formData.get('c1') as string),
          explanation: formData.get('e1') || 'No explanation provided.'
        }
      ],
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'quizzes', initialData.id), quizData);
      } else {
        await addDoc(collection(db, 'quizzes'), {
          ...quizData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save quiz');
      handleFirestoreError(err, OperationType.WRITE, 'quizzes');
    } finally {
      setLoading(false);
    }
  };

  const firstQuestion = initialData?.questions?.[0] || {};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-bold">{error}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Quiz Title</label>
          <input name="title" required defaultValue={initialData?.title} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" defaultValue={initialData?.category || 'Anatomy'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option>Anatomy</option>
            <option>Pharmacology</option>
            <option>Medical Surgical</option>
            <option>Pediatrics</option>
            <option>OBG</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
        <textarea name="description" defaultValue={initialData?.description} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all min-h-[100px]" />
      </div>
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
        <h4 className="text-sm font-black text-blue-600 mb-4">Sample Question</h4>
        <div className="space-y-4">
          <input name="q1" required defaultValue={firstQuestion.question} placeholder="Question text" className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
          <div className="grid grid-cols-2 gap-4">
            <input name="o1a" required defaultValue={firstQuestion.options?.[0]} placeholder="Option 1" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
            <input name="o1b" required defaultValue={firstQuestion.options?.[1]} placeholder="Option 2" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
            <input name="o1c" required defaultValue={firstQuestion.options?.[2]} placeholder="Option 3" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
            <input name="o1d" required defaultValue={firstQuestion.options?.[3]} placeholder="Option 4" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Correct Answer</label>
              <select name="c1" defaultValue={firstQuestion.correctAnswer || '0'} className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold">
                <option value="0">Option 1</option>
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
                <option value="3">Option 4</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Explanation</label>
              <input name="e1" defaultValue={firstQuestion.explanation} placeholder="Why is this correct?" className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold" />
            </div>
          </div>
        </div>
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Quiz' : 'Create Quiz'}
      </button>
    </form>
  );
}

function AddTestSeriesForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const tsData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      price: `₹${formData.get('price')}`,
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'testSeries', initialData.id), tsData);
      } else {
        await addDoc(collection(db, 'testSeries'), {
          ...tsData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save test series');
      handleFirestoreError(err, OperationType.WRITE, 'testSeries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-bold">{error}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Title</label>
          <input name="title" required defaultValue={initialData?.title} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" defaultValue={initialData?.category || 'Anatomy'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option>Anatomy</option>
            <option>Pharmacology</option>
            <option>Medical Surgical</option>
            <option>Pediatrics</option>
            <option>OBG</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
        <input name="price" type="number" required defaultValue={initialData?.price?.replace('₹', '')} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
      </div>
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
        <textarea name="description" defaultValue={initialData?.description} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all min-h-[100px]" />
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Test Series' : 'Create Test Series'}
      </button>
    </form>
  );
}
