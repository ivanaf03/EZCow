import React from 'react';

import { Pressable, Text } from 'react-native';

const CustomButton = ({ text, onPress, buttonTestID}) => {
    return (
        <Pressable
            className="bg-c_violet rounded-full p-4 m-2"
            onPress={onPress}
            testID={buttonTestID}
        >
            <Text className="text-c_white text-xl text-center font-Nunito_Bold">
                {text}
            </Text>
        </Pressable>
    );
};

export default CustomButton;