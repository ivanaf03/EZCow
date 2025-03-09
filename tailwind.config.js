// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      c_layout: "#0E041AFF",
      c_background: "#22072BFF",
      c_dark_violet: "#580088",
      c_violet: "#75009d",
      c_light_violet: "#a526a9",
      c_green: "#8fce54",
      c_pastel_green: "#b9e8bf",
      c_white: "#ffffff",
      c_orange: "#FF8018FF",
    },
    fontFamily: {
      Nunito_Black: ["Nunito-Black"],
      Nunito_BlackItalic: ["Nunito-BlackItalic"],
      Nunito_Bold: ["Nunito-Bold"],
      Nunito_BoldItalic: ["Nunito-BoldItalic"],
      Nunito_ExtraBold: ["Nunito-ExtraBold"],
      Nunito_ExtraBoldItalic: ["Nunito-ExtraBoldItalic"],
      Nunito_ExtraLight: ["Nunito-ExtraLight"],
      Nunito_ExtraLightItalic: ["Nunito-ExtraLightItalic"],
      Nunito_Italic: ["Nunito-Italic"],
      Nunito_Light: ["Nunito-Light"],
      Nunito_LightItalic: ["Nunito-LightItalic"],
      Nunito_Medium: ["Nunito-Medium"],
      Nunito_MediumItalic: ["Nunito-MediumItalic"],
      Nunito_Regular: ["Nunito-Regular"],
      Nunito_SemiBold: ["Nunito-SemiBold"],
      Nunito_SemiBoldItalic: ["Nunito-SemiBoldItalic"],
    },
  },
  plugins: [],
};
