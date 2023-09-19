/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  plugins:
    [
      require("daisyui"),
      require("@tailwindcss/forms")
    ],
}

