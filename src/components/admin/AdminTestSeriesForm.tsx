import { useState, FormEvent } from 'react';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { serverTimestamp, doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';

export default function AdminTestSeriesForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<{ title: string, questionIds: string[] }[]>(initialData?.sections || []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const tsData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      price: `₹${formData.get('price')}`,
      durationMinutes: parseInt(formData.get('durationMinutes') as string),
      sections: sections,
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'testSeries', initialData.id), tsData);
      } else {
        await addDoc(collection(db, 'testSeries'), {
          ...tsData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save test series');
      handleFirestoreError(err, OperationType.WRITE, 'testSeries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p className="text-xs font-bold">{error}</p>
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Title</label>
          <input name="title" required defaultValue={initialData?.title} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" defaultValue={initialData?.category || 'Anatomy'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option>Anatomy</option>
            <option>Pharmacology</option>
            <option>Medical Surgical</option>
            <option>Pediatrics</option>
            <option>OBG</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
          <input name="price" type="number" required defaultValue={initialData?.price?.replace('₹', '')} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Duration (Minutes)</label>
          <input name="durationMinutes" type="number" required defaultValue={initialData?.durationMinutes || 60} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Sections</label>
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-3">
            <div className="flex items-center gap-2">
              <input value={section.title} onChange={(e) => {
                const newSections = [...sections];
                newSections[sIdx].title = e.target.value;
                setSections(newSections);
              }} placeholder="Section Title" className="flex-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-sm font-bold" />
              <button type="button" onClick={() => setSections(sections.filter((_, i) => i !== sIdx))} className="text-red-600 p-2"><Trash2 className="h-5 w-5" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.questionIds.map((qId, qIdx) => (
                <div key={qIdx} className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                  {qId}
                  <button type="button" onClick={() => {
                    const newSections = [...sections];
                    newSections[sIdx].questionIds = section.questionIds.filter((_, i) => i !== qIdx);
                    setSections(newSections);
                  }}><Trash2 className="h-3 w-3" /></button>
                </div>
              ))}
              <button type="button" onClick={() => {
                const qId = prompt('Enter Question ID:');
                if (qId) {
                  const newSections = [...sections];
                  newSections[sIdx].questionIds.push(qId);
                  setSections(newSections);
                }
              }} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">+ Add Question</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setSections([...sections, { title: '', questionIds: [] }])} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">+ Add Section</button>
      </div>

      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
        <textarea name="description" defaultValue={initialData?.description} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all min-h-[100px]" />
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Test Series' : 'Create Test Series'}
      </button>
    </form>
  );
}
