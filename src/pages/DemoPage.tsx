import { motion } from 'motion/react';
import { ArrowLeft, Play, Youtube, Info, Share2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const demoVideos = [
  {
    id: 'y881t8ilMyc', // Example Nursing Process
    title: 'Mastering the Nursing Process: ADPIE Explained | The Life Lab',
    description: 'A comprehensive guide to the Nursing Process (ADPIE). Essential for nursing students and professionals alike. Join The Life Lab for more!',
    views: '25K+',
    date: '2 days ago'
  },
  {
    id: 'X95lZ5n5_mI', // Example NORCET
    title: 'NORCET 2026: 90 Days Preparation Strategy | The Life Lab',
    description: 'How to crack NORCET in 90 days. Detailed subject-wise plan and recommended resources for success from @TheLifeLab111.',
    views: '18K+',
    date: '5 days ago'
  },
  {
    id: 'z0M2n0_2n0M', // Example NCLEX
    title: 'NCLEX-RN: Top 10 Tips for Success | The Life Lab',
    description: 'Our top 10 tips to help you pass the NCLEX-RN on your first attempt. Proven strategies and common pitfalls shared by @TheLifeLab111.',
    views: '30K+',
    date: '1 week ago'
  }
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm">
            <Youtube className="h-4 w-4" />
            <span>@TheLifeLab111</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Watch Our <span className="text-red-600">Latest Demos</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Get a glimpse of our teaching style and the quality of content we provide. Here are the latest 3 videos from our YouTube channel @TheLifeLab111.
          </p>
          <div className="mt-8">
            <a 
              href="https://www.youtube.com/@TheLifeLab111?sub_confirmation=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-2xl text-lg font-black hover:bg-red-700 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
            >
              <Youtube className="h-6 w-6" />
              Subscribe to Channel
            </a>
          </div>
        </motion.div>

        <div className="grid gap-12">
          {demoVideos.map((video, idx) => (
            <motion.div
              key={video.id + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row"
            >
              <div className="lg:w-2/3 aspect-video bg-black relative group">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">
                  <Play className="h-4 w-4 fill-current" />
                  <span>Latest Video</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                  {video.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                  {video.description}
                </p>
                
                <div className="flex items-center gap-6 mb-8 text-sm font-bold text-gray-400 dark:text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Youtube className="h-4 w-4" />
                    {video.views} views
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Info className="h-4 w-4" />
                    {video.date}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                    <MessageSquare className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 bg-gray-900 dark:bg-blue-900/20 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden border border-gray-800 dark:border-blue-500/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">
              Ready to Dive Deeper?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
              Our full courses include hundreds of hours of content, personalized mentorship, and comprehensive study materials.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-black hover:bg-blue-700 transition-all shadow-2xl hover:-translate-y-1 active:scale-95"
            >
              Explore Full Courses
              <Play className="h-6 w-6 fill-current" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
