module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{html}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#8b5cf6', // purple accent (change if you prefer another hex)
          600: '#7c3aed',
          500: '#8b5cf6'
        },
        primary: '#000000',
        secondary: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};