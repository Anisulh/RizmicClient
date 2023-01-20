/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'slategrey':'#6C7A89',
        'raisinblack':'#1C2331',
        'lavendarblush':'#F5EDF0',
        'cambridgeblue':'#B7D1C1' 
      }
    },
  },
  plugins: [],
}
