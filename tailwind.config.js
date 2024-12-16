/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#2F294D",
        secondary:"var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted:"var(--muted)",
        input:"#f0f0f0",
        border:'#ccc'
      },
    },
  },
  plugins: [],
  darkMode: "class",
  plugins: [nextui()],
}

