/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Comic Sans",
          "Comic Sans MS",
          "Chalkboard",
          "ChalkboardSE-Regular",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
