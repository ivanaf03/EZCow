import React from "react";

import { View } from "react-native";

const CustomTextDiv = ({ children }) => {
  return (
    <View className="p-4 bg-c_light_gray rounded-lg border-2 border-c_white">
      {children}
    </View>
  );
};

export default CustomTextDiv;
