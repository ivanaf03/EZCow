import React from "react";

import { View, Text } from "react-native";
import CustomTextDiv from "../../../components/basic/custom-text-div";

const BreedingDay = ({ date, events }) => {
  return (
    <CustomTextDiv>
      <View className="w-full justify-start">
        <Text className="text-c_white font-bold font-Nunito_Medium">{date}</Text>
        {events.map((event, index) => (
          <View key={index} className="my-2 flex-col justify-between">
            <Text className="text-c_white font-Nunito_BoldItalic text-md underline">
              {event.eventName} - {event.name}
            </Text>
            <Text className="text-c_white text-sm font-Nunito_Medium">
              {event.description}
            </Text>
          </View>
        ))}
      </View>
    </CustomTextDiv>
  );
};

export default BreedingDay;
