/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        saira: ["Saira", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        mukta: ["Mukta", "sans-serif"],
      },
      maxHeight: {
        mainheights: "700px",
      },
      height: {
        mainheights: "700px",
      },
    },
  },
  plugins: [],
};
