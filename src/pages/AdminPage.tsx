import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Youtube, 
  Github,
  LogOut, 
  LogIn, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { auth, db, loginWithGoogle, loginWithGithub, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';

const ADMIN_EMAIL = "rbabita631@gmail.com";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'inquiries');
      });
      return () => unsubscribe();
    }
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

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-gray-900 p-12 rounded-[3rem] shadow-2xl text-center border border-gray-100 dark:border-gray-800"
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Admin Portal</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed">
            Please sign in with your authorized admin account to access the dashboard.
          </p>
          <div className="space-y-4">
            <button
              onClick={loginWithGoogle}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3"
            >
              <LogIn className="h-6 w-6" />
              Sign in with Google
            </button>
            <button
              onClick={loginWithGithub}
              className="w-full bg-gray-800 text-white py-5 rounded-2xl text-lg font-black hover:bg-gray-900 transition-all shadow-xl shadow-gray-200 dark:shadow-none flex items-center justify-center gap-3"
            >
              <Github className="h-6 w-6" />
              Sign in with GitHub
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-xl">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          </div>
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Messages */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-2xl flex items-center gap-4 border ${
              status.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-700 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            <p className="font-bold">{status.message}</p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Youtube className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-black text-gray-900 dark:text-white">Content Sync</h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8 leading-relaxed">
                Sync the latest videos from your YouTube channel directly to your Firebase database.
              </p>
              <button
                disabled={syncing}
                onClick={handleSyncVideos}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl shadow-red-200 dark:shadow-none flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {syncing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
                Sync YouTube to Firebase
              </button>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
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
                  <div className="p-20 text-center">
                    <p className="text-gray-400 font-bold">No inquiries found yet.</p>
                  </div>
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
                          <button
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                        {inquiry.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
