  /** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
      offGreen: "#1ed760",
      blue: "#509bf5",
      navBlack: "#040306",
      black: "#181818",
      white: "#FFFFFF",
      lightestGrey: "#b3b3b3",
      lightGrey: "#9B9B9B",
      grey: "#404040",
      darkGrey: "#282828",
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animation-delay")],
};
