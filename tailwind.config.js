const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Rubik", ...fontFamily.sans],
      },
      colors: {
        "base-content-neutral": "hsl(var(--bc) / 0.6)",
        "course-banner": "hsl(var(--course-banner))",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 100ms ease-in-out",
      },
      gridTemplateColumns: {
        autofill: "repeat(auto-fill, minmax(18rem, 1fr))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-radix")(),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#7af02b",
          "primary-content": "#000000",
          "--btn-text-case": "none",
          "--rounded-btn": "0.75rem",
          "--rounded-box": "0.75rem",
          "--course-banner": "259, 73%, 27%",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#bff164",
          "primary-content": "#365313",
          accent: "#498c3e",
          "base-100": "#0d1a26",
          "base-200": "#172c40",
          "base-300": "#193147",
          "base-content": "#eeeeee",
          "--btn-text-case": "none",
          "--rounded-btn": "0.75rem",
        },
      },
    ],
  },
};
