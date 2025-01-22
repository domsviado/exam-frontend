/** @type {import('tailwindcss').Config} */
module.exports = {
  name: "tailwind-config",
  mode: "jit",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Open Sans"'],
      },
      colors: {
        primary: "#183695",
        secondary: "#838295",
        paprika: "#E45959",
        salmon: "#FFEAEA",
        kale: "#5A8662",
        cucumber: "#F1FAEE",
        soap: "#407B95",
        bubbles: "#E6F6FF",
        currant: "#413C3C",
        flour: "#F8F8F8",
        "baking-soda": "#E5E5E5",
        gainsboro: "#DBDEDA",
        mackerel: "#9B9B9B",
        mint: "#41B883",
        "pastel-red": "#FF6A6A",
        "custom-blue": "#183695",
        "company-blue":"#90C3FF",
        info: "#16BFD6",
        pink: "#F765A3",
        violet: "#A155B9",
        teal: "#00b3b3",
      },
      backgroundColor: {
        "custom-gray": "#E9E9E9",
        "mint-green": "#C3EBC7",
        "custom-pink": "#E5C3EB",
        "nude-brown": "#EBD1C3",
        "nude-lips": "#EBC3C5"
      },
      borderColor: {
        "company-blue":"#90C3FF",
      }
    },
    
  },
  plugins: [],
};
