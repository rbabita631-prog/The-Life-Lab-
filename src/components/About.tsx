import { CheckCircle2, Award, Users, Target, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://picsum.photos/seed/mentors/800/1000"
                alt="Our Mentors"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-10 -right-10 bg-blue-600 p-10 rounded-[2.5rem] shadow-2xl z-20 text-white max-w-xs border-8 border-white">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">15+</p>
                    <p className="text-sm font-bold text-blue-100 uppercase tracking-widest">Years Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">100%</p>
                    <p className="text-sm font-bold text-blue-100 uppercase tracking-widest">Goal Oriented</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm mb-6">
              <Users className="h-5 w-5" />
              <span>Who We Are</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
              Invest Aaj For Kal: <span className="text-blue-600">Empowering</span> Your Journey
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Invest Aaj For Kal is India's Premier institution established with the sole aim to initiate, enable and empower individuals to grow up to be extraordinary professionals.
            </p>

            <div className="space-y-6 mb-12">
              {[
                'Personalized Mentorship',
                'Comprehensive Study Materials & Notes',
                'Real-time Doubt Clearing Sessions',
                'Performance Tracking & Analytics'
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 group">
                  <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-lg font-bold text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-3">
              Learn More About Us
              <ArrowRight className="h-6 w-6" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
