/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#000000',
          800: '#09090b',
          700: '#27272a',
          600: '#27272a',
          500: '#18181b',
          450: '#18181a',
          400: '#93939c',
          350: '#828283',
          300: '#a1a1aa',
          200: '#18181b',
          100: '#fafafa',
          50: '#dedfe0',
        },

      },
    },
  },
  plugins: [],
}