/** @type {import('tailwindcss').Config} */
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
        Rubik: ["Inter", "sans-serif"],
        "Source-Sans": ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
