import React from "react";

import { Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

import CustomButton from '../../../components/basic/custom-button';
import CustomInput from "../../../components/basic/custom-input";
import { getFarmUbicationByUserId } from "../../model/farm";
import { insertField } from "../../model/field";
import { useUser } from "../../../hooks/providers/user-provider";

const AddFields = () => {

    const [name, setName] = React.useState('');
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
        await insertField(name, selectedLocation.latitude, selectedLocation.longitude, user.id);
        router.replace('fields');
    };

    return (
        <ScrollView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Añadir una finca
            </Text>
            <View className="h-[300px] bg-c_light_gray border-2 border-c_light_blue rounded-2xl mx-4 p-2 mt-4">
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    region={{
                        latitude: selectedLocation.latitude || 0,
                        longitude: selectedLocation.longitude || 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    mapType="satellite"
                    onPress={handleMapPress}
                >
                    <Marker
                        title={name}
                        coordinate={selectedLocation}
                    />
                </MapView>
            </View>
            <View className="flex mx-4 mt-4">
                <CustomInput
                    text="Nombre de la finca"
                    placeholder="Nombre"
                    onChangeText={setName}
                    value={name}
                />
                <CustomButton
                    text="Guardar ubicación"
                    onPress={handleSaveLocation}
                />
            </View>
            <View className=" flex mx-16 mt-10">
                <CustomButton
                    text="Mis fincas"
                    onPress={() => router.replace('fields')}
                    buttonTestID="fields-button"
                />
                <CustomButton
                    text="Mi explotación"
                    onPress={() => router.replace('maps')}
                    buttonTestID="my-farm-button"
                />
            </View>
        </ScrollView>
    );

};

export default AddFields;