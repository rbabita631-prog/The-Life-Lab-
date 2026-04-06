import { useState } from 'react';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { Bot, Send, Loader2, Sparkles } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../firebase';

const getAI = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is missing. Please add your API key to the Secrets panel in AI Studio.");
  }
  return new GoogleGenAI({ apiKey: key });
};

const createQuizTool: FunctionDeclaration = {
  name: "createQuiz",
  description: "Create a new quiz in the database. ONLY call this AFTER the user has reviewed and approved the draft.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "The title of the quiz." },
      description: { type: Type.STRING, description: "A description of the quiz." },
      category: { type: Type.STRING, description: "The category of the quiz." },
      difficulty: { type: Type.STRING, description: "The difficulty level (e.g., Easy, Medium, Hard)." },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          }
        }
      }
    },
    required: ["title", "category", "difficulty", "questions"]
  }
};

const createCourseTool: FunctionDeclaration = {
  name: "createCourse",
  description: "Create a new course in the database. ONLY call this AFTER the user has reviewed and approved the draft.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      category: { type: Type.STRING },
      difficulty: { type: Type.STRING, description: "The difficulty level (e.g., Easy, Medium, Hard)." },
      price: { type: Type.NUMBER },
      originalPrice: { type: Type.NUMBER },
      duration: { type: Type.STRING },
      instructorName: { type: Type.STRING },
      instructorRole: { type: Type.STRING },
      outcome1: { type: Type.STRING },
      outcome2: { type: Type.STRING }
    },
    required: ["title", "category", "difficulty", "price", "originalPrice"]
  }
};

const createTestSeriesTool: FunctionDeclaration = {
  name: "createTestSeries",
  description: "Create a new test series in the database. ONLY call this AFTER the user has reviewed and approved the draft.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      category: { type: Type.STRING },
      difficulty: { type: Type.STRING, description: "The difficulty level (e.g., Easy, Medium, Hard)." },
      price: { type: Type.NUMBER }
    },
    required: ["title", "category", "difficulty", "price"]
  }
};

const postQuizToTelegramTool: FunctionDeclaration = {
  name: "postQuizToTelegram",
  description: "Post a quiz to the Telegram group.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING }
          }
        }
      }
    },
    required: ["title", "questions"]
  }
};

export default function AdminAIChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Hello! I am your AI assistant. How can I help you manage your content today? I can create quizzes, test series, and courses for you.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const aiInstance = getAI();
      const response = await aiInstance.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: userMessage,
        config: {
          systemInstruction: `You are an elite, highly logical AI administrative assistant for an educational platform, modeled after advanced reasoning agents. Your primary goal is to help the admin manage content, analyze data, and create high-quality educational materials.

Core Principles:
1. Logical & Structured: Always think step-by-step. Present information using clear structures, bullet points, or markdown tables.
2. Analytical: When asked for insights, provide data-driven reasoning and clear explanations.
3. High Standard of Quality: Ensure all generated educational content is accurate, pedagogically sound, and free of errors.

Mandatory Workflow for Content Creation:
- Step 1: Gather Requirements (Ask for topic, target audience, and difficulty level if not provided).
- Step 2: Draft & Review (Generate a structured draft of the quiz, course, or test series and present it to the user).
- Step 3: Refine (Incorporate any feedback from the user).
- Step 4: Execute (ONLY call the create tools like createQuiz, createCourse, createTestSeries, postQuizToTelegram AFTER explicit user approval).

Bulk Upload & Content Management Guidance:
- For large volumes of questions (500+), advise the user to prepare a JSON file in the following format:
  [
    { "question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": 0, "explanation": "..." },
    ...
  ]
- Guide the user to use the "Upload JSON File" feature in the Quiz form for bulk uploads.
- For detailed courses, ask the user for course title, category, instructor details, learning outcomes, and an image URL (if available).
- For previous years' exam papers, ask the user for the paper title, category, and the document URL (e.g., a link to the PDF).
- For test series, ask for title, description, category, duration, and section details.

When creating quizzes, limit to 5 questions per request for drafting. Be concise, professional, and highly logical in your communication.`,
          tools: [{ functionDeclarations: [createQuizTool, createCourseTool, createTestSeriesTool, postQuizToTelegramTool] }]
        }
      });
      
      if (response.functionCalls) {
        for (const call of response.functionCalls) {
          if (call.name === 'createQuiz') {
            await addDoc(collection(db, 'quizzes'), {
              ...call.args,
              createdAt: serverTimestamp()
            });
            setMessages(prev => [...prev, { role: 'bot', text: `Quiz "${call.args.title}" created successfully!` }]);
          } else if (call.name === 'createCourse') {
            const courseData = {
              title: call.args.title,
              category: call.args.category,
              difficulty: call.args.difficulty || 'Medium',
              price: `₹${call.args.price}`,
              originalPrice: `₹${call.args.originalPrice}`,
              duration: call.args.duration || '10+ Hours',
              instructor: {
                name: call.args.instructorName || 'Expert Faculty',
                role: call.args.instructorRole || 'Nursing Specialist',
                image: 'https://picsum.photos/seed/instructor/200/200'
              },
              learningOutcomes: [
                call.args.outcome1 || 'Comprehensive coverage of topics',
                call.args.outcome2 || 'Practice questions and mock tests'
              ],
              image: 'https://picsum.photos/seed/course/800/600',
              students: '0',
              rating: 5.0,
              curriculum: [{ title: 'Introduction', topics: ['Welcome to the course'] }],
              createdAt: serverTimestamp()
            };
            await addDoc(collection(db, 'courses'), courseData);
            setMessages(prev => [...prev, { role: 'bot', text: `Course "${call.args.title}" created successfully!` }]);
          } else if (call.name === 'createTestSeries') {
            await addDoc(collection(db, 'testSeries'), {
              title: call.args.title,
              description: call.args.description,
              category: call.args.category,
              difficulty: call.args.difficulty || 'Medium',
              price: `₹${call.args.price}`,
              createdAt: serverTimestamp()
            });
            setMessages(prev => [...prev, { role: 'bot', text: `Test Series "${call.args.title}" created successfully!` }]);
          } else if (call.name === 'postQuizToTelegram') {
            await fetch('/api/telegram/post-quiz', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(call.args)
            });
            setMessages(prev => [...prev, { role: 'bot', text: `Quiz "${call.args.title}" posted to Telegram successfully!` }]);
          }
        }
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: response.text || 'Sorry, I could not generate a response.' }]);
      }
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: `An error occurred while communicating with the AI: ${error.message || 'Unknown error'}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-gray-800/50 p-8 flex flex-col h-[600px]">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-black text-gray-900 dark:text-white">AI Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'bot' && <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full h-fit"><Bot className="h-5 w-5 text-purple-600" /></div>}
            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full h-fit"><Bot className="h-5 w-5 text-purple-600" /></div>
            <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"><Loader2 className="h-5 w-5 animate-spin" /></div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-500 transition-all"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
