/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#d32027'
        },
        tailwindSecondary: "#1c1c1a",
        tailwindTertiary: "#ededed",
      },
    },
  },
  plugins: [],
};
