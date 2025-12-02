/** @type {import('tailwindcss').Config} */
plugins: [require("@tailwindcss/typography")]

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // example custom color
      },
    },
  },
  plugins: [],
}
