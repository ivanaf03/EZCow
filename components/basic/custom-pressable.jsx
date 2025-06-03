import React from "react";

import { Pressable, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const CustomPressable = ({ text, onPress, buttonTestID, icon }) => {
  return (
    <Pressable
      className="flex flex-row justify-center items-center p-4 bg-c_light_gray border-2 border-c_light_blue rounded-3xl space-x-4"
      onPress={onPress}
      testID={buttonTestID}
    >
      <FontAwesomeIcon icon={icon} size={20} color="white" />
      <Text className="font-Nunito_SemiBold text-c_white text-xl">
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomPressable;
