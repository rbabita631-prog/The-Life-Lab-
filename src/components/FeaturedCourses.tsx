import { Star, Users, Clock, ArrowRight, ShieldCheck, X, CheckCircle2, BookOpen, GraduationCap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const courses = [
  {
    id: 1,
    title: 'Nursing Foundation',
    price: 999,
    originalPrice: 2500,
    students: '8K+',
    duration: '6 Months',
    image: 'https://picsum.photos/seed/nursing/600/400',
    tag: 'Bestseller',
    instructor: {
      name: 'Dr. Sarah Johnson',
      role: 'Senior Nursing Educator',
      image: 'https://i.pravatar.cc/150?u=sarah'
    },
    learningOutcomes: [
      'Master fundamental nursing procedures',
      'Understand patient care ethics and standards',
      'Learn vital signs monitoring and documentation',
      'Develop clinical reasoning skills'
    ],
    curriculum: [
      'Introduction to Nursing',
      'Health Assessment & Physical Examination',
      'Nursing Process & Critical Thinking',
      'Pharmacology Basics for Nurses',
      'Infection Control & Safety'
    ]
  },
  {
    id: 2,
    title: 'NORCET 2026 Special',
    price: 1999,
    originalPrice: 6000,
    students: '4K+',
    duration: '12 Months',
    image: 'https://picsum.photos/seed/norcet/600/400',
    tag: 'New',
    instructor: {
      name: 'Prof. Michael Chen',
      role: 'Competitive Exam Specialist',
      image: 'https://i.pravatar.cc/150?u=michael'
    },
    learningOutcomes: [
      'Complete coverage of NORCET syllabus',
      'Advanced MCQ solving techniques',
      'Time management strategies for exams',
      'Regular mock tests and performance analysis'
    ],
    curriculum: [
      'Anatomy & Physiology Deep Dive',
      'Medical-Surgical Nursing Mastery',
      'Psychiatric & Mental Health Nursing',
      'Community Health Nursing',
      'Previous Year Question Analysis'
    ]
  },
  {
    id: 3,
    title: 'NCLEX Mastery Course',
    price: 2499,
    originalPrice: 8000,
    students: '2K+',
    duration: '8 Months',
    image: 'https://picsum.photos/seed/nclex/600/400',
    tag: 'Popular',
    instructor: {
      name: 'Dr. Emily White',
      role: 'International Nursing Consultant',
      image: 'https://i.pravatar.cc/150?u=emily'
    },
    learningOutcomes: [
      'Prepare for the Next Generation NCLEX (NGN)',
      'Master clinical judgment models',
      'Understand US healthcare standards',
      'Pass NCLEX-RN on your first attempt'
    ],
    curriculum: [
      'Safe and Effective Care Environment',
      'Health Promotion and Maintenance',
      'Psychosocial Integrity',
      'Physiological Integrity',
      'NGN Case Study Practice'
    ]
  }
];

export default function FeaturedCourses() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">
              <ShieldCheck className="h-5 w-5" />
              <span>Premium Learning</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">Featured Courses</h2>
            <p className="text-lg text-gray-500 mt-4 max-w-xl">
              Hand-picked courses designed to help you master your subjects and clear your exams with confidence at Life Lab.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors">
            View All Courses
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {course.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-blue-50 transition-colors"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-gray-900">₹{course.price}</span>
                    <span className="text-sm text-gray-400 line-through font-medium">₹{course.originalPrice}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Course Details Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative h-48 sm:h-64 flex-shrink-0">
                <img
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                    {selectedCourse.tag}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {selectedCourse.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
                <div className="grid lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                    {/* Learning Outcomes */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900">What you'll learn</h4>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {selectedCourse.learningOutcomes.map((outcome, i) => (
                          <div key={i} className="flex gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 font-medium text-sm leading-relaxed">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curriculum */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900">Course Curriculum</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedCourse.curriculum.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-4">
                              <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-xs font-black text-blue-600 shadow-sm border border-gray-100">
                                {i + 1}
                              </span>
                              <span className="text-gray-700 font-bold text-sm">{item}</span>
                            </div>
                            <Clock className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-8">
                    {/* Instructor */}
                    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        <h4 className="text-lg font-black text-gray-900">Instructor</h4>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedCourse.instructor.image}
                          alt={selectedCourse.instructor.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="font-black text-gray-900">{selectedCourse.instructor.name}</div>
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedCourse.instructor.role}</div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
                      <div className="mb-6">
                        <div className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Full Course Access</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black">₹{selectedCourse.price}</span>
                          <span className="text-blue-200 line-through text-sm font-bold">₹{selectedCourse.originalPrice}</span>
                        </div>
                      </div>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 text-blue-200" />
                          Lifetime Access
                        </li>
                        <li className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 text-blue-200" />
                          Certificate of Completion
                        </li>
                        <li className="flex items-center gap-2 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4 text-blue-200" />
                          24/7 Support
                        </li>
                      </ul>
                      <button className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black text-sm shadow-lg hover:bg-blue-50 transition-all active:scale-95">
                        Enroll Now
                      </button>
                    </div>
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
