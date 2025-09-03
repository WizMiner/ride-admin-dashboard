/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "hsl(var(--primary-100))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
        },
        accent: {
          500: "hsl(var(--accent-500))",
        },
        background: "hsl(var(--theme-background))",
        foreground: "hsl(var(--theme-text))",
        card: "hsl(var(--theme-card))",
        muted: "hsl(var(--theme-muted-text))",
        border: "hsl(var(--theme-border))",
        hover: "hsl(var(--theme-hover))",
      },
    },
  },
  plugins: [],
};
