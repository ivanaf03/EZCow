import React from "react";

import { Text, View } from "react-native";

import CustomLink from "../basic/custom-link";

const CustomAuthNavigationLink = ({ text, linkText, to, testID }) => {
  return (
    <View className="ml-4 mt-20 w-full flex-row items-center">
      <Text className="text-c_white text-xl font-Nunito_Medium mr-2">
        {text}
      </Text>
      <CustomLink
        text={linkText}
        to={to}
        linkTestID={testID}
      />
    </View>
  );
};

export default CustomAuthNavigationLink;
