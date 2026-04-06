import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Timer, Trophy, ChevronRight, BookOpen, Target, Star, Loader2, Play, CheckCircle2, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuizzes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'quizzes');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedQuiz && !showResults && timeLeft !== null && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && selectedQuiz && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, selectedQuiz, showResults]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = (quiz: any) => {
    if (!quiz.questions || quiz.questions.length === 0) {
      alert("This quiz has no questions yet.");
      return;
    }
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
    // Set timer based on number of questions (e.g., 1 minute per question)
    setTimeLeft(quiz.questions.length * 60);
  };

  const handleAnswer = (answerIndex: number) => {
    const newUserAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newUserAnswers);

    if (answerIndex === selectedQuiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < selectedQuiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-bold">Loading Quizzes...</p>
      </div>
    );
  }

  if (selectedQuiz && !showResults) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{selectedQuiz.title}</h2>
                <p className="text-sm font-bold text-blue-600">Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</p>
              </div>
              <div className="flex items-center gap-4">
                {timeLeft !== null && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                    <Timer className="h-5 w-5" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setSelectedQuiz(null);
                    setShowResults(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <XCircle className="h-8 w-8" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </div>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-black text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <Trophy className="h-12 w-12 text-yellow-600" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Quiz Completed!</h2>
            <p className="text-xl font-bold text-gray-500 mb-8">Your Score: <span className="text-blue-600">{score}/{selectedQuiz.questions.length}</span></p>
            
            <div className="grid gap-4 mb-12 text-left">
              {selectedQuiz.questions.map((q: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="font-bold text-gray-900 dark:text-white mb-4">{idx + 1}. {q.question}</p>
                  <div className="grid gap-2">
                    {q.options.map((option: string, optIdx: number) => {
                      const isSelected = userAnswers[idx] === optIdx;
                      const isCorrect = optIdx === q.correctAnswer;
                      const isWrong = isSelected && !isCorrect;

                      return (
                        <div
                          key={optIdx}
                          className={`p-4 rounded-xl border-2 font-bold ${
                            isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
                            isWrong ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                            'border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}. {option}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedQuiz(null);
                setShowResults(false);
              }}
              className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header Section */}
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
          </div>

          {quizzes.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <Zap className="h-16 w-16 text-gray-200 dark:text-gray-800 mx-auto mb-6" />
              <p className="text-xl font-black text-gray-400">No quizzes available yet. Check back later!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {quizzes.map((quiz, idx) => (
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
                      {quiz.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-amber-600 transition-colors">{quiz.title}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Timer className="h-4 w-4" />
                      <span className="text-sm font-bold">{quiz.questions?.length || 0} Min</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-bold">{quiz.questions?.length || 0} Qs</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-bold text-gray-400 dark:text-gray-500">New Quiz</p>
                    <button 
                      onClick={() => handleStartQuiz(quiz)}
                      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl text-sm font-black hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2"
                    >
                      Start Quiz
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
