'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Story } from '@/lib/types';
import { soundManager } from '@/lib/sounds';

interface BookReaderProps {
  story: Story;
}

/**
 * Immersive Fullscreen Book Reader
 *
 * Features:
 * - Fullscreen reading mode (default)
 * - Single page view that fits viewport
 * - Realistic page-flip animations
 * - Sound effects for page turns
 * - Keyboard and touch navigation
 */
export function BookReader({ story }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(true); // Default to fullscreen
  const [showUI, setShowUI] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideUITimeout = useRef<NodeJS.Timeout | null>(null);

  const totalPages = story.pages.length;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  // Auto-hide UI after inactivity
  const resetUITimer = useCallback(() => {
    setShowUI(true);
    if (hideUITimeout.current) {
      clearTimeout(hideUITimeout.current);
    }
    if (isFullscreen) {
      hideUITimeout.current = setTimeout(() => {
        setShowUI(false);
      }, 3000);
    }
  }, [isFullscreen]);

  useEffect(() => {
    resetUITimer();
    return () => {
      if (hideUITimeout.current) {
        clearTimeout(hideUITimeout.current);
      }
    };
  }, [resetUITimer]);

  // Sync sound manager with local state
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Play various sounds using the sound manager
  const playPageFlipSound = useCallback(() => {
    soundManager.playPageFlip();
  }, []);

  const playClickSound = useCallback(() => {
    soundManager.playClick();
  }, []);

  const playHoverSound = useCallback(() => {
    soundManager.playHover();
  }, []);

  const playCelebrationSound = useCallback(() => {
    soundManager.playCelebration();
  }, []);

  // Navigate pages
  const nextPage = useCallback(() => {
    if (isLastPage || isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    playPageFlipSound();
    resetUITimer();

    setTimeout(() => {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setIsFlipping(false);
      // Play celebration when reaching the last page
      if (newPage === totalPages - 1) {
        setTimeout(playCelebrationSound, 300);
      }
    }, 500);
  }, [isLastPage, isFlipping, playPageFlipSound, resetUITimer, currentPage, totalPages, playCelebrationSound]);

  const prevPage = useCallback(() => {
    if (isFirstPage || isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    playPageFlipSound();
    resetUITimer();

    setTimeout(() => {
      setCurrentPage((prev) => prev - 1);
      setIsFlipping(false);
    }, 500);
  }, [isFirstPage, isFlipping, playPageFlipSound, resetUITimer]);

  // Go to specific page
  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isFlipping) return;
    setFlipDirection(page > currentPage ? 'next' : 'prev');
    setIsFlipping(true);
    playPageFlipSound();

    setTimeout(() => {
      setCurrentPage(page);
      setIsFlipping(false);
    }, 300);
  }, [currentPage, isFlipping, playPageFlipSound]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen API not available, toggle our custom fullscreen
      setIsFullscreen(!isFullscreen);
    }
    resetUITimer();
  }, [isFullscreen, resetUITimer]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetUITimer();
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          nextPage();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevPage();
          break;
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen();
          }
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, toggleFullscreen, isFullscreen, resetUITimer]);

  // Touch/swipe support
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    resetUITimer();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPage();
      else prevPage();
    }
  };

  const currentPageData = story.pages[currentPage];

  return (
    <div
      ref={containerRef}
      className={`book-reader-fullscreen ${isFullscreen ? 'fullscreen-active' : ''}`}
      onMouseMove={resetUITimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={resetUITimer}
    >
      {/* Ambient background */}
      <div className="book-ambient-bg">
        <div className="ambient-gradient" />
        <div className="ambient-particles">
          <span className="particle p1">✨</span>
          <span className="particle p2">⭐</span>
          <span className="particle p3">🌟</span>
          <span className="particle p4">✨</span>
        </div>
      </div>

      {/* Top control bar */}
      <header className={`book-header ${showUI ? 'visible' : 'hidden'}`}>
        <div className="header-left">
          <button
            onClick={() => { playClickSound(); toggleFullscreen(); }}
            onMouseEnter={playHoverSound}
            className="control-btn"
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen (F)'}
          >
            {isFullscreen ? '⛶' : '⛶'}
            <span className="btn-label">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>

        <div className="header-center">
          <h1 className="book-title">{story.title}</h1>
        </div>

        <div className="header-right">
          <button
            onClick={() => { playClickSound(); setSoundEnabled(!soundEnabled); }}
            onMouseEnter={playHoverSound}
            className="control-btn"
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          {!isFullscreen && (
            <a
              href="/"
              className="control-btn close-btn"
              title="Close"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
            >
              ✕
            </a>
          )}
        </div>
      </header>

      {/* Main book area */}
      <main className="book-main">
        {/* Page container - fits viewport */}
        <div className={`page-container ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
          {/* Book frame */}
          <div className="book-frame">
            {/* Left page edge / spine */}
            <div className="book-spine-edge" />

            {/* Main page */}
            <article className="book-page-content">
              {/* Page image - top half */}
              <div className="page-image-section">
                <Image
                  src={currentPageData.image}
                  alt={`Page ${currentPage + 1} illustration`}
                  fill
                  className="page-image"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="image-vignette" />
              </div>

              {/* Page text - bottom half */}
              <div className="page-text-section">
                {/* Page number badge */}
                <div className="page-badge">
                  <span className="page-num">{currentPage + 1}</span>
                  <span className="page-total">/ {totalPages}</span>
                </div>

                {/* Story text */}
                <div className="text-content">
                  <p className="story-paragraph">{currentPageData.text}</p>
                </div>

                {/* Decorative footer */}
                <div className="page-decoration">
                  <span>✦</span>
                  <div className="decoration-bar" />
                  <span>✦</span>
                </div>
              </div>
            </article>

            {/* Page stack effect */}
            <div className="page-stack">
              <div className="stack-page s1" />
              <div className="stack-page s2" />
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <nav className={`page-navigation ${showUI ? 'visible' : 'hidden'}`}>
          <button
            onClick={prevPage}
            onMouseEnter={() => !isFirstPage && playHoverSound()}
            disabled={isFirstPage || isFlipping}
            className={`nav-btn nav-prev ${isFirstPage ? 'disabled' : ''}`}
            aria-label="Previous page"
          >
            <span className="nav-icon">‹</span>
          </button>

          <button
            onClick={nextPage}
            onMouseEnter={() => !isLastPage && playHoverSound()}
            disabled={isLastPage || isFlipping}
            className={`nav-btn nav-next ${isLastPage ? 'disabled' : ''}`}
            aria-label="Next page"
          >
            <span className="nav-icon">›</span>
          </button>
        </nav>

        {/* Click zones for navigation */}
        <div className="click-zones">
          <div className="click-zone zone-left" onClick={prevPage} />
          <div className="click-zone zone-right" onClick={nextPage} />
        </div>
      </main>

      {/* Bottom progress bar */}
      <footer className={`book-footer ${showUI ? 'visible' : 'hidden'}`}>
        <div className="progress-wrapper">
          {/* Progress dots */}
          <div className="progress-dots">
            {story.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => { playClickSound(); goToPage(index); }}
                onMouseEnter={playHoverSound}
                className={`dot ${index === currentPage ? 'active' : ''} ${index < currentPage ? 'read' : ''}`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>

          {/* Keyboard hints */}
          <div className="keyboard-hints">
            <kbd>←</kbd>
            <kbd>→</kbd>
            <span>or tap sides</span>
          </div>
        </div>
      </footer>

      {/* End of story overlay */}
      {isLastPage && (
        <div className="story-complete-overlay">
          <div className="complete-card">
            <div className="complete-emoji">🎉</div>
            <h2 className="complete-title">The End!</h2>
            <p className="complete-message">Great job reading this story!</p>
            <div className="complete-stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="complete-actions">
              <button
                onClick={() => { playClickSound(); goToPage(0); }}
                onMouseEnter={playHoverSound}
                className="action-btn restart"
              >
                📖 Read Again
              </button>
              <a
                href="/"
                className="action-btn home"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
              >
                🏠 More Stories
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
