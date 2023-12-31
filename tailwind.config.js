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
    require("daisyui"),

    plugin(function ({ addVariant, addComponents, addUtilities }) {
      addComponents({});
      addUtilities({
        ".fcen": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
      addVariant("optional", "&:optional");
      addVariant("fcl", "& label");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("dirChildren", ["& > *"]);
      addVariant("group-open", [":merge(.group).open &"]);
      addVariant("peer-open", [":merge(.peer).open &"]);
    }),
  ],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "da-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
