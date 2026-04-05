import { motion } from 'motion/react';
import { Zap, Clock, Award, CheckCircle2, ArrowRight, Star, ShieldCheck, Timer } from 'lucide-react';

const dailyQuizzes = [
  {
    id: 1,
    title: "Anatomy & Physiology Daily Quiz",
    questions: 10,
    duration: "10 mins",
    attempts: "5k+",
    rating: 4.9,
    tag: "Daily"
  },
  {
    id: 2,
    title: "Pharmacology Daily Quiz",
    questions: 10,
    duration: "10 mins",
    attempts: "3k+",
    rating: 4.8,
    tag: "Daily"
  },
  {
    id: 3,
    title: "Medical Surgical Daily Quiz",
    questions: 10,
    duration: "10 mins",
    attempts: "2k+",
    rating: 4.7,
    tag: "Daily"
  },
  {
    id: 4,
    title: "Nursing Foundations Daily Quiz",
    questions: 10,
    duration: "10 mins",
    attempts: "4k+",
    rating: 4.9,
    tag: "Daily"
  }
];

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-amber-500 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
              <Zap className="h-4 w-4" />
              Daily Practice
            </div>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
              Daily <span className="text-amber-100">Quiz</span>
            </h1>
            <p className="text-xl text-amber-50 font-medium leading-relaxed">
              Quick 10-minute quizzes to keep your knowledge sharp and your preparation on track every single day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Quizzes Taken", value: "200k+" },
              { label: "Daily Users", value: "15k+" },
              { label: "Success Rate", value: "88%" },
              { label: "Expert Questions", value: "10k+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Today's Quizzes</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl text-sm font-black">All Quizzes</button>
              <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl text-sm font-bold">Past Quizzes</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dailyQuizzes.map((quiz, idx) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-2xl group-hover:bg-amber-500 transition-colors">
                    <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400 group-hover:text-white" />
                  </div>
                  <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {quiz.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-amber-600 transition-colors">{quiz.title}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold">{quiz.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Timer className="h-4 w-4" />
                    <span className="text-sm font-bold">{quiz.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-bold">{quiz.questions} Qs</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-bold text-gray-400 dark:text-gray-500">{quiz.attempts} students attempted</p>
                  <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl text-sm font-black hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2">
                    Start Quiz
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
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Why Daily Quizzes?</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">The most trusted platform for nursing officer aspirants.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quick Revision",
                desc: "10 questions, 10 minutes. Perfect for busy aspirants.",
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
                <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-2xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
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
