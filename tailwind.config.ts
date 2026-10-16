import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#10100e",
        ink: "#f4f1ea",
        mute: "#aaa49a",
        line: "#2a2926",
        copper: "#f0b59a",
        panel: "#1a1916",
        ex: {
          paper: "#f7f6f4",
          ink: "#141414",
          green: "#141414",
          deep: "#141414",
          mute: "#55514c",
          line: "#e3e2de",
          copper: "#9a4034",
        },
      },
      fontFamily: {
        serif: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        example: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        "example-serif": ["var(--font-bodoni)", "Georgia", "serif"],
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
};
export default config;
