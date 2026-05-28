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
          DEFAULT: '#FF3B45',
          dark: '#B51220',
          accent: '#FF333D',
        },
        dark: {
          bg: '#05070A',
          bgMedium: '#080B10',
          bgLight: '#0D1117',
          card: '#0F1218',
          border: 'rgba(255, 255, 255, 0.12)',
          borderFocus: 'rgba(255, 59, 69, 0.4)',
        },
        grey: {
          secondary: '#A0A6B2',
        },
        status: {
          success: '#37D67A',
          info: '#3B82F6',
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
        }
      },
      boxShadow: {
        'red-glow': '0 0 15px rgba(255, 59, 69, 0.25)',
        'red-glow-lg': '0 0 30px rgba(255, 59, 69, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
