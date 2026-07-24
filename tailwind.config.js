export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#FDFBF7",
          100: "#F5F0E6",
          200: "#EDE4D3",
          300: "#E3D5BC",
          400: "#D6C2A1",
          500: "#C4A878",
          600: "#A98A5B",
          700: "#8B6F47",
          800: "#6B5638",
          900: "#4A3B27",
        },
        // Light azure — used for button/label text in place of white. Kept
        // light enough to stay readable (~4.7:1) on the dark clay buttons.
        azure: "#A9DCF5",
        // Warm terracotta/clay accent — the complementary "pop" color that
        // keeps the palette from reading as flat black-and-white on beige.
        clay: {
          50: "#FBF3EC",
          100: "#F4E1D2",
          200: "#E9C4A8",
          300: "#DBA57E",
          400: "#CC8659",
          500: "#BE7142",
          600: "#A65C34",
          700: "#88482A",
          800: "#6B3922",
          900: "#4E2A1A",
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    }
  },
  plugins: [],
}
