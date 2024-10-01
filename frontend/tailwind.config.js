/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Orange      : "#FFA800",
        Olive       : "#B0CC0D",
        btnGreen    : "#8EC038",
        btnDarkBlue : "#212B36"
      }
    },
  },
  plugins: [],
}

