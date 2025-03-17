import React from 'react';

import { View, Text, TextInput } from 'react-native';

const CustomInput = ({ text, placeholder, value, onChangeText }) => {
    return (
        <View className="m-2 gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Medium">
                {text}:
            </Text>
            <TextInput
                className="p-2 bg-c_white border-2 border-c_marine_blue rounded-2xl font-Nunito_Medium"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default CustomInput;