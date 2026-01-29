import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        positive: "#10b981",
        negative: "#ef4444",
      },
    },
  },
  plugins: [],
};

export default config;
