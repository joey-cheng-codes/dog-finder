/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins:
    [
      require("daisyui"),
      require("@tailwindcss/forms"),
      require('flowbite/plugin')
    ],
}

