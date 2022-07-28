/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'unsplash-background': "url('https://source.unsplash.com/1600x900/?landscape')",
      }
    },
  },
  plugins: [],
}
