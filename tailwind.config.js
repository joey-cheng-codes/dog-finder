/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  daisyui: {
    themes: ['light'],
  },
  plugins:
    [
      require("daisyui"),
      require("@tailwindcss/forms"),
      require('flowbite/plugin'),
    ]
}

