import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4D3E',
          50: '#E8F0EE',
          100: '#C5D9D2',
          200: '#9EBFAF',
          300: '#77A58C',
          400: '#508B69',
          500: '#1B4D3E',
          600: '#163D31',
          700: '#112E25',
          800: '#0C1F19',
          900: '#07100D',
        },
        accent: {
          DEFAULT: '#D4A853',
          50: '#FBF6E8',
          100: '#F5E9C5',
          200: '#EDD89C',
          300: '#E5C773',
          400: '#DDB64A',
          500: '#D4A853',
          600: '#B38A35',
          700: '#8F6B2A',
          800: '#6B4C1F',
          900: '#472D14',
        },
        background: '#FAFAF8',
        foreground: '#1A1A1A',
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'typing': 'typing 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
