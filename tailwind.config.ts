import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // DefiscArt — Élégant & Sobre
        primary: {
          DEFAULT: '#1A1A1A',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#A3A3A3',
          400: '#737373',
          500: '#4A4A4A',
          600: '#333333',
          700: '#2D2D2D',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
        gold: {
          DEFAULT: '#C9A96E',
          50: '#FBF8F1',
          100: '#F5EDDA',
          200: '#EBDBB5',
          300: '#DDC48A',
          400: '#C9A96E',
          500: '#B8944F',
          600: '#9A7A3E',
          700: '#7A6132',
          800: '#5E4A27',
          900: '#43351C',
        },
        bordeaux: {
          DEFAULT: '#7B2D3B',
          50: '#FCF2F4',
          100: '#F5D5DB',
          200: '#E8A5B3',
          300: '#D47587',
          400: '#B44D61',
          500: '#7B2D3B',
          600: '#6A2633',
          700: '#571F2A',
          800: '#441921',
          900: '#311218',
        },
        cream: {
          DEFAULT: '#FAFAF8',
          100: '#FAFAF8',
          200: '#F0EFED',
          300: '#E5E4E1',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        'elevated': '0 20px 50px rgba(0,0,0,0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
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
      },
    },
  },
  plugins: [],
};

export default config;
