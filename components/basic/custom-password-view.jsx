import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import icons from '../../constants/icons';

const CustomPasswordView = ({ text, value }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const maskedValue = showPassword ? value : '*'.repeat(value.length);

    return (
        <View className="gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <View className="flex-row items-center">
                <Text className="mr-2 bg-c_light_gray text-c_white flex-1 font-Nunito_Medium" testID="password-text">
                    {maskedValue} 
                </Text>
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

export default CustomPasswordView;
