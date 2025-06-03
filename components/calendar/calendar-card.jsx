import React from "react";

import { View, Text } from "react-native";

const CalendarCard = ({ date, events, isSelected }) => {
  return (
    <View
      className={`flex-1 w-full justify-start  p-4 ${
        isSelected ? " border-8 border-c_light_blue" : "border-2 border-c_white"
      }`}
    >
      <Text className="text-c_white font-bold font-Nunito_Medium">{date}</Text>
      {events.map((event, index) => (
        <View key={index} className="pb-2 my-2 flex-col justify-between border-b-2 border-c_light_blue border-dashed">
          <Text className="text-c_white font-Nunito_BoldItalic text-md underline">
            {event.eventName} - {event.name}
          </Text>
          <Text className="text-c_white text-sm font-Nunito_Medium">
            {event.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CalendarCard;
