/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*.js',
    './components/*.js',
    './pages/**',
    './pages/posts/create.js',
  ],
  theme: {
    extend: {
      maxWidth: {
        260: '600px',
      },
      colors: {
        gray: {
          1000: '#2B2E30',
          1100: '#D9D2C9',
        },
      },
      screens: {
        mdlg: '876px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
