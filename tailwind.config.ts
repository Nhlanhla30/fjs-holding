import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Deep charcoal/slate tones (structural, engineering feel)
        primary: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d9d9de",
          300: "#b8b8c1",
          400: "#91919f",
          500: "#737384",
          600: "#5d5d6c",
          700: "#4c4c58",
          800: "#41414b",
          900: "#393941",
          950: "#1a1a1f",
        },
        // Accent — Amber/safety yellow (construction, bold, energetic)
        accent: {
          50: "#fffbeb",
          100: "#fff3c6",
          200: "#ffe588",
          300: "#ffd24a",
          400: "#ffbf20",
          500: "#f59e07",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Surface colors
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8f8fa",
          dark: "#111114",
          "dark-secondary": "#1a1a1f",
        },
        // Text colors
        text: {
          primary: "#1a1a1f",
          secondary: "#5d5d6c",
          tertiary: "#91919f",
          inverse: "#f7f7f8",
          "inverse-secondary": "#b8b8c1",
        },
        // Border
        border: {
          DEFAULT: "#eeeef0",
          dark: "#2a2a32",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        // Responsive type scale
        "display-xl": [
          "clamp(3rem, 6vw, 5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        "display-lg": [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading-lg": [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        "heading-md": [
          "clamp(1.25rem, 2vw, 1.75rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "body-lg": [
          "1.125rem",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "body-md": [
          "1rem",
          { lineHeight: "1.7", fontWeight: "400" },
        ],
        "body-sm": [
          "0.875rem",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        label: [
          "0.75rem",
          { lineHeight: "1.5", letterSpacing: "0.08em", fontWeight: "600" },
        ],
      },
      spacing: {
        section: "clamp(80px, 12vw, 160px)",
        "section-sm": "clamp(48px, 8vw, 96px)",
      },
      maxWidth: {
        container: "1280px",
        content: "720px",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0, 0, 0, 0.06)",
        medium: "0 4px 30px rgba(0, 0, 0, 0.1)",
        hard: "0 8px 40px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
