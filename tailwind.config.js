// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      c_dark_gray: "#1c1c1c",
      c_light_gray: "#272727",
      c_marine_blue: "#2254ba",
      c_light_blue: "#6bc0eb",
      c_white: "#ffffff",
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
