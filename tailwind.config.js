/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },

    // fontFamily: {
    //   sans: ["Graphik", "sans-serif"],
    //   serif: ["Merriweather", "serif"],
    // },
    extend: {
      colors: {
        primary: "#1266f1",
      },

      transitionProperty: {
        left: "left",
        width: "width",
      },
    },
  },
  plugins: [],
};
