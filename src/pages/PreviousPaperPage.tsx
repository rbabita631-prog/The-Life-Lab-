import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, BookOpen, ClipboardList, Shield, Zap, Search, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function PreviousPaperPage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paperCategory, setPaperCategory] = useState('NORCET');

  useEffect(() => {
    const q = query(
      collection(db, 'notes'), 
      where('type', '==', 'paper'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPapers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notes');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredPapers = papers.filter(p => p.category === paperCategory);
  const categories = ['NORCET', 'DSSSB', 'State Wise', 'Other'];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-bold">Loading Papers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Header Section */}
      <section className="pt-12 pb-16 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-black mb-6 border border-blue-100 dark:border-blue-800 uppercase tracking-widest">
              <ClipboardList className="h-4 w-4" />
              Exam Archive
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Previous Year <span className="text-blue-600">Papers</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Master your exams by practicing with authentic previous year question papers from NORCET, DSSSB, and State-wise exams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPaperCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-sm font-black transition-all border ${
                    paperCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 dark:shadow-none'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredPapers.length === 0 ? (
              <div className="py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                <FileText className="h-16 w-16 text-gray-200 dark:text-gray-800 mx-auto mb-6" />
                <p className="text-xl font-black text-gray-400">No papers found in this category.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPapers.map((paper) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all group shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                      </div>
                      <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        {paper.createdAt?.toDate().getFullYear() || 'New'}
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                      {paper.title}
                    </h4>
                    <button 
                      onClick={() => window.open(paper.pdfUrl, '_blank')}
                      className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-2xl text-sm font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <Download className="h-5 w-5" />
                      Download PDF
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Authentic Papers",
                desc: "Original question papers collected from various examination centers across India."
              },
              {
                icon: Zap,
                title: "Exam Pattern",
                desc: "Understand the weightage of topics and the difficulty level of actual exams."
              },
              {
                icon: Search,
                title: "Detailed Solutions",
                desc: "Most papers come with verified answer keys and detailed explanations."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
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
    </div>
  );
}
