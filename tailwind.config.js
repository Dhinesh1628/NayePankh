/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E2A2B',
        canvas: '#FBF8F3',
        wing: {
          DEFAULT: '#1F7A6C',
          light: '#2E9683',
          dark: '#15564C',
        },
        saffron: {
          DEFAULT: '#E98C2B',
          light: '#F2A84F',
        },
        coral: '#E15B4D',
        mist: '#D9E7E4',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'wing-gradient': 'linear-gradient(135deg, #0E2A2B 0%, #15564C 45%, #1F7A6C 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(14, 42, 43, 0.25)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
