/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1117',
          surface: '#161b27',
          border: '#2a3245'
        },
        accent: '#f59e0b',
        node: {
          start: '#22c55e',
          task: '#3b82f6',
          approval: '#a855f7',
          auto: '#f97316',
          end: '#6b7280'
        }
      }
    },
  },
  plugins: [],
}
