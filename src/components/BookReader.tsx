'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Story } from '@/lib/types';
import { soundManager } from '@/lib/sounds';
import { getNextStory } from '@/content/storyIndex';

const FULLSCREEN_KEY = 'kidsstories_fullscreen_mode';

interface BookReaderProps {
  story: Story;
}

/**
 * Immersive Fullscreen Book Reader with Tailwind CSS
 *
 * Features:
 * - Fullscreen reading mode (default)
 * - Single page view that fits viewport
 * - Realistic page-flip animations
 * - Sound effects for page turns
 * - Keyboard and touch navigation
 * - Support for text-embedded images (portrait 900x1200) and traditional layout (landscape 1200x800)
 */
export function BookReader({ story }: BookReaderProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const [showUI, setShowUI] = useState(true);
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
      const attemptFullscreen = async () => {
        try {
          await containerRef.current?.requestFullscreen();
          sessionStorage.removeItem(FULLSCREEN_KEY);
        } catch (error) {
          setShowFullscreenPrompt(true);
          sessionStorage.removeItem(FULLSCREEN_KEY);
        }
      };

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

  const fullscreenBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (showFullscreenPrompt && fullscreenBtnRef.current) {
      fullscreenBtnRef.current.focus();
    }
  }, [showFullscreenPrompt]);

  // Auto-hide UI after inactivity
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

  // Play various sounds
  const playPageFlipSound = useCallback(() => soundManager.playPageFlip(), []);
  const playClickSound = useCallback(() => soundManager.playClick(), []);
  const playHoverSound = useCallback(() => soundManager.playHover(), []);
  const playCelebrationSound = useCallback(() => soundManager.playCelebration(), []);

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

  // Toggle browser fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen API not available
    }
    resetUITimer();
  }, [resetUITimer]);

  // Listen for browser fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setIsBrowserFullscreen(isFullscreen);
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
  const hasText = currentPageData.text && currentPageData.text.trim() !== '';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#1a1a2e] overflow-hidden"
      onMouseMove={resetUITimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={resetUITimer}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at top, #2d1b4e 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, #1e3a5f 0%, transparent 50%),
              radial-gradient(ellipse at bottom left, #3d1f1f 0%, transparent 50%),
              linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)
            `
          }}
        />
        <div className="absolute inset-0">
          <span className="absolute top-[10%] left-[5%] text-2xl opacity-30 animate-[floatSlow_15s_ease-in-out_infinite]">✨</span>
          <span className="absolute top-[20%] right-[8%] text-2xl opacity-30 animate-[floatSlow_15s_ease-in-out_infinite_4s]">⭐</span>
          <span className="absolute bottom-[15%] left-[10%] text-2xl opacity-30 animate-[floatSlow_15s_ease-in-out_infinite_8s]">🌟</span>
          <span className="absolute bottom-[25%] right-[5%] text-2xl opacity-30 animate-[floatSlow_15s_ease-in-out_infinite_12s]">✨</span>
        </div>
      </div>

      {/* Top control bar */}
      <header
        className={`relative z-[100] flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/50 to-transparent transition-all duration-300 ${
          showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all hover:bg-white/20 hover:scale-105"
            title="Back to Home"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="hidden sm:inline text-sm font-fredoka">Home</span>
          </a>
        </div>

        <div className="flex-1 text-center">
          <h1 className="font-fredoka font-semibold text-white text-sm sm:text-base md:text-xl drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[40vw] sm:max-w-[50vw] md:max-w-[60vw] mx-auto">
            {story.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { playClickSound(); setSoundEnabled(!soundEnabled); }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-all hover:bg-white/20 hover:scale-105"
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            onClick={() => { playClickSound(); toggleFullscreen(); }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all hover:bg-white/20 hover:scale-105"
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
      <main className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {/* Page container */}
        <div
          className={`relative w-full max-w-[900px] h-full max-h-[calc(100vh-180px)] ${
            isFlipping
              ? flipDirection === 'next'
                ? 'animate-[flipNext_0.5s_ease-in-out]'
                : 'animate-[flipPrev_0.5s_ease-in-out]'
              : ''
          }`}
          style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
        >
          {/* Book frame */}
          <div className="relative w-full h-full flex rounded-r-2xl rounded-l-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden">
            {/* Book spine */}
            <div
              className="w-3 sm:w-5 flex-shrink-0 shadow-[inset_-3px_0_8px_rgba(0,0,0,0.4),3px_0_10px_rgba(0,0,0,0.3)]"
              style={{
                background: 'linear-gradient(90deg, #5c3d2e 0%, #8b5a42 40%, #6b4532 60%, #4a2c1a 100%)'
              }}
            />

            {/* Main page */}
            <article className={`flex-1 flex flex-col relative overflow-hidden ${
              hasText ? 'bg-gradient-to-br from-[#fef9f3] via-[#fdf6ed] to-[#fcf3e4]' : 'bg-white'
            }`}>
              {/* Paper texture overlay for pages with text */}
              {hasText && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
                  }}
                />
              )}

              {/* Page image */}
              <div className={`${
                hasText
                  ? 'relative flex-1 min-h-[40%] max-h-[55%]'
                  : 'flex-1 flex items-center justify-center p-2 sm:p-2.5 md:p-3 min-h-0'
              }`}>
                {hasText ? (
                  <Image
                    src={currentPageData.image}
                    alt={`Page ${currentPage + 1} illustration`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={currentPageData.image}
                      alt={`Page ${currentPage + 1} illustration`}
                      fill
                      className="object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.08)]"
                      priority
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                )}
                {hasText && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.1), inset 0 -30px 40px -20px rgba(252, 243, 228, 1)'
                    }}
                  />
                )}
              </div>

              {/* Page number for image-only pages */}
              {!hasText && (
                <div className="flex items-center justify-center py-1 px-2 sm:py-1.5 sm:px-3 bg-[rgba(250,250,250,0.95)] border-t border-black/5 flex-shrink-0 min-h-[20px] sm:min-h-[22px]">
                  <div className="flex items-center gap-1 font-fredoka animate-[fadeInUp_0.5s_ease-out]">
                    <span className="text-[0.5rem] sm:text-[0.5625rem] font-medium text-gray-400 uppercase tracking-wider">Page</span>
                    <span className="text-[0.625rem] sm:text-[0.6875rem] lg:text-xs font-bold text-gray-800 leading-none">{currentPage + 1}</span>
                    <span className="text-[0.5rem] sm:text-[0.5625rem] font-medium text-gray-400 lowercase">of</span>
                    <span className="text-[0.5625rem] sm:text-[0.625rem] lg:text-[0.6875rem] font-semibold text-gray-600 leading-none">{totalPages}</span>
                  </div>
                </div>
              )}

              {/* Page text section */}
              {hasText && (
                <div className="flex-1 flex flex-col px-6 py-4 sm:px-10 sm:py-6 lg:px-14 lg:py-8 bg-gradient-to-b from-[#fef9f3] to-[#fdf6ed]">
                  {/* Page number badge */}
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="font-fredoka text-2xl font-bold text-amber-800">{currentPage + 1}</span>
                    <span className="font-fredoka text-sm text-amber-700 opacity-70">/ {totalPages}</span>
                  </div>

                  {/* Story text */}
                  <div className="flex-1 flex items-center overflow-hidden">
                    <p className="font-nunito text-lg sm:text-xl lg:text-[1.375rem] leading-[1.8] sm:leading-[1.9] lg:leading-[2] text-stone-700 text-justify hyphens-auto max-h-full overflow-auto first-letter:float-left first-letter:font-fredoka first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-0.5 first-letter:text-amber-800 first-letter:drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                      {currentPageData.text}
                    </p>
                  </div>

                  {/* Decorative footer */}
                  <div className="flex items-center justify-center gap-4 mt-auto pt-3 text-amber-300/60 text-xs">
                    <span>✦</span>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
                    <span>✦</span>
                  </div>
                </div>
              )}
            </article>

            {/* Page stack effect */}
            <div className="absolute -right-1.5 top-0.5 bottom-0.5 w-1.5 pointer-events-none">
              <div className="absolute inset-0 bg-[#f5e6d3] rounded-r-[2px] opacity-80" />
              <div className="absolute inset-0 right-0.5 bg-[#f5e6d3] rounded-r-[2px] opacity-50" />
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <nav className={`absolute inset-0 flex items-center justify-between px-3 sm:px-6 pointer-events-none transition-opacity duration-300 ${
          showUI ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={prevPage}
            onMouseEnter={() => !isFirstPage && playHoverSound()}
            disabled={isFirstPage || isFlipping}
            className={`relative flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl border-2 border-white/80 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] pointer-events-auto transition-all duration-300 overflow-hidden ${
              isFirstPage
                ? 'opacity-35 cursor-not-allowed'
                : 'hover:scale-110 hover:border-purple-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.35)] active:scale-95'
            }`}
            aria-label="Previous page"
          >
            <svg className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600 relative z-10 transition-all ${
              !isFirstPage && 'group-hover:animate-[arrowBounceLeft_0.6s_ease_infinite]'
            }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-10 transition-all duration-400 rounded-full" />
          </button>

          <button
            onClick={nextPage}
            onMouseEnter={() => !isLastPage && playHoverSound()}
            disabled={isLastPage || isFlipping}
            className={`relative flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-xl border-2 border-white/80 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] pointer-events-auto transition-all duration-300 overflow-hidden ${
              isLastPage
                ? 'opacity-35 cursor-not-allowed'
                : 'hover:scale-110 hover:border-purple-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.35)] active:scale-95 animate-[subtlePulse_3s_ease-in-out_infinite]'
            }`}
            aria-label="Next page"
          >
            <svg className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600 relative z-10 transition-all ${
              !isLastPage && 'group-hover:animate-[arrowBounceRight_0.6s_ease_infinite]'
            }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 hover:opacity-10 transition-all duration-400 rounded-full" />
          </button>
        </nav>

        {/* Click zones for navigation */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1 cursor-w-resize pointer-events-auto" onClick={prevPage} />
          <div className="flex-1 cursor-e-resize pointer-events-auto" onClick={nextPage} />
        </div>
      </main>

      {/* Bottom progress bar */}
      <footer className={`relative z-[100] px-6 py-4 bg-gradient-to-t from-black/50 to-transparent transition-all duration-300 ${
        showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}>
        <div className="max-w-[600px] mx-auto">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 flex-wrap max-w-full px-2 sm:px-0">
            {story.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => { playClickSound(); goToPage(index); }}
                onMouseEnter={playHoverSound}
                className={`w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-all ${
                  index === currentPage
                    ? 'w-3.5 h-3.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                    : index < currentPage
                    ? 'bg-amber-400/60 hover:bg-amber-400/80'
                    : 'bg-white/30 hover:bg-white/60'
                } hover:scale-125`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>

          {/* Keyboard hints */}
          <div className="hidden sm:flex items-center justify-center gap-2 text-xs text-white/50 font-fredoka">
            <kbd className="px-2 py-1 bg-white/10 rounded">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
            <span>or tap sides</span>
          </div>
        </div>
      </footer>

      {/* End of story overlay */}
      {isLastPage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xl z-[200] animate-[fadeIn_0.5s_ease]">
          <div className="text-center px-6 py-8 sm:px-12 sm:py-10 mx-4 max-w-[calc(100vw-2rem)] bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.3)] animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <div className="text-6xl sm:text-7xl mb-4 animate-[bounce_0.6s_ease_infinite]">🎉</div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-amber-900 mb-2">The End!</h2>
            <p className="font-nunito text-lg sm:text-xl text-amber-800 mb-4">Great job reading this story!</p>
            <div className="flex justify-center gap-2 text-4xl mb-6">
              <span className="opacity-0 animate-[starPop_0.5s_ease_forwards_0.3s]">⭐</span>
              <span className="opacity-0 animate-[starPop_0.5s_ease_forwards_0.5s]">⭐</span>
              <span className="opacity-0 animate-[starPop_0.5s_ease_forwards_0.7s]">⭐</span>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => { playClickSound(); goToPage(0); }}
                onMouseEnter={playHoverSound}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-fredoka font-semibold bg-amber-800 text-white transition-all hover:scale-105 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
              >
                📖 Read Again
              </button>
              {nextStory && (
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-fredoka font-semibold bg-gradient-to-br from-purple-500 to-pink-500 text-white transition-all hover:scale-105 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                  onClick={navigateToNextStory}
                  onMouseEnter={playHoverSound}
                >
                  ✨ Next Story
                </button>
              )}
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-fredoka font-semibold bg-white text-amber-800 border-2 border-amber-800 transition-all hover:scale-105 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
              >
                🏠 More Stories
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen restore prompt */}
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out] p-4">
          <div className="flex flex-col items-center gap-6 px-8 py-10 sm:px-10 sm:py-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.3)] max-w-[90vw] text-center animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <span className="text-5xl animate-[bounce_1s_ease-in-out_infinite]">📺</span>
            <p className="font-fredoka text-lg sm:text-xl font-bold text-amber-900 leading-relaxed">
              You were reading in fullscreen mode.
              <br />
              Continue in fullscreen?
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                ref={fullscreenBtnRef}
                className="px-6 py-3 rounded-full font-fredoka font-semibold bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-[0_4px_15px_rgba(168,85,247,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)] active:scale-95 min-w-[120px]"
                onClick={handleRestoreFullscreen}
                autoFocus
              >
                ✨ Yes, Continue Fullscreen
              </button>
              <button
                className="px-6 py-3 rounded-full font-fredoka font-semibold bg-white text-amber-900 border-2 border-amber-900 transition-all hover:bg-amber-100 hover:scale-105 active:scale-95 min-w-[120px]"
                onClick={dismissFullscreenPrompt}
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom animations keyframes */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes flipNext {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-15deg) scale(0.95); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes flipPrev {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(15deg) scale(0.95); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrowBounceLeft {
          0%, 100% { transform: translateX(0) scale(1.1); }
          50% { transform: translateX(-3px) scale(1.1); }
        }
        @keyframes arrowBounceRight {
          0%, 100% { transform: translateX(0) scale(1.1); }
          50% { transform: translateX(3px) scale(1.1); }
        }
        @keyframes subtlePulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5) inset; }
          50% { box-shadow: 0 4px 25px rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(255,255,255,0.5) inset; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes starPop {
          0% { opacity: 0; transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
