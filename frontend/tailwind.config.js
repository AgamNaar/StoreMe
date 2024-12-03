/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryColor: "#06595d",
        secondaryColor: "#f6f1ba",
        backGroundColor: "#b5cfcc",
        highLightColor: "#9FB4C7",
        textColor: "#f6f1ba"
      },
      fontFamily: {
        mainFont: ["main-font", "sans-serif"],
        mainFontBold: ["main-bold", "sans-serif"]
      }
    },
  },
  plugins: [],
}