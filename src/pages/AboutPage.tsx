import { motion } from 'motion/react';
import { GraduationCap, Target, BookOpen, MessageCircle, BarChart3, ArrowRight, Award, Users, CheckCircle2, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { lazy, Suspense } from 'react';

const ContactForm = lazy(() => import('../components/ContactForm'));

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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900 group">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=2070"
                  alt="Our Mentors"
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
              </div>
              
              {/* Stats overlay - Compact */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl z-20 text-white max-w-[240px] border-8 border-white dark:border-gray-900">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">15+</p>
                      <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Years Experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">100%</p>
                      <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Goal Oriented</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs mb-6 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Users className="h-4 w-4" />
                <span>Who We Are</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-8 tracking-tight">
                Invest Aaj For Kal: <br />
                <span className="text-blue-600">Empowering Your Journey</span>
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
                India's Premier institution established with the sole aim to initiate, enable and empower individuals to grow up to be extraordinary professionals.
              </p>

              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-12">
                {[
                  'Personalized Mentorship',
                  'Comprehensive Notes',
                  'Real-time Doubt Clearing',
                  'Performance Analytics'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 group">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full group-hover:bg-blue-600 transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-black text-gray-800 dark:text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
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
                  loading="lazy"
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

      {/* Contact Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs mb-6 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Mail className="h-4 w-4" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                Have Questions? <br />
                <span className="text-blue-600">We're Here to Help</span>
              </h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-12">
                Whether you're curious about our courses, need help with registration, or want to discuss your career path, our team is ready to support you.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">support@nursingodyssey.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>}>
                <ContactForm />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
