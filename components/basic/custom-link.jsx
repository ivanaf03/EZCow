import React from "react";

import { Pressable, Text } from "react-native";
import { router } from "expo-router";

const CustomLink = ({ text, to, color, linkTestID }) => {
    return (
        <Pressable
            onPress={() => router.push(to)}
            testID={linkTestID}
        >
            <Text className={`text-${color} text-xl text-center font-Nunito_Bold`}>
                {text}
            </Text>
        </Pressable>
    );
};

export default CustomLink;