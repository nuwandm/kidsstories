import type { Config } from 'tailwindcss';

/**
 * Modern, Kid-Friendly Tailwind Configuration
 *
 * Design Philosophy:
 * - Vibrant, playful color palette with gradients
 * - Smooth animations that delight children
 * - Large, readable typography
 * - Generous spacing for easy navigation
 * - Soft shadows and rounded corners for a friendly feel
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Vibrant, kid-friendly color palette
      colors: {
        // Primary - Magical Purple
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Secondary - Ocean Blue
        ocean: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Accent - Sunset Orange
        sunset: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Fun Pink
        candy: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Fresh Mint Green
        mint: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Warm background colors
        cream: {
          50: '#fffbf5',
          100: '#fff8ed',
          200: '#fef3e2',
        },
        // Soft background gradients
        sky: {
          light: '#e0f2fe',
          medium: '#bae6fd',
        },
      },
      // Enhanced typography for readability
      fontSize: {
        // Story text - optimized for children
        'story-sm': ['1.125rem', { lineHeight: '1.875rem', letterSpacing: '0.01em' }],
        'story': ['1.375rem', { lineHeight: '2.25rem', letterSpacing: '0.015em' }],
        'story-lg': ['1.5rem', { lineHeight: '2.5rem', letterSpacing: '0.02em' }],
        // Display sizes for headings
        'display-sm': ['2rem', { lineHeight: '2.5rem', fontWeight: '800' }],
        'display': ['2.5rem', { lineHeight: '3rem', fontWeight: '800' }],
        'display-lg': ['3rem', { lineHeight: '3.5rem', fontWeight: '800' }],
        'display-xl': ['3.75rem', { lineHeight: '4.25rem', fontWeight: '800' }],
      },
      // Playful font family
      fontFamily: {
        'display': ['Fredoka', 'Comic Sans MS', 'cursive', 'system-ui'],
        'story': ['Nunito', 'system-ui', 'sans-serif'],
      },
      // Generous border radius for friendly UI
      borderRadius: {
        'kid': '1rem',
        'kid-lg': '1.5rem',
        'kid-xl': '2rem',
        'blob': '60% 40% 50% 50% / 50% 50% 40% 60%',
      },
      // Touch-friendly spacing
      spacing: {
        'touch': '3rem',
        'touch-lg': '4rem',
      },
      // Soft, playful shadows
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
        'soft-xl': '0 12px 40px -6px rgba(0, 0, 0, 0.15)',
        'glow-primary': '0 0 30px -5px rgba(168, 85, 247, 0.4)',
        'glow-ocean': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'glow-candy': '0 0 30px -5px rgba(236, 72, 153, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      // Fun animations
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
      },
      // Background gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-playful': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239333ea\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
};

export default config;
