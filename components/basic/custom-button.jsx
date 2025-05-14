import React from "react";

import { Pressable, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import icons from "../../constants/icons";

const CustomButton = ({ text, onPress, buttonTestID }) => {
  return (
    <Pressable
      className="flex flex-row justify-between items-center p-4 bg-c_light_gray border-2 border-c_light_blue rounded-3xl"
      onPress={onPress}
      testID={buttonTestID}
    >
      <Text className="font-Nunito_SemiBold text-c_white text-xl text-center">
        {text}
      </Text>
      <FontAwesomeIcon
        icon={icons.faArrowRight}
        size={20}
        color="white"
      />
    </Pressable>
  );
};

export default CustomButton;
