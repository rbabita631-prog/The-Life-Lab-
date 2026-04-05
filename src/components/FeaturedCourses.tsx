import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Users, Clock, ArrowRight, X, CheckCircle2, Play, BookOpen, Award, GraduationCap, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'courses');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredCourses = activeTab === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeTab);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-bold">Loading Courses...</p>
      </div>
    );
  }

  return (
    <section id="courses" className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Featured <span className="text-blue-600">Courses</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
              Handpicked premium courses to accelerate your learning and career growth.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'NORCET', 'NCLEX', 'Foundation', 'State Exams'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
            <GraduationCap className="h-16 w-16 text-gray-200 dark:text-gray-800 mx-auto mb-6" />
            <p className="text-xl font-black text-gray-400">No courses found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-white text-gray-900 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      Quick Preview
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <span className="text-sm font-black text-gray-900 dark:text-white">{course.rating}</span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{course.students} Students</span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-6">
                    <img src={course.instructor.image} alt={course.instructor.name} className="h-10 w-10 rounded-full object-cover border-2 border-blue-100 dark:border-gray-800" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-sm font-black text-gray-900 dark:text-white leading-none mb-1">{course.instructor.name}</p>
                      <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{course.instructor.role}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-gray-900 dark:text-white">{course.price}</span>
                      <span className="ml-2 text-sm text-gray-400 line-through font-bold">{course.originalPrice}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-3 rounded-xl hover:scale-110 transition-all active:scale-95 shadow-lg"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white lg:text-gray-500 lg:bg-gray-100 lg:hover:bg-gray-200 transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Modal Left: Image & Quick Info */}
              <div className="lg:w-2/5 relative">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover min-h-[300px]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 self-start">
                    {selectedCourse.category}
                  </span>
                  <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                    {selectedCourse.title}
                  </h2>
                  <div className="flex items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-bold">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-bold">{selectedCourse.students}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Right: Details */}
              <div className="lg:w-3/5 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                <div className="space-y-10">
                  {/* Instructor */}
                  <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                    <img src={selectedCourse.instructor.image} alt={selectedCourse.instructor.name} className="h-16 w-16 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Your Instructor</p>
                      <p className="text-xl font-black text-gray-900 dark:text-white">{selectedCourse.instructor.name}</p>
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{selectedCourse.instructor.role}</p>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      What you'll learn
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedCourse.learningOutcomes.map((outcome: string, i: number) => (
                        <div key={i} className="flex gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum */}
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      Course Curriculum
                    </h4>
                    <div className="space-y-3">
                      {selectedCourse.curriculum.map((module: any, i: number) => (
                        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                          <p className="font-black text-gray-900 dark:text-white text-sm mb-2">{module.title}</p>
                          <div className="flex flex-wrap gap-2">
                            {module.topics.map((topic: string, j: number) => (
                              <span key={j} className="text-[10px] font-bold bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-600">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Course Price</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-gray-900 dark:text-white">{selectedCourse.price}</span>
                        <span className="text-lg text-gray-400 line-through font-bold">{selectedCourse.originalPrice}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handlePayment(selectedCourse)}
                      className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none hover:-translate-y-1 active:scale-95"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Razorpay type definition for window
declare global {
  interface Window {
    Razorpay: any;
  }
}

async function handlePayment(course: any) {
  try {
    // 1. Create order on server
    const amountStr = course.price.replace(/[^\d]/g, '');
    const amount = parseInt(amountStr);
    
    if (isNaN(amount) || amount <= 0) {
      alert('This course is not available for purchase or has an invalid price.');
      return;
    }

    let order;
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `receipt_${course.id}_${Date.now()}`
        })
      });

      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.indexOf("application/json") !== -1) {
        order = await response.json();
      } else {
        throw new Error('Backend API not available');
      }
    } catch (e) {
      console.warn("Backend API not available (likely static deployment like Vercel). Using mock order.");
      order = {
        id: `order_mock_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_${course.id}_${Date.now()}`
      };
    }

    if (order.id && order.id.startsWith('order_mock_')) {
      alert('Payment system is in preview mode (Razorpay keys missing/invalid or static deployment). Mock payment successful!');
      return;
    }

    // 2. Initialize Razorpay
    const options = {
      key: (import.meta as any).env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      amount: order.amount,
      currency: order.currency,
      name: 'Nursing Odyssey',
      description: `Purchase: ${course.title}`,
      image: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png',
      order_id: order.id,
      handler: function (response: any) {
        alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
        console.log('Payment success:', response);
        // Here you would typically verify the payment on your server
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#2563eb'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error: any) {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error.message}`);
  }
}
