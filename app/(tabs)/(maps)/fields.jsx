import React from "react";

import { Text, View, SafeAreaView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomButton from "../../../components/basic/custom-button";
import { useUser } from '../../../hooks/providers/user-provider';
import MapCard from './map-card';
import { getAllFieldsByUserId } from "../../model/field";
import icons from "../../../constants/icons";

const Fields = () => {

    const [fields, setFields] = React.useState([]);

    React.useEffect(() => {
        const getFields = async () => {
            const res = await getAllFieldsByUserId(user.id);
            setFields(res);
        };

        getFields();
    }, []);

    const { user } = useUser();

    return (
        <SafeAreaView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Mis fincas
            </Text>
            <View className="mt-4 mx-16">
                <CustomButton
                    text={<View className="flex-row items-center">
                        <Text className="text-c_white text-xl font-Nunito_Medium">
                            Añadir una finca
                        </Text>
                        <View className="px-8">
                            <FontAwesomeIcon
                                icon={icons.faCirclePlus}
                                size={25}
                                color="white"
                            />
                        </View>
                    </View>}
                    onPress={() => router.push('add-fields')}
                    buttonTestID="add-fields-button"
                />
            </View>
            <View className="flex-1 mt-4">
                <FlatList
                    data={fields}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MapCard map={item} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default Fields;