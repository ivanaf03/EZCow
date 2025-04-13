import React from "react";

import { View, Text } from "react-native";
import CustomTextDiv from "../../../components/basic/custom-text-div";

const BreedingDay = ({ date, event }) => {
  return (
    <CustomTextDiv>
      <View className="w-full justify-start">
        <Text className="text-c_white text-sm font-Nunito_Medium">{date}</Text>
        {event && (
          <View className="flex-row items-center space-x-2" key={event.id}>
            <Text className="text-c_white text-sm font-Nunito_Medium">
              {event.cowName} - {event.name}
            </Text>
            <Text className="text-c_white text-sm font-Nunito_Medium">
              {event.description}
            </Text>
          </View>
        )}
      </View>
    </CustomTextDiv>
  );
};

export default BreedingDay;
