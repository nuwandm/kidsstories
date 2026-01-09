'use client';

interface PDFLoadingScreenProps {
  progress?: number;
  message?: string;
}

/**
 * A creative, kid-friendly animated loading screen for PDF stories
 * Features bouncing books, floating stars, and playful animations
 */
export function PDFLoadingScreen({ progress = 0, message = "Loading your story..." }: PDFLoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating stars */}
        <div className="absolute top-[10%] left-[15%] text-3xl animate-float-slow opacity-60">✨</div>
        <div className="absolute top-[20%] right-[20%] text-2xl animate-float-medium opacity-50">⭐</div>
        <div className="absolute bottom-[30%] left-[10%] text-2xl animate-float-fast opacity-40">🌟</div>
        <div className="absolute top-[40%] right-[10%] text-xl animate-float-slow opacity-50">✨</div>
        <div className="absolute bottom-[20%] right-[25%] text-3xl animate-float-medium opacity-60">⭐</div>
        <div className="absolute top-[15%] left-[40%] text-xl animate-float-fast opacity-40">🌟</div>

        {/* Floating clouds */}
        <div className="absolute top-[5%] left-[5%] text-4xl animate-drift-right opacity-30">☁️</div>
        <div className="absolute top-[12%] right-[15%] text-3xl animate-drift-left opacity-25">☁️</div>
        <div className="absolute bottom-[15%] left-[20%] text-2xl animate-drift-right opacity-20">☁️</div>
      </div>

      {/* Main loading animation container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Bouncing book stack */}
        <div className="relative w-32 h-32 mb-8">
          {/* Shadow under the book */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/20 rounded-full blur-sm animate-shadow-pulse" />

          {/* Main bouncing book */}
          <div className="absolute inset-0 flex items-center justify-center animate-book-bounce">
            <div className="relative">
              {/* Book base */}
              <div className="w-24 h-28 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-r-lg rounded-l-sm shadow-xl transform perspective-500 rotate-y-6">
                {/* Book spine */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-600 to-amber-500 rounded-l-sm" />

                {/* Book pages */}
                <div className="absolute right-1 top-1 bottom-1 w-1 bg-amber-100 rounded-r-sm" />
                <div className="absolute right-2 top-1.5 bottom-1.5 w-0.5 bg-amber-200" />

                {/* Book cover decoration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl animate-sparkle">📖</div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-r-lg animate-shine" />
              </div>

              {/* Floating sparkles around book */}
              <div className="absolute -top-2 -right-2 text-lg animate-sparkle-1">✨</div>
              <div className="absolute -bottom-1 -left-2 text-lg animate-sparkle-2">✨</div>
              <div className="absolute top-1/2 -right-4 text-sm animate-sparkle-3">⭐</div>
            </div>
          </div>

          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-orbit">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xl">🌙</div>
          </div>
          <div className="absolute inset-0 animate-orbit-reverse">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg">⭐</div>
          </div>
        </div>

        {/* Animated characters */}
        <div className="flex items-end gap-4 mb-6">
          <div className="text-4xl animate-character-left">🐵</div>
          <div className="text-3xl animate-hop">📚</div>
          <div className="text-4xl animate-character-right">🐘</div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="text-center mb-6">
          <p className="font-fredoka text-white text-xl sm:text-2xl drop-shadow-lg animate-pulse-soft">
            {message}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce-dot-1" />
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce-dot-2" />
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce-dot-3" />
          </div>
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="w-64 sm:w-80">
            {/* Progress container */}
            <div className="relative h-6 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
              {/* Progress fill */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine on progress bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-progress-shine" />

                {/* Sparkle at the end of progress */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-sm animate-sparkle">
                  ✨
                </div>
              </div>

              {/* Progress train/character riding the bar */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-lg transition-all duration-300 z-10"
                style={{ left: `${Math.max(8, progress)}%` }}
              >
                <span className="animate-wiggle inline-block">🚂</span>
              </div>
            </div>

            {/* Percentage text */}
            <p className="text-center mt-2 font-fredoka text-amber-300 text-lg font-semibold drop-shadow">
              {progress}% loaded
            </p>
          </div>
        )}

        {/* Fun facts while loading */}
        <div className="mt-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-xs">
          <p className="text-white/80 text-sm text-center font-nunito animate-fade-in-out">
            <span className="text-amber-400">💡</span> Tip: Swipe left or right to turn pages!
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        @keyframes drift-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(calc(100vw + 100%)); }
        }
        @keyframes drift-left {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        @keyframes book-bounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-25px) rotate(-1deg); }
          75% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.2; }
          50% { transform: translateX(-50%) scaleX(0.7); opacity: 0.1; }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }
        @keyframes sparkle-1 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 1; }
          50% { transform: scale(1.3) translate(5px, -5px); opacity: 0.6; }
        }
        @keyframes sparkle-2 {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 1; }
          50% { transform: scale(1.4) translate(-5px, 5px); opacity: 0.5; }
        }
        @keyframes sparkle-3 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.4; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
          to { transform: rotate(0deg) translateX(40px) rotate(0deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes character-left {
          0%, 100% { transform: translateX(0) rotate(-5deg); }
          50% { transform: translateX(-5px) rotate(5deg); }
        }
        @keyframes character-right {
          0%, 100% { transform: translateX(0) rotate(5deg); }
          50% { transform: translateX(5px) rotate(-5deg); }
        }
        @keyframes hop {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes bounce-dot-1 {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @keyframes bounce-dot-2 {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @keyframes bounce-dot-3 {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @keyframes progress-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 2s ease-in-out infinite; }
        .animate-drift-right { animation: drift-right 25s linear infinite; }
        .animate-drift-left { animation: drift-left 30s linear infinite; }
        .animate-book-bounce { animation: book-bounce 1.5s ease-in-out infinite; }
        .animate-shadow-pulse { animation: shadow-pulse 1.5s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 1s ease-in-out infinite; }
        .animate-sparkle-1 { animation: sparkle-1 1.2s ease-in-out infinite; }
        .animate-sparkle-2 { animation: sparkle-2 1.4s ease-in-out infinite 0.2s; }
        .animate-sparkle-3 { animation: sparkle-3 1s ease-in-out infinite 0.4s; }
        .animate-orbit { animation: orbit 8s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 6s linear infinite; }
        .animate-shine { animation: shine 2s ease-in-out infinite; }
        .animate-character-left { animation: character-left 1s ease-in-out infinite; }
        .animate-character-right { animation: character-right 1s ease-in-out infinite 0.5s; }
        .animate-hop { animation: hop 0.8s ease-in-out infinite; }
        .animate-bounce-dot-1 { animation: bounce-dot-1 1.4s ease-in-out infinite; }
        .animate-bounce-dot-2 { animation: bounce-dot-2 1.4s ease-in-out infinite 0.2s; }
        .animate-bounce-dot-3 { animation: bounce-dot-3 1.4s ease-in-out infinite 0.4s; }
        .animate-progress-shine { animation: progress-shine 2s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 0.3s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
        .animate-fade-in-out { animation: fade-in-out 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
