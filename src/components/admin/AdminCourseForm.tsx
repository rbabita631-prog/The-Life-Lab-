import { useState, FormEvent } from 'react';
import { AlertCircle } from 'lucide-react';
import { serverTimestamp, doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';

export default function AdminCourseForm({ onComplete, initialData }: { onComplete: () => void, initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const courseData = {
      title: formData.get('title'),
      category: formData.get('category'),
      price: `₹${formData.get('price')}`,
      originalPrice: `₹${formData.get('originalPrice')}`,
      image: formData.get('image') || 'https://picsum.photos/seed/course/800/600',
      students: initialData?.students || '0',
      rating: initialData?.rating || 5.0,
      duration: formData.get('duration') || '10+ Hours',
      instructor: {
        name: formData.get('instructorName') || 'Expert Faculty',
        role: formData.get('instructorRole') || 'Nursing Specialist',
        image: 'https://picsum.photos/seed/instructor/200/200'
      },
      learningOutcomes: [
        formData.get('outcome1') || 'Comprehensive coverage of topics',
        formData.get('outcome2') || 'Practice questions and mock tests'
      ],
      curriculum: initialData?.curriculum || [{ title: 'Introduction', topics: ['Welcome to the course'] }],
      updatedAt: serverTimestamp()
    };

    try {
      if (initialData) {
        await updateDoc(doc(db, 'courses', initialData.id), courseData);
      } else {
        await addDoc(collection(db, 'courses'), {
          ...courseData,
          createdAt: serverTimestamp()
        });
      }
      onComplete();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save course');
      handleFirestoreError(err, OperationType.WRITE, 'courses');
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
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Course Title</label>
          <input name="title" required defaultValue={initialData?.title} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
          <select name="category" defaultValue={initialData?.category || 'NORCET'} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all">
            <option>NORCET</option>
            <option>NCLEX</option>
            <option>Foundation</option>
            <option>State Exams</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
          <input name="price" type="number" required defaultValue={initialData?.price?.replace('₹', '')} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Original Price (₹)</label>
          <input name="originalPrice" type="number" required defaultValue={initialData?.originalPrice?.replace('₹', '')} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Instructor Name</label>
          <input name="instructorName" defaultValue={initialData?.instructor?.name} placeholder="e.g. Dr. Smith" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Instructor Role</label>
          <input name="instructorRole" defaultValue={initialData?.instructor?.role} placeholder="e.g. Senior Faculty" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Duration</label>
          <input name="duration" defaultValue={initialData?.duration} placeholder="e.g. 45+ Hours" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Image URL (Optional)</label>
          <input name="image" defaultValue={initialData?.image} placeholder="https://picsum.photos/seed/course/800/600" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Learning Outcome 1</label>
          <input name="outcome1" defaultValue={initialData?.learningOutcomes?.[0]} placeholder="e.g. Master Anatomy" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Learning Outcome 2</label>
          <input name="outcome2" defaultValue={initialData?.learningOutcomes?.[1]} placeholder="e.g. Practice MCQs" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none disabled:opacity-50">
        {loading ? 'Saving...' : initialData ? 'Update Course' : 'Create Course'}
      </button>
    </form>
  );
}
