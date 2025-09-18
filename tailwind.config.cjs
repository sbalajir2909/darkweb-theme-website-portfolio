module.exports = {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a", neon: "#39ff14", glitch: "#8a2be2", danger: "#ff0033"
      },
      fontFamily: {
        mono: ["JetBrains Mono","ui-monospace","SFMono-Regular","monospace"],
        sans: ["Inter","ui-sans-serif","system-ui"]
      }
    }
  },
  plugins: []
}
