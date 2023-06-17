/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backgroundImage: {
      'ocean': "url('../public/images/ocean.jpg')",
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}