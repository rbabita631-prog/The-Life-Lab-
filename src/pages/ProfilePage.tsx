import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, BookOpen, FileText, Zap, LogOut, Loader2, Trophy, Bookmark, Clock } from 'lucide-react';
import { auth, db, logout } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'history' | 'saved' | 'bookmarks'>('history');
  
  // Mock data for now, as we haven't fully implemented saving these to Firestore yet
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [savedNotes, setSavedNotes] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // In a real app, we would fetch the user's specific data here
        // For now, we'll just use some mock data to demonstrate the UI
        setQuizHistory([
          { id: '1', title: 'Daily Anatomy Quiz', score: 8, total: 10, date: new Date().toISOString() },
          { id: '2', title: 'Pharmacology Basics', score: 10, total: 10, date: new Date(Date.now() - 86400000).toISOString() }
        ]);
        setSavedNotes([
          { id: '1', title: 'Cardiovascular System Notes', category: 'Anatomy' },
          { id: '2', title: 'Pediatric Nursing Guidelines', category: 'Pediatrics' }
        ]);
        setBookmarks([
          { id: '1', title: 'NORCET 6.0 Crash Course', type: 'Course' }
        ]);
      } else {
        navigate('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-bold">Loading Profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="h-16 w-16 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{user.displayName || 'Student'}</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Level 5</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">12 Day Streak</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl text-sm font-black hover:bg-red-100 dark:hover:bg-red-900/40 transition-all flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 custom-scrollbar">
          {[
            { id: 'history', label: 'Quiz History', icon: Clock },
            { id: 'saved', label: 'Saved Notes', icon: FileText },
            { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800 min-h-[400px]">
          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Recent Quizzes</h2>
              {quizHistory.length > 0 ? (
                <div className="space-y-4">
                  {quizHistory.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
                          <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{quiz.title}</h3>
                          <p className="text-xs text-gray-500">{new Date(quiz.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-blue-600">{quiz.score}/{quiz.total}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-12">No quiz history yet. Start practicing!</p>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Saved Notes</h2>
              {savedNotes.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {savedNotes.map((note) => (
                    <div key={note.id} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 group hover:border-blue-500 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{note.category}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{note.title}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-12">No saved notes yet.</p>
              )}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Bookmarked Courses</h2>
              {bookmarks.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 group hover:border-blue-500 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{bookmark.type}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{bookmark.title}</h3>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-12">No bookmarks yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
