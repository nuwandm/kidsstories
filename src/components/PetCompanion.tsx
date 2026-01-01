'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { soundManager } from '@/lib/sounds';

type PetType = 'cat' | 'dog' | 'fish' | null;

interface PetCompanionProps {
  onClose: () => void;
  selectorTrigger?: number;
}

const PET_EMOJIS: Record<Exclude<PetType, null>, string> = {
  cat: '🐱',
  dog: '🐕',
  fish: '🐠',
};

const PET_HAPPY_EMOJIS: Record<Exclude<PetType, null>, string> = {
  cat: '😻',
  dog: '🐶',
  fish: '🐡',
};

export function PetCompanion({ onClose, selectorTrigger = 0 }: PetCompanionProps) {
  const [petType, setPetType] = useState<PetType>(null);
  const [showSelector, setShowSelector] = useState(true);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const lastTriggerRef = useRef(selectorTrigger);

  // Open selector when trigger changes
  useEffect(() => {
    if (selectorTrigger > lastTriggerRef.current) {
      setShowSelector(true);
      lastTriggerRef.current = selectorTrigger;
    }
  }, [selectorTrigger]);
  const [isHappy, setIsHappy] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random movement
  useEffect(() => {
    if (!petType) return;

    const movePet = () => {
      // Get random position within bounds
      const newX = Math.random() * 70 + 10; // 10-80%
      const newY = Math.random() * 60 + 20; // 20-80%
      setPosition({ x: newX, y: newY });

      // Occasionally make pet sound
      if (Math.random() < 0.3) {
        if (petType === 'cat') soundManager.playMeow();
        else if (petType === 'dog') soundManager.playBark();
        else if (petType === 'fish') soundManager.playBubble();
      }
    };

    // Initial position
    movePet();

    // Move every 3-6 seconds
    const scheduleMove = () => {
      const delay = 3000 + Math.random() * 3000;
      animationRef.current = setTimeout(() => {
        movePet();
        scheduleMove();
      }, delay);
    };
    scheduleMove();

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, [petType]);

  // Handle pet click
  const handlePetClick = useCallback(() => {
    if (!petType) return;

    setIsHappy(true);
    setShowHearts(true);
    setShowSparkles(true);
    soundManager.playPetHappy();

    setTimeout(() => setIsHappy(false), 1000);
    setTimeout(() => setShowHearts(false), 1500);
    setTimeout(() => setShowSparkles(false), 1000);
  }, [petType]);

  // Select a pet
  const selectPet = (type: Exclude<PetType, null>) => {
    setPetType(type);
    setShowSelector(false);
    soundManager.playPop();
    if (type === 'cat') soundManager.playMeow();
    else if (type === 'dog') soundManager.playBark();
    else if (type === 'fish') soundManager.playBubble();
  };

  // Pet selection screen
  if (showSelector) {
    return (
      <div className="pet-selector" ref={containerRef}>
        <div className="pet-selector-card">
          <h3 className="pet-selector-title">
            {petType ? 'Change Your Buddy!' : 'Choose Your Reading Buddy!'}
          </h3>
          <div className="pet-options">
            <button
              className={`pet-option ${petType === 'cat' ? 'selected' : ''}`}
              onClick={() => selectPet('cat')}
              onMouseEnter={() => soundManager.playHover()}
            >
              <span className="pet-option-emoji">🐱</span>
              <span className="pet-option-name">Kitty</span>
            </button>
            <button
              className={`pet-option ${petType === 'dog' ? 'selected' : ''}`}
              onClick={() => selectPet('dog')}
              onMouseEnter={() => soundManager.playHover()}
            >
              <span className="pet-option-emoji">🐕</span>
              <span className="pet-option-name">Puppy</span>
            </button>
            <button
              className={`pet-option ${petType === 'fish' ? 'selected' : ''}`}
              onClick={() => selectPet('fish')}
              onMouseEnter={() => soundManager.playHover()}
            >
              <span className="pet-option-emoji">🐠</span>
              <span className="pet-option-name">Fishy</span>
            </button>
          </div>
          <button
            className="pet-cancel-btn"
            onClick={() => petType ? setShowSelector(false) : onClose()}
            onMouseEnter={() => soundManager.playHover()}
          >
            {petType ? 'Keep Current' : 'Maybe Later'}
          </button>
        </div>
      </div>
    );
  }

  // No pet selected yet
  if (!petType) {
    return null;
  }

  // Active pet
  return (
    <>
      {/* Floating pet */}
      <div
        className={`floating-pet ${isHappy ? 'happy' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
        onClick={handlePetClick}
      >
        <span className="pet-emoji">
          {isHappy ? PET_HAPPY_EMOJIS[petType] : PET_EMOJIS[petType]}
        </span>

        {/* Hearts effect */}
        {showHearts && (
          <div className="pet-hearts">
            <span className="heart h1">❤️</span>
            <span className="heart h2">💕</span>
            <span className="heart h3">💖</span>
          </div>
        )}

        {/* Sparkles effect */}
        {showSparkles && (
          <div className="pet-sparkles">
            <span className="sparkle s1">✨</span>
            <span className="sparkle s2">⭐</span>
            <span className="sparkle s3">✨</span>
            <span className="sparkle s4">🌟</span>
          </div>
        )}

        {/* Fish bubbles */}
        {petType === 'fish' && (
          <div className="fish-bubbles">
            <span className="bubble b1">○</span>
            <span className="bubble b2">○</span>
            <span className="bubble b3">○</span>
          </div>
        )}
      </div>

      {/* Pet close button */}
      <button
        className="pet-close-btn"
        onClick={onClose}
        title="Say goodbye to pet"
      >
        👋
      </button>
    </>
  );
}
