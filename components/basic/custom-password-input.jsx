import React from 'react';

import { View, Text, TextInput, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import icons from '../../constants/icons';

const CustomPasswordInput = ({ text, placeholder, value, onChangeText }) => {

    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <View className="m-2 gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <View className="flex-row items-center">
                <TextInput
                    className="p-2 mr-2 bg-c_white border-2 border-c_marine_blue rounded-2xl flex-1 font-Nunito_Medium"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} testID="eye-icon">
                    <FontAwesomeIcon
                        icon={showPassword ? icons.faEye : icons.faEyeSlash}
                        size={20}
                        color="white"
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default CustomPasswordInput;