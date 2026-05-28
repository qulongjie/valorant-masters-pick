/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        valorant: {
          DEFAULT: 'var(--color-valorant)',
          dark: 'var(--color-valorant-dark)',
          accent: '#FF333D',
        },
        dark: {
          bg: 'var(--color-bg-dark)',
          bgMedium: 'var(--color-bg-medium)',
          bgLight: 'var(--color-bg-light)',
          card: 'var(--color-card)',
          border: 'var(--color-border)',
          borderFocus: 'var(--color-border-focus)',
        },
        grey: {
          secondary: 'var(--color-grey-secondary)',
        },
        status: {
          success: 'var(--color-success)',
          info: 'var(--color-info)',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
        'breathe': 'breathe 2.5s ease-in-out infinite',
        'breathe-glow': 'breatheGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'border-rotate': 'borderRotate 3s linear infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-left': 'slideInLeft 0.4s ease-out forwards',
        'vs-spin': 'vsSpin 4s ease-in-out infinite',
        'bounce-arrow': 'bounceArrow 1s ease-in-out infinite',
        'scan': 'scanLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 3px rgba(255, 59, 69, 0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(255, 59, 69, 0.7))' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'subtle-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        'breatheGlow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(255, 59, 69, 0.3)' },
          '50%': { boxShadow: '0 0 28px rgba(255, 59, 69, 0.6)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'borderRotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounceIn': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slideInLeft': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'vsSpin': {
          '0%': { transform: 'rotateY(0deg) scale(1)' },
          '50%': { transform: 'rotateY(180deg) scale(1.1)' },
          '100%': { transform: 'rotateY(360deg) scale(1)' },
        },
        'bounceArrow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'scanLine': {
          '0%': { left: '-30%' },
          '100%': { left: '130%' },
        },
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(255, 59, 69, 0.25)',
        'red-glow-lg': '0 0 30px rgba(255, 59, 69, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
