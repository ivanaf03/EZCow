import React from "react";

import { View } from "react-native";

const CustomFormDiv = ({ children }) => {
  return (
    <View className="flex p-4 bg-c_light_gray rounded-lg space-y-6">
      {children}
    </View>
  );
};

export default CustomFormDiv;
