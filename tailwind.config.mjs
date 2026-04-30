/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#050A18",
          navy: "#003DA5",
          blue: "#0052CC",
          cyan: "#00D9FF",
          lime: "#AADD00",
          gray: {
            400: "#97A0AF",
            900: "#091E42",
          },
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "system-ui", "-apple-system", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
