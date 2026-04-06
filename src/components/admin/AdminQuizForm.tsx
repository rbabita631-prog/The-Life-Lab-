import { useState, FormEvent } from 'react';
import { AlertCircle } from 'lucide-react';
import { serverTimestamp, doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';

export default function AdminQuizForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState(initialData?.questions || [{ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const quizData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      questions: questions.map((_, i) => ({
        question: formData.get(`q${i}`),
        options: [formData.get(`o${i}a`), formData.get(`o${i}b`), formData.get(`o${i}c`), formData.get(`o${i}d`)],
        correctAnswer: parseInt(formData.get(`c${i}`) as string),
        explanation: formData.get(`e${i}`) || 'No explanation provided.'
      })),
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'quizzes', initialData.id), quizData);
      } else {
        await addDoc(collection(db, 'quizzes'), {
          ...quizData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save quiz');
      handleFirestoreError(err, OperationType.WRITE, 'quizzes');
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
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Quiz Title</label>
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
      <div>
        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
        <textarea name="description" defaultValue={initialData?.description} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all min-h-[100px]" />
      </div>
      
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
            <h4 className="text-sm font-black text-blue-600 mb-4">Question {i + 1}</h4>
            <div className="space-y-4">
              <input name={`q${i}`} required defaultValue={q.question} placeholder="Question text" className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
              <div className="grid grid-cols-2 gap-4">
                <input name={`o${i}a`} required defaultValue={q.options?.[0]} placeholder="Option 1" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
                <input name={`o${i}b`} required defaultValue={q.options?.[1]} placeholder="Option 2" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
                <input name={`o${i}c`} required defaultValue={q.options?.[2]} placeholder="Option 3" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
                <input name={`o${i}d`} required defaultValue={q.options?.[3]} placeholder="Option 4" className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-3 rounded-xl text-xs font-bold" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Correct Answer</label>
                  <select name={`c${i}`} defaultValue={q.correctAnswer || '0'} className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold">
                    <option value="0">Option 1</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Explanation</label>
                  <input name={`e${i}`} defaultValue={q.explanation} placeholder="Why is this correct?" className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl text-sm font-bold" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }])}
          className="w-full py-3 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
        >
          + Add Another Question
        </button>
      </div>
      
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Quiz' : 'Create Quiz'}
      </button>
    </form>
  );
}
