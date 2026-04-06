import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, Loader2 } from 'lucide-react';
import { auth } from '../firebase';

interface CommentsProps {
  targetId: string;
  targetType: 'question' | 'note';
}

export default function Comments({ targetId, targetType }: CommentsProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('targetId', '==', targetId),
      where('targetType', '==', targetType),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'comments');
      setLoading(false);
    });
    return () => unsubscribe();
  }, [targetId, targetType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !auth.currentUser) return;

    try {
      await addDoc(collection(db, 'comments'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        content: newComment,
        targetId,
        targetType,
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'comments');
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
      <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6">Discussion</h4>
      
      <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ask a question or share your thoughts..."
          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all">
          <Send className="h-5 w-5" />
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="font-bold text-gray-900 dark:text-white mb-1">{comment.userName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{comment.content}</p>
              <p className="text-[10px] text-gray-400 mt-2">{comment.createdAt?.toDate().toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
