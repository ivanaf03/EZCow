import React from "react";
import { View, TextInput, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import icons from "../../constants/icons";

const CustomSearchBar = ({ text, value, onChangeText }) => {
    return (
        <View className="space-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <View className="flex-row items-center bg-c_white border-2 border-c_marine_blue rounded-3xl">
                <TextInput
                    placeholder="Buscar..."
                    value={value}
                    onChangeText={onChangeText}
                    className="flex-1 ml-2 py-3 font-Nunito_Medium text-c_black"
                />
                <View className="h-10 w-10 items-center justify-center">
                    <FontAwesomeIcon
                        icon={icons.faMagnifyingGlass}
                        size={18}
                        color="black"
                    />
                </View>
            </View>
        </View>
    );
};

export default CustomSearchBar;