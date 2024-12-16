import flowbite from "flowbite-react/tailwind";
import plugin from "tailwind-clip-path";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ...flowbite.content(),
  ],
  darkMode: "class", // Enable class-based dark mode

  theme: {
    extend: {
      fontFamily: {
        acme: ["Acme", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "gray-text": "#272d3e",
      },
    },
  },
  plugins: [
    plugin, // Adds the tailwind-clip-path plugin
    flowbite.plugin, // Adds Flowbite plugin
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "100%",
          },
          "@screen md": {
            maxWidth: "100%",
          },
          "@screen lg": {
            maxWidth: "1280px",
          },
          "@screen xl": {
            maxWidth: "1320px",
          },
        },
      });
    },
  ],
};
