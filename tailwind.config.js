const paperColor = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: paperColor("paper-accent"),
          dark: paperColor("paper-accent-dark"),
          light: paperColor("paper-accent-soft"),
        },
        secondary: paperColor("paper-coral"),
        accent: paperColor("paper-blue"),
        ink: {
          DEFAULT: paperColor("paper-ink"),
          muted: paperColor("paper-ink-muted"),
        },
        paper: {
          DEFAULT: paperColor("paper-bg"),
          surface: paperColor("paper-surface"),
          muted: paperColor("paper-muted"),
          raised: paperColor("paper-raised"),
          rule: paperColor("paper-rule"),
        },
        dark: {
          DEFAULT: paperColor("paper-bg"),
          secondary: paperColor("paper-muted"),
          card: paperColor("paper-surface"),
          "card-hover": paperColor("paper-raised"),
        },
      },
      fontFamily: {
        cairo: ['"Cairo"', "sans-serif"],
        tajawal: ['"Tajawal"', "sans-serif"],
        sf: [
          '"Cairo"',
          '"Tajawal"',
          '"SF Pro"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "20px",
        "2xl": "30px",
      },
      animation: {
        "pulse-slow": "pulse 8s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
