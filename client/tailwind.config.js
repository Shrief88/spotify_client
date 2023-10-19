/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        CircularStd: ["CircularStd", "sans-serif"],
      },
      keyframes: {
        dance: {
          from: {
            height: "10px",
          },
          to: {
            height: "50px",
          },
        },
      },
      animation: {
        dance: "dance 400ms ease-in-out infinite ",
      },
    },
    colors: {
      green: "#1DB954",
      offGreen: "#2BDE6A",
      darkBlack: "#040306",
      dark: "#181818",
      gray: "#9B9B9B",
      white : "#FFFFFF",
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
