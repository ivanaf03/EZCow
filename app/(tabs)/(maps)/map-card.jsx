import React from "react";

import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import icons from "../../../constants/icons";
import CustomPressable from "../../../components/basic/custom-pressable";

const MapCard = ({ map, onDelete }) => {
  return (
    <View className="flex-col my-2 space-y-4 p-4 mr-6 bg-c_light_gray rounded-r-3xl border-r-4 border-c_light_blue">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2 max-w-[50%] overflow-hidden">
          <Text className="text-c_white text-sm font-Nunito_Bold">
            <FontAwesomeIcon icon={icons.faLocationDot} size={30} color="white" />
          </Text>
          <Text className="text-c_white text-lg font-Nunito_Bold">
            {map.name}
          </Text>
        </View>
        <CustomPressable
          text="Borrar finca"
          onPress={() => onDelete(map)}
          buttonTestID="delete-map-button"
          icon={icons.faTrash}
        />
      </View>
      <View className="h-60 bg-c_light_gray rounded-2xl mx-4 mt-4">
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
