import React from "react";

import { Text } from "react-native";

const CustomAuthTitle = ({ text }) => {
  return (
    <Text className="mt-4 mx-4 text-c_white text-4xl font-Nunito_Bold">
      {text}
    </Text>
  );
};

export default CustomAuthTitle;