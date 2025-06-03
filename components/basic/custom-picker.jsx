import React from 'react';

import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

const CustomPicker = ({ text, value, onValueChange, options, pickerTestID }) => {
    return (
        <View className="gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <View className="bg-c_white border-2 border-c_marine_blue rounded-3xl font-Nunito_Medium">
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                    testID={pickerTestID}
                >
                    {options.map((option) => (
                        <Picker.Item key={option} label={option} value={option} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

export default CustomPicker;