import React from "react";

import { View, Text } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import icons from "../../../constants/icons";
import CustomPressable from "../../../components/basic/custom-pressable";

const CadastralMapCard = ({ map, coordinates, onDelete, latitude, longitude }) => {
  return (
    <View className="flex-col my-2 space-y-4 p-4 mr-6 bg-c_light_gray rounded-r-3xl border-r-4 border-c_light_blue">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2 max-w-[40%] overflow-hidden">
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
      <View className="h-44 bg-c_light_gray rounded-2xl mx-4 mt-4">
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          mapType="satellite"
        >
          <Polygon
            coordinates={coordinates}
            strokeColor="red"
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeWidth={1}
          />
          <Marker
            title={map.name}
            coordinate={{ latitude: map.latitude, longitude: map.longitude }}
          />
        </MapView>
      </View>
    </View>
  );
};  

export default CadastralMapCard;