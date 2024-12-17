/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
const { DEFAULT_CIPHERS } = require('tls');
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
        primary:{
          50: "#f1edfd",
          100: "#d1cde6",
          200: "#b2acd3",
          300: "#948bc0",
          400: "#7569ad",
          500: "#5b5094",
          600: "#473e73",
          700: "#332c53",
          800: "#1e1b34",
          900: "#0a0817",
          DEFAULT:"#2F294D"
        },
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

