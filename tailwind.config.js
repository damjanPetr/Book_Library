/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./views/**/*.{html,js}",
    "./scripts/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Rubik: ["Rubik", "sans-serif"],
        "Source-Sans": ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    plugin(function ({ addVariant }) {
      addVariant("fcl", "& label");
    }),
  ],
};
