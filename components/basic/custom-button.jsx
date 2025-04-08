import React from "react";

import { Pressable, Text } from "react-native";

const CustomButton = ({ text, onPress, buttonTestID }) => {
  return (
    <Pressable
      className="p-4 bg-c_light_gray border-x-8 border-y-2 border-c_marine_blue rounded-3xl"
      onPress={onPress}
      testID={buttonTestID}
    >
      <Text className="font-Nunito_SemiBold text-c_white text-xl text-center">
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
