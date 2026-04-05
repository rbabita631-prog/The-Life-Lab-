import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const path = 'inquiries';
    try {
      const inquiriesRef = collection(db, path);
      await addDoc(inquiriesRef, {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error saving inquiry:', error);
      setStatus('error');
      
      try {
        // This will throw the JSON error info
        handleFirestoreError(error, OperationType.CREATE, path);
      } catch (err: any) {
        try {
          const errorInfo = JSON.parse(err.message);
          setErrorMessage(`Submission failed: ${errorInfo.error || 'Please try again.'}`);
        } catch {
          setErrorMessage('Failed to send message. Please check your connection and try again.');
        }
      }
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 p-12 rounded-[3rem] text-center border border-green-100 dark:border-green-800"
      >
        <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200 dark:shadow-none">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Message Sent!</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-8">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-green-700 transition-all"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8 lg:p-12 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800">
      <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Send us a Message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="How can we help you today?"
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-blue-600 transition-all resize-none"
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-800">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">{errorMessage}</p>
          </div>
        )}

        <button
          disabled={status === 'loading'}
          type="submit"
          className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="h-6 w-6" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
