/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { secondary: "#F8F9FA", primary: "#6F42C1" },
    },
  },
  plugins: [],
};
