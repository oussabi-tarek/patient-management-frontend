/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        spin: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      colors: {
        darkGrey: "var(--darkGrey)",
        lightGrey: "var(--lightGrey)",
        light: "var(--light)",
        yellow: "var(--yellow)",
        darkBlue: "var(--primary-gradient-end)",
        lightBlue: "var(--primary-gradient-start)",
        orange: "var(--orange)",
        green: "var(--green)",
        lightGreen: "var(--lightGreen)",
      },
    },
  },
  plugins: [],
};
