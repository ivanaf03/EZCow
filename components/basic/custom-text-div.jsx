import React from "react";

import { View } from "react-native";

const CustomTextDiv = ({ children }) => {
  return (
    <View className="flex items-center justify-center p-4 bg-c_light_gray border-x-2 border-c_light_blue rounded-lg">
      {children}
    </View>
  );
};

export default CustomTextDiv;
