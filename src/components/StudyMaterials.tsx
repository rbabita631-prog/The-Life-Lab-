import { useState, useEffect } from 'react';
import { ExternalLink, Lock, Search, BookOpen, Loader2, MessageSquare, X, Download } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import Comments from './Comments';

export default function StudyMaterials() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaidUser] = useState(true); // Temporarily true for testing, should be based on user profile
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<any>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'notes'), 
      where('type', '==', 'note'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notes');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-500 font-bold">Loading Notes...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Study <span className="text-blue-600">Notes</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Access high-quality class notes curated by senior nursing officers to boost your preparation.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Class Notes Repository
            </h3>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
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
                  {filteredNotes.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold">No notes found.</td>
                    </tr>
                  ) : (
                    filteredNotes.map((note) => (
                      <tr key={note.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-gray-900 dark:text-white">{note.category}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{note.title}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                            {note.createdAt?.toDate().toLocaleDateString() || 'Recently'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedNote(note)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            aria-label="Discuss Note"
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                          <button
                            disabled={note.isPremium && !isPaidUser}
                            onClick={() => window.open(note.pdfUrl, '_blank')}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                              !(note.isPremium && !isPaidUser)
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            }`}
                            aria-label="View Note"
                          >
                            {!(note.isPremium && !isPaidUser) ? <ExternalLink className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button onClick={() => setSelectedNote(null)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Close Modal">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{selectedNote.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{selectedNote.description}</p>
            <Comments targetId={selectedNote.id} targetType="note" />
          </div>
        </div>
      )}
    </section>
  );
}
