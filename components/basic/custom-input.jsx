import React from 'react';

import { View, Text, TextInput } from 'react-native';

const CustomInput = ({ text, placeholder, value, onChangeText }) => {
    return (
        <View className="m-2 gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <TextInput
                className="p-2 bg-c_white border-2 border-c_dark_violet rounded-full"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default CustomInput;