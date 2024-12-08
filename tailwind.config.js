/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        business: {
          primary: "#8C52FF", // Purple
          dark: "#300B6A",
          light: "#F5F2FF",
        },
        reseller: {
          primary: "#1E90FF", // Blue
          light: "#EDF9FF",
          dark: "#11305A",
        },
      },
    },
  },
  plugins: [],
};
