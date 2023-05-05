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
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
