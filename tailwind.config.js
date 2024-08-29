const { colors } = require('./src/config').restaurantConfig;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        text: colors.text,
        background: colors.background,
      },
      // ... other extensions
    },
  },
  plugins: [],
}