/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        CircularStd : ['CircularStd', 'sans-serif'],
      }
    },
    colors: {
      green: "#1DB954",
      offGreen : "#2BDE6A",
      darkBlack : "#040306",
      dark : "#181818"
    }
  },
  plugins: [],
}

