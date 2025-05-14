import React from "react";

import { View, Pressable, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import icons from "../../constants/icons";

const CustomGoogleButton = ({ text, onPress, buttonTestID }) => {
  return (
    <Pressable
      className="flex flex-row justify-between items-center p-4 bg-c_light_gray border-2 border-c_light_blue rounded-3xl"
      onPress={onPress}
      testID={buttonTestID}
    >
      <View className="flex flex-row justify-center items-center gap-4">
        <FontAwesomeIcon icon={icons.faGoogle} size={20} color="white" />
        <Text className="font-Nunito_SemiBold text-c_white text-xl text-center">
          {text}
        </Text>
      </View>
      <FontAwesomeIcon icon={icons.faArrowRight} size={20} color="white" />
    </Pressable>
  );
};

export default CustomGoogleButton;
