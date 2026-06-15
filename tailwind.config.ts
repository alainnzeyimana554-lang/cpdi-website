import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:       "#1565C0",
          green:      "#1B7A3D",
          lime:       "#8BB617",
          "dark-blue":"#0D3B6F",
          "light-blue":"#E8F0FE",
          "light-green":"#EAF5E4",
          charcoal:   "#2C2C2A",
          bg:         "#F5F5F3",
          white:      "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["'Source Sans Pro'", "sans-serif"],
        serif: ["'Merriweather'", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
