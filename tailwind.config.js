/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'blue-900': '#06507F',
        'blue-500': '#021826',
        'blue-700': '#1e40af',
      },
    },
  },
  plugins: [],
}