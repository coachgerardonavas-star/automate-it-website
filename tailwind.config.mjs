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
          cyan: "#0099BB",
          lime: "#7AB000",
          gray: {
            400: "#97A0AF",
            900: "#091E42",
          },
        },
        neutral: {
          0: "#FFFFFF",
          50: "#FAFBFD",
          100: "#F3F5F9",
          200: "#E5E7ED",
          300: "#CCCCCC",
          400: "#999999",
          500: "#6A7589",
          600: "#3C4765",
          700: "#1F2740",
          800: "#141A2B",
          900: "#0A0E1A",
        },
        info: {
          DEFAULT: "#0052CC",
          bg: "#E6EEFB",
        },
        success: {
          DEFAULT: "#AADD00",
          bg: "#F2FBD6",
        },
        warning: {
          DEFAULT: "#F5A524",
          bg: "#FEF3DC",
        },
        danger: {
          DEFAULT: "#E5484D",
          bg: "#FDECED",
        },
        lime: {
          300: "#D9F080",
          400: "#C2EA40",
          DEFAULT: "#AADD00",
          600: "#8BB800",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "system-ui", "-apple-system", "sans-serif"],
        heading: [
          '"Manifold CF"',
          "Montserrat",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        full: "999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(15,23,42,0.06)",
        sm: "0 2px 4px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)",
        md: "0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04)",
        lg: "0 12px 32px rgba(15,23,42,0.10), 0 4px 8px rgba(15,23,42,0.06)",
        neon: "0 0 16px rgba(0,217,255,0.55), 0 0 4px rgba(0,217,255,0.85)",
        lime: "0 0 16px rgba(170,221,0,0.55), 0 0 4px rgba(170,221,0,0.85)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0, 0, 1)",
      },
      animation: {
        "pulse-live": "pulse-live 2s ease-in-out infinite",
        entry: "entry 360ms ease-out forwards",
      },
      keyframes: {
        "pulse-live": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        entry: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
