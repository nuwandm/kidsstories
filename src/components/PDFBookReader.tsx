'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PdfStory } from '@/lib/types';
import { soundManager } from '@/lib/sounds';
import { getNextStory } from '@/content/storyIndex';
import { addToReadingHistory, getReadingProgress, setReadingProgress } from '@/lib/storage';
import { buildPdfUrl } from '@/lib/pdfUtils';
import { PDFLoadingScreen } from './PDFLoadingScreen';

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(() => import('./PDFViewer').then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <PDFLoadingScreen message="Preparing the magic..." />,
});

const FULLSCREEN_KEY = 'kidsstories_fullscreen_mode';
const EYE_COMFORT_KEY = 'kidsstories_eye_comfort_mode';

interface PDFBookReaderProps {
  story: PdfStory;
}

/**
 * PDF Book Reader Component
 *
 * Displays PDF stories with page-by-page navigation matching the regular story reader experience.
 * Uses @react-pdf-viewer/core for rendering with custom navigation controls.
 */
export function PDFBookReader({ story }: PDFBookReaderProps) {
  const router = useRouter();

  // Initialize current page from reading progress
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === 'undefined') return 1;
    const progress = getReadingProgress(story.slug);
    return progress && !progress.completed ? progress.currentPage + 1 : 1;
  });

  const [totalPages, setTotalPages] = useState(story.pageCount || 0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [eyeComfortMode, setEyeComfortMode] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const containerRef = useRef<HTMLDivElement>(null);
  const navbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideUITimeout = useRef<NodeJS.Timeout | null>(null);
  const hasCheckedFullscreen = useRef(false);
  const fullscreenBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const wasPinching = useRef(false);

  const nextStory = getNextStory(story.slug);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Add to reading history
  useEffect(() => {
    addToReadingHistory({
      slug: story.slug,
      title: story.title,
      lastRead: new Date().toISOString(),
      coverImage: story.coverImage,
    });
  }, [story.slug, story.title, story.coverImage]);

  // Save reading progress whenever page changes
  useEffect(() => {
    if (totalPages > 0) {
      const isCompleted = currentPage === totalPages;
      setReadingProgress(story.slug, currentPage - 1, totalPages, isCompleted);
    }
  }, [currentPage, totalPages, story.slug]);

  // Disable scroll restoration
  useEffect(() => {
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  // Auto-restore fullscreen
  useEffect(() => {
    if (hasCheckedFullscreen.current) return;
    hasCheckedFullscreen.current = true;

    const shouldRestoreFullscreen = sessionStorage.getItem(FULLSCREEN_KEY) === 'true';
    if (shouldRestoreFullscreen && !document.fullscreenElement && containerRef.current) {
      const attemptFullscreen = async () => {
        try {
          await containerRef.current?.requestFullscreen();
          sessionStorage.removeItem(FULLSCREEN_KEY);
        } catch {
          setShowFullscreenPrompt(true);
          sessionStorage.removeItem(FULLSCREEN_KEY);
        }
      };
      setTimeout(attemptFullscreen, 100);
    }
  }, []);

  // Initialize eye comfort mode
  useEffect(() => {
    const savedComfortMode = localStorage.getItem(EYE_COMFORT_KEY) === 'true';
    setEyeComfortMode(savedComfortMode);
  }, []);

  // Sync sound manager
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Auto-hide UI
  const resetUITimer = useCallback(() => {
    setShowUI(true);
    if (hideUITimeout.current) {
      clearTimeout(hideUITimeout.current);
    }
    hideUITimeout.current = setTimeout(() => {
      setShowUI(false);
    }, 5000);
  }, []);

  useEffect(() => {
    resetUITimer();
    return () => {
      if (hideUITimeout.current) {
        clearTimeout(hideUITimeout.current);
      }
    };
  }, [resetUITimer]);

  // Sound functions
  const playPageFlipSound = useCallback(() => soundManager.playPageFlip(), []);
  const playClickSound = useCallback(() => soundManager.playClick(), []);
  const playHoverSound = useCallback(() => soundManager.playHover(), []);
  const playCelebrationSound = useCallback(() => soundManager.playCelebration(), []);

  // Toggle eye comfort
  const toggleEyeComfort = useCallback(() => {
    setEyeComfortMode((prev) => {
      const newValue = !prev;
      localStorage.setItem(EYE_COMFORT_KEY, String(newValue));
      return newValue;
    });
    playClickSound();
  }, [playClickSound]);

  // Navbar handlers
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

  const toggleNavbar = useCallback(() => {
    setShowNavbar((prev) => !prev);
    if (navbarTimeoutRef.current) {
      clearTimeout(navbarTimeoutRef.current);
    }
    if (!showNavbar) {
      navbarTimeoutRef.current = setTimeout(() => {
        setShowNavbar(false);
      }, 5000);
    }
  }, [showNavbar]);

  // Navigation functions
  const nextPage = useCallback(() => {
    if (isFlipping || totalPages === 0) return;

    if (isLastPage) {
      setShowEndMessage(true);
      playCelebrationSound();
      return;
    }

    setFlipDirection('next');
    setIsFlipping(true);
    playPageFlipSound();
    resetUITimer();

    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      setIsFlipping(false);
    }, 300);
  }, [isLastPage, isFlipping, totalPages, playPageFlipSound, resetUITimer, playCelebrationSound]);

  const prevPage = useCallback(() => {
    if (isFirstPage || isFlipping || totalPages === 0) return;

    setFlipDirection('prev');
    setIsFlipping(true);
    playPageFlipSound();
    resetUITimer();

    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      setIsFlipping(false);
    }, 300);
  }, [isFirstPage, isFlipping, totalPages, playPageFlipSound, resetUITimer]);

  const goToPage = useCallback((page: number) => {
    if (page === currentPage || isFlipping || totalPages === 0) return;
    setFlipDirection(page > currentPage ? 'next' : 'prev');
    setIsFlipping(true);
    playPageFlipSound();

    setTimeout(() => {
      setCurrentPage(page);
      setIsFlipping(false);
    }, 200);
  }, [currentPage, isFlipping, totalPages, playPageFlipSound]);

  // Handle page change from PDFViewer
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    resetUITimer();
  }, [resetUITimer]);

  // Handle PDF load success
  const handleLoadSuccess = useCallback((numPages: number) => {
    setTotalPages(numPages);
    setIsLoading(false);
  }, []);

  // Handle PDF load error
  const handleLoadError = useCallback((error: Error) => {
    setLoadError(error.message);
    setIsLoading(false);
  }, []);

  // Fullscreen handlers
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen not available
    }
    resetUITimer();
  }, [resetUITimer]);

  const handleRestoreFullscreen = useCallback(async () => {
    setShowFullscreenPrompt(false);
    playClickSound();
    try {
      await containerRef.current?.requestFullscreen();
    } catch {
      // Fullscreen not available
    }
  }, [playClickSound]);

  const dismissFullscreenPrompt = useCallback(() => {
    setShowFullscreenPrompt(false);
    playClickSound();
  }, [playClickSound]);

  // Fullscreen change listener
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

  // Navigate to next story
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
  const handleTouchStart = (e: React.TouchEvent) => {
    // Detect multi-touch (pinch-to-zoom)
    if (e.touches.length > 1) {
      wasPinching.current = true;
      return;
    }

    wasPinching.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    resetUITimer();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Detect if multi-touch occurred during the gesture
    if (e.touches.length > 1) {
      wasPinching.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Ignore swipe if user was pinching/zooming
    if (wasPinching.current) {
      wasPinching.current = false;
      return;
    }

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only trigger page change if horizontal swipe is dominant and significant
    // This prevents accidental page changes during vertical scrolling
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) nextPage();
      else prevPage();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex flex-col overflow-hidden transition-colors duration-500 ${
        eyeComfortMode ? 'bg-[#2a2520]' : 'bg-[#1a1a2e]'
      }`}
      onMouseMove={resetUITimer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={resetUITimer}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 transition-all duration-500 ${
          eyeComfortMode
            ? 'bg-gradient-to-br from-[#2a2520] via-[#241f1a] to-[#1f1b16]'
            : 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1419]'
        }`} />
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={toggleNavbar}
        onMouseEnter={handleNavbarMouseEnter}
        className={`fixed top-3 right-3 z-[95] flex items-center justify-center w-12 h-12 backdrop-blur-md border-2 rounded-full transition-all duration-300 shadow-xl lg:opacity-0 lg:pointer-events-none ${
          showNavbar
            ? 'bg-white/20 border-white/40 scale-95'
            : 'bg-black/50 border-white/30 hover:bg-black/70 hover:border-white/50 hover:scale-105 animate-pulse'
        }`}
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${showNavbar ? 'rotate-90' : ''}`}>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Desktop hover zone */}
      <div className="absolute top-0 left-0 right-0 h-12 z-[90] hidden lg:block" onMouseEnter={handleNavbarMouseEnter} />

      {/* Top navbar */}
      <nav
        onMouseEnter={handleNavbarMouseEnter}
        onMouseLeave={handleNavbarMouseLeave}
        className={`fixed top-0 left-0 right-0 z-[100] bg-gradient-to-b from-black/80 via-black/70 to-transparent backdrop-blur-xl border-b border-white/10 transition-all duration-500 ease-out ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        {/* Mobile layout */}
        <div className="flex sm:hidden items-center justify-between px-3 py-2.5">
          <a href="/" className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all active:scale-95 shadow-lg" onClick={playClickSound}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </a>

          <div className="flex items-center gap-1.5">
            <button onClick={toggleEyeComfort} className={`flex items-center justify-center w-10 h-10 backdrop-blur-sm border rounded-xl transition-all active:scale-95 shadow-lg ${eyeComfortMode ? 'bg-amber-500/30 border-amber-400/40 text-amber-100' : 'bg-white/10 border-white/20 text-white'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>

            <button onClick={() => { playClickSound(); setSoundEnabled(!soundEnabled); }} className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all active:scale-95 shadow-lg">
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
            </button>

            <button onClick={() => { playClickSound(); toggleFullscreen(); }} className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all active:scale-95 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isBrowserFullscreen ? (
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                ) : (
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5">
          <a href="/" className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg" onClick={playClickSound} onMouseEnter={playHoverSound}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="font-fredoka font-medium text-sm">Home</span>
          </a>

          <div className="flex-1 text-center px-4">
            <h1 className="font-fredoka font-semibold text-white text-sm sm:text-base md:text-lg truncate max-w-[500px] mx-auto drop-shadow-lg">
              {story.title}
            </h1>
            <p className="text-xs text-white/70 font-medium mt-1">
              Page {currentPage} of {totalPages || '...'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleEyeComfort} onMouseEnter={playHoverSound} className={`flex items-center gap-2 px-4 py-2.5 backdrop-blur-sm border rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg ${eyeComfortMode ? 'bg-amber-500/30 border-amber-400/40 text-amber-100' : 'bg-white/10 border-white/20 text-white'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>

            <button onClick={() => { playClickSound(); setSoundEnabled(!soundEnabled); }} onMouseEnter={playHoverSound} className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg">
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
            </button>

            <button onClick={() => { playClickSound(); toggleFullscreen(); }} onMouseEnter={playHoverSound} className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isBrowserFullscreen ? (
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                ) : (
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                )}
              </svg>
            </button>

            {nextStory && (
              <button onClick={navigateToNextStory} onMouseEnter={playHoverSound} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm border border-white/20 rounded-xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg">
                <span className="font-fredoka font-medium text-sm">Next Story</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main PDF area */}
      <main className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        {/* Error state */}
        {loadError && (
          <div className="flex flex-col items-center justify-center text-white text-center p-8">
            <div className="text-6xl mb-4">😔</div>
            <p className="font-fredoka text-xl mb-2">Failed to load PDF</p>
            <p className="text-white/60 text-sm">{loadError}</p>
            <a href="/" className="mt-4 px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              Back to Home
            </a>
          </div>
        )}

        {/* PDF Container */}
        {!loadError && (
          <div className={`relative w-full h-full max-w-5xl mx-auto flex items-center justify-center ${
            isFlipping
              ? flipDirection === 'next'
                ? 'animate-[flipNext_0.3s_ease-in-out]'
                : 'animate-[flipPrev_0.3s_ease-in-out]'
              : ''
          }`}>
            {/* PDF Viewer */}
            <div className={`w-full h-full rounded-xl overflow-hidden shadow-2xl ${eyeComfortMode ? 'sepia-[0.15]' : ''}`}>
              <PDFViewer
                url={buildPdfUrl(story.pdfFileName, story.slug)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleLoadError}
                eyeComfortMode={eyeComfortMode}
                onNext={nextPage}
                onPrev={prevPage}
              />
            </div>
          </div>
        )}

        {/* Navigation arrows */}
        <nav className={`absolute inset-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none transition-opacity duration-300 ${
          showUI && !isLoading && !loadError ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={prevPage}
            onMouseEnter={() => !isFirstPage && playHoverSound()}
            disabled={isFirstPage || isFlipping || totalPages === 0}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg pointer-events-auto transition-all duration-300 ${
              isFirstPage || totalPages === 0
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
            disabled={isLastPage || isFlipping || totalPages === 0}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg pointer-events-auto transition-all duration-300 ${
              isLastPage || totalPages === 0
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
        {!loadError && totalPages > 0 && (
          <div className="absolute inset-0 flex pointer-events-none">
            <div className="flex-1 cursor-w-resize pointer-events-auto" onClick={prevPage} />
            <div className="flex-1 cursor-e-resize pointer-events-auto" onClick={nextPage} />
          </div>
        )}
      </main>

      {/* Bottom progress bar */}
      <footer className={`relative z-[100] px-3 py-2 sm:px-4 sm:py-2.5 bg-black/40 backdrop-blur-md border-t border-white/5 transition-all duration-300 ${
        showUI && totalPages > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}>
        <div className="max-w-[800px] mx-auto flex items-center gap-3 sm:gap-4">
          {/* Progress dots */}
          <div className="flex items-center gap-1 flex-wrap max-w-[200px] sm:max-w-[300px] overflow-hidden">
            {totalPages <= 20 ? (
              Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => { playClickSound(); goToPage(index + 1); }}
                  onMouseEnter={playHoverSound}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border-0 cursor-pointer transition-all ${
                    index + 1 === currentPage
                      ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                      : index + 1 < currentPage
                      ? 'bg-amber-400/50 hover:bg-amber-400/70'
                      : 'bg-white/25 hover:bg-white/50'
                  } hover:scale-110`}
                  aria-label={`Page ${index + 1}`}
                />
              ))
            ) : (
              <span className="text-white/60 text-xs font-fredoka">
                {currentPage} / {totalPages}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-0.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: totalPages > 0 ? `${(currentPage / totalPages) * 100}%` : '0%' }}
            />
          </div>

          {/* Keyboard hints */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-white/40">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">→</kbd>
          </div>
        </div>
      </footer>

      {/* End of story overlay */}
      {showEndMessage && (
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
                onClick={() => { playClickSound(); setShowEndMessage(false); goToPage(1); }}
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

      {/* Fullscreen prompt */}
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out] p-4">
          <div className="flex flex-col items-center gap-6 px-8 py-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.3)] max-w-[90vw] text-center animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <span className="text-5xl animate-[bounce_1s_ease-in-out_infinite]">📺</span>
            <p className="font-fredoka text-lg font-bold text-amber-900">Continue in fullscreen?</p>
            <div className="flex gap-3 flex-wrap justify-center">
              <button ref={fullscreenBtnRef} onClick={handleRestoreFullscreen} autoFocus className="px-6 py-3 rounded-full font-fredoka font-semibold bg-gradient-to-br from-purple-500 to-purple-700 text-white transition-all hover:scale-105">
                Yes, Fullscreen
              </button>
              <button onClick={dismissFullscreenPrompt} className="px-6 py-3 rounded-full font-fredoka font-semibold bg-white text-amber-900 border-2 border-amber-900 transition-all hover:scale-105">
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
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
        @keyframes flipNext {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-10deg) scale(0.98); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes flipPrev {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(10deg) scale(0.98); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
}
