import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { auth, loginWithGoogle } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = "rbabita631@gmail.com";

export default function AdminLoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        navigate('/admin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAdminLogin = async () => {
    setAuthError(null);
    try {
      const result = await loginWithGoogle();
      if (result.user.email !== ADMIN_EMAIL) {
        setAuthError("Access Denied: This account is not authorized to access the Admin Dashboard.");
      } else {
        // Ensure the user document exists with admin role
        try {
          const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
          const { db } = await import('../firebase');
          await setDoc(doc(db, 'users', result.user.uid), {
            email: result.user.email,
            displayName: result.user.displayName,
            role: 'admin',
            lastLogin: serverTimestamp()
          }, { merge: true });
        } catch (docErr) {
          console.error('Error updating user document:', docErr);
          // We don't block navigation if this fails, but it might cause permission issues later
        }
        navigate('/admin');
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      setAuthError(error.message || "Login failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

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

        {authError && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-left">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-xs font-bold">{authError}</p>
          </div>
        )}

        <button
          onClick={handleAdminLogin}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3"
        >
          <LogIn className="h-6 w-6" />
          Sign in with Google
        </button>
        
        <div className="mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
