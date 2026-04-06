import { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Clock, Award, CheckCircle2, ArrowRight, Star, ShieldCheck, Search, Share2 } from 'lucide-react';

const testSeries = [
  {
    id: 1,
    title: "NORCET 6.0 Mega Mock Test",
    questions: 200,
    completed: 150,
    duration: "180 mins",
    attempts: "12k+",
    rating: 4.9,
    tag: "Trending"
  },
  {
    id: 2,
    title: "NCLEX-RN Practice Set 1",
    questions: 75,
    completed: 25,
    duration: "120 mins",
    attempts: "8k+",
    rating: 4.8,
    tag: "International"
  },
  {
    id: 3,
    title: "ESIC Nursing Officer Special",
    questions: 100,
    completed: 0,
    duration: "90 mins",
    attempts: "5k+",
    rating: 4.7,
    tag: "New"
  },
  {
    id: 4,
    title: "Anatomy & Physiology Subject Test",
    questions: 50,
    completed: 50,
    duration: "45 mins",
    attempts: "15k+",
    rating: 4.9,
    tag: "Subject Wise"
  }
];

export default function TestPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTests = testSeries.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = (test: any) => {
    if (navigator.share) {
      navigator.share({
        title: test.title,
        text: `Check out this nursing test series: ${test.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-blue-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
              <Award className="h-4 w-4" />
              All India Ranking
            </div>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
              Premium <span className="text-blue-200">Test Series</span>
            </h1>
            <p className="text-xl text-blue-100 font-medium leading-relaxed">
              Real exam environment, detailed analysis, and All India Ranking to help you master your nursing officer exams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Tests Taken", value: "500k+" },
              { label: "Active Students", value: "50k+" },
              { label: "Success Rate", value: "94%" },
              { label: "Expert Questions", value: "25k+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Available Test Series</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredTests.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors">
                    <ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleShare(test)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                    <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {test.tag}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">{test.title}</h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                    <span>{test.completed} / {test.questions} questions completed</span>
                    <span>{Math.round((test.completed / test.questions) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(test.completed / test.questions) * 100}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold">{test.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-bold">{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-bold">{test.questions} Qs</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-bold text-gray-400 dark:text-gray-500">{test.attempts} students attempted</p>
                  <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl text-sm font-black hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                    Start Test
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Why Our Test Series?</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">The most trusted platform for nursing officer aspirants.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Detailed Solutions",
                desc: "Step-by-step explanations for every question to clear your concepts.",
                icon: ShieldCheck
              },
              {
                title: "Performance Graph",
                desc: "Track your progress with advanced analytics and subject-wise breakdown.",
                icon: Award
              },
              {
                title: "All India Ranking",
                desc: "Compare your performance with thousands of students across India.",
                icon: Star
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white mb-4">{feature.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
