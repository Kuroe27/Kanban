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
          950: '#2a2a2c',
          900: '#1e1f21',
          850: '#2a2b2d',
          800: '#252628',
          700: '#2e2e30',
          600: '#292a2c',
          400: '#28292a',
          300: '#424244',
          200: '#a2a0a2',
          100: '#f5f4f3',
        },
      },
    },
  },
  plugins: [],
}
