import React from "react";

import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapCard = ({ map }) => {
  return (
    <View className="flex-col my-2 space-y-4 p-4 ml-[-10] mr-6 bg-c_light_gray rounded-r-3xl border-r-4 border-c_light_blue">
      <Text className="text-c_white ml-2 text-lg font-Nunito_Bold">
        {map.name}
      </Text>
      <View className="h-[300px] bg-c_light_gray border-2 border-c_light_blue rounded-2xl mx-4 p-2 mt-4">
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: map.latitude,
            longitude: map.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          mapType="satellite"
        >
          <Marker
            title={map.name}
            coordinate={{ latitude: map.latitude, longitude: map.longitude }}
          />
        </MapView>
      </View>
    </View>
  );
};

export default MapCard;
