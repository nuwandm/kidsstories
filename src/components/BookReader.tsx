'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Story } from '@/lib/types';
import { soundManager } from '@/lib/sounds';
import { getNextStory } from '@/content/storyIndex';

const FULLSCREEN_KEY = 'kidsstories_fullscreen_mode';
const EYE_COMFORT_KEY = 'kidsstories_eye_comfort_mode';

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
  const [showNavbar, setShowNavbar] = useState(false);
  const [eyeComfortMode, setEyeComfortMode] = useState(false);
  const navbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Auto-hide UI after inactivity (increased to 5 seconds)
  const resetUITimer = useCallback(() => {
    setShowUI(true);
    if (hideUITimeout.current) {
      clearTimeout(hideUITimeout.current);
    }
    hideUITimeout.current = setTimeout(() => {
      setShowUI(false);
    }, 5000); // Increased from 3000 to 5000ms
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

  // Initialize eye comfort mode from localStorage
  useEffect(() => {
    const savedComfortMode = localStorage.getItem(EYE_COMFORT_KEY) === 'true';
    setEyeComfortMode(savedComfortMode);
  }, []);

  // Play various sounds
  const playPageFlipSound = useCallback(() => soundManager.playPageFlip(), []);
  const playClickSound = useCallback(() => soundManager.playClick(), []);
  const playHoverSound = useCallback(() => soundManager.playHover(), []);
  const playCelebrationSound = useCallback(() => soundManager.playCelebration(), []);

  // Toggle eye comfort mode
  const toggleEyeComfort = useCallback(() => {
    setEyeComfortMode((prev) => {
      const newValue = !prev;
      localStorage.setItem(EYE_COMFORT_KEY, String(newValue));
      return newValue;
    });
    playClickSound();
  }, [playClickSound]);

  // Handle navbar hover (desktop)
  const handleNavbarMouseEnter = useCallback(() => {
    setShowNavbar(true);
    if (navbarTimeoutRef.current) {
      clearTimeout(navbarTimeoutRef.current);
    }
  }, []);

  const handleNavbarMouseLeave = useCallback(() => {
    navbarTimeoutRef.current = setTimeout(() => {
      setShowNavbar(false);
    }, 1000);
  }, []);

  // Toggle navbar on tap/click (mobile & desktop)
  const toggleNavbar = useCallback(() => {
    setShowNavbar((prev) => !prev);
    if (navbarTimeoutRef.current) {
      clearTimeout(navbarTimeoutRef.current);
    }
    // Auto-hide after 5 seconds on mobile
    if (!showNavbar) {
      navbarTimeoutRef.current = setTimeout(() => {
        setShowNavbar(false);
      }, 5000);
    }
  }, [showNavbar]);

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
      className={`fixed inset-0 z-[9999] flex flex-col overflow-hidden transition-colors duration-500 ${
        eyeComfortMode
          ? 'bg-[#2a2520] eye-comfort'
          : 'bg-[#1a1a2e]'
      }`}
      onMouseMove={resetUITimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={resetUITimer}
    >
      {/* Simplified professional background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            eyeComfortMode
              ? 'bg-gradient-to-br from-[#2a2520] via-[#241f1a] to-[#1f1b16]'
              : 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419]'
          }`}
        />
      </div>

      {/* Navbar toggle button - visible on mobile */}
      <button
        onClick={toggleNavbar}
        onMouseEnter={handleNavbarMouseEnter}
        className="fixed top-2 right-2 z-[95] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 shadow-lg lg:opacity-0 lg:pointer-events-none"
        aria-label="Toggle menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${showNavbar ? 'rotate-90' : ''}`}
        >
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Hover-activated navbar trigger zone (desktop only) */}
      <div
        className="absolute top-0 left-0 right-0 h-12 z-[90] hidden lg:block"
        onMouseEnter={handleNavbarMouseEnter}
      />

      {/* Hoverable top navbar */}
      <nav
        onMouseEnter={handleNavbarMouseEnter}
        onMouseLeave={handleNavbarMouseLeave}
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-b from-black/80 via-black/70 to-transparent backdrop-blur-xl border-b border-white/10 transition-all duration-500 ease-out ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        {/* Left section - Home button */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            title="Back to Home"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="hidden sm:inline font-fredoka font-medium text-sm">Home</span>
          </a>
        </div>

        {/* Center section - Story info */}
        <div className="flex-1 text-center px-4">
          <h1 className="font-fredoka font-semibold text-white text-sm sm:text-base md:text-lg truncate max-w-[300px] sm:max-w-[400px] md:max-w-[500px] mx-auto drop-shadow-lg">
            {story.title}
          </h1>
          <p className="text-xs text-white/70 font-medium mt-1">
            Page {currentPage + 1} of {totalPages}
          </p>
        </div>

        {/* Right section - Control buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleEyeComfort}
            onMouseEnter={playHoverSound}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-sm border rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg ${
              eyeComfortMode
                ? 'bg-amber-500/30 border-amber-400/40 text-amber-100 hover:bg-amber-500/40'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
            }`}
            title={eyeComfortMode ? 'Disable Eye Comfort Mode' : 'Enable Eye Comfort Mode'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span className="hidden lg:inline font-fredoka font-medium text-sm">
              {eyeComfortMode ? 'Comfort On' : 'Eye Comfort'}
            </span>
          </button>

          <button
            onClick={() => { playClickSound(); setSoundEnabled(!soundEnabled); }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {soundEnabled ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </>
              )}
            </svg>
            <span className="hidden lg:inline font-fredoka font-medium text-sm">
              {soundEnabled ? 'Sound' : 'Muted'}
            </span>
          </button>

          <button
            onClick={() => { playClickSound(); toggleFullscreen(); }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            title={isBrowserFullscreen ? 'Exit Fullscreen (Esc)' : 'Enter Fullscreen (F)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isBrowserFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              ) : (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              )}
            </svg>
            <span className="hidden lg:inline font-fredoka font-medium text-sm">
              {isBrowserFullscreen ? 'Exit' : 'Fullscreen'}
            </span>
          </button>
        </div>
      </nav>

      {/* Main book area - Space optimized */}
      <main className="relative flex-1 flex items-center justify-center p-2 sm:p-3 overflow-hidden">
        {/* Page container */}
        <div
          className={`relative w-full max-w-[1000px] h-full max-h-full ${
            isFlipping
              ? flipDirection === 'next'
                ? 'animate-[flipNext_0.5s_ease-in-out]'
                : 'animate-[flipPrev_0.5s_ease-in-out]'
              : ''
          }`}
          style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
        >
          {/* Minimal book frame */}
          <div className={`relative w-full h-full flex rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ${
            eyeComfortMode
              ? 'shadow-amber-900/20'
              : 'shadow-black/30'
          }`}>
            {/* Minimal spine indicator */}
            <div
              className={`w-1 sm:w-2 flex-shrink-0 transition-all duration-500 ${
                eyeComfortMode
                  ? 'bg-gradient-to-r from-[#3d2f1f] to-[#5a4a3a]'
                  : 'bg-gradient-to-r from-[#2a2a3e] to-[#3a3a4e]'
              }`}
            />

            {/* Main page */}
            <article className={`flex-1 flex flex-col relative overflow-hidden transition-colors duration-500 ${
              hasText
                ? eyeComfortMode
                  ? 'bg-gradient-to-br from-[#f5ebe0] via-[#ede0d4] to-[#e6ccb2]'
                  : 'bg-gradient-to-br from-[#fef9f3] via-[#fdf6ed] to-[#fcf3e4]'
                : eyeComfortMode
                  ? 'bg-[#f8f4f0]'
                  : 'bg-white'
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
                  : 'story-image-container'
              }`}>
                <Image
                  src={currentPageData.image}
                  alt={`Page ${currentPage + 1} illustration`}
                  fill
                  className={hasText ? 'object-cover' : 'object-contain'}
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                {hasText && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 50px rgba(0,0,0,0.1), inset 0 -30px 40px -20px rgba(252, 243, 228, 1)'
                    }}
                  />
                )}
              </div>

              {/* Compact page number for image-only pages */}
              {!hasText && (
                <div className={`absolute bottom-0 left-0 right-0 flex items-center justify-center py-1.5 px-2 backdrop-blur-sm transition-colors duration-500 ${
                  eyeComfortMode
                    ? 'bg-[#ede3d8]/90 border-t border-amber-900/10'
                    : 'bg-white/90 border-t border-black/5'
                }`}>
                  <span className={`text-[10px] sm:text-xs font-fredoka font-medium uppercase tracking-wide transition-colors ${
                    eyeComfortMode ? 'text-amber-900/60' : 'text-gray-400'
                  }`}>
                    Page {currentPage + 1} / {totalPages}
                  </span>
                </div>
              )}

              {/* Page text section - Space optimized */}
              {hasText && (
                <div className={`flex-1 flex flex-col px-4 py-3 sm:px-8 sm:py-5 lg:px-12 lg:py-6 transition-colors duration-500 ${
                  eyeComfortMode
                    ? 'bg-gradient-to-b from-[#f5ebe0] to-[#ede0d4]'
                    : 'bg-gradient-to-b from-[#fef9f3] to-[#fdf6ed]'
                }`}>
                  {/* Story text - Eye comfort optimized */}
                  <div className="flex-1 flex items-center overflow-hidden">
                    <p className={`font-nunito text-base sm:text-lg lg:text-xl leading-[1.7] sm:leading-[1.8] lg:leading-[1.9] text-justify hyphens-auto max-h-full overflow-auto transition-colors duration-500 first-letter:float-left first-letter:font-fredoka first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-0.5 ${
                      eyeComfortMode
                        ? 'text-[#3e2a1c] first-letter:text-[#8b5a2b]'
                        : 'text-stone-700 first-letter:text-amber-800'
                    }`}>
                      {currentPageData.text}
                    </p>
                  </div>

                  {/* Minimal decorative footer */}
                  <div className={`flex items-center justify-center gap-3 mt-auto pt-2 text-xs transition-colors duration-500 ${
                    eyeComfortMode ? 'text-amber-800/40' : 'text-amber-300/60'
                  }`}>
                    <span>✦</span>
                    <div className={`w-10 h-px ${
                      eyeComfortMode
                        ? 'bg-gradient-to-r from-transparent via-amber-800/40 to-transparent'
                        : 'bg-gradient-to-r from-transparent via-amber-300/60 to-transparent'
                    }`} />
                    <span>✦</span>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>

        {/* Compact navigation arrows */}
        <nav className={`absolute inset-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none transition-opacity duration-300 ${
          showUI ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={prevPage}
            onMouseEnter={() => !isFirstPage && playHoverSound()}
            disabled={isFirstPage || isFlipping}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg pointer-events-auto transition-all duration-300 ${
              isFirstPage
                ? 'opacity-20 cursor-not-allowed'
                : 'hover:bg-black/50 hover:border-white/40 hover:scale-105 active:scale-95'
            }`}
            aria-label="Previous page"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={nextPage}
            onMouseEnter={() => !isLastPage && playHoverSound()}
            disabled={isLastPage || isFlipping}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg pointer-events-auto transition-all duration-300 ${
              isLastPage
                ? 'opacity-20 cursor-not-allowed'
                : 'hover:bg-black/50 hover:border-white/40 hover:scale-105 active:scale-95'
            }`}
            aria-label="Next page"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>

        {/* Click zones for navigation */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1 cursor-w-resize pointer-events-auto" onClick={prevPage} />
          <div className="flex-1 cursor-e-resize pointer-events-auto" onClick={nextPage} />
        </div>
      </main>

      {/* Compact bottom progress bar */}
      <footer className={`relative z-[100] px-3 py-2 sm:px-4 sm:py-2.5 bg-black/40 backdrop-blur-md border-t border-white/5 transition-all duration-300 ${
        showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}>
        <div className="max-w-[800px] mx-auto flex items-center gap-3 sm:gap-4">
          {/* Progress dots */}
          <div className="flex items-center gap-1 flex-wrap">
            {story.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => { playClickSound(); goToPage(index); }}
                onMouseEnter={playHoverSound}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border-0 cursor-pointer transition-all ${
                  index === currentPage
                    ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                    : index < currentPage
                    ? 'bg-amber-400/50 hover:bg-amber-400/70'
                    : 'bg-white/25 hover:bg-white/50'
                } hover:scale-110`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-0.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>

          {/* Compact keyboard hints */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-white/40">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">→</kbd>
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
        /* Responsive Story Image Container - Orientation-Based Aspect Ratios */
        .story-image-container {
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.5s ease;
          min-height: 0;
        }

        /* Eye comfort mode background */
        .story-image-container {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .eye-comfort .story-image-container {
          background: linear-gradient(135deg, #f5ebe0 0%, #ede0d4 100%);
        }

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
