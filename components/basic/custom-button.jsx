import React from 'react';

import { Pressable, Text } from 'react-native';

const CustomButton = ({ text, onPress, buttonTestID}) => {
    return (
        <Pressable
            className="bg-c_light_gray border-r-8 border-l-8 border-c_marine_blue rounded-3xl p-4 m-2"
            onPress={onPress}
            testID={buttonTestID}
        >
            <Text className="text-c_white text-lg text-center font-Nunito_Medium mx-2">
                {text}
            </Text>
        </Pressable>
    );
};

export default CustomButton;