/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
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
        sans: [
          '"Inter var", sans-serif',
          {
            fontFeatureSettings: '"cv11", "ss01"',
            fontVariationSettings: '"opsz" 32'
          },
        ],
      },
      colors: {
        'slategrey':'#6C7A89',
        'ourGrey':'#D9D9D9',
        'raisinblack':'#1C2331',
        'sWhite':'#FBFAF5',
        'cambridgeblue':'#B7D1C1', 
        'ultramarineBlue': '#446DF6'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
