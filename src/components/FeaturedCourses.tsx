import { Star, Users, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const courses = [
  {
    id: 1,
    title: 'Nursing Foundation',
    price: 999,
    originalPrice: 2500,
    students: '8K+',
    duration: '6 Months',
    image: 'https://picsum.photos/seed/nursing/600/400',
    tag: 'Bestseller'
  },
  {
    id: 2,
    title: 'NORCET 2026 Special',
    price: 1999,
    originalPrice: 6000,
    students: '4K+',
    duration: '12 Months',
    image: 'https://picsum.photos/seed/norcet/600/400',
    tag: 'New'
  },
  {
    id: 3,
    title: 'NCLEX Mastery Course',
    price: 2499,
    originalPrice: 8000,
    students: '2K+',
    duration: '8 Months',
    image: 'https://picsum.photos/seed/nclex/600/400',
    tag: 'Popular'
  }
];

export default function FeaturedCourses() {
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
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-blue-50 transition-colors">
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
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
