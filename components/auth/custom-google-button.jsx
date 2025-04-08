import React from "react";

import { View, Pressable, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import icons from "../../constants/icons";

const CustomGoogleButton = ({ text, onPress, buttonTestID }) => {
  return (
    <Pressable
      className="p-4 bg-c_light_gray border-x-8 border-y-2 border-c_marine_blue rounded-3xl"
      onPress={onPress}
      testID={buttonTestID}
    >
      <View className="flex-row items-center justify-center space-x-4">
        <FontAwesomeIcon icon={icons.faGoogle} size={36} color="white" />
        <Text className=" font-Nunito_SemiBold text-c_white text-xl text-center">
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomGoogleButton;
