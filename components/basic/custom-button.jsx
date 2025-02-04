import React from 'react';

import { Pressable, Text } from 'react-native';

const CustomButton = ({ text, onPress}) => {
    return (
        <Pressable
            className="bg-c_violet rounded-full p-4 m-2"
            onPress={onPress}
        >
            <Text className="text-c_white text-xl font-Nunito_Bold">
                {text}
            </Text>
        </Pressable>
    );
};

export default CustomButton;