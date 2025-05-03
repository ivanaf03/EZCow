import React from 'react';

import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="flex gap-1 items-center justify-center min-w-[40px]">
            <FontAwesomeIcon icon={icon} color={color} size={focused ? 32 : 18} />
            <Text className={`${focused ? "font-Nunito_Bold text-c_light_blue" : "font-Nunito_Medium text-c_white"} text-xs`}>
                {name}
            </Text>
        </View>
    );      
};

export default TabIcon;