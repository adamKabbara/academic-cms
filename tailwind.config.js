/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/*.js', './components/*.js', './pages/blog/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
