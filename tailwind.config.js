/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        business: {
          primary: "#8C52FF",
          dark: "#300B6A",
          light: "#F5F2FF",
        },
        reseller: {
          primary: "#1E90FF",
          light: "#EDF9FF",
          dark: "#11305A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
