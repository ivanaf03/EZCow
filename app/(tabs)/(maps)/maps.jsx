import React from "react";

import { Text, View, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";

import {
  insertFarmUbication,
  getFarmUbicationByUserId,
} from "../../../model/farm";
import { useUser } from "../../../store/user-provider";
import CustomButton from "../../../components/basic/custom-button";
import TabTitle from "../../../components/tabs/tab-title";
import CustomTextDiv from "../../../components/basic/custom-text-div";
import CustomPressable from "../../../components/basic/custom-pressable";
import icons from "../../../constants/icons";

const Maps = () => {
  const [selectedLocation, setSelectedLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const { user } = useUser();

  React.useEffect(() => {
    const fetchLocation = async () => {
      const location = await getFarmUbicationByUserId(user.id);
      setSelectedLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    };

    fetchLocation();
  }, [user.id]);

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleSaveLocation = async () => {
    await insertFarmUbication(
      user.id,
      selectedLocation.latitude,
      selectedLocation.longitude
    );
    Alert.alert("Guardado", "La ubicación ha sido guardada correctamente.");
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Mi explotación" />
      <View className="flex items-center mt-4">
        <View className="w-[75%] space-y-2">
          <View>
            <CustomButton
              text="Ver ubicaciones"
              onPress={() => router.replace("fields")}
              buttonTestID={"fields-button"}
            />
          </View>
          <View>
            <CustomButton
              text="Ver parcelas"
              onPress={() => router.replace("cadastral-fields")}
              buttonTestID={"cadastral-fields-button"}
            />
          </View>
        </View>
      </View>
      <View className="flex items-center mt-4">
        <View className="w-[90%]">
          <CustomTextDiv>
            <Text className="text-c_white text-2xl font-Nunito_Medium">
              ◆ Selecciona la ubicación de tu explotación
            </Text>
            <Text className="mt-2 text-c_white text-md font-Nunito_Italic">
              Esta ubicación servirá como centro para tu mapa de fincas. Las
              puedes ver en más detalle en vista satélite en "Mis fincas".
            </Text>
          </CustomTextDiv>
        </View>
      </View>
      <View className="flex-1 bg-c_light_gray rounded-lg mx-4 p-2 mt-4">
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: selectedLocation.latitude || 0,
            longitude: selectedLocation.longitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress}
        >
          <Marker title="Tu explotación" coordinate={selectedLocation} />
        </MapView>
      </View>
      <View className="flex-row p-4 justify-around">
        <Text className="text-c_white text-lg">
          Latitud: {selectedLocation.latitude.toFixed(6)}
        </Text>
        <Text className="text-c_white text-lg">
          Longitud: {selectedLocation.longitude.toFixed(6)}
        </Text>
      </View>
      <View className="flex items-center my-4">
        <View className="w-[75%]">
          <CustomPressable
            text="Guardar ubicación"
            onPress={handleSaveLocation}
            buttonTestID="save-location-button"
            icon={icons.faBookmark}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Maps;
