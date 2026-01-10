'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MemoryGame } from '@/components/games/MemoryGame';
import { MemoryGameMode, MemoryDifficulty } from '@/lib/types';

const modes: { value: MemoryGameMode; label: string; icon: string; description: string }[] = [
  { value: 'flags', label: 'Flags', icon: '🌍', description: 'Match country flags' },
  { value: 'animals', label: 'Animals', icon: '🦁', description: 'Match cute animals' },
  { value: 'people', label: 'Famous People', icon: '🌟', description: 'Match famous faces' },
];

const difficulties: { value: MemoryDifficulty; label: string; pairs: number; description: string }[] = [
  { value: 'easy', label: 'Easy', pairs: 4, description: '4 pairs (8 cards)' },
  { value: 'medium', label: 'Medium', pairs: 6, description: '6 pairs (12 cards)' },
  { value: 'hard', label: 'Hard', pairs: 8, description: '8 pairs (16 cards)' },
];

export default function MemoryPage() {
  const [selectedMode, setSelectedMode] = useState<MemoryGameMode>('flags');
  const [selectedDifficulty, setSelectedDifficulty] = useState<MemoryDifficulty>('easy');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
  };

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
        <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-6">
          <div className="container-story">
            <button
              onClick={handleBackToMenu}
              className="inline-flex items-center gap-2 text-purple-600 font-fredoka font-semibold hover:underline"
            >
              ← Back to Menu
            </button>
          </div>
        </header>
        <main className="container-story py-8">
          <MemoryGame
            mode={selectedMode}
            difficulty={selectedDifficulty}
            onBack={handleBackToMenu}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-12 sm:py-16">
        <div className="container-story text-center">
          <Link
            href="/play"
            className="inline-flex items-center gap-2 text-purple-600 font-fredoka font-semibold mb-4 hover:underline"
          >
            ← Back to Play
          </Link>
          <div className="inline-block mb-4 animate-bounce-gentle">
            <span className="text-6xl sm:text-7xl md:text-8xl">🃏</span>
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Memory Match
          </h1>
          <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Test your memory! Find all matching pairs!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        {/* Game Mode Selection */}
        <section className="mb-8">
          <div className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
            <h2 className="font-fredoka text-2xl font-bold text-gray-800 mb-6 text-center">
              Choose What to Match
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {modes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setSelectedMode(mode.value)}
                  className={`p-6 rounded-kid-xl border-4 transition-all ${
                    selectedMode === mode.value
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <span className="text-5xl block mb-3">{mode.icon}</span>
                  <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-1">
                    {mode.label}
                  </h3>
                  <p className="font-nunito text-gray-600 text-sm">
                    {mode.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Difficulty Selection */}
        <section className="mb-8">
          <div className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
            <h2 className="font-fredoka text-2xl font-bold text-gray-800 mb-6 text-center">
              Choose Difficulty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setSelectedDifficulty(diff.value)}
                  className={`p-6 rounded-kid-xl border-4 transition-all ${
                    selectedDifficulty === diff.value
                      ? 'border-green-500 bg-green-50 scale-105'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-1">
                    {diff.label}
                  </h3>
                  <p className="font-nunito text-gray-600 text-sm">
                    {diff.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Start Game Button */}
        <section className="text-center">
          <button
            onClick={handleStartGame}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full font-fredoka font-bold text-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>🎮</span>
            <span>Start Game!</span>
          </button>
        </section>

        {/* How to Play */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-kid-xl shadow-soft p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">❓</span>
              <h2 className="font-fredoka text-2xl font-bold text-gray-800">
                How to Play
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-2xl">1️⃣</span>
                <p className="font-nunito text-gray-700">Click on a card to flip it over</p>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">2️⃣</span>
                <p className="font-nunito text-gray-700">Click another card to find a match</p>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">3️⃣</span>
                <p className="font-nunito text-gray-700">If they match, they stay face up!</p>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">4️⃣</span>
                <p className="font-nunito text-gray-700">Find all pairs to win!</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
