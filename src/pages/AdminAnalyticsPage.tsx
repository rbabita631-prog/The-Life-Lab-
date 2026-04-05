import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart, Users, Zap, Clock, FileText, TrendingUp, Loader2 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white">Analytics Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Most Popular Quiz', value: 'Daily Anatomy', icon: Zap },
          { label: 'Avg Performance', value: '78%', icon: TrendingUp },
          { label: 'Retention Rate', value: '85%', icon: Users },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                <metric.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-bold text-gray-500">{metric.label}</p>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Activity Logs */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Recent Activity Logs</h2>
        </div>
        <div className="space-y-4">
          {[
            { user: 'Babita', action: 'Completed Quiz: Pharmacology Basics', time: '2 mins ago' },
            { user: 'Student2', action: 'Saved Note: Anatomy', time: '15 mins ago' },
            { user: 'Student3', action: 'Login', time: '1 hour ago' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                <span className="text-blue-600">{log.user}</span> {log.action}
              </p>
              <p className="text-xs font-medium text-gray-500">{log.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
