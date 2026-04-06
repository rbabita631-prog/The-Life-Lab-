import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Zap, 
  Clock, 
  FileText, 
  TrendingUp, 
  Loader2, 
  BookOpen, 
  ClipboardList,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function AdminAnalyticsPage({ 
  users, 
  courses, 
  quizzes, 
  testSeries, 
  notes, 
  inquiries 
}: { 
  users: any[], 
  courses: any[], 
  quizzes: any[], 
  testSeries: any[], 
  notes: any[], 
  inquiries: any[] 
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for charts - in a real app, this would be derived from Firestore timestamps
  const chartData = [
    { name: 'Mon', users: 400, inquiries: 24 },
    { name: 'Tue', users: 300, inquiries: 13 },
    { name: 'Wed', users: 200, inquiries: 98 },
    { name: 'Thu', users: 278, inquiries: 39 },
    { name: 'Fri', users: 189, inquiries: 48 },
    { name: 'Sat', users: 239, inquiries: 38 },
    { name: 'Sun', users: 349, inquiries: 43 },
  ];

  const distributionData = [
    { name: 'Courses', value: courses.length, color: '#3b82f6' },
    { name: 'Quizzes', value: quizzes.length, color: '#8b5cf6' },
    { name: 'Tests', value: testSeries.length, color: '#ec4899' },
    { name: 'Notes', value: notes.length, color: '#10b981' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-sm font-bold text-gray-500 animate-pulse uppercase tracking-widest">Gathering Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-500/20">
            <Activity className="h-3 w-3" />
            Live Intelligence
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Platform Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Real-time overview of your educational ecosystem.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 transition-all">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Students', value: users.length, icon: Users, trend: '+12%', up: true, color: 'blue' },
          { label: 'Course Revenue', value: '₹42.5k', icon: TrendingUp, trend: '+8%', up: true, color: 'green' },
          { label: 'Quiz Completion', value: '84%', icon: ClipboardList, trend: '-2%', up: false, color: 'purple' },
          { label: 'New Inquiries', value: inquiries.length, icon: Zap, trend: '+24%', up: true, color: 'orange' },
        ].map((metric, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 dark:border-gray-800/50 shadow-sm group hover:border-blue-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${metric.color}-500/10 text-${metric.color}-600 dark:text-${metric.color}-400`}>
                <metric.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black ${metric.up ? 'text-green-500' : 'text-red-500'} bg-white dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm`}>
                {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white font-mono tracking-tighter">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">User Growth</h3>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Weekly engagement metrics</p>
            </div>
            <select className="bg-gray-50 dark:bg-gray-800 border-none text-xs font-bold rounded-lg px-3 py-2 focus:ring-2 ring-blue-500/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: 'none', 
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Content Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-sm"
        >
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Content Mix</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Resource distribution</p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: 'none', 
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-3">
            {distributionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
                <span className="text-xs font-black text-gray-900 dark:text-white font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity Logs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-gray-800/50 shadow-sm"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No recent activity recorded</p>
            </div>
          ) : (
            inquiries.slice(0, 5).map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 group hover:bg-white dark:hover:bg-gray-800 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-black text-xs">
                    {log.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      <span className="text-blue-600">{log.name}</span> sent an inquiry
                    </p>
                    <p className="text-xs font-medium text-gray-500 line-clamp-1 mt-0.5">{log.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{log.createdAt?.toDate().toLocaleDateString()}</p>
                  <p className="text-[10px] font-bold text-blue-500/60 mt-1">NEW</p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
