/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/*.js', './components/*.js', './pages/**'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
