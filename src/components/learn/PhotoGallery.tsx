'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/imageUrl';

interface PhotoGalleryProps {
  images: string[];
  animalName: string;
}

export function PhotoGallery({ images, animalName }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  // Filter out images that might not exist yet
  const validImages = images.filter(Boolean);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedImage(null);
      setShowLightbox(false);
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }, 300);
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    setIsAnimating(true);

    setTimeout(() => {
      if (direction === 'prev') {
        setSelectedImage(selectedImage === 0 ? validImages.length - 1 : selectedImage - 1);
      } else {
        setSelectedImage(selectedImage === validImages.length - 1 ? 0 : selectedImage + 1);
      }
      setIsAnimating(false);
    }, 150);
  }, [selectedImage, validImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, navigateImage, closeLightbox]);

  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      {/* Gallery Section */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8 overflow-hidden">
        {/* Animated Header */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
          <span className="text-3xl animate-bounce-gentle">📸</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Photo Gallery
          </h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-green-200 via-emerald-300 to-transparent rounded-full ml-4" />
        </div>

        {/* Gallery Grid with Staggered Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-kid-lg overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 animate-gallery-item"
              style={{
                animationDelay: `${index * 100}ms`,
                opacity: loadedImages.has(index) ? 1 : 0.7
              }}
            >
              {/* Shimmer Loading Effect */}
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-white to-green-100 animate-shimmer" />
              )}

              <Image
                src={getImageUrl(image)}
                alt={`${animalName} photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className={`object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 ${
                  loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
                onError={() => {}}
              />

              {/* Gradient Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <span className="text-white text-3xl drop-shadow-lg animate-pulse-soft">🔍</span>
                <span className="text-white text-xs font-fredoka mt-1 drop-shadow-lg">View</span>
              </div>

              {/* Image Number Badge with Animation */}
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-fredoka font-bold text-gray-700 shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white">
                {index + 1}/{validImages.length}
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/0 group-hover:border-white/60 rounded-tl-lg transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/0 group-hover:border-white/60 rounded-br-lg transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Gallery Tip with Animation */}
        <div className="flex items-center justify-center gap-2 mt-6 animate-fade-in">
          <span className="text-green-500 animate-bounce-gentle">✨</span>
          <p className="text-center text-gray-500 text-sm font-nunito">
            Click on any photo to view it larger!
          </p>
          <span className="text-green-500 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>✨</span>
        </div>
      </section>

      {/* Lightbox Modal */}
      {showLightbox && selectedImage !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            isAnimating ? 'bg-black/0' : 'bg-black/95'
          }`}
          onClick={closeLightbox}
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />
          </div>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-red-500 hover:to-red-600 text-white text-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 backdrop-blur-sm shadow-lg border border-white/10 hover:border-red-400/50 group"
            aria-label="Close gallery"
          >
            <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation - Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 sm:left-6 z-30 group"
            aria-label="Previous image"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />

              {/* Button */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 group-hover:from-green-500 group-hover:to-emerald-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl border border-white/10 group-hover:border-green-400/50 backdrop-blur-sm">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </div>

              {/* Label on hover */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs font-nunito opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Previous
              </span>
            </div>
          </button>

          {/* Main Image Container with Click Zones */}
          <div
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Click Zone - Previous */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-w-resize"
            />

            {/* Right Click Zone - Next */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-e-resize"
            />

            {/* Image Frame */}
            <div className="relative max-w-[90vw] max-h-[70vh]">
              <img
                src={getImageUrl(validImages[selectedImage])}
                alt={`${animalName} photo ${selectedImage + 1}`}
                className="max-w-full max-h-[70vh] w-auto h-auto rounded-kid-xl ring-4 ring-white/20 shadow-2xl object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Navigation - Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 sm:right-6 z-30 group"
            aria-label="Next image"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />

              {/* Button */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 group-hover:from-emerald-500 group-hover:to-green-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xl border border-white/10 group-hover:border-emerald-400/50 backdrop-blur-sm">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Label on hover */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs font-nunito opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Next
              </span>
            </div>
          </button>

          {/* Image Counter with Progress */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            {/* Progress Bar */}
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${((selectedImage + 1) / validImages.length) * 100}%` }}
              />
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-fredoka">
              <span className="text-lg font-bold text-green-400">{selectedImage + 1}</span>
              <span className="mx-2 text-white/50">/</span>
              <span className="text-white/70">{validImages.length}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 p-3 bg-black/60 backdrop-blur-md rounded-kid-lg max-w-[90vw] overflow-x-auto scrollbar-hide">
            {validImages.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (index !== selectedImage) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setSelectedImage(index);
                      setIsAnimating(false);
                    }, 150);
                  }
                }}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                  selectedImage === index
                    ? 'ring-3 ring-green-400 scale-110 shadow-lg shadow-green-500/30'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <Image
                  src={getImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <span className="text-white text-lg drop-shadow-lg">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Navigation Hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 backdrop-blur-md px-6 py-3 rounded-full text-white/90 text-sm font-nunito hidden sm:flex items-center gap-4 animate-fade-in shadow-lg border border-white/10">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>Click image sides</span>
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">→</kbd>
              <span className="ml-1">Keys</span>
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
