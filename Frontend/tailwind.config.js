/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'colima-blue': '#3B82F6',
        'colima-dark': '#1E293B',
        'colima-bg': '#F8FAFC',
      },
    },
  },
  plugins: [],
}