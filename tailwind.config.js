/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sharepal: {
          darkPurple: '#4C187C',
          lightPurple: '#8A2BE2',
          accentGreen: '#9EFF00',
          vibrantPurple: '#7c3aed',
          borderPurple: '#e9d5ff',
          bgLight: '#f8fafc',
          cardBg: '#ffffff',
          gold: '#E8AE19',
          successGreen: '#22c55e',
        },
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          150: '#ede9fe',
          200: '#e9d5ff',
          500: '#8A2BE2',
          600: '#7c3aed',
          700: '#6b21a8',
          800: '#581c87',
          900: '#4C187C',
        },
        category: {
          purple: '#8A2BE2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 28px rgba(76, 24, 124, 0.14)',
        'modal': '0 20px 50px rgba(0, 0, 0, 0.25)',
        'glow-purple': '0 0 25px rgba(138, 43, 226, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        scaleUp: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideLeft: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideUp: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'bounce-subtle': 'bounceSubtle 2.5s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
