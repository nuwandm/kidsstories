'use client';

import { useState, useEffect, useCallback } from 'react';
import { MemoryGameMode, MemoryDifficulty } from '@/lib/types';
import { saveMemoryHighScore, getMemoryHighScore } from '@/lib/storage';

interface MemoryGameProps {
  mode: MemoryGameMode;
  difficulty: MemoryDifficulty;
  onBack: () => void;
}

interface Card {
  id: string;
  value: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const gameData: Record<MemoryGameMode, { value: string; emoji: string }[]> = {
  flags: [
    { value: 'Japan', emoji: '🇯🇵' },
    { value: 'France', emoji: '🇫🇷' },
    { value: 'Brazil', emoji: '🇧🇷' },
    { value: 'Kenya', emoji: '🇰🇪' },
    { value: 'Australia', emoji: '🇦🇺' },
    { value: 'USA', emoji: '🇺🇸' },
    { value: 'India', emoji: '🇮🇳' },
    { value: 'Italy', emoji: '🇮🇹' },
  ],
  animals: [
    { value: 'Lion', emoji: '🦁' },
    { value: 'Elephant', emoji: '🐘' },
    { value: 'Penguin', emoji: '🐧' },
    { value: 'Dolphin', emoji: '🐬' },
    { value: 'Butterfly', emoji: '🦋' },
    { value: 'Eagle', emoji: '🦅' },
    { value: 'Tiger', emoji: '🐯' },
    { value: 'Owl', emoji: '🦉' },
  ],
  people: [
    { value: 'Scientist', emoji: '👩‍🔬' },
    { value: 'Artist', emoji: '🎨' },
    { value: 'Astronaut', emoji: '🧑‍🚀' },
    { value: 'Inventor', emoji: '💡' },
    { value: 'Musician', emoji: '🎹' },
    { value: 'Explorer', emoji: '🧭' },
    { value: 'Writer', emoji: '✍️' },
    { value: 'Teacher', emoji: '👨‍🏫' },
  ],
};

const difficultyPairs: Record<MemoryDifficulty, number> = {
  easy: 4,
  medium: 6,
  hard: 8,
};

export function MemoryGame({ mode, difficulty, onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [highScore, setHighScore] = useState<{ moves: number; time: number } | null>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    const existingHighScore = getMemoryHighScore(mode, difficulty);
    if (existingHighScore) {
      setHighScore({ moves: existingHighScore.moves, time: existingHighScore.time });
    }
  }, [mode, difficulty]);

  // Timer
  useEffect(() => {
    if (isGameComplete) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameComplete]);

  const initializeGame = useCallback(() => {
    const pairCount = difficultyPairs[difficulty];
    const selectedData = gameData[mode].slice(0, pairCount);

    // Create pairs
    const cardPairs: Card[] = [];
    selectedData.forEach((item, index) => {
      cardPairs.push({
        id: `${index}-a`,
        value: item.value,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        id: `${index}-b`,
        value: item.value,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setIsGameComplete(false);
    setIsProcessing(false);
  }, [mode, difficulty]);

  const handleCardClick = (cardId: string) => {
    if (isProcessing) return;

    const clickedCard = cards.find((c) => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      setIsProcessing(true);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);

          // Check if game is complete
          const remainingCards = cards.filter(
            (c) => !c.isMatched && c.id !== firstId && c.id !== secondId
          );
          if (remainingCards.length === 0) {
            handleGameComplete();
          }
        }, 500);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const handleGameComplete = () => {
    setIsGameComplete(true);

    // Save high score
    saveMemoryHighScore({
      mode,
      difficulty,
      moves: moves + 1, // +1 because state hasn't updated yet
      time,
      date: new Date().toISOString(),
    });

    // Refresh high score
    const newHighScore = getMemoryHighScore(mode, difficulty);
    if (newHighScore) {
      setHighScore({ moves: newHighScore.moves, time: newHighScore.time });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const gridCols = difficulty === 'easy' ? 'grid-cols-4' : difficulty === 'medium' ? 'grid-cols-4' : 'grid-cols-4';

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <div className="bg-white rounded-kid-xl shadow-soft p-4 sm:p-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <p className="font-nunito text-gray-500 text-sm">Moves</p>
            <p className="font-fredoka text-3xl font-bold text-purple-600">{moves}</p>
          </div>
          <div className="text-center">
            <p className="font-nunito text-gray-500 text-sm">Time</p>
            <p className="font-fredoka text-3xl font-bold text-pink-600">{formatTime(time)}</p>
          </div>
          <div className="text-center">
            <p className="font-nunito text-gray-500 text-sm">Pairs Found</p>
            <p className="font-fredoka text-3xl font-bold text-green-600">
              {cards.filter((c) => c.isMatched).length / 2} / {difficultyPairs[difficulty]}
            </p>
          </div>
        </div>
        {highScore && (
          <div className="mt-4 text-center">
            <p className="font-nunito text-gray-500 text-sm">
              Best: {highScore.moves} moves in {formatTime(highScore.time)}
            </p>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className={`grid ${gridCols} gap-3 sm:gap-4 max-w-2xl mx-auto`}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isFlipped || card.isMatched || isProcessing}
            className={`aspect-square rounded-kid-lg shadow-soft transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-white rotate-0 scale-100'
                : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105 hover:shadow-soft-xl'
            } ${card.isMatched ? 'opacity-75 ring-4 ring-green-400' : ''}`}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="flex flex-col items-center justify-center h-full p-2">
                <span className="text-4xl sm:text-5xl">{card.emoji}</span>
                <span className="font-fredoka text-xs sm:text-sm text-gray-600 mt-1 truncate w-full text-center">
                  {card.value}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-3xl sm:text-4xl text-white">❓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          onClick={initializeGame}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-fredoka font-bold hover:scale-105 transition-all"
        >
          <span>🔄</span>
          <span>Restart Game</span>
        </button>
      </div>

      {/* Win Modal */}
      {isGameComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-kid-xl shadow-2xl p-8 max-w-md w-full text-center animate-bounce-gentle">
            <span className="text-7xl mb-4 block">🎉</span>
            <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
              You Won!
            </h2>
            <div className="space-y-2 mb-6">
              <p className="font-nunito text-lg text-gray-600">
                Moves: <span className="font-bold text-purple-600">{moves}</span>
              </p>
              <p className="font-nunito text-lg text-gray-600">
                Time: <span className="font-bold text-pink-600">{formatTime(time)}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={initializeGame}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-fredoka font-bold hover:scale-105 transition-all"
              >
                <span>🔄</span>
                <span>Play Again</span>
              </button>
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-fredoka font-bold hover:scale-105 transition-all"
              >
                <span>🏠</span>
                <span>Back to Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
