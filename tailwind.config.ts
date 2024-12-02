import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fadeUp .5s ease-in'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
} satisfies Config;
