import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, AlertTriangle, BookOpen, ChevronRight } from 'lucide-react';

export default function PersonalizedLearningPage() {
  const [activeTab, setActiveTab] = useState('planner');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Personalized <span className="text-blue-600">Learning</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Leverage AI to optimize your study routine and focus on what matters most.
          </p>
        </header>

        <div className="flex gap-4 mb-8 justify-center">
          {[
            { id: 'planner', label: 'AI Study Planner', icon: Brain },
            { id: 'flashcards', label: 'Smart Flashcards', icon: Zap },
            { id: 'weakness', label: 'Weakness Dashboard', icon: AlertTriangle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-black flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-xl">
          {activeTab === 'planner' && (
            <div className="text-center py-20">
              <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">AI Study Planner</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Generate a personalized study schedule based on your performance.</p>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all">Generate Schedule</button>
            </div>
          )}
          {activeTab === 'flashcards' && (
            <div className="text-center py-20">
              <Zap className="h-16 w-16 text-amber-500 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Smart Flashcards</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Quick revision for nursing terminology and drug classifications.</p>
              <button className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-amber-600 transition-all">Start Revision</button>
            </div>
          )}
          {activeTab === 'weakness' && (
            <div className="text-center py-20">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Weakness Dashboard</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Identify topics where you need more practice.</p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                {['Pediatrics', 'Pharmacology', 'Anatomy'].map(topic => (
                  <div key={topic} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p className="font-black text-gray-900 dark:text-white mb-2">{topic}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <p className="text-xs font-bold text-gray-500">40% Accuracy</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
