/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        warm: "#f97316",
        meadow: "#15803d",
      },
      boxShadow: {
        soft: "0 16px 40px -28px rgba(15, 23, 42, 0.55)",
      },
    },
  },
  plugins: [],
};
