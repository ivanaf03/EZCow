import React from "react";
import { View, Text } from "react-native";

import CustomPressable from "../../../components/basic/custom-pressable";
import icons from "../../../constants/icons";

const GroupCard = ({ group, onDelete }) => {
  return (
    <View className="flex-row items-center justify-between my-4 px-4">
      <Text className="text-c_white text-lg font-Nunito_Medium">
        {group.groupName}
      </Text>
      <View>
        <CustomPressable
          text="Borrar"
          onPress={() => onDelete(group)}
          buttonTestID="delete-group-button"
          icon={icons.faTrash}
        />
      </View>
    </View>
  );
};

export default GroupCard;
