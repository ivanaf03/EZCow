import React from "react";

import { View, Text } from "react-native";

import CustomPressable from "../../../components/basic/custom-pressable";
import icons from "../../../constants/icons";

const GrazingCard = ({ grazing, onDelete, isExited }) => {
  return (
    <View className="m-2 flex flex-col items-center p-4 bg-c_light_gray border-x-4 border-c_light_blue rounded-2xl">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 space-y-2">
          <Text className="font-Nunito_SemiBold text-c_white text-md">
            {grazing.fieldName}
          </Text>
          <Text className="font-Nunito_SemiBold text-c_white text-md">
            {grazing.groupName}
          </Text>
        </View>
        <View className="flex-row items-start">
          <Text className="font-Nunito_SemiBold text-c_white text-md">
            {grazing.initialDate}
          </Text>
          <Text className="font-Nunito_SemiBold text-c_white text-md">
            {" : "}
          </Text>
          <Text className="font-Nunito_SemiBold text-c_white text-md">
            {grazing.endDate ? grazing.endDate : "Actualidad"}
          </Text>
        </View>
      </View>
      {!isExited && (
        <CustomPressable
          text="Finalizar pastoreo"
          onPress={() => onDelete(grazing)}
          buttonTestID="delete-grazing-button"
          icon={icons.faTrash}
        />
      )}
    </View>
  );
};

export default GrazingCard;
