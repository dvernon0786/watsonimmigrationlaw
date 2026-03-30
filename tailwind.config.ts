import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Watson Immigration Law — exact brand palette
        navy: {
          DEFAULT: '#1a2e4a',
          50:  '#eef1f6',
          100: '#d4dce8',
          200: '#a9b9d1',
          300: '#7e96ba',
          400: '#5373a3',
          500: '#2d5490',  // slightly lighter for hover
          600: '#1a2e4a',  // brand primary
          700: '#142439',
          800: '#0e1a28',
          900: '#080f17',
        },
        gold: {
          DEFAULT: '#c9a84c',
          50:  '#fdf8ec',
          100: '#f9edca',
          200: '#f2d995',
          300: '#ecc560',
          400: '#c9a84c',  // brand accent
          500: '#a8893a',
          600: '#876a28',
          700: '#664c18',
          800: '#452e0a',
          900: '#241500',
        },
        cream: '#f5f5f0',
        charcoal: '#1c1c1c',
      },
      fontFamily: {
        // Refined: editorial serif for headings, humanist sans for body
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'display-md': ['2.5rem',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2rem',    { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
      },
      maxWidth: {
        'prose-wide': '75ch',
        'content': '1200px',
      },
      boxShadow: {
        'card':   '0 1px 3px rgba(26,46,74,0.08), 0 4px 16px rgba(26,46,74,0.06)',
        'card-hover': '0 4px 12px rgba(26,46,74,0.12), 0 16px 40px rgba(26,46,74,0.08)',
        'cta':    '0 8px 32px rgba(201,168,76,0.25)',
      },
      borderRadius: {
        'xl2': '1rem',
        'xl3': '1.5rem',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #1a2e4a 0%, #0e1a28 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #a8893a 100%)',
        'hero-texture':  'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(26,46,74,0.04) 0%, transparent 60%)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'slide-in':  'slideIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config