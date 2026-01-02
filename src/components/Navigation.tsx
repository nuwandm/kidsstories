'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * Main Navigation Header Component
 *
 * Features:
 * - Responsive mobile menu
 * - Active link highlighting
 * - Gradient background
 * - Child-friendly design
 */
export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/stories', label: 'All Stories', icon: '📚' },
    { href: '/about', label: 'About Us', icon: '✨' },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container-story">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-fredoka font-bold text-xl sm:text-2xl hover:scale-105 transition-transform"
          >
            <span className="text-3xl">📖</span>
            <span className="hidden sm:inline">Kids Stories</span>
            <span className="sm:hidden">Stories</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'bg-white/20 hover:bg-white/30 hover:scale-105'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-[fadeIn_0.2s_ease-out]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-full font-fredoka font-semibold transition-all ${
                  isActive(link.href)
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <span className="text-2xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
