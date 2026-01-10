'use client';

import { useState, useEffect } from 'react';
import { FunFact } from '@/lib/types';
import { toggleSaveFunFact, isFunFactSaved } from '@/lib/storage';
import funFactsData from '@/content/fun-facts/facts.json';

const categoryIcons: Record<string, string> = {
  Science: '🔬',
  Nature: '🌿',
  Animals: '🐾',
  Geography: '🗺️',
  Space: '🚀',
  History: '📜',
};

const categoryColors: Record<string, string> = {
  Science: 'from-blue-400 to-indigo-400',
  Nature: 'from-green-400 to-emerald-400',
  Animals: 'from-orange-400 to-amber-400',
  Geography: 'from-cyan-400 to-teal-400',
  Space: 'from-purple-400 to-violet-400',
  History: 'from-yellow-400 to-orange-400',
};

export function DailyFunFact() {
  const [fact, setFact] = useState<FunFact | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get today's fact based on date
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const factIndex = dayOfYear % funFactsData.length;
    const todaysFact = funFactsData[factIndex] as FunFact;
    setFact(todaysFact);
    setIsSaved(isFunFactSaved(todaysFact.id));
  }, []);

  const handleSave = () => {
    if (!fact) return;
    setIsAnimating(true);
    const saved = toggleSaveFunFact(fact.id);
    setIsSaved(saved);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!fact) return null;

  const icon = categoryIcons[fact.category] || '💡';
  const colorClass = categoryColors[fact.category] || 'from-purple-400 to-pink-400';

  return (
    <div className="bg-white rounded-kid-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClass} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <span className="font-fredoka font-bold">Did You Know?</span>
          </div>
          <span className="text-sm opacity-90 font-nunito">{fact.category}</span>
        </div>
      </div>

      {/* Fact Content */}
      <div className="p-6">
        <p className="font-nunito text-lg text-gray-700 leading-relaxed mb-4">
          {fact.fact}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
              isSaved
                ? 'bg-pink-100 text-pink-600'
                : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
            } ${isAnimating ? 'scale-110' : 'scale-100'}`}
          >
            <span className={`text-xl ${isAnimating ? 'animate-bounce' : ''}`}>
              {isSaved ? '❤️' : '🤍'}
            </span>
            <span>{isSaved ? 'Saved!' : 'Save'}</span>
          </button>

          <span className="text-xs text-gray-400 font-nunito">
            New fact every day!
          </span>
        </div>
      </div>
    </div>
  );
}
