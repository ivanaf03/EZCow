import React from "react";

import { Text } from "react-native";

const CustomAuthTitle = ({ text }) => {
  return (
    <Text className="my-8 p-4 text-center text-c_white text-5xl font-Nunito_Bold">
      {text}
    </Text>
  );
};

export default CustomAuthTitle;