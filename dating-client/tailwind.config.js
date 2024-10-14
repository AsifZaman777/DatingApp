import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl2': '1800px', // Custom breakpoint for 1800px
      },
    },
  },
  plugins: [
    daisyui,],
  

  daisyui: {
    themes: ["dark","cupcake",'autumn','light'],
  },
}




