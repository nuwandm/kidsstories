'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Story } from '@/lib/types';
import { soundManager } from '@/lib/sounds';
import { getNextStory } from '@/content/storyIndex';
import { PetCompanion } from './PetCompanion';

const FULLSCREEN_KEY = 'kidsstories_fullscreen_mode';

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
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [showPet, setShowPet] = useState(false);
  const [petSelectorTrigger, setPetSelectorTrigger] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideUITimeout = useRef<NodeJS.Timeout | null>(null);
  const hasCheckedFullscreen = useRef(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);

  const totalPages = story.pages.length;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  // Get next story for the "Next Story" button
  const nextStory = getNextStory(story.slug);

  // Disable scroll restoration to suppress Next.js warnings about position: fixed
  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  // Auto-restore fullscreen mode when navigating between stories
  useEffect(() => {
    if (hasCheckedFullscreen.current) return;
    hasCheckedFullscreen.current = true;

    const shouldRestoreFullscreen = sessionStorage.getItem(FULLSCREEN_KEY) === 'true';
    if (shouldRestoreFullscreen && !document.fullscreenElement && containerRef.current) {
      // Try to automatically enter fullscreen (navigation click counts as user gesture)
      const attemptFullscreen = async () => {
        try {
          await containerRef.current?.requestFullscreen();
          sessionStorage.removeItem(FULLSCREEN_KEY);
        } catch (error) {
          // If auto-enter fails, show prominent prompt
          setShowFullscreenPrompt(true);
          sessionStorage.removeItem(FULLSCREEN_KEY);
        }
      };

      // Small delay to ensure DOM is ready
      setTimeout(attemptFullscreen, 100);
    }
  }, []);

  // Handle fullscreen restore from prompt
  const handleRestoreFullscreen = useCallback(async () => {
    setShowFullscreenPrompt(false);
    soundManager.playClick();
    try {
      await containerRef.current?.requestFullscreen();
    } catch {
      // Fullscreen not available
    }
  }, []);

  const dismissFullscreenPrompt = useCallback(() => {
    setShowFullscreenPrompt(false);
    soundManager.playClick();
  }, []);

  // Auto-focus the fullscreen button when prompt shows
  const fullscreenBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (showFullscreenPrompt && fullscreenBtnRef.current) {
      fullscreenBtnRef.current.focus();
    }
  }, [showFullscreenPrompt]);

  // Auto-hide UI after inactivity (always active in immersive mode)
  const resetUITimer = useCallback(() => {
    setShowUI(true);
    if (hideUITimeout.current) {
      clearTimeout(hideUITimeout.current);
    }
    hideUITimeout.current = setTimeout(() => {
      setShowUI(false);
    }, 3000);
  }, []);

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

  // Toggle browser fullscreen (OS-level fullscreen)
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen API not available - do nothing, immersive mode is always on
    }
    resetUITimer();
  }, [resetUITimer]);

  // Listen for browser fullscreen changes (just for icon state)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setIsBrowserFullscreen(isFullscreen);
      // Update sessionStorage when fullscreen changes (so we know current state)
      if (isFullscreen) {
        sessionStorage.setItem(FULLSCREEN_KEY, 'true');
      } else {
        sessionStorage.removeItem(FULLSCREEN_KEY);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Navigate to next story while preserving fullscreen mode
  const navigateToNextStory = useCallback(() => {
    if (!nextStory) return;
    playClickSound();
    // Save fullscreen state before navigating
    if (document.fullscreenElement) {
      sessionStorage.setItem(FULLSCREEN_KEY, 'true');
    }
    router.push(`/stories/${nextStory.slug}`);
  }, [nextStory, playClickSound, router]);

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
          // Browser handles Escape for fullscreen exit automatically
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, toggleFullscreen, resetUITimer]);

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
      className="book-reader-fullscreen fullscreen-active"
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
          <a
            href="/"
            className="control-btn close-btn"
            title="Back to Home"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="btn-label">Home</span>
          </a>
        </div>

        <div className="header-center">
          <h1 className="book-title">{story.title}</h1>
        </div>

        <div className="header-right">
          <button
            onClick={() => {
              playClickSound();
              if (showPet) {
                // If pet is already showing, trigger the selector
                setPetSelectorTrigger(prev => prev + 1);
              } else {
                setShowPet(true);
              }
            }}
            onMouseEnter={playHoverSound}
            className="control-btn pet-toggle-btn"
            title={showPet ? "Change reading buddy" : "Get a reading buddy!"}
          >
            🐾
          </button>
          <button
            onClick={() => { playClickSound(); setSoundEnabled(!soundEnabled); }}
            onMouseEnter={playHoverSound}
            className="control-btn"
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            onClick={() => { playClickSound(); toggleFullscreen(); }}
            onMouseEnter={playHoverSound}
            className="control-btn"
            title={isBrowserFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen (F)'}
          >
            {isBrowserFullscreen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            )}
          </button>
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
            <svg className="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="nav-ripple"></span>
          </button>

          <button
            onClick={nextPage}
            onMouseEnter={() => !isLastPage && playHoverSound()}
            disabled={isLastPage || isFlipping}
            className={`nav-btn nav-next ${isLastPage ? 'disabled' : ''}`}
            aria-label="Next page"
          >
            <svg className="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="nav-ripple"></span>
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
              {nextStory && (
                <button
                  className="action-btn next-story"
                  onClick={navigateToNextStory}
                  onMouseEnter={playHoverSound}
                >
                  ✨ Next Story
                </button>
              )}
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

      {/* Pet Companion */}
      {showPet && (
        <PetCompanion
          onClose={() => setShowPet(false)}
          selectorTrigger={petSelectorTrigger}
        />
      )}

      {/* Fullscreen restore prompt */}
      {showFullscreenPrompt && (
        <div className="fullscreen-prompt">
          <div className="fullscreen-prompt-card">
            <span className="fullscreen-prompt-icon">📺</span>
            <p className="fullscreen-prompt-text">
              You were reading in fullscreen mode.
              <br />
              Continue in fullscreen?
            </p>
            <div className="fullscreen-prompt-actions">
              <button
                ref={fullscreenBtnRef}
                className="fullscreen-prompt-btn primary"
                onClick={handleRestoreFullscreen}
                autoFocus
              >
                ✨ Yes, Continue Fullscreen
              </button>
              <button
                className="fullscreen-prompt-btn secondary"
                onClick={dismissFullscreenPrompt}
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
