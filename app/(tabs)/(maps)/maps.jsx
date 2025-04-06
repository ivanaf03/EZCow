import React from 'react';

import { Text, View, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

import { insertFarmUbication, getFarmUbicationByUserId } from '../../model/farm';
import { useUser } from '../../../hooks/providers/user-provider';
import CustomButton from '../../../components/basic/custom-button';

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
        await insertFarmUbication(user.id, selectedLocation.latitude, selectedLocation.longitude);
    };

    return (
        <SafeAreaView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Mapas
            </Text>
            <View className="mt-4 mx-4">
                <CustomButton
                    text="Ver mis fincas"
                    onPress={() => router.replace('fields')}
                    buttonTestID={"fields-button"}
                />
            </View>
            <View className="mt-4 mx-4 p-4 bg-c_light_gray rounded-2xl">
                <Text className="text-c_light_blue text-xl font-Nunito_Medium">
                    ◆ Selecciona la ubicación de tu explotación
                </Text>
                <Text className="mt-2 text-c_white text-sm font-Nunito_Italic">
                    Aquí puedes guardar la ubicación de tu explotación en el mapa. Se usará para
                    centrar el mapa de las fincas de tu explotación.
                </Text>
            </View>
            <View className="flex-1 bg-c_light_gray border-2 border-c_light_blue rounded-2xl mx-4 p-2 mt-4">
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    region={{
                        latitude: selectedLocation.latitude || 0,
                        longitude: selectedLocation.longitude || 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onPress={handleMapPress}
                >
                    <Marker
                        title="Tu explotación"
                        coordinate={selectedLocation}
                    />
                </MapView>
            </View>
            <View className="flex-row p-4 bg-c_gray justify-around">
                <Text className="text-c_white text-lg">Latitud: {selectedLocation.latitude.toFixed(6)}</Text>
                <Text className="text-c_white text-lg">Longitud: {selectedLocation.longitude.toFixed(6)}</Text>
            </View>
            <View className="mx-16">
                <CustomButton
                    text="Guardar ubicación"
                    onPress={handleSaveLocation}
                />
            </View>
        </SafeAreaView>
    );
};

export default Maps;
