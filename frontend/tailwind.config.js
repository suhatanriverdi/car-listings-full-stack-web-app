/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "card-bg": "#E8F1EE80",
        "button-bg": "#D4EEA3BF",
        "button-bg-light": "#d7ff8c",
        "button-bg-dark": "#8dab55",
      },
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
        5000: "5000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
