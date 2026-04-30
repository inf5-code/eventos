import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-righteous)", "sans-serif"],
      },
      colors: {
        // ── Pastel dark brand palette ──────────────────────────
        brand: {
          50:  "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",   // Main brand — soft lavender
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
        accent: {
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",   // Soft rose/pink
          400: "#F472B6",
          500: "#EC4899",
        },
        cta: {
          100: "#FEF3C7",
          200: "#FDE68A",   // Soft gold — CTA colour
          300: "#FCD34D",
          400: "#FBBF24",
        },
        cyan: {
          200: "#A5F3FC",   // Soft cyan — info badges
          300: "#67E8F9",
          400: "#22D3EE",
        },
        // ── Dark backgrounds ───────────────────────────────────
        bg: {
          base:  "#09090F",   // Near-black (main body)
          card:  "#12121E",   // Card surface
          layer: "#1C1C2E",   // Section alternate bg
          muted: "#252538",   // Elevated surface
        },
        border: {
          DEFAULT: "#2A2A40",
          strong:  "#3D3D5C",
        },
      },
      borderColor: {
        DEFAULT: "#2A2A40",
      },
      // fluid type scale
      fontSize: {
        "fluid-hero":   ["clamp(2.4rem,5vw,5.5rem)", { lineHeight: "1" }],
        "fluid-h2":     ["clamp(1.4rem,2.5vw,2.25rem)", { lineHeight: "1.15" }],
        "fluid-sub":    ["clamp(1rem,1.5vw,1.5rem)",  { lineHeight: "1.4" }],
      },
      animation: {
        "fade-up":   "fadeUp 0.35s ease-out both",
        "fade-in":   "fadeIn 0.4s ease-out both",
        "slide-left":"slideLeft 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "slide-right":"slideRight 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "pulse-soft":"pulseSoft 2.5s ease-in-out infinite",
        heartbeat:   "heartbeat 1.2s ease-in-out",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.6" },
        },
        heartbeat: {
          "0%":   { transform: "scale(1)" },
          "14%":  { transform: "scale(1.35)" },
          "28%":  { transform: "scale(1)" },
          "42%":  { transform: "scale(1.25)" },
          "70%":  { transform: "scale(1)" },
        },
      },
      boxShadow: {
        brand: "0 0 24px 0 rgba(196,181,253,0.18)",
        glow:  "0 0 40px 0 rgba(196,181,253,0.12)",
        card:  "0 4px 24px 0 rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
