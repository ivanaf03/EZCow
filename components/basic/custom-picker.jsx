import React from 'react';

import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

const CustomPicker = ({ text, value, onValueChange, options }) => {
    return (
        <View className="m-2 gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <View className="bg-c_white border-2 border-c_dark_violet rounded-full">
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                >
                    {options.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default CustomPicker;