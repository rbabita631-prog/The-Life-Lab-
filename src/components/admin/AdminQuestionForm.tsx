import { useState, FormEvent } from 'react';
import { AlertCircle } from 'lucide-react';
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';

export default function AdminQuestionForm({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const questionData = {
      question: formData.get('question'),
      options: [formData.get('o1'), formData.get('o2'), formData.get('o3'), formData.get('o4')],
      correctAnswer: parseInt(formData.get('correctAnswer') as string),
      explanation: formData.get('explanation'),
      category: formData.get('category'),
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'questions'), questionData);
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save question');
      handleFirestoreError(err, OperationType.WRITE, 'questions');
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
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Question</label>
        <textarea name="question" required className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all min-h-[100px]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input name="o1" required placeholder="Option 1" className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold" />
        <input name="o2" required placeholder="Option 2" className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold" />
        <input name="o3" required placeholder="Option 3" className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold" />
        <input name="o4" required placeholder="Option 4" className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Correct Answer</label>
          <select name="correctAnswer" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold">
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold">
            <option>Anatomy</option>
            <option>Pharmacology</option>
            <option>Medical Surgical</option>
            <option>Pediatrics</option>
            <option>OBG</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Explanation</label>
        <textarea name="explanation" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all min-h-[80px]" />
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : 'Add Question'}
      </button>
    </form>
  );
}
