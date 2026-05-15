/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8eccff',
          400: '#59b0ff',
          500: '#338dff',
          600: '#1a6df5',
          700: '#1457e1',
          800: '#1746b6',
          900: '#193e8f',
          950: '#142757',
        },
        accent: {
          50: '#edfcf2',
          100: '#d4f7df',
          200: '#acedca',
          300: '#75dead',
          400: '#3dca8b',
          500: '#1aae6f',
          600: '#0e8d59',
          700: '#0b714a',
          800: '#0c593c',
          900: '#0b4933',
          950: '#04291c',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e2e3e5',
          200: '#c4c6cb',
          300: '#9fa2aa',
          400: '#7b7e88',
          500: '#60636d',
          600: '#4c4e57',
          700: '#3e4047',
          800: '#2d2e34',
          900: '#1a1b21',
          950: '#0d0e12',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(26, 174, 111, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(26, 174, 111, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
