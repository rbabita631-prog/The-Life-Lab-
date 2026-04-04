import { CheckCircle2, Award, Users, Target, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-900 group">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=2070"
                alt="Our Mentors"
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs mb-6 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <Users className="h-4 w-4" />
              <span>Who We Are</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
              Invest Aaj For Kal: <span className="text-blue-600">Empowering</span> Your Journey
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-medium">
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

            <button className="group bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-2xl text-base font-black hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center gap-3">
              Learn More About Us
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
