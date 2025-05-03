import React from "react";

import { Text } from "react-native";

const TabTitle = ({ text }) => {
  return (
    <Text className="mt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
      {text}
    </Text>
  );
};

export default TabTitle;