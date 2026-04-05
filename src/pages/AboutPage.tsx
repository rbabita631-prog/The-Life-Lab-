import { motion } from 'motion/react';
import { GraduationCap, Target, BookOpen, MessageCircle, BarChart3, ArrowRight, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-black mb-8 border border-blue-100 dark:border-blue-800 uppercase tracking-widest"
            >
              <SparkleIcon className="h-4 w-4" />
              Who We Are
            </motion.div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
              Invest Aaj For Kal: <br />
              <span className="text-blue-600">Empowering Your Journey</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-12">
              India's Premier institution established with the sole aim to initiate, enable and empower individuals to grow up to be extraordinary professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Personalized Mentorship",
                desc: "One-on-one guidance from experienced nursing officers to keep you on the right track."
              },
              {
                icon: BookOpen,
                title: "Comprehensive Notes",
                desc: "High-yield, easy-to-understand notes covering the entire syllabus for AIIMS & beyond."
              },
              {
                icon: MessageCircle,
                title: "Real-time Doubt Clearing",
                desc: "Instant support for all your queries through our dedicated doubt-clearing sessions."
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                desc: "Detailed insights into your progress with our advanced mock test analysis tools."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                Our Mission is Your <br />
                <span className="text-blue-600">Professional Excellence</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Expert-led curriculum designed for AIIMS & NORCET",
                  "Interactive learning environment with live sessions",
                  "Regular assessment and feedback loops",
                  "Career guidance and placement support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-bold">{item}</p>
                  </div>
                ))}
              </div>
              <button className="mt-12 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none flex items-center gap-3">
                Join Our Odyssey
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
                  alt="Nursing Education"
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 hidden md:block">
                <p className="text-4xl font-black text-blue-600 mb-1">10k+</p>
                <p className="text-sm font-black text-gray-500 uppercase tracking-widest">Successful Students</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
