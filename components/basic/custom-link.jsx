import React from "react";

import { Pressable, Text } from "react-native";
import { router } from "expo-router";

const CustomLink = ({ text, to, linkTestID }) => {
    return (
        <Pressable
            onPress={() => router.push(to)}
            testID={linkTestID}
        >
            <Text className={`text-c_light_blue text-2xl text-center font-Nunito_Italic underline`}>
                {text}
            </Text>
        </Pressable>
    );
};

export default CustomLink;