import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, Lock, Search, Filter, BookOpen, ClipboardList } from 'lucide-react';

const classNotes = [
  { id: 1, subject: 'Anatomy', topic: 'Skeletal System', date: '2024-03-20', driveLink: 'https://drive.google.com/drive/folders/1' },
  { id: 2, subject: 'Physiology', topic: 'Cardiovascular System', date: '2024-03-18', driveLink: 'https://drive.google.com/drive/folders/2' },
  { id: 3, subject: 'Pharmacology', topic: 'Antibiotics', date: '2024-03-15', driveLink: 'https://drive.google.com/drive/folders/3' },
  { id: 4, subject: 'Medical Surgical', topic: 'Endocrine Disorders', date: '2024-03-12', driveLink: 'https://drive.google.com/drive/folders/4' },
];

const previousPapers = {
  NORCET: [
    { id: 1, title: 'NORCET 2023 Shift 1', year: 2023, link: '#' },
    { id: 2, title: 'NORCET 2023 Shift 2', year: 2023, link: '#' },
    { id: 3, title: 'NORCET 2022', year: 2022, link: '#' },
  ],
  DSSSB: [
    { id: 1, title: 'DSSSB Nursing Officer 2021', year: 2021, link: '#' },
    { id: 2, title: 'DSSSB Staff Nurse 2019', year: 2019, link: '#' },
  ],
  'State Wise': [
    { id: 1, title: 'UPPSC Staff Nurse 2023', year: 2023, link: '#' },
    { id: 2, title: 'MP CHO 2022', year: 2022, link: '#' },
    { id: 3, title: 'Rajasthan CHO 2023', year: 2023, link: '#' },
  ]
};

export default function StudyMaterials() {
  const [activeTab, setActiveTab] = useState<'notes' | 'papers'>('notes');
  const [paperCategory, setPaperCategory] = useState<keyof typeof previousPapers>('NORCET');
  const [isPaidUser] = useState(false); // Mock paid status

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Study <span className="text-blue-600">Materials</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Access high-quality class notes and previous year question papers to boost your preparation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl flex gap-1">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'notes'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FileText className="h-4 w-4" />
              Class Notes
            </button>
            <button
              onClick={() => setActiveTab('papers')}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${
                activeTab === 'papers'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              Previous Papers
            </button>
          </div>
        </div>

        {activeTab === 'notes' ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Class Notes Repository
              </h3>
              {!isPaidUser && (
                <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl text-xs font-bold border border-amber-100 dark:border-amber-800">
                  <Lock className="h-4 w-4" />
                  Paid Access Only
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                      <th className="px-8 py-5 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Subject</th>
                      <th className="px-8 py-5 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Topic</th>
                      <th className="px-8 py-5 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Date Added</th>
                      <th className="px-8 py-5 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {classNotes.map((note) => (
                      <tr key={note.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-gray-900 dark:text-white">{note.subject}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{note.topic}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{note.date}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            disabled={!isPaidUser}
                            onClick={() => window.open(note.driveLink, '_blank')}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                              isPaidUser
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {isPaidUser ? <ExternalLink className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                            View Notes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-3 rounded-2xl">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-black text-gray-900 dark:text-white">Upload Your Notes</p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contribute to the community and help others learn.</p>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://drive.google.com', '_blank')}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3.5 rounded-xl text-sm font-black hover:scale-105 transition-all active:scale-95 shadow-xl"
              >
                Open Google Drive
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(previousPapers).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPaperCategory(cat as keyof typeof previousPapers)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all border ${
                    paperCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 dark:shadow-none'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousPapers[paperCategory].map((paper) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl group-hover:bg-blue-600 transition-colors">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                    </div>
                    <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{paper.year}</span>
                  </div>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6 leading-tight">
                    {paper.title}
                  </h4>
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-xl text-sm font-black hover:bg-blue-600 hover:text-white transition-all">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
