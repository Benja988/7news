// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode using a .dark class on <html>
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: '1rem', // Ensure consistent base font size
      },
      colors: {
        /* 🌞 Light Theme */
        'light-bg': '#f9fafb',
        'light-text': '#1f2937',
        'light-heading': '#111827',

        /* 🌙 Dark Theme */
        'dark-bg': '#111827',
        'dark-surface': '#1f2937',
        'dark-text': '#f3f4f6',
        'dark-heading': '#f9fafb',

        /* 🎨 Brand (Primary) Palette */
        primary: {
          DEFAULT: '#e11d48',       // Rose-600 (good accent for news)
          dark: '#be123c',           // Rose-700
          light: '#fb7185',          // Rose-400
        },

        secondary: {
          DEFAULT: '#2563eb',       // Blue-600
          dark: '#1e40af',           // Blue-800
          light: '#60a5fa',          // Blue-400
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },

      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}


